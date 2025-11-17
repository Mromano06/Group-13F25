import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageError, setImageError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleImageError = () => {
    console.error('Failed to load logo image');
    setImageError(true);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Logged in as:', user.uid);

      router.replace('/driving-data');
    } catch (error) {
      console.error('Login error:', error.message);
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Background Elements */}
      <View style={styles.backgroundCircle1} />
      <View style={styles.backgroundCircle2} />
      <View style={styles.backgroundCircle3} />

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          {/* Logo */}
          <View style={styles.logoWrapper}>
            {!imageError ? (
              <Image
                source={require('../assets/trip-tracker-high-resolution-logo-transparent.png')}
                style={styles.logo}
                resizeMode="contain"
                onError={handleImageError}
                accessibilityLabel="Trip Tracker Logo"
              />
            ) : (
              <View style={styles.logoFallback}>
                <Text style={styles.logoFallbackText}>TT</Text>
              </View>
            )}
          </View>

          {/* Form */}
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color="rgba(255, 255, 255, 0.6)"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.primaryButton} 
              onPress={handleLogin}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryButtonText}>Login</Text>
            </TouchableOpacity>
          </View>

          {/* Navigation Links */}
          <View style={styles.linksContainer}>
            <TouchableOpacity 
              onPress={() => router.push('/register')}
              activeOpacity={0.7}
              style={styles.linkButton}
            >
              <Text style={styles.linkText}>Create an account</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => router.push('/reset-password')}
              activeOpacity={0.7}
              style={styles.linkButton}
            >
              <Text style={styles.linkText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
  },
  backgroundCircle1: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: '#00FF88',
    opacity: 0.08,
    top: -150,
    right: -100,
  },
  backgroundCircle2: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#00FF88',
    opacity: 0.06,
    bottom: 100,
    left: -80,
  },
  backgroundCircle3: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#00FF88',
    opacity: 0.05,
    top: '40%',
    left: '50%',
    marginLeft: -125,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 60,
    paddingBottom: 40,
    zIndex: 1,
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 200,
    height: 200,
    maxWidth: '70%',
    maxHeight: '70%',
  },
  logoFallback: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: '#1a1a1a',
    borderWidth: 3,
    borderColor: '#00FF88',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoFallbackText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#00FF88',
    letterSpacing: 2,
  },
  form: {
    width: '100%',
    marginBottom: 30,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 136, 0.2)',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 16,
    letterSpacing: 0.2,
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  passwordInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 136, 0.2)',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
    paddingRight: 50,
    fontSize: 16,
    color: '#ffffff',
    letterSpacing: 0.2,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 4,
  },
  primaryButton: {
    backgroundColor: '#00FF88',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: '#00FF88',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 10,
  },
  primaryButtonText: {
    color: '#0D1117',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  linksContainer: {
    alignItems: 'center',
    gap: 12,
  },
  linkButton: {
    paddingVertical: 8,
  },
  linkText: {
    fontSize: 15,
    color: '#00FF88',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
});
