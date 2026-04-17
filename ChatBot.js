import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Animated,
  Dimensions,
  Modal,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ChatBotStyles = StyleSheet.create({
  chatContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    elevation: 10,
  },
  chatHeader: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatHeaderTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  chatHeaderSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginTop: 4,
  },
  closeBtn: {
    padding: 4,
  },
  closeBtnText: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 24,
  },
  messagesContainer: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#f9fafb',
  },
  botMessage: {
    backgroundColor: '#e0e7ff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    maxWidth: '80%',
    alignSelf: 'flex-end',
  },
  botMessageText: {
    color: '#1e3a8a',
    fontSize: 14,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#111',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  sendBtn: {
    backgroundColor: '#3b82f6',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnIcon: {
    color: '#fff',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1e3a8a',
  },
});

const ChatBot = ({ isDarkMode, onClose }) => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hi there! I'm FinBot, your personal finance assistant. How can I help you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMsg = { type: 'user', text: inputValue };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    // Simulate bot typing
    setIsTyping(true);

    // Bot response based on keywords
    setTimeout(() => {
      let botResponse = '';

      const lowerInput = inputValue.toLowerCase();
      if (
        lowerInput.includes('hello') ||
        lowerInput.includes('hi') ||
        lowerInput.includes('hey')
      ) {
        botResponse =
          'Hello! Welcome to Finverse. What would you like to know about investing, stocks, or financial planning?';
      } else if (
        lowerInput.includes('stock') ||
        lowerInput.includes('invest') ||
        lowerInput.includes('portfolio')
      ) {
        botResponse =
          'I can help you with investment advice! Would you like to know about stocks, mutual funds, ETFs, or personal investment strategies?';
      } else if (lowerInput.includes('price') || lowerInput.includes('how much')) {
        botResponse =
          'You can find current prices for any stock or fund by searching in the Stocks or Mutual Funds tab. Would you like recommendations?';
      } else if (lowerInput.includes('buy') || lowerInput.includes('sell')) {
        botResponse =
          'To buy or sell, navigate to your desired stock/fund and click the Buy or Sell button. Need help with anything specific?';
      } else if (
        lowerInput.includes('risk') ||
        lowerInput.includes('portfolio allocation')
      ) {
        botResponse =
          "Portfolio allocation depends on your risk tolerance and investment horizon. Generally, younger investors can take more risk. Would you like a personalized recommendation?";
      } else if (lowerInput.includes('help') || lowerInput.includes('support')) {
        botResponse =
          "Of course! I'm here to help. You can ask me about:\n• Stocks & Funds\n• Portfolio Management\n• Investment Tips\n• Account Features\n\nWhat would you like to know?";
      } else if (lowerInput.includes('thanks') || lowerInput.includes('thank you')) {
        botResponse = "You're welcome! Feel free to ask me anything else. 😊";
      } else {
        botResponse =
          "That's a great question! I'm learning about this topic. In the meantime, would you like to explore our investment options or check your portfolio?";
      }

      setMessages((prev) => [...prev, { type: 'bot', text: botResponse }]);
      setIsTyping(false);
      scrollToBottom();
    }, 1000);
  };

  const containerStyle = isDarkMode
    ? {
      backgroundColor: '#1f2937',
      borderTopColor: '#374151',
    }
    : {};

  const headerStyle = isDarkMode
    ? {
      backgroundColor: '#1e3a8a',
    }
    : {};

  const messagesStyle = isDarkMode
    ? {
      backgroundColor: '#111827',
    }
    : {};

  const inputStyle = isDarkMode
    ? {
      backgroundColor: '#374151',
      borderColor: '#4b5563',
      color: '#fff',
    }
    : {};

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <View style={[ChatBotStyles.chatContainer, containerStyle]}>
        {/* Header */}
        <View style={[ChatBotStyles.chatHeader, headerStyle]}>
          <View>
            <Text style={ChatBotStyles.chatHeaderTitle}>AI Chat Bot</Text>
            <Text style={ChatBotStyles.chatHeaderSubtitle}>Always here to help</Text>
          </View>
          <TouchableOpacity
            style={ChatBotStyles.closeBtn}
            onPress={onClose}
          >
            <Text style={ChatBotStyles.closeBtnText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={[ChatBotStyles.messagesContainer, messagesStyle]}
          contentContainerStyle={{ paddingBottom: 12 }}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg, idx) => (
            <View
              key={idx}
              style={msg.type === 'bot' ? ChatBotStyles.botMessage : ChatBotStyles.userMessage}
            >
              <Text
                style={
                  msg.type === 'bot'
                    ? ChatBotStyles.botMessageText
                    : ChatBotStyles.userMessageText
                }
              >
                {msg.text}
              </Text>
            </View>
          ))}

          {isTyping && (
            <View style={ChatBotStyles.typingIndicator}>
              <View
                style={[
                  ChatBotStyles.typingDot,
                  { backgroundColor: isDarkMode ? '#60a5fa' : '#1e3a8a' },
                ]}
              />
              <View
                style={[
                  ChatBotStyles.typingDot,
                  { backgroundColor: isDarkMode ? '#60a5fa' : '#1e3a8a' },
                ]}
              />
              <View
                style={[
                  ChatBotStyles.typingDot,
                  { backgroundColor: isDarkMode ? '#60a5fa' : '#1e3a8a' },
                ]}
              />
            </View>
          )}
        </ScrollView>

        {/* Input */}
        <View style={[ChatBotStyles.inputContainer, inputStyle]}>
          <TextInput
            style={[ChatBotStyles.input, inputStyle]}
            placeholder="Ask me anything..."
            placeholderTextColor={isDarkMode ? '#9ca3af' : '#9ca3af'}
            value={inputValue}
            onChangeText={setInputValue}
            onSubmitEditing={handleSendMessage}
          />
          <TouchableOpacity
            style={ChatBotStyles.sendBtn}
            onPress={handleSendMessage}
            disabled={!inputValue.trim()}
          >
            <MaterialIcons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ChatBot;
