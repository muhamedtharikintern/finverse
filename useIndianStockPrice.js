import { useEffect, useState } from 'react';
import { finnhubService } from './FinnhubService.js';

export function useIndianStockPrice(symbol, intervalMs = 15000) {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    if (!symbol) return;
    finnhubService.subscribePoll(symbol, setQuote, intervalMs);
    return () => finnhubService.unsubscribePoll(symbol, setQuote);
  }, [symbol, intervalMs]);

  return quote;
}