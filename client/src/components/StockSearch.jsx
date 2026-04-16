import React, { useState } from "react";
import { getStockBySymbol } from "../api/stockApi";
import '../App.css'

export default function StockSearch() {
  const [symbol, setSymbol] = useState("");
  const [stock, setStock] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!symbol.trim()) {
      setError("Please enter a stock symbol");
      setStock(null);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setStock(null);

      const data = await getStockBySymbol(symbol.trim());
      console.log("FRONTEND DATA:", data);

      setStock(data);
    } catch (err) {
      console.error("FRONTEND ERROR:", err);
      setError(err.response?.data?.error || "Could not fetch stock data");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div >
      <h1>Stock Search</h1>

      <input
        type="text"
        placeholder="Enter symbol, e.g. AAPL"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />

      <button onClick={handleSearch} >Search</button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {stock && (
        <div>
          <p><strong>Symbol:</strong> {stock.symbol}</p>
          <p><strong>Price:</strong> {stock.price}</p>
          <p><strong>Open:</strong> {stock.open}</p>
          <p><strong>High:</strong> {stock.high}</p>
          <p><strong>Low:</strong> {stock.low}</p>
          <p><strong>Previous Close:</strong> {stock.previousClose}</p>
          <p><strong>Change:</strong> {stock.change}</p>
          <p><strong>Change %:</strong> {stock.changePercent}</p>
        </div>
      )}
    </div>
  );
}