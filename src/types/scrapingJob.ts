export interface ScrapingJob {
  id: number
  status: string
  created_at: string
  started_at: string | null
  completed_at: string | null
}