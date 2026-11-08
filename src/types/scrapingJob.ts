export interface ScrapingJob {
  id: number
  status: string
  created_at: string
  started_at: string | null
  completed_at: string | null
}

export interface CreateScrapingJobResponse {
  msg: string
  job_id: number
  status: string
}

export interface ScrapingListing {
  product_id: number
  product_name: string
  current_price: number
  currency: string
  is_available: boolean
  product_url: string
}

export interface SpiderResult {
  spider_name: string
  status: string
  started_at: string | null
  completed_at: string | null
  retailer: string | null
  listings: ScrapingListing[]
}

export interface ScrapingJobDetail {
  id: number
  status: string
  created_at: string
  started_at: string | null
  completed_at: string | null
  spiders: SpiderResult[]
}