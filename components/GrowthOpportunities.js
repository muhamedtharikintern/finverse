import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Switch } from 'react-native';

const GrowthOpportunities = ({ isDarkMode, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFrequency, setSelectedFrequency] = useState('Monthly');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState(null);

  const textColor = isDarkMode ? '#fff' : '#0b1220';
  const mutedColor = isDarkMode ? '#aeb4c1' : '#6b7280';
  const surface = isDarkMode ? '#111827' : '#ffffff';
  const cardBg = isDarkMode ? '#1f2937' : '#f4f6f9';

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      data: [20, 45, 28, 80, 99, 43]
    }]
  };

  const goals = [
    { id: 'retirement', icon: '👴', name: 'Retirement' },
    { id: 'house', icon: '🏠', name: 'House' },
    { id: 'vacation', icon: '✈️', name: 'Vacation' },
    { id: 'education', icon: '🎓', name: 'Education' },
    { id: 'emergency', icon: '🚨', name: 'Emergency Fund' },
    { id: 'custom', icon: '➕', name: 'Custom' },
  ];

  const styles = {
    container: {
      flex: 1,
      backgroundColor: surface,
    },
    header: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#222' : '#e6e8ed',
    },
    performanceText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: textColor,
      marginBottom: 8,
    },
    performanceValue: {
      color: '#22c55e',
      fontSize: 32,
      fontWeight: 'bold',
    },
    frequencySection: {
      padding: 16,
    },
    label: {
      fontSize: 16,
      color: textColor,
      marginBottom: 8,
    },
    button: {
      backgroundColor: '#3b82f6',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
    input: {
      backgroundColor: cardBg,
      padding: 12,
      borderRadius: 8,
      marginBottom: 16,
      color: textColor,
    },
    goalsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 16,
    },
    goalItem: {
      width: '33%',
      padding: 8,
      alignItems: 'center',
    },
    goalButton: {
      backgroundColor: cardBg,
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
      width: '100%',
    },
    selectedGoalButton: {
      backgroundColor: '#3b82f6',
    },
    goalIcon: {
      fontSize: 24,
      marginBottom: 4,
    },
    goalText: {
      color: textColor,
      fontSize: 12,
    },
    selectedGoalText: {
      color: '#ffffff',
    },
    section: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#222' : '#e6e8ed',
    },
  };

  return (
    <ScrollView style={styles.container}>
      {/* Performance Section */}
      <View style={styles.header}>
        <Text style={styles.performanceText}>Growth Performance</Text>
        <Text style={styles.performanceValue}>6.63%</Text>
        <View style={{
          height: 200,
          marginVertical: 8,
          backgroundColor: cardBg,
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{ color: mutedColor }}>Chart will be displayed here</Text>
        </View>
      </View>

      {/* Goals Section */}
      <View style={styles.section}>
        <Text style={styles.label}>Choose a goal</Text>
        <View style={styles.goalsGrid}>
          {goals.map((goal) => (
            <View key={goal.id} style={styles.goalItem}>
              <TouchableOpacity
                style={[
                  styles.goalButton,
                  selectedGoal === goal.id && styles.selectedGoalButton,
                ]}
                onPress={() => setSelectedGoal(goal.id)}
              >
                <Text style={styles.goalIcon}>{goal.icon}</Text>
                <Text style={[
                  styles.goalText,
                  selectedGoal === goal.id && styles.selectedGoalText,
                ]}>
                  {goal.name}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* Investment Amount */}
      <View style={styles.section}>
        <Text style={styles.label}>Investment Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          placeholderTextColor={mutedColor}
          keyboardType="numeric"
          value={investmentAmount}
          onChangeText={setInvestmentAmount}
        />
      </View>

      {/* Frequency Selection */}
      <View style={styles.section}>
        <Text style={styles.label}>Frequency</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => {
            // Add frequency selection modal/picker
          }}
        >
          <Text style={{ color: textColor }}>{selectedFrequency}</Text>
        </TouchableOpacity>
      </View>

      {/* Action Button */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default GrowthOpportunities;