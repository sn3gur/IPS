import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import TransactionHistory from '../components/TransactionHistory'
import TradeView from '../components/tradeview/TradingViewWidget'

function DashboardPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('chart') // 'chart' or 'marketData'

  // Handle search submission from the dashboard search bar
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const query = searchQuery.trim()
    if (!query) return
    navigate(`/search?q=${encodeURIComponent(query)}`)
  }

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === 'chart' ? 'marketData' : 'chart'))
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
            <button onClick={toggleViewMode} className="dashboard-switch-mode">
              {viewMode === 'chart' ? 'Show Market Data' : 'Show Trading Chart'}
            </button>
          </div>

          <div className="dashboard-widget">
            {viewMode === 'chart' ? (
              <TradeView />
            ) : (
              <div className="market-data-container">
                <h3 className="market-data-title">Macroeconomic Overview</h3>
                <ul className="market-data-list">
                  
                  {/* S&P 500 */}
                  <li className="market-data-item">
                    <span className="index-name">S&P 500</span>
                    <span className="index-value">5,204.34</span>
                    <span className="index-change positive">+1.02%</span>
                  </li>

                  {/* VIX */}
                  <li className="market-data-item">
                    <span className="index-name">VIX (Volatility)</span>
                    <span className="index-value">13.24</span>
                    <span className="index-change negative">-4.50%</span>
                  </li>

                  {/* US Unemployment */}
                  <li className="market-data-item">
                    <span className="index-name">US Unemployment Rate</span>
                    <span className="index-value">3.80%</span>
                    <span className="index-change neutral">0.00%</span>
                  </li>

                  {/* US 10-Year Bond */}
                  <li className="market-data-item">
                    <span className="index-name">US 10-Year Treasury</span>
                    <span className="index-value">4.35%</span>
                    <span className="index-change positive">+0.05%</span>
                  </li>

                  {/* EU 10-Year Bond */}
                  <li className="market-data-item">
                    <span className="index-name">EU 10-Year Bund</span>
                    <span className="index-value">2.45%</span>
                    <span className="index-change negative">-0.02%</span>
                  </li>

                </ul>
              </div>
            )}
          </div>
        </section>
        <TransactionHistory />
      </main>
    </div>
  )
}

export default DashboardPage