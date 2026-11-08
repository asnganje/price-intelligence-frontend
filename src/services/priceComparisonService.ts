import API_BASE_URL from './api'
import type { PriceComparison } from '../types/priceComparison'

export async function getPriceComparison(
  productId: number
): Promise<PriceComparison> {
  const response = await fetch(
    `${API_BASE_URL}/products/${productId}/price_comparison`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch price comparison')
  }

  return response.json()
}