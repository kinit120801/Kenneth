import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; 
import AppButton from '../components/AppButton';

type Props = NativeStackScreenProps<RootStackParamList, 'WelcomeScreen'>;

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome To PasteBook</Text>
      <AppButton title="Login" onPress={() => navigation.navigate('Login')} />
      <AppButton 
        title="Sign Up" 
        onPress={() => navigation.navigate('Signup')} 
        style={{ backgroundColor: '#eee' }} 
        textStyle={{ color: '#1976d2' }} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
});

export default WelcomeScreen;