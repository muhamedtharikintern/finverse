import React, { useState } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

const RazorpayScreen = ({ route, navigation }) => {
  const { orderId } = route.params;

  const paymentUrl = `https://api.razorpay.com/v1/checkout/embedded?order_id=${orderId}`;

  return (
    <WebView
      source={{ uri: paymentUrl }}
      onNavigationStateChange={(navState) => {
        if (navState.url.includes("success")) {
          alert("Payment Success");
          navigation.goBack();
        }
      }}
    />
  );
};

export default RazorpayScreen;