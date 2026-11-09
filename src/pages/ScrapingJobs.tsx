import { useEffect, useState } from 'react'
import { getScrapingJobs } from '../services/scrapingJobService'
import type { ScrapingJob } from '../types/scrapingJob'

function ScrapingJobs() {
  const [jobs, setJobs] = useState<ScrapingJob[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchJobs() {
      try {
        setIsLoading(true)
        setError(null)

        const data = await getScrapingJobs()
        setJobs(data)
      } catch (error) {
        console.error('Failed to fetch scraping jobs:', error)
        setError('Failed to load scraping jobs. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobs()
  }, [])

  function getStatusStyle(status: string) {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700'
      case 'running':
        return 'bg-blue-100 text-blue-700'
      case 'failed':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-slate-100 text-slate-600'
    }
  }

  function formatDate(date: string | null) {
    if (!date) return '--'

    return new Date(date).toLocaleString('en-KE', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Scraping Jobs
        </h1>

        <p className="mt-2 text-slate-500">
          Monitor and review scraping job executions.
        </p>
      </div>

      {isLoading && (
        <p className="text-slate-500">Loading scraping jobs...</p>
      )}

      {error && (
        <p className="rounded-lg bg-red-100 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {!isLoading && !error && (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr className="text-sm text-slate-500">
                <th className="px-6 py-4 font-medium">Job ID</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Created</th>
                <th className="px-6 py-4 font-medium">Started</th>
                <th className="px-6 py-4 font-medium">Completed</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job) => (
                <tr
                  key={job.id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-6 py-4 font-medium text-slate-800">
                    #{job.id}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(job.status)}`}
                    >
                      {job.status.toUpperCase()}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {formatDate(job.created_at)}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {formatDate(job.started_at)}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {formatDate(job.completed_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {jobs.length === 0 && (
            <p className="p-8 text-center text-sm text-slate-500">
              No scraping jobs found.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default ScrapingJobs