import { create } from 'zustand'

const USERS_KEY = 'forgemind_users'
const SESSION_KEY = 'forgemind_session'

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || []
  } catch {
    return []
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function hash(str) {
  // Lightweight non-cryptographic hash — fine for a local-only demo auth system.
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0
  }
  return h.toString(36)
}

const sessionUser = (() => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) || null
  } catch {
    return null
  }
})()

export const useAuthStore = create((set, get) => ({
  user: sessionUser,
  error: null,

  register: (name, email, password) => {
    const users = readUsers()
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      set({ error: 'An account with this email already exists.' })
      return false
    }
    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password: hash(password),
      createdAt: new Date().toISOString(),
      plan: 'Free',
    }
    users.push(newUser)
    writeUsers(users)
    const publicUser = { id: newUser.id, name, email, plan: 'Free' }
    localStorage.setItem(SESSION_KEY, JSON.stringify(publicUser))
    set({ user: publicUser, error: null })
    return true
  },

  login: (email, password) => {
    const users = readUsers()
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
    if (!found || found.password !== hash(password)) {
      set({ error: 'Invalid email or password.' })
      return false
    }
    const publicUser = { id: found.id, name: found.name, email: found.email, plan: found.plan }
    localStorage.setItem(SESSION_KEY, JSON.stringify(publicUser))
    set({ user: publicUser, error: null })
    return true
  },

  logout: () => {
    localStorage.removeItem(SESSION_KEY)
    set({ user: null })
  },

  clearError: () => set({ error: null }),

  isAuthenticated: () => !!get().user,
}))
