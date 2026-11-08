import API_BASE_URL from './api'
import type { ScrapingJob } from '../types/scrapingJob'

export async function getScrapingJobs(): Promise<ScrapingJob[]> {
  const response = await fetch(`${API_BASE_URL}/scraping-jobs/`)

  if (!response.ok) {
    throw new Error('Failed to fetch scraping jobs')
  }

  return response.json()
}