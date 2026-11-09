export interface RetailerListing {
  id: number
  retailer_id: number
  product_id: number
  product_url: string
  current_price: string
  currency: string
  is_available: boolean
  is_active: boolean
}