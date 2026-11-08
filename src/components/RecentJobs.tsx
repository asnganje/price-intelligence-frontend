const jobs = [
  {
    id: 4,
    status: 'Completed',
    createdAt: 'Nov 7, 2026',
  },
  {
    id: 3,
    status: 'Completed',
    createdAt: 'Nov 6, 2026',
  },
  {
    id: 2,
    status: 'Failed',
    createdAt: 'Nov 5, 2026',
  },
]

function RecentJobs() {
  return (
    <div className="mt-8 bg-white rounded-xl border border-slate-200 shadow-sm">

      <div className="p-6 border-b border-slate-200">
        <h2 className="text-lg font-bold text-slate-800">
          Recent Scraping Jobs
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Latest scraper executions
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">

          <thead className="bg-slate-50 text-slate-500 text-sm">
            <tr>
              <th className="px-6 py-4">Job ID</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Created At</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <tr
                key={job.id}
                className="border-t border-slate-100"
              >
                <td className="px-6 py-4 font-medium text-slate-700">
                  #{job.id}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${
                      job.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {job.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-slate-500">
                  {job.createdAt}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  )
}

export default RecentJobs