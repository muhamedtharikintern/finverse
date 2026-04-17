import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useScreenPrivacy } from './useScreenPrivacy';


const KYCVerification = ({ onKYCComplete, isDarkMode, onToggleDarkMode, baseUrl, authToken }) => {
  useScreenPrivacy();
  const handleComplete = async () => {
    try {
      if (!authToken || !baseUrl) {
        Alert.alert('Error', 'Authentication error. Please login again.');
        return;
      }

      const res = await fetch(`${baseUrl}/verification/kyc/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.message || 'Failed to complete KYC');
      }

      Alert.alert('Success', 'KYC check-in recorded.', [
        { text: 'Continue', onPress: () => onKYCComplete && onKYCComplete() }
      ]);
    } catch (e) {
      Alert.alert('Error', e.message || 'Could not reach server.');
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
          KYC Check-in
        </Text>
        <Text style={[styles.subtitle, isDarkMode && styles.subtitleDark]}>
          No selfie required. Tap the button below to confirm your KYC check-in.
        </Text>
      </View>

      <View style={styles.content}>
        <View style={[styles.infoBox, isDarkMode && styles.infoBoxDark]}>
          <Text style={[styles.infoText, isDarkMode && styles.infoTextDark]}>
            ✅ This is a simple placeholder step. We will enable full KYC later.
          </Text>
        </View>

        <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
          <Text style={styles.completeButtonText}>Complete KYC</Text>
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
  completeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
  },
  completeButtonText: {
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
  containerDark: {
    backgroundColor: '#1a1a1a',
  },
  titleDark: {
    color: '#fff',
  },
  subtitleDark: {
    color: '#ccc',
  },
  infoBoxDark: {
    backgroundColor: '#1a2332',
    borderLeftColor: '#2196F3',
  },
  infoTextDark: {
    color: '#ccc',
  },
});

export default KYCVerification;
