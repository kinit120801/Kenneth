// screens/PersonalDetailsScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';

const PersonalDetailsScreen = ({ navigation }: any) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');

  const handleSave = () => {
    if (!firstName || !lastName || !bio) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }
    // Process or navigate forward
    Alert.alert('Saved', 'Your details have been saved.');
    navigation.goBack(); // or navigate somewhere else
  };

  return (
    <View style={styles.container}>
      {/* Decorative Background */}
      <View style={[styles.spot, { top: 40, left: 30, backgroundColor: '#7f5af0', opacity: 0.18, width: 100, height: 100 }]} />
      <View style={[styles.spot, { bottom: 60, right: 40, backgroundColor: '#b983ff', opacity: 0.13, width: 90, height: 90 }]} />
      <View style={[styles.spot, { top: 180, right: 50, backgroundColor: '#fff', opacity: 0.07, width: 60, height: 60 }]} />
      <View style={[styles.sparkle, { top: 100, left: 200 }]} />
      <View style={[styles.sparkle, { top: 250, right: 80 }]} />
      <View style={[styles.sparkle, { bottom: 120, left: 80 }]} />

      <Text style={styles.title}>Personal Details</Text>

      <TextInput
        placeholder="First Name"
        placeholderTextColor="#aaa"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />
      <TextInput
        placeholder="Last Name"
        placeholderTextColor="#aaa"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />
      <TextInput
        placeholder="Bio"
        placeholderTextColor="#aaa"
        value={bio}
        onChangeText={setBio}
        multiline
        numberOfLines={3}
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d014d',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: '#b983ff',
    marginBottom: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontFamily: Platform.OS === 'ios' ? 'Snell Roundhand' : 'cursive',
    textShadowColor: '#7f5af0',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#7f5af0',
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#7f5af0',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  button: {
    backgroundColor: '#7f5af0',
    paddingVertical: 14,
    paddingHorizontal: 48,
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

export default PersonalDetailsScreen;
