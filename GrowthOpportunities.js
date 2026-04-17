import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput } from 'react-native';

const GrowthOpportunities = ({ isDarkMode, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFrequency, setSelectedFrequency] = useState('monthly');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [timeHorizon, setTimeHorizon] = useState('');
  const [selectedBankAccount, setSelectedBankAccount] = useState(null);

  const textColor = isDarkMode ? '#fff' : '#000';
  const backgroundColor = isDarkMode ? '#121212' : '#fff';
  const surfaceColor = isDarkMode ? '#1e1e1e' : '#fff';
  const borderColor = isDarkMode ? '#333' : '#e6e8ed';
  const primaryColor = '#4F46E5';
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      onClose();
    }
  };

  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      data: [6.2, 6.4, 6.1, 6.5, 6.3, 6.6]
    }]
  };

  const bankAccounts = [
    { id: 1, name: 'Smart Card Fund', type: 'Credit Card' },
    { id: 2, name: 'Debt Card', type: 'Debit Card' }
  ];

  const investmentGoals = [
    { id: 'emergency', label: 'Emergency Fund', icon: '🏥' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'retirement', label: 'Retirement', icon: '👴' },
    { id: 'custom', label: 'Custom', icon: '⚙️' }
  ];

  const steps = [
    {
      id: 'performance',
      title: 'Growth Opportunities Performance',
      subtitle: '6.63% YTD returns',
      component: () => (
        <View>
          <View style={styles.performanceCard}>
            <Text style={[styles.performanceTitle, { color: textColor }]}>6.63%</Text>
            <Text style={styles.performanceSubtitle}>YTD returns</Text>
            <View style={styles.performanceBarContainer}>
              {[6.2, 6.4, 6.1, 6.5, 6.3, 6.6].map((value, index) => (
                <View key={index} style={styles.performanceBarWrapper}>
                  <View 
                    style={[
                      styles.performanceBar, 
                      { 
                        height: `${(value/7)*100}%`,
                        backgroundColor: primaryColor
                      }
                    ]} 
                  />
                </View>
              ))}
            </View>
            <View style={styles.performanceLabels}>
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => (
                <Text key={index} style={[styles.performanceLabel, { color: textColor }]}>{month}</Text>
              ))}
            </View>
          <View style={styles.investButtons}>
            <TouchableOpacity 
              style={[styles.investButton, { backgroundColor: primaryColor }]}
              onPress={() => setCurrentStep(1)}
            >
              <Text style={styles.investButtonText}>One time</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.investButton, { backgroundColor: primaryColor }]}
              onPress={() => setCurrentStep(2)}
            >
              <Text style={styles.investButtonText}>Goal Based</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.investButton, { backgroundColor: primaryColor }]}
              onPress={() => setCurrentStep(3)}
            >
              <Text style={styles.investButtonText}>SIP</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
      )
    },
    {
      id: 'goal',
      title: 'Choose a goal',
      component: () => (
        <View>
          {investmentGoals.map(goal => (
            <TouchableOpacity
              key={goal.id}
              style={[
                styles.goalOption,
                { 
                  backgroundColor: surfaceColor,
                  borderColor: selectedGoal === goal.id ? primaryColor : borderColor
                }
              ]}
              onPress={() => setSelectedGoal(goal.id)}
            >
              <Text style={styles.goalIcon}>{goal.icon}</Text>
              <Text style={[styles.goalLabel, { color: textColor }]}>{goal.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )
    },
    {
      id: 'investment',
      title: 'Investment Amount',
      component: () => (
        <View>
          <TextInput
            style={[styles.input, { color: textColor, borderColor }]}
            placeholder="Enter amount"
            placeholderTextColor={isDarkMode ? '#666' : '#999'}
            value={investmentAmount}
            onChangeText={setInvestmentAmount}
            keyboardType="numeric"
          />
          <Text style={[styles.label, { color: textColor }]}>Time Horizon</Text>
          <TextInput
            style={[styles.input, { color: textColor, borderColor }]}
            placeholder="Select duration"
            placeholderTextColor={isDarkMode ? '#666' : '#999'}
            value={timeHorizon}
            onChangeText={setTimeHorizon}
          />
        </View>
      )
    },
    {
      id: 'bank',
      title: 'Choose a bank account',
      component: () => (
        <View>
          {bankAccounts.map(account => (
            <TouchableOpacity
              key={account.id}
              style={[
                styles.bankOption,
                { 
                  backgroundColor: surfaceColor,
                  borderColor: selectedBankAccount === account.id ? primaryColor : borderColor
                }
              ]}
              onPress={() => setSelectedBankAccount(account.id)}
            >
              <Text style={[styles.bankName, { color: textColor }]}>{account.name}</Text>
              <Text style={[styles.bankType, { color: isDarkMode ? '#666' : '#999' }]}>{account.type}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )
    },
    {
      id: 'confirm',
      title: 'Confirm your order',
      component: () => (
        <View>
          <View style={[styles.summaryCard, { backgroundColor: surfaceColor, borderColor }]}>
            <Text style={[styles.summaryTitle, { color: textColor }]}>Order summary</Text>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: isDarkMode ? '#666' : '#999' }]}>Investment Amount</Text>
              <Text style={[styles.summaryValue, { color: textColor }]}>${investmentAmount}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: isDarkMode ? '#666' : '#999' }]}>Time Horizon</Text>
              <Text style={[styles.summaryValue, { color: textColor }]}>{timeHorizon}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: isDarkMode ? '#666' : '#999' }]}>Bank Account</Text>
              <Text style={[styles.summaryValue, { color: textColor }]}>
                {bankAccounts.find(acc => acc.id === selectedBankAccount)?.name}
              </Text>
            </View>
          </View>
          <TouchableOpacity 
            style={[styles.confirmButton, { backgroundColor: primaryColor }]}
            onPress={() => {
              // Handle investment confirmation
              onClose();
            }}
          >
            <Text style={styles.confirmButtonText}>Confirm Investment</Text>
          </TouchableOpacity>
        </View>
      )
    }
  ];

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={[styles.header, { backgroundColor: surfaceColor, borderBottomColor: borderColor }]}>
        <TouchableOpacity 
          onPress={handleBack} 
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: textColor }]}>{steps[currentStep].title}</Text>
      </View>

      <ScrollView style={styles.content}>
        {steps[currentStep].component()}
      </ScrollView>

      <View style={styles.navigation}>
        <TouchableOpacity
          style={[
            styles.navButton,
            { opacity: currentStep > 0 ? 1 : 0.5 }
          ]}
          onPress={handleBack}
        >
          <Text style={styles.navButtonText}>Back</Text>
        </TouchableOpacity>
        {currentStep < steps.length - 1 && (
          <TouchableOpacity
            style={[styles.navButton, { backgroundColor: primaryColor }]}
            onPress={() => setCurrentStep(currentStep + 1)}
          >
            <Text style={styles.navButtonText}>Continue</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  performanceCard: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 20,
    height: 250,
  },
  performanceTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  performanceSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  performanceBarContainer: {
    flexDirection: 'row',
    height: 120,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  performanceBarWrapper: {
    width: 30,
    height: '100%',
    justifyContent: 'flex-end',
  },
  performanceBar: {
    width: '100%',
    borderRadius: 6,
  },
  performanceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 8,
  },
  performanceLabel: {
    fontSize: 12,
    width: 30,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    paddingTop: 50,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3b82f6',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginRight: 44,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    gap: 16,
  },
  navButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  investButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 8,
  },
  investButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  investButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  goalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  goalIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  goalLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  bankOption: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  bankName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  bankType: {
    fontSize: 14,
  },
  summaryCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  confirmButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default GrowthOpportunities;