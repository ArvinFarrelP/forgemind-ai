import { create } from 'zustand'

const SETTINGS_KEY = 'forgemind_settings'

const defaultSettings = {
  darkMode: true,
  accentColor: 'ember', // ember | violet | cyan
  animations: true,
  apiKey: '',
}

function loadSettings() {
  try {
    const stored = JSON.parse(localStorage.getItem(SETTINGS_KEY))
    return { ...defaultSettings, ...(stored || {}) }
  } catch {
    return defaultSettings
  }
}

export const useSettingsStore = create((set, get) => ({
  ...loadSettings(),

  updateSettings: (partial) => {
    const next = { ...get(), ...partial }
    const persistable = { ...next }
    delete persistable.updateSettings
    delete persistable.resetSettings
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(persistable))
    set(partial)
  },

  resetSettings: () => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings))
    set(defaultSettings)
  },
}))
