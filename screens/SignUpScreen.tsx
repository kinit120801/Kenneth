import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { API_URL } from '../api/postApi';

const SignUpScreen = ({ navigation }: any) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);

  const colorScheme = useColorScheme();
  const placeholderColor = colorScheme === 'dark' ? '#aaa' : '#555';

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const iso = selectedDate.toISOString().split('T')[0];
      setBirthdate(iso);
    }
  };

  const handleSignUp = async () => {
    if (!firstName || !lastName || !username || !gender || !birthdate || !email || !password || !passwordConfirmation) {
      Alert.alert('Validation Error', 'Please fill all fields.');
      return;
    }
    if (password !== passwordConfirmation) {
      Alert.alert('Validation Error', 'Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/register`, {
        first_name: firstName,
        last_name: lastName,
        username,
        gender,
        birthdate,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      if (response.status === 200 || response.status === 201) {
        Alert.alert('Success', 'Account created! Please log in.');
        navigation.replace('Login');
      } else {
        Alert.alert('Error', response.data.message || 'Failed to sign up.');
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.errors) {
          const errors = error.response.data.errors;
          const firstKey = Object.keys(errors)[0];
          Alert.alert('Error', errors[firstKey][0]);
        } else {
          Alert.alert('Error', error.response?.data?.message || 'Something went wrong.');
        }
      } else {
        Alert.alert('Error', 'An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Decorative Spots */}
      <View style={[styles.spot, { top: 60, left: 30, backgroundColor: '#7f5af0', opacity: 0.18, width: 120, height: 120 }]} />
      <View style={[styles.spot, { bottom: 80, right: 40, backgroundColor: '#b983ff', opacity: 0.13, width: 90, height: 90 }]} />
      <View style={[styles.spot, { top: 200, right: 60, backgroundColor: '#fff', opacity: 0.07, width: 60, height: 60 }]} />
      <View style={[styles.spot, { top: 120, left: 80, backgroundColor: '#b983ff', opacity: 0.22, width: 24, height: 24 }]} />
      <View style={[styles.spot, { bottom: 160, right: 100, backgroundColor: '#fff', opacity: 0.15, width: 16, height: 16 }]} />
      <View style={[styles.spot, { top: 300, left: 40, backgroundColor: '#7f5af0', opacity: 0.18, width: 18, height: 18 }]} />
      <View style={[styles.spot, { bottom: 200, left: 60, backgroundColor: '#b983ff', opacity: 0.18, width: 12, height: 12 }]} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Create Account</Text>

        <TextInput placeholder="First Name" placeholderTextColor={placeholderColor} value={firstName} onChangeText={setFirstName} style={styles.input} />
        <TextInput placeholder="Last Name" placeholderTextColor={placeholderColor} value={lastName} onChangeText={setLastName} style={styles.input} />
        <TextInput placeholder="Username" placeholderTextColor={placeholderColor} value={username} onChangeText={setUsername} style={styles.input} />

        <View style={styles.pickerContainer}>
          <Picker selectedValue={gender} onValueChange={(value) => setGender(value)} style={styles.picker}>
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>

        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            placeholder="Birthdate (YYYY-MM-DD)"
            placeholderTextColor={placeholderColor}
            value={birthdate}
            editable={false}
            style={styles.input}
          />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={birthdate ? new Date(birthdate) : new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}

        <TextInput
          placeholder="Email"
          placeholderTextColor={placeholderColor}
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={placeholderColor}
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor={placeholderColor}
          value={passwordConfirmation}
          onChangeText={setPasswordConfirmation}
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
          <Text style={[styles.buttonText, { color: '#2d014d' }]}>{loading ? 'Signing up...' : 'Sign Up'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.replace('Login')} style={{ marginTop: 16 }}>
          <Text style={styles.linkText}>
            Already have an account? <Text style={styles.link}>Login</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d014d',
  },
  scrollContainer: {
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    color: '#b983ff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    fontStyle: 'italic',
    fontFamily: Platform.OS === 'ios' ? 'Snell Roundhand' : 'cursive',
    textShadowColor: '#7f5af0',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1.5,
    borderColor: '#7f5af0',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
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
    fontSize: 20,
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
});

export default SignUpScreen;
