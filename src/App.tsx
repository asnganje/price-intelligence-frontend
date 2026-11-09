
import { Routes, Route } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'

import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Retailers from './pages/Retailers'
import PriceHistory from './pages/PriceHistory'
import ScrapingJobs from './pages/ScrapingJobs'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/retailers" element={<Retailers />} />
        <Route path="/price-history" element={<PriceHistory />} />
        <Route path="/scraping-jobs" element={<ScrapingJobs />} />
      </Route>
    </Routes>
  )
}

export default App
