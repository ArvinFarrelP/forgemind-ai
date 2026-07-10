import { useState } from 'react'
import { Sun, Moon, Sparkles, Key, Save, Eye, EyeOff } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { useSettingsStore } from '../store/settingsStore'
import { useToastStore } from '../store/toastStore'
import clsx from 'clsx'

const accentColors = [
  { id: 'ember', label: 'Ember', className: 'bg-forge-ember' },
  { id: 'violet', label: 'Violet', className: 'bg-forge-violet' },
  { id: 'cyan', label: 'Cyan', className: 'bg-forge-cyan' },
]

export default function Settings() {
  const settings = useSettingsStore()
  const addToast = useToastStore((s) => s.addToast)
  const [apiKeyInput, setApiKeyInput] = useState(settings.apiKey)
  const [showKey, setShowKey] = useState(false)

  function handleSaveApiKey(e) {
    e.preventDefault()
    settings.updateSettings({ apiKey: apiKeyInput })
    addToast('API key saved locally in your browser.', 'success')
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="font-display font-semibold text-2xl">Settings</h2>
        <p className="text-forge-muted mt-1">Manage your workspace preferences.</p>
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-ember-gradient-soft border border-forge-ember/20 flex items-center justify-center">
              {settings.darkMode ? <Moon className="w-[18px] h-[18px] text-forge-ember" /> : <Sun className="w-[18px] h-[18px] text-forge-ember" />}
            </div>
            <div>
              <h3 className="font-medium">Dark Mode</h3>
              <p className="text-sm text-forge-muted">ForgeMind AI is designed dark-first for focus and contrast.</p>
            </div>
          </div>
          <button
            onClick={() => settings.updateSettings({ darkMode: !settings.darkMode })}
            className={clsx(
              'w-12 h-7 rounded-full flex items-center px-1 transition-colors shrink-0',
              settings.darkMode ? 'bg-ember-gradient justify-end' : 'bg-forge-surface2 justify-start'
            )}
            aria-label="Toggle dark mode"
          >
            <span className="w-5 h-5 rounded-full bg-white" />
          </button>
        </div>
      </Card>

      <Card>
        <h3 className="font-medium mb-4">Accent Color</h3>
        <div className="flex gap-3">
          {accentColors.map((c) => (
            <button
              key={c.id}
              onClick={() => settings.updateSettings({ accentColor: c.id })}
              className={clsx(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors',
                settings.accentColor === c.id
                  ? 'border-white/30 bg-white/5'
                  : 'border-forge-border text-forge-muted hover:border-white/20'
              )}
            >
              <span className={clsx('w-3.5 h-3.5 rounded-full', c.className)} />
              {c.label}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-ember-gradient-soft border border-forge-ember/20 flex items-center justify-center">
              <Sparkles className="w-[18px] h-[18px] text-forge-ember" />
            </div>
            <div>
              <h3 className="font-medium">Animations</h3>
              <p className="text-sm text-forge-muted">Enable smooth transitions and motion effects across the app.</p>
            </div>
          </div>
          <button
            onClick={() => settings.updateSettings({ animations: !settings.animations })}
            className={clsx(
              'w-12 h-7 rounded-full flex items-center px-1 transition-colors shrink-0',
              settings.animations ? 'bg-ember-gradient justify-end' : 'bg-forge-surface2 justify-start'
            )}
            aria-label="Toggle animations"
          >
            <span className="w-5 h-5 rounded-full bg-white" />
          </button>
        </div>
      </Card>

      <Card>
        <form onSubmit={handleSaveApiKey} className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-ember-gradient-soft border border-forge-ember/20 flex items-center justify-center">
              <Key className="w-[18px] h-[18px] text-forge-ember" />
            </div>
            <div>
              <h3 className="font-medium">Fireworks AI API Key</h3>
              <p className="text-sm text-forge-muted">Your Fireworks AI API key is stored locally in your browser and is never stored or processed by ForgeMind AI servers.</p>
            </div>
          </div>
          <div className="relative">
            <Input
              type={showKey ? 'text' : 'password'}
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="fw_xxxxxxxxxxxxxxxxxxxxxxxx"
              className="pr-12"
            />
            <button
              type="button"
              onClick={() => setShowKey((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-forge-muted"
              aria-label={showKey ? 'Hide API key' : 'Show API key'}
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <Button type="submit" icon={Save} size="sm">
            Save API Key
          </Button>
        </form>
      </Card>
    </div>
  )
}
