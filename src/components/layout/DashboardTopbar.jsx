import { Menu, Bell } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

export default function DashboardTopbar({ onMenuClick, title }) {
  const user = useAuthStore((s) => s.user)

  return (
    <header className="sticky top-0 z-20 h-16 border-b border-white/5 bg-forge-bg/80 backdrop-blur-xl flex items-center justify-between px-5 sm:px-8">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden text-forge-muted" aria-label="Open sidebar">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="font-display font-semibold text-lg">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="btn-ghost p-2 rounded-lg relative" aria-label="Notifications">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-forge-ember" />
        </button>
        <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-white/10">
          <div className="w-8 h-8 rounded-full bg-ember-gradient flex items-center justify-center font-display font-semibold text-forge-bg text-xs">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <span className="text-sm font-medium">{user?.name || 'Guest'}</span>
        </div>
      </div>
    </header>
  )
}
