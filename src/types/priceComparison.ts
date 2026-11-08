export interface RetailerPrice {
  retailer_id: number
  retailer_name: string
  listing_id: number
  product_url: string
  current_price: string
  currency: string
  is_available: boolean
}

export interface LowestPriceRetailer {
  retailer_name: string
  price: string
  product_url: string
}

export interface PriceStatistics {
  currency: string
  average_price: string
  lowest_price: string
  highest_price: string
  retailer_count: number
  lowest_price_retailer: LowestPriceRetailer | null
}

export interface PriceComparison {
  product: {
    id: number
    name: string
    brand: string | null
    model_number: string | null
    category: string | null
  }
  retailer_prices: RetailerPrice[]
  price_statistics: PriceStatistics
}