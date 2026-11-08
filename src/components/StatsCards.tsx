const stats = [
  {
    title: 'Products Tracked',
    value: '--',
    description: 'Products in database',
  },
  {
    title: 'Retailers Monitored',
    value: '--',
    description: 'Active retailers',
  },
  {
    title: 'Lowest Available Price',
    value: '--',
    description: 'Across monitored retailers',
  },
  {
    title: 'Latest Scraping Job',
    value: '--',
    description: 'Most recent execution',
  },
]

function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
        >
          <h2 className="text-sm font-medium text-slate-500">
            {stat.title}
          </h2>

          <p className="text-2xl font-bold text-slate-800 mt-3">
            {stat.value}
          </p>

          <p className="text-xs text-slate-400 mt-2">
            {stat.description}
          </p>
        </div>
      ))}

    </div>
  )
}

export default StatsCards