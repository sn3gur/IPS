import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useState } from 'react' 

function AssetPage() {
  // Symbol comes from the URL: /asset/AAPL -> symbol = "AAPL"
  const { symbol } = useParams()

  // Mock state for trade feedback
  const [tradeMessage, setTradeMessage] = useState('')
  const [isTrading, setIsTrading] = useState(false)

  // Mock function to handle buy/sell actions
  const handleTrade = (action) => {
    setIsTrading(true)
    setTradeMessage(`Processing ${action} order for ${symbol}...`)

    // Fake API delay for the transaction
    setTimeout(() => {
        setIsTrading(false)
        setTradeMessage(`Successfully executed ${action} of ${symbol}!`)        
        setTimeout(() => setTradeMessage(''), 3000)
    }, 1000)
  }

  return (
    <div className="page debug">
      <Navbar variant="back" balance={100000} />

      <main className="page-content debug-blue">
        <h2 className="debug-green">{symbol}</h2>

        <section className="asset-details debug-green">
          Asset details (trading widget)
        </section>

        {tradeMessage && (
            <div className="trade-message-container">
                <p className="trade-message-text">{tradeMessage}</p>
            </div>
        )}

        <div className="trade-buttons">
          <button className="btn-buy" onClick={() => handleTrade('BUY')} disabled={isTrading}>
            Buy
          </button>
          <button className="btn-sell" onClick={() => handleTrade('SELL')} disabled={isTrading}>
            Sell
          </button>
        </div>
      </main>
    </div>
  )
}

export default AssetPage