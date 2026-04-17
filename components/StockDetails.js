import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, TextInput } from 'react-native';

const StockDetails = ({ onClose, stock }) => {
  const [selectedTab, setSelectedTab] = useState('Overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const timeframes = ['NSE', '1D', '1W', '1M', '1Y', 'ALL'];
  const tabs = ['Overview', 'News', 'Events', 'Payment'];

  const upcomingEvents = [
    {
      title: 'Tech Stock Surge Amidst New Product Launches',
      date: 'Jul 28, 2024',
      image: require('../assets/event1.png')
    },
    {
      title: 'Globalmarket',
      subtitle: 'Economic Conference',
      date: 'Aug 15, 2024',
      image: require('../assets/event2.png')
    }
  ];

  const pastEvents = [
    {
      title: 'InnovationTech',
      subtitle: 'Conference Announcement',
      date: 'Jun 15, 2024',
      image: require('../assets/event3.png')
    },
    {
      title: 'FinanceGrowth',
      subtitle: 'Investor Conference',
      date: 'May 22, 2024',
      image: require('../assets/event4.png')
    }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.stockInfo}>
          <Text style={styles.stockName}>{stock.name}</Text>
          <Text style={styles.stockPrice}>${stock.price.toLocaleString()}</Text>
          <Text style={styles.stockChange}>{stock.change}</Text>
        </View>
      </View>

      {/* Chart Timeframes */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeframeContainer}>
        {timeframes.map((time) => (
          <TouchableOpacity
            key={time}
            style={[
              styles.timeframeButton,
              selectedTimeframe === time && styles.selectedTimeframe
            ]}
            onPress={() => setSelectedTimeframe(time)}
          >
            <Text style={[
              styles.timeframeText,
              selectedTimeframe === time && styles.selectedTimeframeText
            ]}>{time}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Chart View */}
      <View style={styles.chartContainer}>
        {/* Placeholder for chart */}
      </View>

      {/* Buy/Sell Form */}
      <View style={styles.actionContainer}>
        <View style={styles.priceInputContainer}>
          <TextInput 
            style={styles.priceInput}
            keyboardType="numeric"
            placeholder="Enter amount"
            placeholderTextColor="#999"
          />
          <View style={styles.quickAmountButtons}>
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'].map((num) => (
              <TouchableOpacity key={num} style={styles.quickAmountButton}>
                <Text style={styles.quickAmountButtonText}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buttonText}>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sellButton}>
            <Text style={styles.buttonText}>Sell</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.selectedTab]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.selectedTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Events Section */}
      {selectedTab === 'Payment' && (
        <View style={styles.paymentContainer}>
          <Text style={styles.paymentTitle}>Select Payment Method</Text>
          <TouchableOpacity 
            style={[styles.paymentMethod, selectedPaymentMethod === 'UPI' && styles.selectedPaymentMethod]}
            onPress={() => setSelectedPaymentMethod('UPI')}
          >
            <Text style={styles.paymentMethodText}>UPI</Text>
            {selectedPaymentMethod === 'UPI' && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.paymentMethod, selectedPaymentMethod === 'NetBanking' && styles.selectedPaymentMethod]}
            onPress={() => setSelectedPaymentMethod('NetBanking')}
          >
            <Text style={styles.paymentMethodText}>Net Banking</Text>
            {selectedPaymentMethod === 'NetBanking' && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.paymentMethod, selectedPaymentMethod === 'DebitCard' && styles.selectedPaymentMethod]}
            onPress={() => setSelectedPaymentMethod('DebitCard')}
          >
            <Text style={styles.paymentMethodText}>Debit Card</Text>
            {selectedPaymentMethod === 'DebitCard' && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.payButton}>
            <Text style={styles.payButtonText}>Pay $5990</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {selectedTab === 'Events' && (
        <ScrollView style={styles.eventsContainer}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          {upcomingEvents.map((event, index) => (
            <View key={index} style={styles.eventCard}>
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                {event.subtitle && <Text style={styles.eventSubtitle}>{event.subtitle}</Text>}
                <Text style={styles.eventDate}>{event.date}</Text>
              </View>
              {/* Placeholder for event image */}
            </View>
          ))}

          <Text style={styles.sectionTitle}>Past Events</Text>
          {pastEvents.map((event, index) => (
            <View key={index} style={styles.eventCard}>
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                {event.subtitle && <Text style={styles.eventSubtitle}>{event.subtitle}</Text>}
                <Text style={styles.eventDate}>{event.date}</Text>
              </View>
              {/* Placeholder for event image */}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  priceInputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  priceInput: {
    width: '100%',
    height: 50,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 10,
  },
  quickAmountButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  quickAmountButton: {
    width: '30%',
    height: 50,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 8,
  },
  quickAmountButtonText: {
    fontSize: 20,
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginBottom: 15,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  stockInfo: {
    marginTop: 10,
  },
  stockName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  stockPrice: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  stockChange: {
    fontSize: 16,
    color: '#4CAF50',
  },
  timeframeContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  timeframeButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginRight: 10,
    borderRadius: 15,
  },
  selectedTimeframe: {
    backgroundColor: '#e3f2fd',
  },
  timeframeText: {
    color: '#666',
    fontSize: 14,
  },
  selectedTimeframeText: {
    color: '#2196F3',
    fontWeight: '600',
  },
  chartContainer: {
    height: 250,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  actionContainer: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
  },
  buyButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  sellButton: {
    flex: 1,
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2196F3',
  },
  tabText: {
    color: '#666',
    fontSize: 14,
  },
  selectedTabText: {
    color: '#2196F3',
    fontWeight: '600',
  },
  eventsContainer: {
    flex: 1,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    marginTop: 10,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  eventSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 12,
    color: '#999',
  },
  paymentContainer: {
    padding: 20,
  },
  paymentTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  selectedPaymentMethod: {
    borderColor: '#2196F3',
    backgroundColor: '#E3F2FD',
  },
  paymentMethodText: {
    fontSize: 16,
  },
  checkmark: {
    color: '#2196F3',
    fontSize: 18,
  },
  payButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default StockDetails;