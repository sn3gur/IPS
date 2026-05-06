/**
 * COMPONENT: TransactionHistory
 * Displays a list of recent stock trades (Buy/Sell).
 * Currently uses mock data for Assignment 3 demonstration.
 */
import { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Ping your Express backend. 
        // Note: Change this URL if your actual Express route is named differently!
        const res = await apiClient.get('/api/trades/transactions'); 
        
        // Assuming your backend sends back an array of transactions in res.data
        setTransactions(res.data);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
        setError('Could not load recent activity.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []); // The empty array [] means "only run this once when the component mounts"

  if (isLoading) {
    return <section className="transaction-history"><p>Loading recent activity...</p></section>;
  }

  if (error) {
    return <section className="transaction-history"><p className="form-message">{error}</p></section>;
  }

  return (
    <section className="transaction-history">
      <h2 className="transaction-history-title">Recent Activity</h2>
      
      <div className="transaction-list">
        {transactions.length > 0 ? (
          transactions.map((tx) => (
            <div key={tx._id} className="transaction-item">
              <div className="tx-type-badge" data-type={tx.type}>
                {tx.type}
              </div>
              <div className="tx-info">
                <span className="tx-symbol">{tx.ticker}</span>
                <span className="tx-date">{new Date(tx.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="tx-details">
                <span className="tx-quantity">{tx.quantity} shares</span>
                <span className="tx-price">@ ${parseFloat(tx.executionPrice.$numberDecimal || tx.executionPrice).toFixed(2)}</span>
              </div>
              <div className="tx-total">
                ${(tx.quantity * parseFloat(tx.executionPrice.$numberDecimal || tx.executionPrice)).toLocaleString(undefined, { minimumFractionDigits: 2 })}
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