/**
 * VIEW: SearchPage
 * Represents the search functionality of the IPS application.
 * Users can search for stock symbols or company names.
 * Currently uses mock data as per Assignment 3 requirements.
 */
import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'

// Mock data for demonstration purposes
const MOCK_STOCKS = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'META', name: 'Meta Platforms Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation' },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway' },
  { symbol: 'V', name: 'Visa Inc.' },
  { symbol: 'JNJ', name: 'Johnson & Johnson' }
]

function SearchPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  // Read query from URL (?q=AAPL)
  const initialQuery = searchParams.get('q') || ''
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [hasSearched, setHasSearched] = useState(!!initialQuery)

  const [searchResults, setSearchResults] = useState([])

  // Live filtering of mock stocks based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]) 
      return
    }
    const query = searchQuery.toLowerCase()
    // Filter MOCK_STOCKS by symbol or name matching the query
    const filtered = MOCK_STOCKS.filter(stock =>
      stock.symbol.toLowerCase().includes(query) ||
      stock.name.toLowerCase().includes(query)
    )
    setSearchResults(filtered)
  }, [searchQuery])

  // Handles search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const query = searchQuery.trim()
    if (!query) return
    setSearchParams({ q: query })  
    setHasSearched(true)
  }

  // Navigates to the individual asset page
  const handleResultClick = (symbol) => {
    navigate(`/asset/${symbol}`)
  }

  return (
    <div className="search-page">
      <Navbar variant="back" balance={100000} />

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
         {hasSearched && (
            <h4 className="search-feedback">
              Showing results for: <strong>"{searchQuery}"</strong>
            </h4>
          )}

          <div className="results-list">
            {searchResults.length > 0 ? (
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
              searchQuery && (
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