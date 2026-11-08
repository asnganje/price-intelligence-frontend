export interface Product {
  id: number
  name: string
  brand: string | null
  model_number: string | null
  category: string | null
  is_active: boolean
}