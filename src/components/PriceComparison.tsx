import { useEffect, useState } from 'react'
import { getPriceComparison } from '../services/priceComparisonService'
import type { PriceComparison as PriceComparisonData } from '../types/priceComparison'

interface PriceComparisonProps {
  refreshKey: number
}

function PriceComparison({ refreshKey }: PriceComparisonProps) {
  const [comparison, setComparison] = useState<PriceComparisonData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchComparison() {
      try {
        const data = await getPriceComparison(1)
        setComparison(data)
      } catch {
        setError('Failed to load price comparison.')
      } finally {
        setLoading(false)
      }
    }

    fetchComparison()
  }, [refreshKey])

  if (loading) {
    return <p className="mt-8 text-slate-500">Loading price comparison...</p>
  }

  if (error) {
    return <p className="mt-8 text-red-600">{error}</p>
  }

  if (!comparison) {
    return null
  }

  return (
    <div className="mt-8 bg-white rounded-xl border border-slate-200 shadow-sm">

      <div className="p-6 border-b border-slate-200">
        <h2 className="text-lg font-bold text-slate-800">
          Price Comparison
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          {comparison.product.name}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-sm">
            <tr>
              <th className="px-6 py-4">Retailer</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Availability</th>
            </tr>
          </thead>

          <tbody>
            {comparison.retailer_prices.map((retailer) => (
              <tr
                key={retailer.listing_id}
                className="border-t border-slate-100"
              >
                <td className="px-6 py-4 font-medium text-slate-700">
                  {retailer.retailer_name}
                </td>

                <td className="px-6 py-4 font-semibold text-slate-800">
                  {retailer.currency} {Number(retailer.current_price).toLocaleString('en-KE')}
                </td>

                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                    retailer.is_available
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {retailer.is_available ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default PriceComparison