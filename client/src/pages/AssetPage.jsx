/**
 * VIEW: AssetPage
 * Displays detailed information about a specific financial asset.
 * Includes a live trading chart (TradingView) and simulated market data.
 * Allows users to mock trade (Buy/Sell) the asset.
 */
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import TradeView from '../components/tradeview/TradingViewWidget'
import { useState } from 'react' 

function AssetPage() {
  // Symbol comes from the URL: /asset/AAPL -> symbol = "AAPL"
  const { symbol } = useParams()

  // Mock stock data for visualization
  const mockData = {
    price: 215.42,
    change: +2.15,
    changePercent: +1.01,
    open: 212.30,
    high: 216.50,
    low: 211.80,
    volume: "52.4M",
    marketCap: "3.2T"
  }

  // State for quantity and feedback
  const [quantity, setQuantity] = useState(1)
  const [tradeMessage, setTradeMessage] = useState('')
  const [isTrading, setIsTrading] = useState(false)

  // Simulated trade execution
  const handleTrade = (action) => {
    if (quantity <= 0) return setTradeMessage('Please enter a valid quantity.')
    
    setIsTrading(true)
    setTradeMessage(`Processing ${action} order for ${quantity} shares of ${symbol}...`)

    // Fake API delay for the transaction
    setTimeout(() => {
        setIsTrading(false)
        setTradeMessage(`SUCCESS: ${action} ${quantity} ${symbol} @ $${mockData.price}`)        
        setTimeout(() => setTradeMessage(''), 4000)
    }, 1200)
  }

  return (
    <div className="asset-page">
      <Navbar variant="back" balance={100000} />

      <main className="asset-content">
        
        {/* Asset Title & Price Header */}
        <header className="asset-header">
          <div className="asset-header-info">
            <h2 className="asset-symbol">{symbol}</h2>
            <span className="asset-name-subtitle">Market Asset</span>
          </div>
          <div className="asset-header-price">
            <span className="current-price">${mockData.price.toFixed(2)}</span>
            <span className={`price-change ${mockData.change >= 0 ? 'up' : 'down'}`}>
                {mockData.change >= 0 ? '+' : ''}{mockData.change} ({mockData.changePercent}%)
            </span>
          </div>
        </header>

        {/* Live Chart Widget */}
        <section className="asset-chart-container">
          <TradeView symbol={symbol} />
        </section>

        {/* Trading Panel & Stats */}
        <div className="trade-panel">
          
          {/* Mock Market Statistics */}
          <section className="market-stats">
            <div className="stat-item">
                <label>Open</label>
                <span>${mockData.open}</span>
            </div>
            <div className="stat-item">
                <label>High</label>
                <span>${mockData.high}</span>
            </div>
            <div className="stat-item">
                <label>Low</label>
                <span>${mockData.low}</span>
            </div>
            <div className="stat-item">
                <label>Volume</label>
                <span>{mockData.volume}</span>
            </div>
          </section>

          {/* Trade Execution Controls */}
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
                <button 
                    className="btn-buy" 
                    onClick={() => handleTrade('BUY')} 
                    disabled={isTrading}
                >
                    Buy
                </button>
                <button 
                    className="btn-sell" 
                    onClick={() => handleTrade('SELL')} 
                    disabled={isTrading}
                >
                    Sell
                </button>
            </div>

            {tradeMessage && (
                <div className="trade-message">
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