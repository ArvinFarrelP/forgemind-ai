import { create } from 'zustand'

const HISTORY_KEY = 'forgemind_history'

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []
  } catch {
    return []
  }
}

function persist(items) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(items))
}

export const useHistoryStore = create((set, get) => ({
  items: loadHistory(),

  addItem: (entry) => {
    const item = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      favorite: false,
      ...entry,
    }
    const items = [item, ...get().items]
    persist(items)
    set({ items })
    return item
  },

  deleteItem: (id) => {
    const items = get().items.filter((i) => i.id !== id)
    persist(items)
    set({ items })
  },

  toggleFavorite: (id) => {
    const items = get().items.map((i) =>
      i.id === id ? { ...i, favorite: !i.favorite } : i
    )
    persist(items)
    set({ items })
  },

  clearAll: () => {
    persist([])
    set({ items: [] })
  },
}))
