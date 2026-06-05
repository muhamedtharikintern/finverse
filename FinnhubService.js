const API_KEY = process.env.FINNHUB_KEY;
const WS_URL = `wss://ws.finnhub.io?token=${API_KEY}`;
const REST_BASE = `https://finnhub.io/api/v1`;

class FinnhubService {
  constructor() {
    // WebSocket (US stocks)
    this.ws = null;
    this.wsSubscribers = new Map();
    this.wsLastPrice = new Map();
    this.reconnectTimer = null;

    // REST polling (Indian stocks + indices)
    this.pollSubscribers = new Map();
    this.pollIntervals = new Map();
  }

  // ══════════════════════════════════════════
  //  WebSocket — US Stocks
  // ══════════════════════════════════════════

  connectWS() {
    if (this.ws) return;
    this.ws = new WebSocket(WS_URL);

    this.ws.onopen = () => {
      console.log('[Finnhub WS] ✅ Connected');
      this.wsSubscribers.forEach((_, sym) => this.wsSend('subscribe', sym));
    };

    this.ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === 'trade' && Array.isArray(msg.data)) {
          msg.data.forEach((trade) => {
            const prev = this.wsLastPrice.get(trade.s) ?? trade.p;
            const change = trade.p - prev;
            const changePercent = prev !== 0 ? (change / prev) * 100 : 0;

            const quote = {
              symbol: trade.s,
              price: trade.p,
              open: prev,
              high: trade.p,
              low: trade.p,
              prevClose: prev,
              change,
              changePercent,
              timestamp: trade.t,
            };

            this.wsLastPrice.set(trade.s, trade.p);
            this.wsSubscribers.get(trade.s)?.forEach((cb) => cb(quote));
          });
        }
      } catch (e) {
        console.error('[Finnhub WS] Parse error', e);
      }
    };

    this.ws.onerror = (e) => console.error('[Finnhub WS] Error', e);

    this.ws.onclose = () => {
      console.log('[Finnhub WS] Disconnected. Reconnecting in 3s...');
      this.ws = null;
      this.reconnectTimer = setTimeout(() => this.connectWS(), 3000);
    };
  }

  wsSend(type, symbol) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, symbol }));
    }
  }

  subscribeWS(symbol, callback) {
    this.connectWS();
    if (!this.wsSubscribers.has(symbol)) {
      this.wsSubscribers.set(symbol, new Set());
      this.wsSend('subscribe', symbol);
    }
    this.wsSubscribers.get(symbol).add(callback);
  }

  unsubscribeWS(symbol, callback) {
    const cbs = this.wsSubscribers.get(symbol);
    if (!cbs) return;
    cbs.delete(callback);
    if (cbs.size === 0) {
      this.wsSubscribers.delete(symbol);
      this.wsSend('unsubscribe', symbol);
    }
  }

  // ══════════════════════════════════════════
  //  REST Polling — Indian Stocks & Indices
  // ══════════════════════════════════════════

  async fetchQuote(symbol) {
    try {
      const res = await fetch(
        `${REST_BASE}/quote?symbol=${symbol}&token=${API_KEY}`
      );
      const data = await res.json();

      if (!data.c || data.c === 0) return null;

      const change = data.c - data.pc;
      const changePercent = data.pc !== 0 ? (change / data.pc) * 100 : 0;

      return {
        symbol,
        price: data.c,
        open: data.o,
        high: data.h,
        low: data.l,
        prevClose: data.pc,
        change,
        changePercent,
        timestamp: Date.now(),
      };
    } catch (e) {
      console.error(`[Finnhub REST] Error fetching ${symbol}`, e);
      return null;
    }
  }

  subscribePoll(symbol, callback, intervalMs = 15000) {
    if (!this.pollSubscribers.has(symbol)) {
      this.pollSubscribers.set(symbol, new Set());
    }
    this.pollSubscribers.get(symbol).add(callback);

    // Fetch immediately
    this.fetchQuote(symbol).then((q) => q && callback(q));

    // Then poll every intervalMs
    if (!this.pollIntervals.has(symbol)) {
      const id = setInterval(async () => {
        const q = await this.fetchQuote(symbol);
        if (q) {
          this.pollSubscribers.get(symbol)?.forEach((cb) => cb(q));
        }
      }, intervalMs);
      this.pollIntervals.set(symbol, id);
    }
  }

  unsubscribePoll(symbol, callback) {
    const cbs = this.pollSubscribers.get(symbol);
    if (!cbs) return;
    cbs.delete(callback);
    if (cbs.size === 0) {
      clearInterval(this.pollIntervals.get(symbol));
      this.pollIntervals.delete(symbol);
      this.pollSubscribers.delete(symbol);
    }
  }

  // ══════════════════════════════════════════
  //  Cleanup
  // ══════════════════════════════════════════

  disconnectAll() {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.ws?.close();
    this.ws = null;
    this.pollIntervals.forEach((id) => clearInterval(id));
    this.pollIntervals.clear();
    console.log('[Finnhub] All connections closed');
  }
}

export const finnhubService = new FinnhubService();