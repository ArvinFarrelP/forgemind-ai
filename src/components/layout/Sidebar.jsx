import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  PenSquare,
  LayoutTemplate,
  History,
  Star,
  Settings,
  Flame,
  LogOut,
  X,
} from 'lucide-react'
import clsx from 'clsx'
import { useAuthStore } from '../../store/authStore'
import { useToastStore } from '../../store/toastStore'

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/dashboard/workspace', label: 'Workspace', icon: PenSquare },
  { to: '/dashboard/templates', label: 'Templates', icon: LayoutTemplate },
  { to: '/dashboard/history', label: 'History', icon: History },
  { to: '/dashboard/favorites', label: 'Favorites', icon: Star },
  { to: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ mobileOpen, onClose }) {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const addToast = useToastStore((s) => s.addToast)

  function handleLogout() {
    logout()
    addToast('You have been logged out.', 'info')
    navigate('/')
  }

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={clsx(
          'fixed lg:sticky top-0 left-0 z-40 h-screen w-72 shrink-0 border-r border-white/5 bg-forge-surface/80 backdrop-blur-xl flex flex-col transition-transform duration-300 lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/5">
          <NavLink to="/" className="flex items-center gap-2 font-display font-semibold">
            <span className="w-8 h-8 rounded-lg bg-ember-gradient flex items-center justify-center">
              <Flame className="w-4 h-4 text-forge-bg" />
            </span>
            ForgeMind <span className="text-gradient">AI</span>
          </NavLink>
          <button onClick={onClose} className="lg:hidden text-forge-muted" aria-label="Close sidebar">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-ember-gradient-soft text-forge-ember border border-forge-ember/20'
                    : 'text-forge-muted hover:text-forge-text hover:bg-white/5'
                )
              }
            >
              <item.icon className="w-[18px] h-[18px]" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-2 py-2 mb-2">
            <div className="w-9 h-9 rounded-full bg-ember-gradient flex items-center justify-center font-display font-semibold text-forge-bg text-sm shrink-0">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{user?.name || 'Guest'}</p>
              <p className="text-xs text-forge-muted truncate">{user?.plan || 'Free'} Plan</p>
            </div>
          </div>
          <button onClick={handleLogout} className="btn-ghost w-full justify-start gap-3 px-4">
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </aside>
    </>
  )
}
