const express = require("express");
const axios = require("axios");

const router = express.Router();

// Search route for symbols and companies - MUST BE BEFORE /:symbol
router.get("/search/list", async (req, res) => {
  const query = req.query.q;
  const apiKey = process.env.FINNHUB_API_KEY;

  if (!query) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    const response = await axios.get("https://finnhub.io/api/v1/search", {
      params: {
        q: query,
        token: apiKey
      }
    });

    console.log("Finnhub search results count:", response.data?.count || 0);

    // Permit all results that have a symbol. 
    // We only exclude very obvious non-stock results if they exist.
    const results = (response.data.result || [])
      .filter(item => item.symbol)
      .map(item => ({
        symbol: item.symbol,
        name: item.description || item.displaySymbol || item.symbol,
        type: item.type
      }));

    res.json(results);
  } catch (error) {
    console.error("Finnhub search error:", error.message);
    res.status(500).json({ error: "Failed to search stocks" });
  }
});

// Individual stock quote route
router.get("/:symbol", async (req, res) => {
  let symbol = req.params.symbol.toUpperCase().trim();
  
  // CLEANUP: Finnhub quote API doesn't like exchange prefixes (e.g., NASDAQ:BABA)
  // If there's a colon, we take only the part after it.
  if (symbol.includes(':')) {
    symbol = symbol.split(':').pop();
  }
  
  const apiKey = process.env.FINNHUB_API_KEY;

  if (!symbol) {
    return res.status(400).json({ error: "Stock symbol is required" });
  }

  if (!apiKey) {
    return res.status(500).json({ error: "Finnhub API key is missing" });
  }

  try {
    const response = await axios.get("https://finnhub.io/api/v1/quote", {
      params: {
        symbol,
        token: apiKey
      }
    });

    const data = response.data;

    // Finnhub returns c=0 if symbol not found or no data
    if (!data || data.c === 0) {
      return res.status(404).json({ error: "Stock not found" });
    }

    res.json({
      symbol,
      price: data.c,
      high: data.h,
      low: data.l,
      open: data.o,
      previousClose: data.pc,
      change: data.d,
      changePercent: data.dp
    });

  } catch (error) {
    console.error("Finnhub API error:", error.message);

    if (error.response) {
      return res.status(error.response.status).json({
        error: "External API error",
        details: error.response.data
      });
    }

    return res.status(500).json({
      error: "Server error while fetching stock data"
    });
  }
});

module.exports = router;
