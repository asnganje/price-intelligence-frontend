import { useEffect, useState } from 'react'
import { getRetailers } from '../services/retailerService'
import type { Retailer } from '../types/retailers'

function Retailers() {
  const [retailers, setRetailers] = useState<Retailer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRetailers() {
      try {
        setIsLoading(true)
        setError(null)

        const data = await getRetailers()
        setRetailers(data)
      } catch (error) {
        console.error('Failed to fetch retailers:', error)
        setError('Failed to load retailers. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchRetailers()
  }, [])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Retailers</h1>
        <p className="mt-2 text-slate-500">
          Manage your monitored retailers.
        </p>
      </div>

      {isLoading && (
        <p className="text-slate-500">Loading retailers...</p>
      )}

      {error && (
        <p className="rounded-lg bg-red-100 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {!isLoading && !error && (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr className="text-sm text-slate-500">
                <th className="px-6 py-4 font-medium">Retailer</th>
                <th className="px-6 py-4 font-medium">Website</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {retailers.map((retailer) => (
                <tr
                  key={retailer.id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-800">
                      {retailer.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      ID: {retailer.id}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-sm">
                    <a
                      href={retailer.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {retailer.website_url}
                    </a>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        retailer.is_active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {retailer.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {retailers.length === 0 && (
            <p className="p-8 text-center text-sm text-slate-500">
              No retailers found.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default Retailers