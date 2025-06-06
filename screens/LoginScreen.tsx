// screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AppButton from '../components/AppButton';
import sharedStyles from '../styles/sharedStyles';
import { useUser } from '../contexts/UserContext';
import { API_URL } from '../api/postApi';

//const API_URL = 'https://6da9-131-226-112-101.ngrok-free.app/api';

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
        Alert.alert('Error', error.response.data.message || 'Something went wrong. Please try again later.');
      } else {
        Alert.alert('Error', 'An unexpected error occurred. Please check your internet connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' }}>Login</Text>
      <TextInput
        style={sharedStyles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={sharedStyles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <AppButton title={loading ? 'Logging in...' : 'Login'} onPress={handleLogin} disabled={loading} />
      <AppButton title="Sign Up" onPress={() => navigation.navigate('Signup')} style={{ backgroundColor: '#eee' }} textStyle={{ color: '#1976d2' }} />
      <AppButton title="Forgot Password?" onPress={() => navigation.navigate('ForgotPassword')} style={{ backgroundColor: '#eee' }} textStyle={{ color: '#1976d2' }} />
    </View>
  );
};

export default LoginScreen;
