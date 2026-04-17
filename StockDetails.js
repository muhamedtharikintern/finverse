import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const StockDetails = ({ stock, onBack }) => {
  if (!stock) return null;
  
  const priceChangeColor = stock.change >= 0 ? '#4CAF50' : '#F44336';
  const changeIcon = stock.change >= 0 ? 'arrow-upward' : 'arrow-downward';
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.symbol}>{stock.symbol}</Text>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{stock.name}</Text>
          <Text style={styles.exchange}>{stock.exchange}</Text>
        </View>
      </View>
      
      <View style={styles.priceContainer}>
        <Text style={styles.currentPrice}>₹{stock.price.toFixed(2)}</Text>
        <View style={[styles.priceChangeContainer, { backgroundColor: priceChangeColor + '1A' }]}>
          <MaterialIcons name={changeIcon} size={14} color={priceChangeColor} />
          <Text style={[styles.priceChange, { color: priceChangeColor }]}>
            {stock.change >= 0 ? '+' : ''}{stock.change}%
          </Text>
        </View>
      </View>
      
      <View style={styles.timeFrameSelector}>
        {['1D', '1W', '1M', '3M', '1Y', '5Y', 'ALL'].map((timeFrame) => (
          <TouchableOpacity key={timeFrame} style={styles.timeFrameButton}>
            <Text style={styles.timeFrameText}>{timeFrame}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.chartPlaceholder}>
        <Text style={styles.chartPlaceholderText}>Price Chart</Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Open</Text>
          <Text style={styles.statValue}>₹{stock.open.toFixed(2)}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Previous Close</Text>
          <Text style={styles.statValue}>₹{stock.previousClose.toFixed(2)}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Day's Range</Text>
          <Text style={styles.statValue}>₹{stock.dayLow.toFixed(2)} - ₹{stock.dayHigh.toFixed(2)}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>52W Range</Text>
          <Text style={styles.statValue}>₹{stock.yearLow.toFixed(2)} - ₹{stock.yearHigh.toFixed(2)}</Text>
        </View>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.actionButton, styles.buyButton]}>
          <Text style={styles.buyButtonText}>Buy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.sellButton]}>
          <Text style={styles.sellButtonText}>Sell</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  symbol: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  nameContainer: {
    marginTop: 4,
  },
  name: {
    fontSize: 16,
    color: '#666',
  },
  exchange: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  currentPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    marginRight: 12,
  },
  priceChangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 6,
  },
  priceChange: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  timeFrameSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  timeFrameButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  timeFrameText: {
    fontSize: 14,
    color: '#666',
  },
  chartPlaceholder: {
    height: 200,
    margin: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartPlaceholderText: {
    color: '#999',
  },
  statsContainer: {
    padding: 20,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between'
  },
  actionButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyButton: {
    backgroundColor: '#4CAF50',
    marginRight: 8,
  },
  sellButton: {
    backgroundColor: '#F44336',
    marginLeft: 8,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  sellButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default StockDetails;