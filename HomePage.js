import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import StockDetails from './StockDetails';
import { styles } from './styles';

const HomePage = ({ isDarkMode }) => {
  const [showStockDetails, setShowStockDetails] = useState(null);

  const textColor = isDarkMode ? '#fff' : '#0b1220';
  const surface = isDarkMode ? '#111827' : '#ffffff';
  const cardBg = isDarkMode ? '#1f2937' : '#f4f6f9';
  const mutedColor = isDarkMode ? '#aeb4c1' : '#6b7280';

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
      {/* Market Indices */}
      <View style={styles.sectionHeaderRow}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Market Indices</Text>
        <TouchableOpacity>
          <Text style={[styles.viewAll, { color: '#3b82f6' }]}>View All →</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardList}>
        {[
          { name: 'NIFTY 50', value: '17,500', change: '+1.2%', symbol: 'NIFTY50', exchange: 'NSE', open: 17450, previousClose: 17400, dayLow: 17300, dayHigh: 17600, yearLow: 16500, yearHigh: 18000 },
          { name: 'Sensex', value: '59,000', change: '+0.8%', symbol: 'SENSEX', exchange: 'BSE', open: 58900, previousClose: 58800, dayLow: 58700, dayHigh: 59200, yearLow: 57000, yearHigh: 60000 },
        ].map((i) => (
          <TouchableOpacity
            key={i.name}
            style={[styles.indexCard, { backgroundColor: surface, borderColor: isDarkMode ? '#222' : '#eef0f4' }]}
            onPress={() => setShowStockDetails({ ...i, price: parseFloat(i.value.replace(',', '')) })}
          >
            <View style={[styles.iconSquare, { backgroundColor: cardBg }]} />
            <View style={styles.indexTextWrap}>
              <Text style={[styles.indexName, { color: textColor }]}>{i.name}</Text>
              <Text style={[styles.indexSub, { color: '#3b82f6' }]}>Current Value</Text>
            </View>
            <Text style={[styles.indexValue, { color: textColor }]}>{i.value}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Current Holdings */}
      <View style={styles.sectionHeaderRow}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Current Holdings</Text>
        <TouchableOpacity>
          <Text style={[styles.viewAll, { color: '#3b82f6' }]}>View All →</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardList}>
        {[
          { name: 'TechCorp Inc.', shares: 10, price: 1234.56, open: 1230.00, previousClose: 1225.50, dayLow: 1220.00, dayHigh: 1240.00, yearLow: 1000.00, yearHigh: 1500.00, change: 2.5, symbol: 'TECH', exchange: 'NSE' },
          { name: 'Global Energy Ltd.', shares: 5, price: 678.90, open: 685.00, previousClose: 684.20, dayLow: 675.00, dayHigh: 690.00, yearLow: 500.00, yearHigh: 800.00, change: -0.8, symbol: 'GEL', exchange: 'NSE' },
          { name: 'Health Solutions Co.', shares: 20, price: 3456.78, open: 3450.00, previousClose: 3445.00, dayLow: 3440.00, dayHigh: 3460.00, yearLow: 3000.00, yearHigh: 3800.00, change: 0.5, symbol: 'HSC', exchange: 'NSE' },
        ].map((h) => (
          <TouchableOpacity
            key={h.name}
            style={[styles.holdingCard, { backgroundColor: surface, borderColor: isDarkMode ? '#222' : '#eef0f4' }]}
            onPress={() => setShowStockDetails(h)}
          >
            <View style={[styles.holdingIcon, { backgroundColor: cardBg }]} />
            <View style={styles.holdingTextWrap}>
              <Text style={[styles.holdingName, { color: textColor }]}>{h.name}</Text>
              <Text style={[styles.holdingSub, { color: mutedColor }]}>{h.shares} shares</Text>
            </View>
            <Text style={[styles.holdingValue, { color: textColor }]}>₹{h.price.toFixed(2)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default HomePage;