import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
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
    <div className="page debug">
      <Navbar variant="main" />

      <main className="page-content debug-blue">
        {/* Asset Search → form with input */}
        <form onSubmit={handleSearchSubmit} className="search-bar debug-green">
          <input
            type="text"
            placeholder="Asset Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {/* Dashboard with Switch Mode */}
        <section className="dashboard debug-green">
          <button>Switch mode</button>
          <TradeView />
        </section>

        {/* Transaction History */}
        <section className="transaction-history debug-green">
          Transaction History
        </section>
      </main>
    </div>
  )
}

export default DashboardPage