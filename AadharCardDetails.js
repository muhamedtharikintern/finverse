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


const AadharCardDetails = ({ onAadharComplete, isDarkMode, onToggleDarkMode, baseUrl, authToken }) => {
  useScreenPrivacy();
  const [aadharBox1, setAadharBox1] = useState('');
  const [aadharBox2, setAadharBox2] = useState('');
  const [aadharBox3, setAadharBox3] = useState('');
  const [fullName, setFullName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  // Aadhar Card validation function
  const validateAadhar = (aadhar) => {
    const aadharRegex = /^[0-9]{12}$/;
    return aadharRegex.test(aadhar);
  };

  const handleSubmit = async () => {
    const fullAadharNumber = aadharBox1 + aadharBox2 + aadharBox3;

    if (!aadharBox1 || !aadharBox2 || !aadharBox3 || !fullName || !fatherName || !motherName || !dateOfBirth || !address) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!validateAadhar(fullAadharNumber)) {
      Alert.alert('Error', 'Please enter a valid 12-digit Aadhar number');
      return;
    }

    setIsValidating(true);

    try {
      if (!authToken || !baseUrl) {
        Alert.alert('Error', 'Authentication error. Please login again.');
        return;
      }

      const res = await fetch(`${baseUrl}/verification/aadhar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ number: fullAadharNumber, name: fullName, dob: dateOfBirth }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Failed to save Aadhar');

      Alert.alert('Success', 'Aadhar card details saved!', [
        { text: 'Continue', onPress: () => onAadharComplete() }
      ]);
    } catch (e) {
      Alert.alert('Error', e.message || 'Unable to save Aadhar details');
    } finally {
      setIsValidating(false);
    }
  };

  const handleAadharBox1 = (text) => {
    const formatted = text.replace(/[^0-9]/g, '').substring(0, 4);
    setAadharBox1(formatted);
  };

  const handleAadharBox2 = (text) => {
    const formatted = text.replace(/[^0-9]/g, '').substring(0, 4);
    setAadharBox2(formatted);
  };

  const handleAadharBox3 = (text) => {
    const formatted = text.replace(/[^0-9]/g, '').substring(0, 4);
    setAadharBox3(formatted);
  };

  const formatDateOfBirth = (text) => {
    // Format as DD/MM/YYYY
    const cleaned = text.replace(/[^0-9]/g, '');
    const formatted = cleaned.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    setDateOfBirth(formatted);
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

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Image
            source={require('./assets/icon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={[styles.title, isDarkMode && styles.titleDark]}>
            Aadhar Card Verification
          </Text>
          <Text style={[styles.subtitle, isDarkMode && styles.subtitleDark]}>
            Please provide your Aadhar card details for verification
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, isDarkMode && styles.inputLabelDark]}>
              Aadhar Number *
            </Text>
            <View style={styles.aadharContainer}>
              <TextInput
                style={[styles.aadharBox, isDarkMode && styles.aadharBoxDark]}
                placeholder="1234"
                placeholderTextColor={isDarkMode ? '#666' : '#999'}
                value={aadharBox1}
                onChangeText={handleAadharBox1}
                keyboardType="numeric"
                maxLength={4}
                textAlign="center"
              />
              <Text style={[styles.aadharSeparator, isDarkMode && styles.aadharSeparatorDark]}>-</Text>
              <TextInput
                style={[styles.aadharBox, isDarkMode && styles.aadharBoxDark]}
                placeholder="5678"
                placeholderTextColor={isDarkMode ? '#666' : '#999'}
                value={aadharBox2}
                onChangeText={handleAadharBox2}
                keyboardType="numeric"
                maxLength={4}
                textAlign="center"
              />
              <Text style={[styles.aadharSeparator, isDarkMode && styles.aadharSeparatorDark]}>-</Text>
              <TextInput
                style={[styles.aadharBox, isDarkMode && styles.aadharBoxDark]}
                placeholder="9012"
                placeholderTextColor={isDarkMode ? '#666' : '#999'}
                value={aadharBox3}
                onChangeText={handleAadharBox3}
                keyboardType="numeric"
                maxLength={4}
                textAlign="center"
              />
            </View>
            <Text style={[styles.helpText, isDarkMode && styles.helpTextDark]}>
              Enter 12-digit Aadhar number (4 digits in each box)
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, isDarkMode && styles.inputLabelDark]}>
              Full Name *
            </Text>
            <TextInput
              style={[styles.textInput, isDarkMode && styles.textInputDark]}
              placeholder="Enter your full name as per Aadhar card"
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
              Mother's Name *
            </Text>
            <TextInput
              style={[styles.textInput, isDarkMode && styles.textInputDark]}
              placeholder="Enter your mother's name"
              placeholderTextColor={isDarkMode ? '#666' : '#999'}
              value={motherName}
              onChangeText={setMotherName}
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
              onChangeText={formatDateOfBirth}
              keyboardType="numeric"
              maxLength={10}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, isDarkMode && styles.inputLabelDark]}>
              Address *
            </Text>
            <TextInput
              style={[styles.textInput, styles.addressInput, isDarkMode && styles.textInputDark]}
              placeholder="Enter your complete address as per Aadhar card"
              placeholderTextColor={isDarkMode ? '#666' : '#999'}
              value={address}
              onChangeText={setAddress}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity
            style={[styles.submitButton, isValidating && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={isValidating}
          >
            <Text style={styles.submitButtonText}>
              {isValidating ? 'Verifying...' : 'Verify Aadhar Card'}
            </Text>
          </TouchableOpacity>

          <View style={[styles.infoBox, isDarkMode && styles.infoBoxDark]}>
            <Text style={[styles.infoText, isDarkMode && styles.infoTextDark]}>
              🔒 Your Aadhar card details are secure and will be used only for verification purposes. We follow UIDAI guidelines for data protection.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 50,
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
  addressInput: {
    height: 80,
    paddingTop: 14,
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
  infoBoxDark: {
    backgroundColor: '#1a2332',
    borderLeftColor: '#2196F3',
  },
  infoTextDark: {
    color: '#ccc',
  },
  // Aadhar Box Styles
  aadharContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  aadharBox: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#f9f9f9',
    width: 80,
    height: 50,
  },
  aadharBoxDark: {
    backgroundColor: '#2a2a2a',
    borderColor: '#444',
    color: '#fff',
  },
  aadharSeparator: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
    marginHorizontal: 8,
  },
  aadharSeparatorDark: {
    color: '#999',
  },
});

export default AadharCardDetails;
