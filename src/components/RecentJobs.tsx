
import { useEffect, useState } from 'react'

import { getScrapingJobs } from '../services/scrapingJobService'
import type { ScrapingJob } from '../types/scrapingJob'

interface RecentJobsProps {
  refreshKey: number
}

function RecentJobs({ refreshKey }: RecentJobsProps) {
  const [jobs, setJobs] = useState<ScrapingJob[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchJobs() {
      try {
        setIsLoading(true)

        const data = await getScrapingJobs()
        setJobs(data.slice(0, 5))
      } catch (error) {
        console.error('Failed to fetch recent jobs:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobs()
  }, [refreshKey])

  function getStatusStyles(status: string) {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-700'

      case 'running':
        return 'bg-blue-100 text-blue-700'

      case 'pending':
        return 'bg-yellow-100 text-yellow-700'

      case 'failed':
        return 'bg-red-100 text-red-700'

      default:
        return 'bg-slate-100 text-slate-600'
    }
  }

  return (
    <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-800">
          Recent Scraping Jobs
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Latest scraping job executions
        </p>
      </div>

      {isLoading ? (
        <p className="py-6 text-center text-sm text-slate-500">
          Loading scraping jobs...
        </p>
      ) : jobs.length === 0 ? (
        <p className="py-6 text-center text-sm text-slate-500">
          No scraping jobs found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 text-sm text-slate-500">
                <th className="px-4 py-3 font-medium">Job ID</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Created At</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job) => (
                <tr
                  key={job.id}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="px-4 py-4 text-sm font-semibold text-slate-800">
                    #{job.id}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyles(job.status)}`}
                    >
                      {job.status.toUpperCase()}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-600">
                    {new Date(job.created_at).toLocaleString('en-KE')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default RecentJobs
