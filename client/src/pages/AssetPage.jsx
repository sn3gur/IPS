import { useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import Navbar from '../components/Navbar'
import TradeView from '../components/tradeview/TradingViewWidget'
import { executeBuyOrder, executeSellOrder, getStockBySymbol } from '../api/stockApi'
import { AuthContext } from '../context/AuthContext'

function AssetPage() {
  const { symbol } = useParams()
  
  // NEW: Grab the balance updater from context
  const { updateBalance } = useContext(AuthContext)

  // State for UI and Trades
  const [tradeMessage, setTradeMessage] = useState('')
  const [isTrading, setIsTrading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [quantity, setQuantity] = useState(1)

  // NEW: State for the REAL stock data
  const [stockData, setStockData] = useState(null)
  const [isLoadingStock, setIsLoadingStock] = useState(true)

  // NEW: Fetch real stock data on load
  useEffect(() => {
    const fetchAssetData = async () => {
      try {
        const data = await getStockBySymbol(symbol)
        setStockData(data)
      } catch (error) {
        setTradeMessage("Failed to load real-time market data.")
        setIsError(true)
      } finally {
        setIsLoadingStock(false)
      }
    }
    fetchAssetData()
  }, [symbol])

  const handleTrade = async (action) => {
    if (quantity <= 0) return setTradeMessage('Please enter a valid quantity.')
    
    setIsTrading(true)
    setIsError(false)
    setTradeMessage(`Processing ${action} order for ${quantity} shares of ${symbol}...`)

    try {
        // Execute the correct API call
        const result = action === 'BUY' 
            ? await executeBuyOrder(symbol, quantity)
            : await executeSellOrder(symbol, quantity);

        // Success!
        setTradeMessage(result.message)
        
        // Update the Navbar balance
        if (result.newBalance) {
            const parsedBalance = parseFloat(result.newBalance.$numberDecimal || result.newBalance)
            updateBalance(parsedBalance)
        }

        setTimeout(() => setTradeMessage(''), 4000)
    } catch (error) {
        setIsError(true)
        const errorMsg = error.response?.data?.message || 'Trade failed. Please try again.'
        setTradeMessage(`Error: ${errorMsg}`)
    } finally {
        setIsTrading(false)
    }
  }

  // If still loading the Finnhub data, show a loading screen
  if (isLoadingStock) {
      return (
        <div className="asset-page">
            <Navbar variant="back" />
            <main className="asset-content"><p>Loading market data for {symbol}...</p></main>
        </div>
      )
  }

  return (
    <div className="asset-page">
      <Navbar variant="back" />

      <main className="asset-content">
        <header className="asset-header">
          <div className="asset-header-info">
            <h2 className="asset-symbol">{symbol}</h2>
            <span className="asset-name-subtitle">Market Asset</span>
          </div>
          <div className="asset-header-price">
            {/*Safely render the REAL data from Finnhub */}
            <span className="current-price">${stockData?.price?.toFixed(2) || '0.00'}</span>
            <span className={`price-change ${stockData?.change >= 0 ? 'up' : 'down'}`}>
                {stockData?.change >= 0 ? '+' : ''}{stockData?.change} ({stockData?.changePercent}%)
            </span>
          </div>
        </header>

        <section className="asset-chart-container">
          <TradeView symbol={symbol} />
        </section>

        <div className="trade-panel">
          <section className="market-stats">
            <div className="stat-item">
                <label>Open</label>
                <span>${stockData?.open || '--'}</span>
            </div>
            <div className="stat-item">
                <label>High</label>
                <span>${stockData?.high || '--'}</span>
            </div>
            <div className="stat-item">
                <label>Low</label>
                <span>${stockData?.low || '--'}</span>
            </div>
          </section>

          <section className="trade-controls">
            <div className="trade-input-group">
                <label>Quantity</label>
                <input 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(e.target.value)}
                    min="1"
                    disabled={isTrading}
                />
            </div>

            <div className="trade-buttons-group">
                <button className="btn-buy" onClick={() => handleTrade('BUY')} disabled={isTrading}>
                    Buy
                </button>
                <button className="btn-sell" onClick={() => handleTrade('SELL')} disabled={isTrading || quantity <= 0}>
                    Sell
                </button>
            </div>

            {tradeMessage && (
                <div className={`trade-message ${isError ? 'error' : 'success'}`}>
                    {tradeMessage}
                </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}

export default AssetPage