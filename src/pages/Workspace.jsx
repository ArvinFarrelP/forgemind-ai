import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Sparkles, Trash2 } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Dropdown from '../components/ui/Dropdown'
import CategorySelector from '../components/workspace/CategorySelector'
import OutputPanel from '../components/workspace/OutputPanel'
import { useAIGenerate } from '../hooks/useAIGenerate'
import { useHistoryStore } from '../store/historyStore'
import { useToastStore } from '../store/toastStore'
import { TONES, LANGUAGES, getCategoryById } from '../utils/categories'

export default function Workspace() {
  const [searchParams] = useSearchParams()
  const [categoryId, setCategoryId] = useState(searchParams.get('category') || 'general')
  const [prompt, setPrompt] = useState(searchParams.get('prompt') || '')
  const [tone, setTone] = useState('Professional')
  const [language, setLanguage] = useState('English')
  const [lastEntryId, setLastEntryId] = useState(null)

  const { output, setOutput, isLoading, isStreaming, error, generate, reset } = useAIGenerate()
  const addItem = useHistoryStore((s) => s.addItem)
  const toggleFavorite = useHistoryStore((s) => s.toggleFavorite)
  const items = useHistoryStore((s) => s.items)
  const addToast = useToastStore((s) => s.addToast)

  useEffect(() => {
    const paramCategory = searchParams.get('category')
    const paramPrompt = searchParams.get('prompt')
    if (paramCategory) setCategoryId(paramCategory)
    if (paramPrompt) setPrompt(paramPrompt)
  }, [searchParams])

  const category = getCategoryById(categoryId)
  const currentEntry = items.find((i) => i.id === lastEntryId)

  async function handleGenerate() {
    if (!prompt.trim()) {
      addToast('Please enter a prompt first.', 'error')
      return
    }
    const content = await generate({ systemPrompt: category.systemPrompt, prompt, tone, language })
    if (content) {
      const entry = addItem({ categoryId, prompt, tone, language, content })
      setLastEntryId(entry.id)
    }
  }

  function handleClear() {
    setPrompt('')
    reset()
    setLastEntryId(null)
  }

  function handleFavorite() {
    if (lastEntryId) {
      toggleFavorite(lastEntryId)
      addToast('Favorites updated.', 'success')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-semibold text-2xl">Workspace</h2>
        <p className="text-forge-muted mt-1">Pick a category, describe what you need, and let ForgeMind AI do the rest.</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="font-display font-semibold mb-4">Category</h3>
            <CategorySelector value={categoryId} onChange={setCategoryId} />
          </Card>

          <Card className="space-y-4">
            <h3 className="font-display font-semibold">Options</h3>
            <Dropdown label="Tone" options={TONES} value={tone} onChange={setTone} />
            <Dropdown label="Language" options={LANGUAGES} value={language} onChange={setLanguage} />
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-semibold">
                Prompt <span className="text-forge-muted font-normal">· {category.label}</span>
              </h3>
              <button onClick={() => setPrompt('')} className="btn-ghost p-1.5 rounded-lg" aria-label="Clear prompt">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`Describe what you want to generate for ${category.label}...`}
              rows={7}
              className="input-field resize-none"
            />
            <div className="flex flex-wrap gap-3 mt-4">
              <Button icon={Sparkles} onClick={handleGenerate} loading={isLoading || isStreaming}>
                {isLoading || isStreaming ? 'Generating...' : 'Generate'}
              </Button>
              <Button variant="secondary" onClick={handleClear} disabled={isLoading || isStreaming}>
                Clear
              </Button>
            </div>
          </Card>

          <OutputPanel
            output={output}
            isLoading={isLoading}
            isStreaming={isStreaming}
            error={error}
            onRegenerate={handleGenerate}
            onClear={() => {
              setOutput('')
              setLastEntryId(null)
            }}
            onFavorite={handleFavorite}
            isFavorite={!!currentEntry?.favorite}
            filename={`forgemind-${categoryId}.txt`}
          />
        </div>
      </div>
    </div>
  )
}
