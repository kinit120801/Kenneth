// screens/LoginScreen.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useState } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { API_URL } from '../api/postApi';
import { useUser } from '../contexts/UserContext';

const LoginScreen = ({ navigation }: any) => {
  const { setUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter both email and password.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/login`, {
        usernameoremail: email,
        password,
      });
      if (response.status === 200) {
        const { token, user } = response.data;
        await AsyncStorage.setItem('token', token);
        setUser(user);
        navigation.replace('HomeScreen');
      } else {
        Alert.alert('Login Failed', response.data.message || 'Invalid credentials');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        Alert.alert('Error', error.response.data.message || 'Something went wrong.');
      } else {
        Alert.alert('Error', 'An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Decorative Background */}
      <View style={[styles.spot, { top: 40, left: 30, backgroundColor: '#orange', opacity: 0.18, width: 100, height: 100 }]} />
      <View style={[styles.spot, { bottom: 60, right: 40, backgroundColor: '#orange', opacity: 0.13, width: 90, height: 90 }]} />
      <View style={[styles.spot, { top: 180, right: 50, backgroundColor: '#fff', opacity: 0.07, width: 60, height: 60 }]} />
      <View style={[styles.sparkle, { top: 100, left: 200 }]} />
      <View style={[styles.sparkle, { top: 250, right: 80 }]} />
      <View style={[styles.sparkle, { bottom: 120, left: 80 }]} />

      <Text style={styles.title}>Login to Kinet</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Login'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={{ marginTop: 20 }}>
        <Text style={styles.signupText}>
          Don't have an account? <Text style={{ fontWeight: 'bold' }}>Sign Up</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#orange',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    color: '#orange',
    marginBottom: 30,
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontFamily: Platform.OS === 'ios' ? 'Snell Roundhand' : 'cursive',
    textShadowColor: '#orange',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#orange',
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#orange',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  button: {
    backgroundColor: '#orange',
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    shadowColor: '#orange',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 18,
    elevation: 8,
  },
  buttonText: {
    color: '#16161a',
    fontWeight: '700',
    fontSize: 20,
    letterSpacing: 1,
  },
  signupText: {
    color: '#orange',
  },
  forgot: {
    marginTop: 16,
    color: '#orange', // changed to light purple
    textAlign: 'center',
    textDecorationLine: 'underline',
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
    borderColor: '#orange',
    borderWidth: 1.5,
    borderRadius: 7,
    opacity: 0.7,
    shadowColor: '#orange',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    zIndex: 1,
  },
});

export default LoginScreen;
