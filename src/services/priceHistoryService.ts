import API_BASE_URL from './api'
import type { PriceHistory } from '../types/priceHistory'
import type { RetailerListing } from '../types/retailerListing'
import type { Product } from '../types/product'
import type { Retailer } from '../types/retailers'

export async function getPriceHistory(): Promise<PriceHistory[]> {
  const response = await fetch(`${API_BASE_URL}/price-history/`)

  if (!response.ok) {
    throw new Error('Failed to fetch price history')
  }

  return response.json()
}

export async function getRetailerListings(): Promise<RetailerListing[]> {
  const response = await fetch(`${API_BASE_URL}/retailer_listings/`)

  if (!response.ok) {
    throw new Error('Failed to fetch retailer listings')
  }

  return response.json()
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products/`)

  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }

  return response.json()
}

export async function getRetailers(): Promise<Retailer[]> {
  const response = await fetch(`${API_BASE_URL}/retailers/`)

  if (!response.ok) {
    throw new Error('Failed to fetch retailers')
  }

  return response.json()
}