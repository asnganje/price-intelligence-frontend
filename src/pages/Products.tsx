
import { useEffect, useState } from 'react'

import { getProducts } from '../services/productService'
import type { Product } from '../types/product'

function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true)
        setError(null)

        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        console.error('Failed to fetch products:', error)
        setError('Failed to load products. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Products
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your monitored products.
        </p>
      </div>

      {isLoading && (
        <p className="text-slate-500">Loading products...</p>
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
                <th className="px-6 py-4 font-medium">Brand</th>
                <th className="px-6 py-4 font-medium">Model</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-800">
                      {product.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      ID: {product.id}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {product.brand || '--'}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {product.model_number || '--'}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {product.category || '--'}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        product.is_active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {product.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <p className="p-8 text-center text-sm text-slate-500">
              No products found.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default Products
