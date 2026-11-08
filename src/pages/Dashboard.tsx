import Sidebar from '../components/Sidebar'
import { useState } from 'react'
import StatsCards from '../components/StatsCards'
import PriceComparison from '../components/PriceComparison'
import RecentJobs from '../components/RecentJobs'

function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (
    <div className="min-h-screen bg-slate-100 flex">

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}/>

      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden mb-6 rounded-lg bg-slate-900 px-4 py-2 text-white"
              aria-label="Open navigation"
            >
              ☰ Menu
          </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Monitor product prices across Kenyan retailers.
          </p>
        </div>
        <StatsCards />
        <PriceComparison />
        <RecentJobs />
      </main>

    </div>
  )
}

export default Dashboard