import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'

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

  // TODO: If the query is available -> API-Call to /api/stocks/:symbol
  //live filtering of mock stocks based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]) // Clear results if search bar is empty
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

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const query = searchQuery.trim()
    if (!query) return
    setSearchParams({ q: query })  // updated URL → useEffect feuert neu
    setHasSearched(true)
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
            placeholder="Search symbol or company"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '10px', fontSize: '1.1rem' }}
          />
          <button type="submit">Search</button>
        </form>

        <section className="search-results debug-green">
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