import { useEffect, useState, useRef } from 'react';
import { finnhubService } from './FinnhubService.js';

export function useUSStockPrice(symbol) {
  const [quote, setQuote] = useState(null);
  const prevRef = useRef(null);

  useEffect(() => {
    if (!symbol) return;

    const handler = (q) => {
      setQuote({ ...q, prevClose: prevRef.current ?? q.prevClose });
      prevRef.current = q.price;
    };

    finnhubService.subscribeWS(symbol, handler);
    return () => finnhubService.unsubscribeWS(symbol, handler);
  }, [symbol]);

  return quote;
}