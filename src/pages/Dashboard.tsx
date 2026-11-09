
import { useEffect, useState } from 'react'

import StatsCards from '../components/StatsCards'
import PriceComparison from '../components/PriceComparison'
import RecentJobs from '../components/RecentJobs'

import {
  createScrapingJob,
  getScrapingJob,
} from '../services/scrapingJobService'

import type { ScrapingJobDetail } from '../types/scrapingJob'

function Dashboard() {
  const [isStartingJob, setIsStartingJob] = useState(false)
  const [jobError, setJobError] = useState<string | null>(null)

  const [activeJobId, setActiveJobId] = useState<number | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [jobDetails, setJobDetails] = useState<ScrapingJobDetail | null>(null)

  useEffect(() => {
    if (activeJobId === null) return

    async function checkJobStatus() {
      try {
        const data = await getScrapingJob(activeJobId!)

        setJobDetails(data)

        if (data.status === 'completed' || data.status === 'failed') {
          setActiveJobId(null)
          setRefreshKey((previousKey) => previousKey + 1)
        }
      } catch (error) {
        console.error('Failed to fetch scraping job status:', error)
      }
    }

    checkJobStatus()

    const interval = setInterval(checkJobStatus, 3000)

    return () => clearInterval(interval)
  }, [activeJobId])

  async function handleStartScraping() {
    try {
      setIsStartingJob(true)
      setJobError(null)
      setJobDetails(null)

      const job = await createScrapingJob()

      setActiveJobId(job.job_id)
    } catch (error) {
      console.error('Failed to start scraping:', error)
      setJobError('Failed to start scraping job. Please try again.')
    } finally {
      setIsStartingJob(false)
    }
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Monitor product prices across Kenyan retailers.
          </p>
        </div>

        <button
          type="button"
          onClick={handleStartScraping}
          disabled={isStartingJob || activeJobId !== null}
          className="rounded-lg bg-blue-500 cursor-pointer px-5 py-3 text-sm font-semibold text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isStartingJob
            ? 'Starting Scraping...'
            : activeJobId !== null
              ? 'Scraping in Progress...'
              : 'Run Scraping Job'}
        </button>
      </div>

      {jobDetails && (
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Scraping Job #{jobDetails.id}
              </h2>

              <p className="text-sm text-slate-500">
                Started: {jobDetails.started_at
                  ? new Date(jobDetails.started_at).toLocaleString('en-KE')
                  : 'Waiting to start'}
              </p>
            </div>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
              {jobDetails.status.toUpperCase()}
            </span>
          </div>

          <div className="mt-5 space-y-4">
            {jobDetails.spiders.map((spider) => (
              <div
                key={spider.spider_name}
                className="rounded-lg border border-slate-200 p-4"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {spider.spider_name}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {spider.retailer || 'Retailer'}
                    </p>
                  </div>

                  <span className="text-sm font-semibold text-slate-600">
                    {spider.status.toUpperCase()}
                  </span>
                </div>

                {spider.listings.map((listing) => (
                  <div
                    key={`${spider.spider_name}-${listing.product_id}`}
                    className="mt-4 border-t border-slate-100 pt-4"
                  >
                    <h4 className="text-sm font-medium text-slate-800">
                      {listing.product_name}
                    </h4>

                    <div className="mt-2 flex flex-wrap items-center gap-4">
                      <p className="text-lg font-bold text-slate-900">
                        {listing.currency}{' '}
                        {listing.current_price.toLocaleString('en-KE')}
                      </p>

                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          listing.is_available
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {listing.is_available ? 'In Stock' : 'Out of Stock'}
                      </span>

                      <a
                        href={listing.product_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-blue-600 hover:underline"
                      >
                        View Product
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {jobError && (
        <p className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">
          {jobError}
        </p>
      )}

      <StatsCards refreshKey={refreshKey} />

      <PriceComparison refreshKey={refreshKey} />

      <RecentJobs refreshKey={refreshKey} />
    </div>
  )
}

export default Dashboard
