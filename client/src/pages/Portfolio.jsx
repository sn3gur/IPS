import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPortfolio } from '../api/stockApi'
import Navbar from '../components/Navbar'
import TransactionHistory from '../components/TransactionHistory'

function PortfolioPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [portfolio, setPortfolio] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const [viewMode, setViewMode] = useState('chart') // 'chart' or 'marketData'

  const formatMoney = (value) => {
  return Number(value || 0).toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}


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

  useEffect(() => {
  const fetchPortfolio = async () => {
    try {
      const data = await getPortfolio()
      setPortfolio(data)
    } catch (err) {
      setError('Could not load portfolio.')
    } finally {
      setIsLoading(false)
    }
  }

  fetchPortfolio()
}, [])


    return (
    <div className="portfolio-page">
      <Navbar variant="dash" />

      <main className="portfolio-content">
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
        
        <section className="portfolio-header">
  <div>
    <h1>My Portfolio</h1>
    <p>Track your investments and overall performance</p>
  </div>
</section>

{isLoading && <p>Loading portfolio...</p>}
{error && <p className="form-message">{error}</p>}

{portfolio && (
  <>
    <section className="portfolio-stats-grid">
      <div className="portfolio-stat-card">
        <span>Total Value</span>
        <strong>{formatMoney(portfolio.totalValue)}</strong>
        <small>Cash + stock value</small>
      </div>

      <div className="portfolio-stat-card">
        <span>Holdings Value</span>
        <strong>{formatMoney(portfolio.holdingsValue)}</strong>
        <small>Current stock value</small>
      </div>

      <div className="portfolio-stat-card">
        <span>Total Profit / Loss</span>
        <strong className={portfolio.totalProfitLoss >= 0 ? 'positive' : 'negative'}>
          {formatMoney(portfolio.totalProfitLoss)}
        </strong>
        <small>Overall return</small>
      </div>

      <div className="portfolio-stat-card">
        <span>Available Cash</span>
        <strong>{formatMoney(portfolio.availableCash)}</strong>
        <small>Buying power</small>
      </div>
    </section>

    <section className="portfolio-panel">
      <div className="portfolio-panel-header">
        <div>
          <h2>Holdings</h2>
          <p>{portfolio.stockCount} stocks owned</p>
        </div>
      </div>

      <div className="holdings-list">
        {portfolio.holdings.length > 0 ? (
          portfolio.holdings.map((stock) => (
            <div key={stock.ticker} className="holding-row">
              <div className="holding-main">
                <div className="holding-logo">{stock.ticker.charAt(0)}</div>

                <div>
                  <strong>{stock.ticker}</strong>
                  <span>{stock.shares} shares</span>
                </div>
              </div>

              <div className="holding-metric">
                <span>Buy Price</span>
                <strong>{formatMoney(stock.buyPrice)}</strong>
              </div>

              <div className="holding-metric">
                <span>Current</span>
                <strong>{formatMoney(stock.currentPrice)}</strong>
              </div>

              <div className="holding-metric">
                <span>Value</span>
                <strong>{formatMoney(stock.currentValue)}</strong>
              </div>

              <div className="holding-metric">
                <span>P/L</span>
                <strong className={stock.profitLoss >= 0 ? 'positive' : 'negative'}>
                  {formatMoney(stock.profitLoss)}
                </strong>
              </div>
            </div>
          ))
        ) : (
          <p className="portfolio-empty">No stocks owned yet.</p>
        )}
      </div>
    </section>
  </>
)}





        <TransactionHistory />
      </main>
    </div>

        )
}


export default PortfolioPage