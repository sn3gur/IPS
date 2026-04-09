const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/:symbol", async (req, res) => {
  const symbol = req.params.symbol.toUpperCase().trim();
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

    console.log("FINNHUB RESPONSE:", data);

    if (!data || data.c === 0) {
      return res.status(404).json({ error: "Stock not found" });
    }

    if (!data || data.c === 0) {
  return res.status(404).json({ error: "No stock data returned for this symbol" });
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