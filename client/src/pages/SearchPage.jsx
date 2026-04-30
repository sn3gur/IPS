import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'

function SearchPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  // Read query from URL (?q=AAPL)
  const initialQuery = searchParams.get('q') || ''
  const [searchQuery, setSearchQuery] = useState(initialQuery)

  // TODO: If the query is available -> API-Call to /api/stocks/:symbol
  useEffect(() => {
    if (initialQuery) {
      console.log('Searching for:', initialQuery)
      // here comes the API call later
    }
  }, [initialQuery])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const query = searchQuery.trim()
    if (!query) return
    setSearchParams({ q: query })  // updated URL → useEffect feuert neu
  }

  const handleResultClick = (symbol) => {
    navigate(`/asset/${symbol}`)
  }

  return (
    <div className="page debug">
      <Navbar variant="back" balance={100000} />

      <main className="page-content debug-blue">
        <form onSubmit={handleSearchSubmit} class="search">
          <input
            type="text"
            placeholder="Asset Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <section className="search-results debug-green">
          {/* example-result to test navigation */}
          <div onClick={() => handleResultClick('AAPL')}>
            AAPL — Apple Inc. (click to test)
          </div>
        </section>
      </main>
    </div>
  )
}

export default SearchPage