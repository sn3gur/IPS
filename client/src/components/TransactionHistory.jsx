/**
 * COMPONENT: TransactionHistory
 * Displays a list of recent stock trades (Buy/Sell).
 * Currently uses mock data for Assignment 3 demonstration.
 */
function TransactionHistory() {
  const mockTransactions = [
    { id: 1, type: 'BUY', symbol: 'AAPL', quantity: 10, price: 189.42, date: '2026-04-28' },
    { id: 2, type: 'SELL', symbol: 'TSLA', quantity: 5, price: 175.20, date: '2026-04-29' },
    { id: 3, type: 'BUY', symbol: 'MSFT', quantity: 2, price: 420.15, date: '2026-04-30' },
  ];

  return (
    <section className="transaction-history">
      <h2 className="transaction-history-title">Recent Activity</h2>
      
      <div className="transaction-list">
        {mockTransactions.length > 0 ? (
          mockTransactions.map((tx) => (
            <div key={tx.id} className="transaction-item">
              <div className="tx-type-badge" data-type={tx.type}>
                {tx.type}
              </div>
              <div className="tx-info">
                <span className="tx-symbol">{tx.symbol}</span>
                <span className="tx-date">{tx.date}</span>
              </div>
              <div className="tx-details">
                <span className="tx-quantity">{tx.quantity} shares</span>
                <span className="tx-price">@ ${tx.price.toFixed(2)}</span>
              </div>
              <div className="tx-total">
                ${(tx.quantity * tx.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
            </div>
          ))
        ) : (
          <p className="transaction-history-empty">
            No recent transactions found.
          </p>
        )}
      </div>
    </section>
  )
}

export default TransactionHistory