const FIREWORKS_ENDPOINT = 'https://api.fireworks.ai/inference/v1/chat/completions'
const MODEL = 'accounts/fireworks/models/gpt-oss-20b'
const MAX_RETRIES = 2
const RETRY_DELAY_MS = 1000

export class AIServiceError extends Error {
  constructor(message, { status, retriable = false } = {}) {
    super(message)
    this.name = 'AIServiceError'
    this.status = status
    this.retriable = retriable
  }
}

function getApiKey() {
  // Prefer a user-provided key stored locally (Settings > API Key), fall back to build-time env var.
  const local = localStorage.getItem('forgemind_settings')
  if (local) {
    try {
      const parsed = JSON.parse(local)
      if (parsed.apiKey) return parsed.apiKey
    } catch {
      /* ignore malformed settings */
    }
  }
  return import.meta.env.VITE_FIREWORKS_API_KEY || ''
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function buildMessages({ systemPrompt, prompt, tone, language }) {
  const instructions = [
    systemPrompt,
    tone ? `Write in a ${tone.toLowerCase()} tone.` : null,
    language && language !== 'English' ? `Respond in ${language}.` : null,
    'Format your response using clean Markdown.',
  ]
    .filter(Boolean)
    .join(' ')

  return [
    { role: 'system', content: instructions },
    { role: 'user', content: prompt },
  ]
}

/**
 * Calls the Fireworks AI chat completions endpoint with automatic retry on
 * transient failures (network errors, 429, 5xx).
 */
export async function generateContent({ systemPrompt, prompt, tone, language, signal }) {
  const apiKey = getApiKey()

  if (!apiKey) {
    throw new AIServiceError(
      'No Fireworks AI API key found. Add one in Settings → API Key, or set VITE_FIREWORKS_API_KEY in your .env file.',
      { retriable: false }
    )
  }

  if (!prompt || !prompt.trim()) {
    throw new AIServiceError('Please enter a prompt before generating.', { retriable: false })
  }

  const body = {
    model: MODEL,
    messages: buildMessages({ systemPrompt, prompt, tone, language }),
    temperature: 0.7,
    max_tokens: 2048,
    top_p: 1,
  }

  let lastError

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(FIREWORKS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
        signal,
      })

      if (!response.ok) {
        const isRetriable = response.status === 429 || response.status >= 500
        let detail = ''
        try {
          const errJson = await response.json()
          detail = errJson?.error?.message || errJson?.message || ''
        } catch {
          /* body wasn't JSON */
        }

        if (isRetriable && attempt < MAX_RETRIES) {
          lastError = new AIServiceError(detail || `Request failed (${response.status})`, {
            status: response.status,
            retriable: true,
          })
          await sleep(RETRY_DELAY_MS * (attempt + 1))
          continue
        }

        throw new AIServiceError(
          detail || `Request failed with status ${response.status}. Please check your API key and try again.`,
          { status: response.status, retriable: isRetriable }
        )
      }

      const data = await response.json()
      const content = data?.choices?.[0]?.message?.content

      if (!content) {
        throw new AIServiceError('The AI returned an empty response. Please try again.', { retriable: true })
      }

      return { content, raw: data }
    } catch (err) {
      if (err.name === 'AbortError') {
        throw err
      }
      if (err instanceof AIServiceError) {
        lastError = err
        if (!err.retriable || attempt >= MAX_RETRIES) throw err
        continue
      }
      // Network-level failure
      lastError = new AIServiceError(
        'Network error while contacting Fireworks AI. Check your connection and try again.',
        { retriable: true }
      )
      if (attempt < MAX_RETRIES) {
        await sleep(RETRY_DELAY_MS * (attempt + 1))
        continue
      }
      throw lastError
    }
  }

  throw lastError || new AIServiceError('Generation failed after multiple attempts.')
}

/**
 * Simulates a streaming effect by revealing the already-generated content
 * progressively, since the Fireworks endpoint is called as a single request.
 * onChunk is called repeatedly with the growing string until complete.
 */
export async function simulateStream(fullText, onChunk, { chunkSize = 6, delayMs = 12, signal } = {}) {
  let output = ''
  for (let i = 0; i < fullText.length; i += chunkSize) {
    if (signal?.aborted) return output
    output += fullText.slice(i, i + chunkSize)
    onChunk(output)
    await sleep(delayMs)
  }
  return output
}
