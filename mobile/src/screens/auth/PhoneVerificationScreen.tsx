import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { colors } from '../../theme';

type PhoneVerificationScreenProps = {
  navigation: StackNavigationProp<AuthStackParamList, 'PhoneVerification'>;
};

export const PhoneVerificationScreen = ({ navigation }: PhoneVerificationScreenProps) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = () => {
    // Mock OTP send
    setOtpSent(true);
  };

  const handleVerifyOTP = () => {
    // Mock OTP verification
    if (otp.length === 6) {
      navigation.navigate('Onboarding');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          {otpSent ? 'Verify Your Phone' : 'Enter Your Phone'}
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          {otpSent
            ? 'Enter the 6-digit code sent to your phone'
            : 'We'll send you a verification code'}
        </Text>

        {!otpSent ? (
          <TextInput
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            mode="outlined"
            style={styles.input}
            placeholder="+971 XX XXX XXXX"
          />
        ) : (
          <TextInput
            label="Verification Code"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            mode="outlined"
            style={styles.input}
            maxLength={6}
            placeholder="000000"
          />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={otpSent ? handleVerifyOTP : handleSendOTP}
          disabled={otpSent ? otp.length !== 6 : phone.length < 10}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          {otpSent ? 'Verify' : 'Send Code'}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
  },
  content: {
    flex: 1,
    paddingTop: 60,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.text.primary,
  },
  subtitle: {
    color: colors.text.secondary,
    marginBottom: 32,
  },
  input: {
    marginBottom: 16,
  },
  buttonContainer: {
    paddingBottom: 32,
  },
  button: {
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});
