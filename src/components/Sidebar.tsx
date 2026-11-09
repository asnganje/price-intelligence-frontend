
import { NavLink } from 'react-router-dom'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigationItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Scraping Jobs', path: '/scraping-jobs' },
    { name: 'Products', path: '/products' },
    { name: 'Retailers', path: '/retailers' },
    { name: 'Price History', path: '/price-history' },
  ]

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      <aside
        className={`
          ${isOpen ? 'fixed inset-y-0 left-0 z-50' : 'hidden'}
          md:sticky md:top-0 md:block
          w-64 shrink-0 min-h-screen
          bg-slate-900 text-white p-6
        `}
      >
        <div className="mb-10">
          <h1 className="text-xl font-bold">
            Web Scraping Engine
          </h1>

          <p className="mt-2 text-xs text-slate-400">
            Price Monitoring Platform
          </p>
        </div>

        <nav>
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `
                      block rounded-lg px-4 py-3 text-sm transition-colors
                      ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-300 hover:bg-slate-800'
                      }
                    `
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={onClose}
          className="mt-8 text-sm text-slate-400 md:hidden"
        >
          Close menu
        </button>
      </aside>
    </>
  )
}

export default Sidebar
