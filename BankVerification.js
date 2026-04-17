import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useScreenPrivacy } from './useScreenPrivacy';


const BankVerification = ({ onBankComplete, isDarkMode, onToggleDarkMode, baseUrl, authToken }) => {
  useScreenPrivacy();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const paymentMethods = [
    {
      id: 'googlepay',
      name: 'Google Pay',
      icon: '💳',
      color: '#4285F4',
      description: 'Link your bank account via Google Pay'
    },
    {
      id: 'paytm',
      name: 'Paytm',
      icon: '💰',
      color: '#00BAF2',
      description: 'Verify through Paytm wallet'
    },
    {
      id: 'phonepe',
      name: 'PhonePe',
      icon: '📱',
      color: '#5F259F',
      description: 'Connect your bank via PhonePe'
    }
  ];

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
  };

  const handleVerify = async () => {
    if (!selectedMethod) {
      Alert.alert('Error', 'Please select a payment method');
      return;
    }

    setIsVerifying(true);

    try {
      if (!authToken || !baseUrl) {
        Alert.alert('Error', 'Authentication error. Please login again.');
        return;
      }

      const res = await fetch(`${baseUrl}/verification/bank`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ accountNumber: '0000000000', ifsc: 'DEMO0000', holderName: selectedMethod.name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Failed to save bank');

      Alert.alert('Success', `${selectedMethod.name} verification recorded!`, [
        { text: 'Continue', onPress: () => onBankComplete() }
      ]);
    } catch (e) {
      Alert.alert('Error', e.message || 'Unable to save bank details');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>

      <View style={styles.header}>
        <Image
          source={require('./assets/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[styles.title, isDarkMode && styles.titleDark]}>
          Bank Verification
        </Text>
        <Text style={[styles.subtitle, isDarkMode && styles.subtitleDark]}>
          Choose your preferred payment method for bank verification
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={[styles.sectionTitle, isDarkMode && styles.sectionTitleDark]}>
          Select Payment Method
        </Text>

        <View style={styles.methodsContainer}>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.methodButton,
                selectedMethod?.id === method.id && styles.methodButtonSelected,
                isDarkMode && styles.methodButtonDark,
                selectedMethod?.id === method.id && isDarkMode && styles.methodButtonSelectedDark
              ]}
              onPress={() => handleMethodSelect(method)}
            >
              <View style={styles.methodIconContainer}>
                <Text style={styles.methodIcon}>{method.icon}</Text>
              </View>
              <View style={styles.methodInfo}>
                <Text style={[
                  styles.methodName,
                  isDarkMode && styles.methodNameDark,
                  selectedMethod?.id === method.id && styles.methodNameSelected
                ]}>
                  {method.name}
                </Text>
                <Text style={[
                  styles.methodDescription,
                  isDarkMode && styles.methodDescriptionDark
                ]}>
                  {method.description}
                </Text>
              </View>
              <View style={[
                styles.radioButton,
                selectedMethod?.id === method.id && styles.radioButtonSelected,
                isDarkMode && styles.radioButtonDark
              ]}>
                {selectedMethod?.id === method.id && (
                  <View style={[
                    styles.radioButtonInner,
                    isDarkMode && styles.radioButtonInnerDark
                  ]} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.verifyButton,
            (!selectedMethod || isVerifying) && styles.verifyButtonDisabled
          ]}
          onPress={handleVerify}
          disabled={!selectedMethod || isVerifying}
        >
          <Text style={styles.verifyButtonText}>
            {isVerifying ? 'Verifying...' : 'Verify Bank Account'}
          </Text>
        </TouchableOpacity>

        <View style={[styles.infoBox, isDarkMode && styles.infoBoxDark]}>
          <Text style={[styles.infoText, isDarkMode && styles.infoTextDark]}>
            🔒 Your bank details are secure and encrypted. We use industry-standard security protocols to protect your financial information.
          </Text>
        </View>
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
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  methodsContainer: {
    marginBottom: 30,
  },
  methodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  methodButtonSelected: {
    borderColor: '#2196F3',
    backgroundColor: '#f0f8ff',
  },
  methodButtonDark: {
    backgroundColor: '#2a2a2a',
    borderColor: '#444',
  },
  methodButtonSelectedDark: {
    borderColor: '#2196F3',
    backgroundColor: '#1a2332',
  },
  methodIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  methodIcon: {
    fontSize: 24,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  methodNameDark: {
    color: '#fff',
  },
  methodNameSelected: {
    color: '#2196F3',
  },
  methodDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  methodDescriptionDark: {
    color: '#ccc',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#2196F3',
  },
  radioButtonDark: {
    borderColor: '#666',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2196F3',
  },
  radioButtonInnerDark: {
    backgroundColor: '#2196F3',
  },
  verifyButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  verifyButtonDisabled: {
    backgroundColor: '#ccc',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#f0f8ff',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  // Dark Mode Toggle Styles
  darkModeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  darkModeButtonDark: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  darkModeIcon: {
    fontSize: 24,
  },
  darkModeIconDark: {
    fontSize: 24,
  },
  // Dark Mode Styles
  containerDark: {
    backgroundColor: '#1a1a1a',
  },
  titleDark: {
    color: '#fff',
  },
  subtitleDark: {
    color: '#ccc',
  },
  sectionTitleDark: {
    color: '#fff',
  },
  infoBoxDark: {
    backgroundColor: '#1a2332',
    borderLeftColor: '#2196F3',
  },
  infoTextDark: {
    color: '#ccc',
  },
});

export default BankVerification;
