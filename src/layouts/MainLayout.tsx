
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import Sidebar from '../components/Sidebar'

function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="mb-6 rounded-lg bg-slate-900 px-4 py-2 text-white md:hidden"
          aria-label="Open navigation"
        >
          ☰ Menu
        </button>

        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
