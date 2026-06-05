import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Modal,
  FlatList,
  KeyboardAvoidingView,  // ← add this
  Platform, 
} from 'react-native';
import { useScreenPrivacy } from './useScreenPrivacy';
import { API_URL } from './src/config';
import * as SecureStore from 'expo-secure-store';

// ─── Country list ────────────────────────────────────────────────────────────
const COUNTRIES = [
  { code: '+91',  flag: '🇮🇳', name: 'India' },
  { code: '+1',   flag: '🇺🇸', name: 'United States' },
  { code: '+1',   flag: '🇨🇦', name: 'Canada' },
  { code: '+44',  flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+61',  flag: '🇦🇺', name: 'Australia' },
  { code: '+49',  flag: '🇩🇪', name: 'Germany' },
  { code: '+33',  flag: '🇫🇷', name: 'France' },
  { code: '+81',  flag: '🇯🇵', name: 'Japan' },
  { code: '+86',  flag: '🇨🇳', name: 'China' },
  { code: '+82',  flag: '🇰🇷', name: 'South Korea' },
  { code: '+65',  flag: '🇸🇬', name: 'Singapore' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: '+55',  flag: '🇧🇷', name: 'Brazil' },
  { code: '+52',  flag: '🇲🇽', name: 'Mexico' },
  { code: '+27',  flag: '🇿🇦', name: 'South Africa' },
  { code: '+234', flag: '🇳🇬', name: 'Nigeria' },
  { code: '+254', flag: '🇰🇪', name: 'Kenya' },
  { code: '+20',  flag: '🇪🇬', name: 'Egypt' },
  { code: '+62',  flag: '🇮🇩', name: 'Indonesia' },
  { code: '+60',  flag: '🇲🇾', name: 'Malaysia' },
  { code: '+63',  flag: '🇵🇭', name: 'Philippines' },
  { code: '+66',  flag: '🇹🇭', name: 'Thailand' },
  { code: '+84',  flag: '🇻🇳', name: 'Vietnam' },
  { code: '+92',  flag: '🇵🇰', name: 'Pakistan' },
  { code: '+880', flag: '🇧🇩', name: 'Bangladesh' },
  { code: '+94',  flag: '🇱🇰', name: 'Sri Lanka' },
  { code: '+977', flag: '🇳🇵', name: 'Nepal' },
  { code: '+39',  flag: '🇮🇹', name: 'Italy' },
  { code: '+34',  flag: '🇪🇸', name: 'Spain' },
  { code: '+7',   flag: '🇷🇺', name: 'Russia' },
  { code: '+31',  flag: '🇳🇱', name: 'Netherlands' },
  { code: '+46',  flag: '🇸🇪', name: 'Sweden' },
  { code: '+47',  flag: '🇳🇴', name: 'Norway' },
  { code: '+45',  flag: '🇩🇰', name: 'Denmark' },
  { code: '+358', flag: '🇫🇮', name: 'Finland' },
  { code: '+41',  flag: '🇨🇭', name: 'Switzerland' },
  { code: '+43',  flag: '🇦🇹', name: 'Austria' },
  { code: '+32',  flag: '🇧🇪', name: 'Belgium' },
  { code: '+351', flag: '🇵🇹', name: 'Portugal' },
  { code: '+30',  flag: '🇬🇷', name: 'Greece' },
  { code: '+48',  flag: '🇵🇱', name: 'Poland' },
  { code: '+90',  flag: '🇹🇷', name: 'Turkey' },
  { code: '+972', flag: '🇮🇱', name: 'Israel' },
  { code: '+64',  flag: '🇳🇿', name: 'New Zealand' },
  { code: '+54',  flag: '🇦🇷', name: 'Argentina' },
  { code: '+56',  flag: '🇨🇱', name: 'Chile' },
  { code: '+57',  flag: '🇨🇴', name: 'Colombia' },
  { code: '+51',  flag: '🇵🇪', name: 'Peru' },
];

// ─── Country Picker Modal ─────────────────────────────────────────────────────
const CountryPickerModal = ({ visible, onClose, onSelect, isDarkMode }) => {
  const [search, setSearch] = useState('');

  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.includes(search)
  );

  const bg     = isDarkMode ? '#1a1a1a' : '#fff';
  const cardBg = isDarkMode ? '#2a2a2a' : '#f9f9f9';
  const text   = isDarkMode ? '#fff'    : '#111';
  const muted  = isDarkMode ? '#888'    : '#999';
  const border = isDarkMode ? '#333'    : '#e5e5e5';

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={[cpStyles.overlay]}>
        <View style={[cpStyles.sheet, { backgroundColor: bg, borderColor: border }]}>

          {/* Handle bar */}
          <View style={[cpStyles.handle, { backgroundColor: border }]} />

          {/* Header */}
          <View style={[cpStyles.header, { borderBottomColor: border }]}>
            <Text style={[cpStyles.headerTitle, { color: text }]}>Select Country</Text>
            <TouchableOpacity onPress={onClose} style={cpStyles.closeBtn}>
              <Text style={{ fontSize: 20, color: muted }}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Search */}
          <View style={[cpStyles.searchWrap, { backgroundColor: cardBg, borderColor: border }]}>
            <Text style={{ fontSize: 16, marginRight: 8 }}>🔎</Text>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search country or code"
              placeholderTextColor={muted}
              style={[cpStyles.searchInput, { color: text }]}
              autoFocus
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Text style={{ color: muted, fontSize: 16 }}>✕</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* List */}
          <FlatList
            data={filtered}
            keyExtractor={(item, index) => `${item.code}-${item.name}-${index}`}
            style={{ flex: 1 }}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[cpStyles.countryRow, { borderBottomColor: border }]}
                onPress={() => {
                  onSelect(item);
                  setSearch('');
                  onClose();
                }}
              >
                <Text style={cpStyles.flag}>{item.flag}</Text>
                <Text style={[cpStyles.countryName, { color: text }]}>{item.name}</Text>
                <Text style={[cpStyles.countryCode, { color: '#2196F3' }]}>{item.code}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View style={{ padding: 32, alignItems: 'center' }}>
                <Text style={{ color: muted, fontSize: 15 }}>No countries found</Text>
              </View>
            }
          />
        </View>
      </View>
    </Modal>
  );
};

// ─── Main LoginPage ───────────────────────────────────────────────────────────
const LoginPage = ({ onLoginSuccess, onSignupSuccess, isDarkMode, onToggleDarkMode }) => {
  useScreenPrivacy();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileno, setMobileno] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]); // India +91 default
  const [isSignUp, setIsSignUp] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const BASE_URL = API_URL;

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, mobileno }),
      });
      const data = await res.json();
      if (!res.ok) {
        Alert.alert('Login failed', data?.message || 'Something went wrong');
        return;
      }
      await SecureStore.setItemAsync('token', data.token);
      console.log('TOKEN STORED:', data.token);
      Alert.alert('Success', 'Login successful!', [
        { text: 'OK', onPress: () => onLoginSuccess(data) }
      ]);
    } catch (e) {
      Alert.alert('Network error', e?.message || 'Please check server connection');
    }
  };

  const handleSignUp = async () => {
    if (!email || !mobileno || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    const fullMobile = `${selectedCountry.code}${mobileno}`;
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, mobileno: fullMobile }),
      });
      const data = await res.json();
      if (!res.ok) {
        Alert.alert('Sign up failed', data?.message || 'Something went wrong');
        return;
      }
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => onSignupSuccess(data) }
      ]);
    } catch (e) {
      Alert.alert('Network error', e?.message || 'Please check server connection');
    }
  };

  const inputBg     = isDarkMode ? '#2a2a2a' : '#f9f9f9';
  const inputBorder = isDarkMode ? '#444'    : '#ddd';
  const textColor   = isDarkMode ? '#fff'    : '#111';
  const mutedColor  = isDarkMode ? '#888'    : '#999';
  const labelColor  = isDarkMode ? '#fff'    : '#333';

  return (
    <>
      <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: isDarkMode ? '#1a1a1a' : '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}  // ← undefined for Android
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        style={{ backgroundColor: isDarkMode ? '#1a1a1a' : '#fff' }}
      >
        <View style={[styles.loginContainer, isDarkMode && styles.loginContainerDark]}>

          {/* Header */}
          <View style={styles.loginHeader}>
            <Image
              source={require('./assets/icon.png')}
              style={styles.loginLogo}
              resizeMode="contain"
            />
            <Text style={[styles.loginTitle, { color: labelColor }]}>
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </Text>
            <Text style={[styles.loginSubtitle, { color: mutedColor }]}>
              {isSignUp
                ? 'Sign up to get started with FinVerse'
                : 'Sign in to continue to your dashboard'}
            </Text>
          </View>

          {/* Form */}
          <View style={styles.loginForm}>

            {/* Email */}
            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, { color: labelColor }]}>Email</Text>
              <TextInput
                style={[styles.textInput, { backgroundColor: inputBg, borderColor: inputBorder, color: textColor }]}
                placeholder="Enter your email"
                placeholderTextColor={mutedColor}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Mobile with country picker — only on signup */}
            {isSignUp && (
              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, { color: labelColor }]}>Mobile Number</Text>

                <View style={[styles.phoneRow, { backgroundColor: inputBg, borderColor: inputBorder }]}>

                  {/* Country picker button */}
                  <TouchableOpacity
                    style={[styles.countryBtn, { borderRightColor: inputBorder }]}
                    onPress={() => setShowCountryPicker(true)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.flagText}>{selectedCountry.flag}</Text>
                    <Text style={[styles.codeText, { color: textColor }]}>{selectedCountry.code}</Text>
                    <Text style={[styles.chevronText, { color: mutedColor }]}>▾</Text>
                  </TouchableOpacity>

                  {/* Mobile number input */}
                  <TextInput
                    style={[styles.phoneInput, { color: textColor }]}
                    placeholder="Enter mobile number"
                    placeholderTextColor={mutedColor}
                    value={mobileno}
                    onChangeText={setMobileno}
                    keyboardType="phone-pad"
                    maxLength={15}
                  />
                </View>

                {/* Preview of full number */}
                {mobileno.length > 0 && (
                  <Text style={[styles.fullNumberPreview, { color: '#2196F3' }]}>
                    Full number: {selectedCountry.code} {mobileno}
                  </Text>
                )}
              </View>
            )}

            {/* Password */}
            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, { color: labelColor }]}>Password</Text>
              <TextInput
                style={[styles.textInput, { backgroundColor: inputBg, borderColor: inputBorder, color: textColor }]}
                placeholder="Enter your password"
                placeholderTextColor={mutedColor}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            {/* Confirm Password */}
            {isSignUp && (
              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, { color: labelColor }]}>Confirm Password</Text>
                <TextInput
                  style={[styles.textInput, { backgroundColor: inputBg, borderColor: inputBorder, color: textColor }]}
                  placeholder="Confirm your password"
                  placeholderTextColor={mutedColor}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </View>
            )}

            {/* Submit */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={isSignUp ? handleSignUp : handleLogin}
              activeOpacity={0.85}
            >
              <Text style={styles.loginButtonText}>
                {isSignUp ? 'Create Account' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            {/* Toggle sign in / sign up */}
            <TouchableOpacity
              style={styles.switchButton}
              onPress={() => {
                setIsSignUp(!isSignUp);
                setMobileno('');
                setConfirmPassword('');
              }}
            >
              <Text style={styles.switchButtonText}>
                {isSignUp
                  ? 'Already have an account? Sign In'
                  : "Don't have an account? Sign Up"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>

      {/* Country Picker Modal */}
      <CountryPickerModal
        visible={showCountryPicker}
        onClose={() => setShowCountryPicker(false)}
        onSelect={(country) => setSelectedCountry(country)}
        isDarkMode={isDarkMode}
      />
    </>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  loginContainerDark: {
    backgroundColor: '#1a1a1a',
  },
  loginHeader: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  loginLogo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  loginSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  loginForm: {
    flex: 1,
    paddingTop: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },

  // Phone row
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  countryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRightWidth: 1,
    gap: 4,
  },
  flagText: {
    fontSize: 20,
  },
  codeText: {
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 4,
  },
  chevronText: {
    fontSize: 11,
    marginLeft: 2,
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
  },
  fullNumberPreview: {
    fontSize: 12,
    marginTop: 5,
    marginLeft: 2,
    fontWeight: '500',
  },

  // Buttons
  loginButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  switchButton: {
    paddingVertical: 12,
    marginBottom: 40,
  },
  switchButtonText: {
    color: '#2196F3',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
});

// Country picker modal styles
const cpStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  sheet: {
    height: '85%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  closeBtn: {
    padding: 4,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 0,
  },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  flag: {
    fontSize: 24,
    marginRight: 14,
  },
  countryName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  countryCode: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default LoginPage;