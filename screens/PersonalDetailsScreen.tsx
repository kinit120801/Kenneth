import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../App';
import Icon from 'react-native-vector-icons/Feather';
import { API_URL } from '../api/postApi';

type PersonalDetailsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PersonalDetailsScreen'>;
  route: RouteProp<RootStackParamList, 'PersonalDetailsScreen'>;
};

const { width, height } = Dimensions.get('window');

const PersonalDetailsScreen: React.FC<PersonalDetailsScreenProps> = ({ navigation }) => {
  const [user, setUser] = useState<any>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [editableField, setEditableField] = useState<string | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(`${API_URL}/fetchuser`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setUser(data);
    setFirstName(data.first_name || '');
    setLastName(data.last_name || '');
    setUsername(data.username || '');
    setBirthdate(data.birthdate || '');
    setEmail(data.email || '');
  };

  const handleSave = async () => {
    const token = await AsyncStorage.getItem('token');
    const body: any = {
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      current_password: currentPassword,
    };
    if (password) {
      body.password = password;
      body.password_confirmation = password;
    }
    try {
      const res = await fetch(`${API_URL}/user/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        Alert.alert('Success', 'Profile updated!');
        fetchUser();
        setPassword('');
        setCurrentPassword('');
        setEditableField(null);
      } else {
        const err = await res.json();
        Alert.alert('Error', err.message || 'Failed to update profile');
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
    >
      {/* Background Decorations */}
      <View style={[styles.spot, { top: 40, left: 30, backgroundColor: '#7f5af0', opacity: 0.18, width: 100, height: 100 }]} />
      <View style={[styles.spot, { bottom: 60, right: 40, backgroundColor: '#b983ff', opacity: 0.13, width: 90, height: 90 }]} />
      <View style={[styles.spot, { top: 180, right: 50, backgroundColor: '#fff', opacity: 0.07, width: 60, height: 60 }]} />
      <View style={[styles.sparkle, { top: 100, left: 200 }]} />
      <View style={[styles.sparkle, { top: 250, right: 80 }]} />
      <View style={[styles.sparkle, { bottom: 120, left: 80 }]} />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 24 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.header}>Personal Information</Text>

        {/* First Name */}
        <Text style={styles.label}>First Name</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            editable={editableField === 'firstName'}
            placeholder="First Name"
            placeholderTextColor="#ccc"
          />
          <Icon
            name="edit-2"
            size={18}
            style={styles.editIcon}
            onPress={() => setEditableField('firstName')}
          />
        </View>

        {/* Last Name */}
        <Text style={styles.label}>Last Name</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            editable={editableField === 'lastName'}
            placeholder="Last Name"
            placeholderTextColor="#ccc"
          />
          <Icon
            name="edit-2"
            size={18}
            style={styles.editIcon}
            onPress={() => setEditableField('lastName')}
          />
        </View>

        {/* Username */}
        <Text style={styles.label}>Username</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            editable={editableField === 'username'}
            placeholder="Username"
            placeholderTextColor="#ccc"
          />
          <Icon
            name="edit-2"
            size={18}
            style={styles.editIcon}
            onPress={() => setEditableField('username')}
          />
        </View>

        {/* Birthdate */}
        <Text style={styles.label}>Birthdate</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, { backgroundColor: '#e3d9f0' }]}
            value={birthdate}
            editable={false}
            placeholder="Birthdate"
            placeholderTextColor="#ccc"
          />
        </View>

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            editable={editableField === 'email'}
            placeholder="Email"
            placeholderTextColor="#ccc"
            keyboardType="email-address"
          />
          <Icon
            name="edit-2"
            size={18}
            style={styles.editIcon}
            onPress={() => setEditableField('email')}
          />
        </View>

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            editable={editableField === 'password'}
            placeholder="Change Password"
            placeholderTextColor="#ccc"
            secureTextEntry
          />
          <Icon
            name="edit-2"
            size={18}
            style={styles.editIcon}
            onPress={() => setEditableField('password')}
          />
        </View>

        {/* Current Password */}
        <Text style={styles.label}>Current Password (required to save changes)</Text>
        <TextInput
          style={[styles.input, { marginBottom: 20 }]}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
          placeholder="Current Password"
          placeholderTextColor="#ccc"
        />

        {/* Save Button */}
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
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
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#b983ff',
    marginBottom: 30,
    alignSelf: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Snell Roundhand' : 'cursive',
    textShadowColor: '#7f5af0',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
    color: '#f0d9ff',
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#b983ff',
    borderRadius: 10,
    padding: 12,
    paddingRight: 36,
    backgroundColor: '#fff',
    color: '#000',
    shadowColor: '#b983ff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  editIcon: {
    position: 'absolute',
    right: 10,
    top: 14,
    color: '#b983ff',
  },
  spot: {
    position: 'absolute',
    borderRadius: 100,
    zIndex: 0,
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
  zIndex: 0, // <--- Move to background
},

  button: {
    backgroundColor: '#b983ff',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#7f5af0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PersonalDetailsScreen;
