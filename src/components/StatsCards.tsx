import { getProducts } from '../services/productService'
import { useEffect, useState } from 'react'
import { getPriceComparison } from '../services/priceComparisonService'
// import { getScrapingJobs } from '../services/scrapingJobService'
// import type { ScrapingJob } from '../types/scrapingJob'

interface StatsCardsProps {
  refreshKey: number
}

function StatsCards({ refreshKey }: StatsCardsProps) {
  const [averagePrice, setAveragePrice] = useState<string | null>(null)
  const [lowestPrice, setLowestPrice] = useState<string | null>(null)
  // const [highestPrice, setHighestPrice] = useState<string | null>(null)
  const [retailerCount, setRetailerCount] = useState<number | null>(null)
  // const [latestJob, setLatestJob] = useState<ScrapingJob | null>(null)
  const [productCount, setProductCount] = useState<number | null>(null)

  useEffect(() => {
    async function fetchAveragePrice() {
      try {
        const data = await getPriceComparison(1)

        setAveragePrice(data.price_statistics.average_price)
        setLowestPrice(data.price_statistics.lowest_price)
        // setHighestPrice(data.price_statistics.highest_price)
        setRetailerCount(data.price_statistics.retailer_count)
      } catch (error) {
        console.error('Failed to fetch average price:', error)
      }
    }

    async function fetchLatestJob() {
      try {
        // const jobs = await getScrapingJobs()

        // setLatestJob(jobs.length > 0 ? jobs[0] : null)

      } catch (error) {
        console.error('Failed to fetch latest scraping job:', error)
      }
    }

    async function fetchProducts() {
        try {
          const products = await getProducts()

          const activeProducts = products.filter(
            (product) => product.is_active
          )

          setProductCount(activeProducts.length)

        } catch (error) {
          console.error('Failed to fetch products:', error)
        }
      }


    fetchAveragePrice()
    fetchLatestJob()
    fetchProducts()
  }, [refreshKey])

  const stats = [
    {
      title: 'Products Tracked',
      value: productCount !== null ? String(productCount) : '--',
      description: 'Active products in database',
    },
    {
      title: 'Retailers Compared',
      value: retailerCount !== null ? String(retailerCount) : '--',
      description: 'Retailers with product listings',
    },
    {
      title: 'Average Price',
      value: averagePrice
        ? `KSh ${Number(averagePrice).toLocaleString('en-KE')}`
        : '--',
      description: 'Across monitored retailers',
    },
    {
    title: 'Lowest Price',
    value: lowestPrice
      ? `KSh ${Number(lowestPrice).toLocaleString('en-KE')}`
      : '--',
    description: 'Lowest price across retailers',
    },
    // {
    //   title: 'Highest Price',
    //   value: highestPrice
    //     ? `KSh ${Number(highestPrice).toLocaleString('en-KE')}`
    //     : '--',
    //   description: 'Highest price across retailers',
    // },
    // {
    //   title: 'Latest Scraping Job',
    //   value: latestJob
    //     ? `#${latestJob.id} - ${latestJob.status}`
    //     : '--',
    //   description: latestJob
    //     ? new Date(latestJob.created_at).toLocaleString('en-KE')
    //     : 'Most recent execution',
    // },
  ]

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
