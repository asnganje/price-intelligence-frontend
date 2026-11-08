
import API_BASE_URL from './api'

import type {
  ScrapingJob,
  CreateScrapingJobResponse,
  ScrapingJobDetail,
} from '../types/scrapingJob'

export async function getScrapingJobs(): Promise<ScrapingJob[]> {
  const response = await fetch(`${API_BASE_URL}/scraping-jobs/`)

  if (!response.ok) {
    throw new Error('Failed to fetch scraping jobs')
  }

  return response.json()
}

export async function createScrapingJob(): Promise<CreateScrapingJobResponse> {
  const response = await fetch(`${API_BASE_URL}/scraping-jobs/`, {
    method: 'POST',
  })

  if (!response.ok) {
    throw new Error('Failed to create scraping job')
  }

  return response.json()
}

export async function getScrapingJob(
  jobId: number
): Promise<ScrapingJobDetail> {
  const response = await fetch(
    `${API_BASE_URL}/scraping-jobs/${jobId}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch scraping job details')
  }

  return response.json()
}
