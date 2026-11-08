
interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}


function Sidebar({ isOpen, onClose }: SidebarProps) {
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

              {/* Application branding */}
              <div className="mb-10">
                <h1 className="text-xl font-bold">
                  Price Intelligence
                </h1>

                <p className="text-xs text-slate-400 mt-2">
                  Price Monitoring Platform
                </p>
              </div>

              {/* Navigation */}
              <nav>
                <ul className="space-y-2">

                  <li className="bg-blue-600 rounded-lg px-4 py-3">
                    Dashboard
                  </li>

                  <li className="text-slate-300 hover:bg-slate-800 rounded-lg px-4 py-3 cursor-pointer">
                    Products
                  </li>

                  <li className="text-slate-300 hover:bg-slate-800 rounded-lg px-4 py-3 cursor-pointer">
                    Retailers
                  </li>

                  <li className="text-slate-300 hover:bg-slate-800 rounded-lg px-4 py-3 cursor-pointer">
                    Price History
                  </li>

                  <li className="text-slate-300 hover:bg-slate-800 rounded-lg px-4 py-3 cursor-pointer">
                    Scraping Jobs
                  </li>

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