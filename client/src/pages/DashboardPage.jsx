import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../styles/main.scss'

function DashboardPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const query = searchQuery.trim()
    if (!query) return  // ignore empty search
    navigate(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <div className="page debug">
      <Navbar variant="main" />

      <main className="page-content debug-blue">
        {/* Asset Search -> Form with input*/}
        <form onSubmit={handleSearchSubmit} className="search">
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
          <div>Dashboard (TradingView Widget )</div>
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