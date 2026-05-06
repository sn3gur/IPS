import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { searchStocksByQuery } from '../api/stockApi'

function SearchPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  // Read query from URL (?q=AAPL)
  const initialQuery = searchParams.get('q') || ''
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // This function performs the actual search
  const performSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsLoading(true)
    setError('')
    try {
      const data = await searchStocksByQuery(query)
      setSearchResults(data)
    } catch (err) {
      console.error("Search failed:", err)
      setError('Failed to fetch results from the market.')
    } finally {
      setIsLoading(true) // Resetting to false below
      setIsLoading(false)
    }
  }

  // Trigger search when typing (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        performSearch(searchQuery)
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  // Handles search form submission (button click or Enter)
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const query = searchQuery.trim()
    if (!query) return
    setSearchParams({ q: query })
    performSearch(query) // Explicitly trigger on submit
  }

  // Navigates to the individual asset page
  const handleResultClick = (symbol) => {
    navigate(`/asset/${symbol}`)
  }

  return (
    <div className="search-page">
      <Navbar variant="back" />

      <main className="search-content">
        <form onSubmit={handleSearchSubmit} className="search-form-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search symbol or company (e.g. Apple)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">Search</button>
        </form>

        <section className="search-results-section">
          {searchQuery && (
            <h4 className="search-feedback">
              Showing results for: <strong>"{searchQuery}"</strong>
            </h4>
          )}

          <div className="results-list">
            {isLoading && <div className="search-loading">Searching market data...</div>}
            {error && <div className="search-error">{error}</div>}
            
            {!isLoading && searchResults.length > 0 ? (
              searchResults.map((stock) => (
                <div 
                  key={stock.symbol}
                  onClick={() => handleResultClick(stock.symbol)} 
                  className="result-item" 
                >
                  <strong className="result-symbol">{stock.symbol}</strong>
                  <span className="result-name">{stock.name}</span>
                </div>
              ))
            ) : (
              !isLoading && searchQuery && (
                <div className="no-results-message">
                  No matches found. Try "Apple" or "TSLA".
                </div>
              )
            )}
          </div>
          
        </section>
      </main>
    </div>
  )
}

export default SearchPage
