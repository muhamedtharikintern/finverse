import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity,
  ScrollView, ActivityIndicator,
} from 'react-native';
import StockDetails from './StockDetails';
import { styles } from './styles';
import { finnhubService } from './FinnhubService';
import { useUSStockPrice } from './useUSStockPrice';
import { useIndianStockPrice } from './useIndianStockPrice';
import { INDICES, INDIAN_HOLDINGS, US_HOLDINGS } from './watchlist';

// ─── Index Row (REST polling) ─────────────────────────────

function IndexRow({ item, isDarkMode, onPress }) {
  const quote = useIndianStockPrice(item.symbol);
  const surface  = isDarkMode ? '#111827' : '#ffffff';
  const textColor = isDarkMode ? '#fff' : '#0b1220';
  const cardBg   = isDarkMode ? '#1f2937' : '#f4f6f9';
  const isUp = (quote?.changePercent ?? 0) >= 0;

  return (
    <TouchableOpacity
      style={[styles.indexCard, {
        backgroundColor: surface,
        borderColor: isDarkMode ? '#222' : '#eef0f4',
      }]}
      onPress={() => quote && onPress({ ...item, ...quote })}
    >
      <View style={[styles.iconSquare, { backgroundColor: cardBg, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ fontSize: 10, color: '#3b82f6', fontWeight: '700' }}>
          {item.exchange}
        </Text>
      </View>

      <View style={styles.indexTextWrap}>
        <Text style={[styles.indexName, { color: textColor }]}>{item.name}</Text>
        <Text style={[styles.indexSub, { color: '#3b82f6' }]}>
          {quote ? `Open: ${quote.open?.toFixed(0)}` : 'Fetching...'}
        </Text>
      </View>

      {quote ? (
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={[styles.indexValue, { color: textColor }]}>
            {quote.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
          </Text>
          <Text style={{ color: isUp ? '#00C896' : '#FF4D4D', fontSize: 11 }}>
            {isUp ? '▲' : '▼'} {Math.abs(quote.changePercent).toFixed(2)}%
          </Text>
        </View>
      ) : (
        <ActivityIndicator size="small" color="#3b82f6" />
      )}
    </TouchableOpacity>
  );
}

// ─── Indian Holding Row (REST polling) ───────────────────

function IndianHoldingRow({ item, isDarkMode, onPress }) {
  const quote = useIndianStockPrice(item.symbol);
  const surface   = isDarkMode ? '#111827' : '#ffffff';
  const textColor = isDarkMode ? '#fff' : '#0b1220';
  const mutedColor = isDarkMode ? '#aeb4c1' : '#6b7280';
  const cardBg    = isDarkMode ? '#1f2937' : '#f4f6f9';
  const isUp = (quote?.changePercent ?? 0) >= 0;

  return (
    <TouchableOpacity
      style={[styles.holdingCard, {
        backgroundColor: surface,
        borderColor: isDarkMode ? '#222' : '#eef0f4',
      }]}
      onPress={() => quote && onPress({ ...item, ...quote })}
    >
      <View style={[styles.holdingIcon, { backgroundColor: cardBg, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ fontSize: 9, color: '#10b981', fontWeight: '700' }}>NSE</Text>
      </View>

      <View style={styles.holdingTextWrap}>
        <Text style={[styles.holdingName, { color: textColor }]}>{item.name}</Text>
        <Text style={[styles.holdingSub, { color: mutedColor }]}>{item.shares} shares</Text>
      </View>

      {quote ? (
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={[styles.holdingValue, { color: textColor }]}>
            ₹{quote.price.toFixed(2)}
          </Text>
          <Text style={{ color: isUp ? '#00C896' : '#FF4D4D', fontSize: 11 }}>
            {isUp ? '▲' : '▼'} {Math.abs(quote.changePercent).toFixed(2)}%
          </Text>
        </View>
      ) : (
        <ActivityIndicator size="small" color="#10b981" />
      )}
    </TouchableOpacity>
  );
}

// ─── US Holding Row (WebSocket) ──────────────────────────

function USHoldingRow({ item, isDarkMode, onPress }) {
  const quote = useUSStockPrice(item.symbol);
  const surface   = isDarkMode ? '#111827' : '#ffffff';
  const textColor = isDarkMode ? '#fff' : '#0b1220';
  const mutedColor = isDarkMode ? '#aeb4c1' : '#6b7280';
  const cardBg    = isDarkMode ? '#1f2937' : '#f4f6f9';
  const isUp = (quote?.changePercent ?? 0) >= 0;

  return (
    <TouchableOpacity
      style={[styles.holdingCard, {
        backgroundColor: surface,
        borderColor: isDarkMode ? '#222' : '#eef0f4',
      }]}
      onPress={() => quote && onPress({ ...item, ...quote })}
    >
      <View style={[styles.holdingIcon, { backgroundColor: cardBg, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ fontSize: 9, color: '#6C63FF', fontWeight: '700' }}>US</Text>
      </View>

      <View style={styles.holdingTextWrap}>
        <Text style={[styles.holdingName, { color: textColor }]}>{item.name}</Text>
        <Text style={[styles.holdingSub, { color: mutedColor }]}>{item.shares} shares</Text>
      </View>

      {quote ? (
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={[styles.holdingValue, { color: textColor }]}>
            ${quote.price.toFixed(2)}
          </Text>
          <Text style={{ color: isUp ? '#00C896' : '#FF4D4D', fontSize: 11 }}>
            {isUp ? '▲' : '▼'} {Math.abs(quote.changePercent).toFixed(2)}%
          </Text>
        </View>
      ) : (
        <ActivityIndicator size="small" color="#6C63FF" />
      )}
    </TouchableOpacity>
  );
}

// ─── Main Page ───────────────────────────────────────────

const HomePage = ({ isDarkMode }) => {
  const [showStockDetails, setShowStockDetails] = useState(null);
  const textColor = isDarkMode ? '#fff' : '#0b1220';

  useEffect(() => {
    finnhubService.connectWS();
    return () => finnhubService.disconnectAll();
  }, []);

  if (showStockDetails) {
    return (
      <StockDetails
        stock={showStockDetails}
        onBack={() => setShowStockDetails(null)}
      />
    );
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 100 }}>

      {/* ── Market Indices ── */}
      <View style={styles.sectionHeaderRow}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Market Indices</Text>
        <TouchableOpacity>
          <Text style={[styles.viewAll, { color: '#3b82f6' }]}>View All →</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardList}>
        {INDICES.map((item) => (
          <IndexRow
            key={item.symbol}
            item={item}
            isDarkMode={isDarkMode}
            onPress={setShowStockDetails}
          />
        ))}
      </View>

      {/* ── Indian Holdings ── */}
      <View style={styles.sectionHeaderRow}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>🇮🇳 Indian Holdings</Text>
        <TouchableOpacity>
          <Text style={[styles.viewAll, { color: '#3b82f6' }]}>View All →</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardList}>
        {INDIAN_HOLDINGS.map((item) => (
          <IndianHoldingRow
            key={item.symbol}
            item={item}
            isDarkMode={isDarkMode}
            onPress={setShowStockDetails}
          />
        ))}
      </View>

      {/* ── US Holdings ── */}
      <View style={styles.sectionHeaderRow}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>🇺🇸 US Holdings</Text>
        <TouchableOpacity>
          <Text style={[styles.viewAll, { color: '#3b82f6' }]}>View All →</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardList}>
        {US_HOLDINGS.map((item) => (
          <USHoldingRow
            key={item.symbol}
            item={item}
            isDarkMode={isDarkMode}
            onPress={setShowStockDetails}
          />
        ))}
      </View>

    </ScrollView>
  );
};

export default HomePage;