import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { CustomButton, FormField } from '../components';

const LoginScreen = () => {
  const [form, setForm] = useState({
    mobile: '',
    otp: '',
  });
  const [isOtpSent, setIsOtpSent] = useState(false); // Set to true by default for testing

  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendOtp = async () => {
    if (form.mobile.length !== 10) {
      Alert.alert('Invalid Mobile Number', 'Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Replace with your API endpoint to send OTP
      const response = await fetch('http://your-api-endpoint/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile: form.mobile }),
      });

      const data = await response.json();
      if (data.success) {
        setIsOtpSent(true);
        Alert.alert('OTP Sent', 'An OTP has been sent to your mobile number.');
      } else {
        Alert.alert('Error', data.message || 'Failed to send OTP.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const verifyOtp = async () => {
    if (form.otp.length !== 6) {
      Alert.alert('Invalid OTP', 'Please enter a valid 6-digit OTP.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Replace with your API endpoint to verify OTP
      const response = await fetch('http://your-api-endpoint/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile: form.mobile, otp: form.otp }),
      });

      const data = await response.json();
      if (data.success) {
        Alert.alert('Success', 'Mobile number verified successfully.');
        // Navigate to the next screen or perform any action
      } else {
        Alert.alert('Error', data.message || 'Failed to verify OTP.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <View className="px-5 flex-1 bg-white pt-5">
          <Text className="text-4xl font-bold text-start">
            Verify Mobile Number
          </Text>

          {/* Mobile Number Input */}
          <FormField
            title="Mobile Number"
            value={form.mobile}
            handleChangeText={(text: string) => {
              if (/^\d{0,10}$/.test(text)) {
                setForm({ ...form, mobile: text });
              }
            }}
            placeholder="Enter mobile number"
            otherStyles="mt-5"
            keyboardType="phone-pad"
          />

          {/* Send OTP Button */}
          {!isOtpSent && (
            <CustomButton
              title="Send OTP"
              handlePress={sendOtp}
              isLoading={isSubmitting}
              containerStyle="mt-5 py-5"
            />
          )}

          {/* OTP Input */}
          {isOtpSent && (
            <>
              <FormField
                title="Enter OTP"
                value={form.otp}
                handleChangeText={(text: string) => {
                  if (/^\d{0,6}$/.test(text)) {
                    setForm({ ...form, otp: text });
                  }
                }}
                placeholder="Enter 6-digit OTP"
                otherStyles="mt-5"
                keyboardType="number-pad"
              />
              <CustomButton
                title="Verify OTP"
                handlePress={verifyOtp}
                isLoading={isSubmitting}
                containerStyle="mt-5 py-5"
              />
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;