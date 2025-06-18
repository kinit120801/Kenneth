import axios from 'axios';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { API_URL } from '../api/postApi';

const ForgotPasswordScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
      Alert.alert('Validation Error', 'Please enter your email');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email });
      if (response.status === 200) {
        Alert.alert('Success', 'Password reset link sent to your email.');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', response.data.message || 'Failed to send reset link.');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        Alert.alert('Error', error.response.data.message || 'Something went wrong. Please try again later.');
      } else {
        Alert.alert('Error', 'An unexpected error occurred. Please check your internet connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Decorative Spots */}
      <View style={[styles.spot, { top: 60, left: 30, backgroundColor: '#orange', opacity: 0.18, width: 120, height: 120 }]} />
      <View style={[styles.spot, { bottom: 80, right: 40, backgroundColor: '#orange', opacity: 0.13, width: 90, height: 90 }]} />
      <View style={[styles.spot, { top: 200, right: 60, backgroundColor: '#fff', opacity: 0.07, width: 60, height: 60 }]} />
      {/* Smaller Dots */}
      <View style={[styles.spot, { top: 120, left: 80, backgroundColor: '#b983ff', opacity: 0.22, width: 24, height: 24 }]} />
      <View style={[styles.spot, { bottom: 160, right: 100, backgroundColor: '#fff', opacity: 0.15, width: 16, height: 16 }]} />
      <View style={[styles.spot, { top: 300, left: 40, backgroundColor: '#orange', opacity: 0.18, width: 18, height: 18 }]} />
      <View style={[styles.spot, { bottom: 200, left: 60, backgroundColor: '#b983ff', opacity: 0.18, width: 12, height: 12 }]} />
      {/* Sparkles */}
      <View style={[styles.sparkle, { top: 100, left: 180 }]} />
      <View style={[styles.sparkle, { top: 250, right: 60 }]} />
      <View style={[styles.sparkle, { bottom: 120, left: 100 }]} />
      <View style={[styles.sparkle, { bottom: 60, right: 120 }]} />
      <View style={[styles.sparkle, { top: 180, left: 60 }]} />

      <View style={styles.content}>
        <Text style={styles.title}>Forgot Password</Text>

        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleReset} disabled={loading}>
          <Text style={[styles.buttonText, { color: '#orange' }]}>{loading ? 'Sending...' : 'Send Reset Link'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: 16 }}>
          <Text style={styles.linkText}>
            Remember your password? <Text style={styles.link}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d014d',
    justifyContent: 'center',
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#b983ff',
    textAlign: 'center',
    marginBottom: 24,
    fontStyle: 'italic',
    fontFamily: Platform.OS === 'ios' ? 'Snell Roundhand' : 'cursive',
    textShadowColor: '#7f5af0',
    textShadowOffset: { width: 2, height: 2 }, // increased shadow for more effect
    textShadowRadius: 8,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1.5, // add border
    borderColor: '#7f5af0', // purple border
  },
  button: {
    backgroundColor: '#7f5af0',
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#7f5af0',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 18,
    elevation: 8,
  },
  buttonText: {
    color: '#16161a',
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 1,
  },
  linkText: {
    color: '#b983ff',
    textAlign: 'center',
  },
  link: {
    fontWeight: 'bold',
  },
  spot: {
    position: 'absolute',
    borderRadius: 100,
  },
  sparkle: {
    position: 'absolute',
    width: 14,
    height: 14,
    backgroundColor: 'transparent',
    borderColor: '#b983ff',
    borderWidth: 1.5,
    borderRadius: 7,
    opacity: 0.7,
    shadowColor: '#b983ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    zIndex: 1,
  },
});

export default ForgotPasswordScreen;
