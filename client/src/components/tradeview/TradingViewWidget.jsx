// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

/**
 * COMPONENT: TradingViewWidget
 * Embeds an advanced TradingView chart for a specific asset.
 * @param {string} symbol - The ticker symbol (e.g., AAPL)
 */
function TradingViewWidget({ symbol = 'AAPL' }) {
  const container = useRef();

  useEffect(
    () => {
      const widgetContainer = container.current;
      if (!widgetContainer) return;

      widgetContainer.replaceChildren();

      // Check if the symbol already has an exchange prefix
      const formattedSymbol = symbol.includes(':') ? symbol : `NASDAQ:${symbol}`;

      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "allow_symbol_change": true,
          "calendar": false,
          "details": false,
          "hide_side_toolbar": true,
          "hide_top_toolbar": false,
          "hide_legend": false,
          "hide_volume": false,
          "hotlist": false,
          "interval": "D",
          "locale": "en",
          "save_image": true,
          "style": "1",
          "symbol": "${formattedSymbol}",
          "theme": "dark",
          "timezone": "Etc/UTC",
          "gridColor": "rgba(242, 242, 242, 0.06)",
          "watchlist": [],
          "withdateranges": true,
          "compareSymbols": [],
          "studies": [],
          "autosize": true
        }`;
      widgetContainer.appendChild(script);

      return () => {
        widgetContainer.replaceChildren();
      };
    },
    [symbol]
  );

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}> </div>
  );
}

export default memo(TradingViewWidget);
