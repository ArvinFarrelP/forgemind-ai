import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import DashboardTopbar from './DashboardTopbar'
import ToastContainer from '../ui/Toast'

const titles = {
  '/dashboard': 'Dashboard',
  '/dashboard/workspace': 'Workspace',
  '/dashboard/templates': 'Templates',
  '/dashboard/history': 'History',
  '/dashboard/favorites': 'Favorites',
  '/dashboard/settings': 'Settings',
}

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const title = titles[location.pathname] || 'Dashboard'

  return (
    <div className="flex min-h-screen bg-forge-bg">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col">
        <DashboardTopbar onMenuClick={() => setMobileOpen(true)} title={title} />
        <main className="flex-1 px-5 sm:px-8 py-8 max-w-[1400px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
      <ToastContainer />
    </div>
  )
}
