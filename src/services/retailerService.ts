import API_BASE_URL from './api'
import type { Retailer } from '../types/retailers'

export async function getRetailers(): Promise<Retailer[]> {
  const response = await fetch(`${API_BASE_URL}/retailers/`)

  if (!response.ok) {
    throw new Error('Failed to fetch retailers')
  }

  return response.json()
}