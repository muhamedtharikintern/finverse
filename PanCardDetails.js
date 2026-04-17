import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';
import { useScreenPrivacy } from './useScreenPrivacy';
import { API_URL } from './src/config';


const PanCardDetails = ({ onPanComplete, isDarkMode, onToggleDarkMode, baseUrl, authToken, setDisplayName }) => {
  useScreenPrivacy();
  const [panNumber, setPanNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const BASE_URL = API_URL;

  // PAN Card validation function
  const validatePAN = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const handleSubmit = async () => {
    if (!panNumber || !fullName || !fatherName || !dateOfBirth) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!validatePAN(panNumber)) {
      Alert.alert('Error', 'Please enter a valid PAN number (Format: ABCDE1234F)');
      return;
    }

    setIsValidating(true);

    try {
      if (!authToken || !BASE_URL) {
        Alert.alert('Error', 'Authentication error. Please login again.');
        return;
      }

      const res = await fetch(`${BASE_URL}/verification/pan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ number: panNumber, name: fullName, dob: dateOfBirth }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Failed to save PAN');
      if (data?.pan?.name && setDisplayName) setDisplayName(data.pan.name);

      Alert.alert('Success', 'PAN card details saved!', [
        { text: 'Continue', onPress: () => onPanComplete() }
      ]);
    } catch (e) {
      Alert.alert('Error', e.message || 'Unable to save PAN details');
    } finally {
      setIsValidating(false);
    }
  };

  const formatPAN = (text) => {
    // Convert to uppercase and limit to 10 characters
    const formatted = text.toUpperCase().replace(/[^A-Z0-9]/g, '').substring(0, 10);
    setPanNumber(formatted);
  };

  return (
    <KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
>
   <ScrollView
    contentContainerStyle={{ flexGrow: 1 }}
    keyboardShouldPersistTaps="handled"
  >
    <View style={[styles.container, isDarkMode && styles.containerDark]}>

      <View style={styles.header}>
        <Image
          source={require('./assets/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[styles.title, isDarkMode && styles.titleDark]}>
          PAN Card Verification
        </Text>
        <Text style={[styles.subtitle, isDarkMode && styles.subtitleDark]}>
          Please provide your PAN card details for verification
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={[styles.inputLabel, isDarkMode && styles.inputLabelDark]}>
            PAN Number *
          </Text>
          <TextInput
            style={[styles.textInput, isDarkMode && styles.textInputDark]}
            placeholder="ABCDE1234F"
            placeholderTextColor={isDarkMode ? '#666' : '#999'}
            value={panNumber}
            onChangeText={formatPAN}
            maxLength={10}
            autoCapitalize="characters"
          />
          <Text style={[styles.helpText, isDarkMode && styles.helpTextDark]}>
            Format: 5 letters + 4 numbers + 1 letter
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.inputLabel, isDarkMode && styles.inputLabelDark]}>
            Full Name *
          </Text>
          <TextInput
            style={[styles.textInput, isDarkMode && styles.textInputDark]}
            placeholder="Enter your full name as per PAN card"
            placeholderTextColor={isDarkMode ? '#666' : '#999'}
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.inputLabel, isDarkMode && styles.inputLabelDark]}>
            Father's Name *
          </Text>
          <TextInput
            style={[styles.textInput, isDarkMode && styles.textInputDark]}
            placeholder="Enter your father's name"
            placeholderTextColor={isDarkMode ? '#666' : '#999'}
            value={fatherName}
            onChangeText={setFatherName}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.inputLabel, isDarkMode && styles.inputLabelDark]}>
            Date of Birth *
          </Text>
          <TextInput
            style={[styles.textInput, isDarkMode && styles.textInputDark]}
            placeholder="DD/MM/YYYY"
            placeholderTextColor={isDarkMode ? '#666' : '#999'}
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
            keyboardType="numeric"
            maxLength={10}
          />
        </View>

        <TouchableOpacity
          style={[styles.submitButton, isValidating && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isValidating}
        >
          <Text style={styles.submitButtonText}>
            {isValidating ? 'Verifying...' : 'Verify PAN Card'}
          </Text>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={[styles.infoText, isDarkMode && styles.infoTextDark]}>
            🔒 Your PAN card details are secure and will be used only for verification purposes.
          </Text>
        </View>
      </View>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
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
  form: {
    flex: 1,
    paddingTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  helpText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontStyle: 'italic',
  },
  submitButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 20,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
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
  inputLabelDark: {
    color: '#fff',
  },
  textInputDark: {
    backgroundColor: '#2a2a2a',
    borderColor: '#444',
    color: '#fff',
  },
  helpTextDark: {
    color: '#999',
  },
  infoBox: {
    backgroundColor: '#1a2332',
    borderLeftColor: '#2196F3',
  },
  infoTextDark: {
    color: '#ccc',
  },
});

export default PanCardDetails;
