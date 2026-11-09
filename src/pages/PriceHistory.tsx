import { useEffect, useState } from 'react'
import {
  getPriceHistory,
  getRetailerListings,
  getProducts,
  getRetailers,
} from '../services/priceHistoryService'

import type { PriceHistory as PriceHistoryType } from '../types/priceHistory'
import type { RetailerListing } from '../types/retailerListing'
import type { Product } from '../types/product'
import type { Retailer } from '../types/retailers'

interface EnrichedPriceHistory extends PriceHistoryType {
  product_name: string
  retailer_name: string
}

function PriceHistory() {
  const [history, setHistory] = useState<EnrichedPriceHistory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPriceHistory() {
      try {
        setIsLoading(true)
        setError(null)

        const [
          historyData,
          listingData,
          productData,
          retailerData,
        ] = await Promise.all([
          getPriceHistory(),
          getRetailerListings(),
          getProducts(),
          getRetailers(),
        ])

        const enrichedHistory = historyData.map((record) => {
          const listing = listingData.find(
            (item: RetailerListing) => item.id === record.listing_id
          )

          const product = productData.find(
            (item: Product) => item.id === listing?.product_id
          )

          const retailer = retailerData.find(
            (item: Retailer) => item.id === listing?.retailer_id
          )

          return {
            ...record,
            product_name: product?.name || 'Unknown product',
            retailer_name: retailer?.name || 'Unknown retailer',
          }
        })

        setHistory(enrichedHistory)
      } catch (error) {
        console.error('Failed to fetch price history:', error)
        setError('Failed to load price history. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPriceHistory()
  }, [])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Price History
        </h1>
        <p className="mt-2 text-slate-500">
          Track historical product prices across retailers.
        </p>
      </div>

      {isLoading && (
        <p className="text-slate-500">Loading price history...</p>
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
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Retailer</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Date Observed</th>
              </tr>
            </thead>

            <tbody>
              {history.map((record) => (
                <tr
                  key={record.id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-800">
                      {record.product_name}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      History ID: {record.id}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {record.retailer_name}
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                    {record.currency}{' '}
                    {Number(record.price).toLocaleString('en-KE', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(record.observed_at).toLocaleString('en-KE', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {history.length === 0 && (
            <p className="p-8 text-center text-sm text-slate-500">
              No price history found.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default PriceHistory