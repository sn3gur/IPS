import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import TransactionHistory from '../components/TransactionHistory'
import TradeView from '../components/tradeview/TradingViewWidget'

function DashboardPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const query = searchQuery.trim()
    if (!query) return
    navigate(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <div className="dashboard-page">
      <Navbar variant="main" />

      <main className="dashboard-content">
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="search-bar">
          <input
            type="text"
            placeholder="Search assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar-input"
          />
          <button type="submit" className="search-bar-button">
            Search
          </button>
        </form>

        {/* Dashboard Section */}
        <section className="dashboard-section">
          <div className="dashboard-section-header">
            <h2 className="dashboard-section-title">Dashboard</h2>
            <button className="dashboard-switch-mode">Switch mode</button>
          </div>

          <div className="dashboard-widget">
            <TradeView />
          </div>
        </section>

        {/* Transaction History — data integration pending */}
        <TransactionHistory />
      </main>
    </div>
  )
}

export default DashboardPage