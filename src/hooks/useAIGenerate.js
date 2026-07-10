import { useCallback, useRef, useState } from 'react'
import { generateContent, simulateStream } from '../services/aiService'

export function useAIGenerate() {
  const [output, setOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState(null)
  const abortRef = useRef(null)

  const generate = useCallback(async ({ systemPrompt, prompt, tone, language }) => {
    setError(null)
    setIsLoading(true)
    setOutput('')

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const { content } = await generateContent({
        systemPrompt,
        prompt,
        tone,
        language,
        signal: controller.signal,
      })

      setIsLoading(false)
      setIsStreaming(true)
      await simulateStream(content, setOutput, { signal: controller.signal })
      setIsStreaming(false)
      return content
    } catch (err) {
      setIsLoading(false)
      setIsStreaming(false)
      if (err.name !== 'AbortError') {
        setError(err.message || 'Something went wrong while generating content.')
      }
      return null
    }
  }, [])

  const cancel = useCallback(() => {
    abortRef.current?.abort()
    setIsLoading(false)
    setIsStreaming(false)
  }, [])

  const reset = useCallback(() => {
    setOutput('')
    setError(null)
  }, [])

  return { output, setOutput, isLoading, isStreaming, error, generate, cancel, reset }
}
