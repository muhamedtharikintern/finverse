import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { API_URL } from './src/config';
import RazorpayCheckout from 'react-native-razorpay';

const BASE_URL = API_URL;

const { width } = Dimensions.get('window');

const stockStyles = StyleSheet.create({
  stockContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  stockHeader: {
    paddingVertical:16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#fff',
  },
  stockHeaderContent: {
    marginTop: 16,
  },
  stockSymbol: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 4,
  },
  stockName: {
    fontSize: 16,
    color: '#666',
    marginBottom: 2,
  },
  stockExchange: {
    fontSize: 14,
    color: '#999',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  priceContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  currentPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 4,
  },
  priceChangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  priceChange: {
    fontSize: 15,
    marginLeft: 4,
    fontWeight: '600',
  },
  timeFrameSelector: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  timeFrameButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginRight: 8,
  },
  timeFrameButtonActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  timeFrameText: {
    color: '#666',
    fontSize: 13,
    fontWeight: '600',
  },
  timeFrameTextActive: {
    color: '#fff',
  },
  chartContainer: {
    height: 250,
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 16,
  },
  chartPlaceholder: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartPlaceholderText: {
    color: '#64748b',
    fontSize: 14,
    fontWeight: '500',
  },
  statsContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 4,
  },
  statLabel: {
    color: '#666',
    fontSize: 14,
  },
  statValue: {
    color: '#111',
    fontSize: 14,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    marginHorizontal: 6,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  buyButton: {
    backgroundColor: '#4CAF50',
  },
  sellButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  bsHeaderContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bsStockSymbol: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },
  bsStockPrice: {
    fontSize: 12,
    color: '#6b7280',
  },
  bsStockChange: {
    color: '#10b981',
  },
  depthText: {
    color: '#6b7280',
    fontSize: 12,
  },
  toggleContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
    marginRight: 8,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  inputContainer: {
    padding: 16,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 14,
    color: '#3b82f6',
    width: 100,
  },
  inputWrapper: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    minWidth: 100,
    alignItems: 'center',
  },
  activeInput: {
    borderBottomColor: '#3b82f6',
    borderBottomWidth: 2,
  },
  inputValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  actionContainer: {
    padding: 16,
  },
  mainActionButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  mainActionButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 12,
    color: '#6b7280',
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#f9fafb',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  key: {
    width: '33.33%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  keyText: {
    fontSize: 24,
    color: '#111',
    fontWeight: '500',
  },
  paymentContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  paymentHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 4,
  },
  paymentSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  paymentMethodList: {
    padding: 16,
  },
  paymentMethodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  paymentMethodText: {
    fontSize: 16,
    color: '#111',
    fontWeight: '500',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#3b82f6',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3b82f6',
  },
  payButtonContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  payButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});



const timeFrames = ['1D', '1W', '1M', '3M', '1Y', 'All'];

const StockDetailsScreen = ({ route, navigation }) => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('1D');
  const { stock } = route?.params || {};
  const [paymentUrl, setPaymentUrl] = useState(null);

  // Buy/Sell/Payment state
  const [viewMode, setViewMode] = useState('details'); // 'details', 'buy', 'sell', 'payment'
  const [orderType, setOrderType] = useState('Delivery');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [activeInput, setActiveInput] = useState('quantity');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [selectedCard, setSelectedCard] = useState(null);
  const [password, setPassword] = useState('');

  const formatMarketCap = (value) => {
    if (!value) return '$0';
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return `$${Number(value).toLocaleString()}`;
  };

  const formatPrice = (value) => {
    if (value === undefined || value === null || value === '') return '$0.00';
    return `$${parseFloat(value).toFixed(2)}`;
  };

  const isPositiveChange = (stock?.change || 0) >= 0;

  const handleKeyPress = (key) => {
    if (key === 'backspace') {
      if (activeInput === 'quantity') {
        setQuantity((prev) => prev.slice(0, -1));
      } else {
        setPrice((prev) => prev.slice(0, -1));
      }
    } else if (key === '.') {
      if (activeInput === 'quantity') {
        if (!quantity.includes('.')) setQuantity((prev) => prev + key);
      } else {
        if (!price.includes('.')) setPrice((prev) => prev + key);
      }
    } else {
      if (activeInput === 'quantity') {
        setQuantity((prev) => prev + key);
      } else {
        setPrice((prev) => prev + key);
      }
    }
  };


const handlePayment = async () => {
  try {
    const res = await fetch(`${BASE_URL}/payment/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: parseInt(quantity || 1) * (stock?.price || 0),
        userId: "USER_ID"
      })
    });

    const data = await res.json();

    const options = {
      key: "rzp_test_SaVO2GMbwz0li0", // from dashboard
      amount: data.amount, // in paise
      currency: "INR",
      name: "My App",
      description: "Stock Purchase",
      order_id: data.id,
      prefill: {
        name: "User",
        email: "user@email.com",
        contact: "9999999999"
      },
      theme: { color: "#3399cc" }
    };

    RazorpayCheckout.open(options)
      .then((paymentData) => {
        console.log("Success:", paymentData);
        setViewMode('success');
      })
      .catch((error) => {
        console.log("Error:", error);
      });

  } catch (error) {
    console.log("Payment error:", error);
  }
};
const renderBuySellView = () => {
  const isBuy = viewMode === 'buy';
  const themeColor = isBuy ? '#10b981' : '#ef4444';

  return (
    <SafeAreaView style={stockStyles.stockContainer}>

      {/* 🔹 HEADER */}
      <View style={stockStyles.bsHeader}>
        <TouchableOpacity
          onPress={() => setViewMode('details')}
          style={stockStyles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>

        <View style={stockStyles.bsHeaderContent}>
          <View>
            <Text style={stockStyles.bsStockSymbol}>
              {stock?.symbol || 'N/A'}
            </Text>

            <Text style={stockStyles.bsStockPrice}>
              NSE {formatPrice(stock?.price || 0)}{' '}
              <Text
                style={[
                  stockStyles.bsStockChange,
                  { color: isPositiveChange ? '#10b981' : '#ef4444' }
                ]}
              >
                ({stock?.change || '0'}%)
              </Text>
            </Text>
          </View>

          <TouchableOpacity>
            <Text style={stockStyles.depthText}>Depth</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 🔹 MAIN CONTENT */}
      <View style={{ flex: 1 }}>

        {/* Toggle */}
        <View style={stockStyles.toggleContainer}>
          <TouchableOpacity
            style={[
              stockStyles.toggleButton,
              orderType === 'Delivery' && {
                backgroundColor: '#3b82f6',
                borderColor: '#3b82f6'
              }
            ]}
            onPress={() => setOrderType('Delivery')}
          >
            <Text
              style={[
                stockStyles.toggleText,
                orderType === 'Delivery' && { color: '#fff' }
              ]}
            >
              Delivery
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              stockStyles.toggleButton,
              orderType === 'Intraday' && {
                backgroundColor: '#3b82f6',
                borderColor: '#3b82f6'
              }
            ]}
            onPress={() => setOrderType('Intraday')}
          >
            <Text
              style={[
                stockStyles.toggleText,
                orderType === 'Intraday' && { color: '#fff' }
              ]}
            >
              Intraday
            </Text>
          </TouchableOpacity>
        </View>

        {/* Inputs + Button */}
        <View style={stockStyles.inputContainer}>

          {/* Quantity Input */}
          <View style={stockStyles.inputRow}>
            <Text style={stockStyles.inputLabel}>Qty NSE</Text>

            <TouchableOpacity
              style={[
                stockStyles.inputWrapper,
                activeInput === 'quantity' && stockStyles.activeInput
              ]}
              onPress={() => setActiveInput('quantity')}
            >
              <Text style={stockStyles.inputValue}>
                {quantity || '0'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Buy/Sell Button */}
          <View style={stockStyles.actionContainer}>
            <TouchableOpacity
              style={[
                stockStyles.mainActionButton,
                { backgroundColor: themeColor }
              ]}
              onPress={handlePayment}
            >
              <Text style={stockStyles.mainActionButtonText}>
                {isBuy ? 'Buy' : 'Sell'}
              </Text>
            </TouchableOpacity>

            {/* Footer Info */}
            <View style={stockStyles.footerInfo}>
              <Text style={stockStyles.footerText}>
                Balance: $12,345.67
              </Text>
              <Text style={stockStyles.footerText}>
                Margin(5.00x): 50
              </Text>
            </View>
          </View>

        </View>
      </View>

      {/* 🔥 FIXED KEYPAD */}
      <View style={stockStyles.keypad}>
        {['1','2','3','4','5','6','7','8','9','.','0'].map((k) => (
          <TouchableOpacity
            key={k}
            style={stockStyles.key}
            onPress={() => handleKeyPress(k)}
          >
            <Text style={stockStyles.keyText}>{k}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={stockStyles.key}
          onPress={() => handleKeyPress('backspace')}
        >
          <MaterialIcons name="backspace" size={24} color="#111" />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

  /* 
   * NEW: Mock data for cards
   */
  const savedCards = [
    { id: '1', bank: 'HDFC Bank', number: '**** 8845', type: 'Debit' },
    { id: '2', bank: 'SBI Bank', number: '**** 6932', type: 'Debit' },
    { id: '3', bank: 'ICICI Bank', number: '**** 4421', type: 'Credit' },
  ];


  const renderPaymentView = () => {
    return (
      <SafeAreaView style={stockStyles.paymentContainer}>
        <View style={stockStyles.paymentHeader}>
          <TouchableOpacity onPress={() => setViewMode('buy')} style={{ marginBottom: 16, alignSelf: 'flex-start' }}>
            <MaterialIcons name="arrow-back" size={24} color="#111" />
          </TouchableOpacity>
          <Text style={stockStyles.paymentTitle}>Confirm your order</Text>
          <Text style={stockStyles.paymentSubtitle}>Payment method</Text>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <View style={stockStyles.paymentMethodList}>
            {['UPI', 'Netbanking', 'Debit Card', 'Credit Card'].map((method) => (
              <TouchableOpacity key={method} style={stockStyles.paymentMethodItem} onPress={() => {
                setPaymentMethod(method);
                // Reset selected card if switching away from card methods, or keep it?
                // For now, let's just switch the method logic.
              }}>
                <Text style={stockStyles.paymentMethodText}>{method}</Text>
                <View style={[stockStyles.radioButton, paymentMethod === method && stockStyles.radioButtonSelected]}>
                  {paymentMethod === method && <View style={stockStyles.radioButtonInner} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Card Selection Section */}
          {(paymentMethod === 'Debit Card' || paymentMethod === 'Credit Card') && (
            <View style={{ padding: 16 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>Select Card</Text>
              {savedCards.map((card) => (
                <TouchableOpacity
                  key={card.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 12,
                    borderWidth: 1,
                    borderColor: selectedCard === card.id ? '#3b82f6' : '#e5e7eb',
                    borderRadius: 8,
                    marginBottom: 8,
                    backgroundColor: selectedCard === card.id ? '#eff6ff' : '#fff',
                  }}
                  onPress={() => setSelectedCard(card.id)}
                >
                  <MaterialIcons name="credit-card" size={24} color="#555" style={{ marginRight: 12 }} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, fontWeight: '600' }}>{card.bank}</Text>
                    <Text style={{ fontSize: 12, color: '#666' }}>{card.number}</Text>
                  </View>
                  {selectedCard === card.id && (
                    <MaterialIcons name="check-circle" size={20} color="#3b82f6" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Password Section */}
          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>Enter Password</Text>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#e5e7eb',
              borderRadius: 8,
              paddingHorizontal: 12,
              backgroundColor: '#f9fafb'
            }}>
              <MaterialIcons name="lock" size={20} color="#9ca3af" style={{ marginRight: 8 }} />
              <TextInput
                style={{ flex: 1, paddingVertical: 12, fontSize: 16 }}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>

        </ScrollView>

        <View style={stockStyles.payButtonContainer}>
          <TouchableOpacity
            style={[
              stockStyles.payButton,
              // Disable if password empty or (if card method) no card selected
              (!password || ((paymentMethod === 'Debit Card' || paymentMethod === 'Credit Card') && !selectedCard)) && { backgroundColor: '#9ca3af' }
            ]}
            disabled={!password || ((paymentMethod === 'Debit Card' || paymentMethod === 'Credit Card') && !selectedCard)}
            onPress={handlePayment}
          >
            <Text style={stockStyles.payButtonText}>Pay $550</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  const renderSuccessView = () => {
    return (
      <SafeAreaView style={[stockStyles.stockContainer, { justifyContent: 'center', alignItems: 'center', padding: 32 }]}>
        <View style={{ alignItems: 'center', marginBottom: 32 }}>
          <MaterialIcons name="check-circle" size={80} color="#10b981" />
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#111', marginTop: 16, textAlign: 'center' }}>
            Order Placed Successfully!
          </Text>
          <Text style={{ fontSize: 16, color: '#6b7280', marginTop: 8, textAlign: 'center' }}>
            You have purchased {quantity || '0'} shares of {stock?.symbol || 'N/A'}.
          </Text>
        </View>

        <TouchableOpacity
          style={[stockStyles.payButton, { width: '100%' }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={stockStyles.payButtonText}>Done</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginTop: 16, padding: 8 }}
          onPress={() => setViewMode('email')}
        >
          <Text style={{ color: '#3b82f6', fontSize: 16, fontWeight: '500' }}>View Confirmation Email</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  const renderEmailView = () => {
    return (
      <SafeAreaView style={stockStyles.stockContainer}>
        <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#f3f4f6', flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => setViewMode('success')} style={{ marginRight: 16 }}>
            <MaterialIcons name="arrow-back" size={24} color="#111" />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Message</Text>
        </View>
        <ScrollView style={{ padding: 16 }}>
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 8, color: '#111' }}>Order Confirmation: {stock?.symbol}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#3b82f6', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>F</Text>
              </View>
              <View>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#111' }}>Finverse</Text>
                <Text style={{ fontSize: 14, color: '#666' }}>noreply@finverse.com</Text>
              </View>
            </View>
            <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }}>To: me</Text>
          </View>

          <View style={{ borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 24 }}>
            <Text style={{ fontSize: 16, color: '#333', lineHeight: 24, marginBottom: 16 }}>
              Dear User,
            </Text>
            <Text style={{ fontSize: 16, color: '#333', lineHeight: 24, marginBottom: 16 }}>
              Thank you for your order. We are pleased to confirm that your purchase of <Text style={{ fontWeight: 'bold' }}>{quantity} shares</Text> of <Text style={{ fontWeight: 'bold' }}>{stock?.name || stock?.symbol}</Text> has been successfully processed.
            </Text>

            <View style={{ backgroundColor: '#f9fafb', padding: 16, borderRadius: 8, marginBottom: 16 }}>
              <Text style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>Order Details:</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text style={{ fontWeight: '600' }}>Stock:</Text>
                <Text>{stock?.symbol}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text style={{ fontWeight: '600' }}>Quantity:</Text>
                <Text>{quantity}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text style={{ fontWeight: '600' }}>Price:</Text>
                <Text>{stock?.price ? formatPrice(stock?.price) : '$0.00'}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#e5e7eb' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Total:</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{stock?.price ? formatPrice(stock.price * (parseInt(quantity) || 0)) : '$0.00'}</Text>
              </View>
            </View>

            <Text style={{ fontSize: 16, color: '#333', lineHeight: 24 }}>
              Your portfolio has been updated accordingly.
            </Text>
            <Text style={{ fontSize: 16, color: '#333', lineHeight: 24, marginTop: 24 }}>
              Best regards,{'\n'}The Finverse Team
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  if (paymentUrl) {
  return (
    <WebView
      source={{ uri: paymentUrl }}
      style={{ flex: 1 }}
      onNavigationStateChange={(navState) => {
        if (navState.url.includes("success")) {
          setViewMode('success');
          setPaymentUrl(null);
        }
      }}
    />
  );
}

  if (viewMode === 'buy' || viewMode === 'sell') {
    return renderBuySellView();
  }

  if (viewMode === 'payment') {
    return renderPaymentView();
  }

  if (viewMode === 'success') {
    return renderSuccessView();
  }

  if (viewMode === 'email') {
    return renderEmailView();
  }

  // Default Details View
  return (
    <SafeAreaView style={stockStyles.stockContainer}>
      <View style={stockStyles.stockHeader}>
        <TouchableOpacity style={stockStyles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
        <View style={stockStyles.stockHeaderContent}>
          <Text style={stockStyles.stockSymbol}>{stock?.symbol || 'N/A'}</Text>
          <Text style={stockStyles.stockName}>{stock?.name || 'Unknown Stock'}</Text>
          <Text style={stockStyles.stockExchange}>{stock?.exchange || 'NYSE'}</Text>
        </View>
      </View>

      <ScrollView>
        <View style={stockStyles.priceContainer}>
          <Text style={stockStyles.currentPrice}>{formatPrice(stock?.price)}</Text>
          <View
            style={[
              stockStyles.priceChangeContainer,
              { backgroundColor: isPositiveChange ? '#e6f4ea' : '#fce8e8' },
            ]}
          >
            <MaterialIcons name={isPositiveChange ? 'arrow-upward' : 'arrow-downward'} size={16} color={isPositiveChange ? '#4CAF50' : '#F44336'} />
            <Text style={[stockStyles.priceChange, { color: isPositiveChange ? '#4CAF50' : '#F44336' }]}>
              {isPositiveChange ? '+' : ''}{stock?.change || 0}%
            </Text>
          </View>
        </View>

        <View style={stockStyles.timeFrameSelector}>
          {timeFrames.map((frame) => (
            <TouchableOpacity
              key={frame}
              style={[stockStyles.timeFrameButton, selectedTimeFrame === frame && stockStyles.timeFrameButtonActive]}
              onPress={() => setSelectedTimeFrame(frame)}
            >
              <Text style={[stockStyles.timeFrameText, selectedTimeFrame === frame && stockStyles.timeFrameTextActive]}>{frame}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={stockStyles.chartContainer}>
          <View style={stockStyles.chartPlaceholder}>
            <MaterialIcons name="show-chart" size={24} color="#64748b" />
            <Text style={stockStyles.chartPlaceholderText}>Chart coming soon</Text>
          </View>
        </View>

        <View style={stockStyles.statsContainer}>
          <View style={stockStyles.statItem}>
            <Text style={stockStyles.statLabel}>Open</Text>
            <Text style={stockStyles.statValue}>{formatPrice(stock?.open)}</Text>
          </View>
          <View style={stockStyles.statItem}>
            <Text style={stockStyles.statLabel}>High</Text>
            <Text style={stockStyles.statValue}>{formatPrice(stock?.high)}</Text>
          </View>
          <View style={stockStyles.statItem}>
            <Text style={stockStyles.statLabel}>Low</Text>
            <Text style={stockStyles.statValue}>{formatPrice(stock?.low)}</Text>
          </View>
          <View style={stockStyles.statItem}>
            <Text style={stockStyles.statLabel}>52 Week High</Text>
            <Text style={stockStyles.statValue}>{formatPrice(stock?.yearHigh)}</Text>
          </View>
          <View style={stockStyles.statItem}>
            <Text style={stockStyles.statLabel}>52 Week Low</Text>
            <Text style={stockStyles.statValue}>{formatPrice(stock?.yearLow)}</Text>
          </View>
          <View style={stockStyles.statItem}>
            <Text style={stockStyles.statLabel}>Market Cap</Text>
            <Text style={stockStyles.statValue}>{formatMarketCap(stock?.marketCap)}</Text>
          </View>
        </View>
      </ScrollView>
        <View style={stockStyles.actionButtons}>
          <TouchableOpacity style={[stockStyles.actionButton, stockStyles.buyButton]} onPress={() => setViewMode('buy')}>
            <Text style={stockStyles.buttonText}>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[stockStyles.actionButton, stockStyles.sellButton]} onPress={() => setViewMode('sell')}>
            <Text style={stockStyles.buttonText}>Sell</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

export default StockDetailsScreen;