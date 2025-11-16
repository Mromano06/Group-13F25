import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function Hero() {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    console.error('Failed to load logo image');
    setImageError(true);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Animated Background Elements */}
      <View style={styles.backgroundCircle1} />
      <View style={styles.backgroundCircle2} />
      <View style={styles.backgroundCircle3} />
      
      {/* Main Content */}
      <View style={styles.content}>
        {/* Logo Section - Centered */}
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

        {/* Buttons Section */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push('/register')}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryButtonText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push('/login')}
            activeOpacity={0.85}
          >
            <Text style={styles.secondaryButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 120,
    paddingBottom: 80,
    paddingHorizontal: 32,
    zIndex: 1,
  },
  logoWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  logo: {
    width: 320,
    height: 320,
    maxWidth: '85%',
    maxHeight: '85%',
  },
  logoFallback: {
    width: 180,
    height: 180,
    borderRadius: 40,
    backgroundColor: '#1a1a1a',
    borderWidth: 3,
    borderColor: '#00FF88',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoFallbackText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#00FF88',
    letterSpacing: 2,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
    paddingBottom: 10,
  },
  primaryButton: {
    backgroundColor: '#00FF88',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
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
  secondaryButton: {
    backgroundColor: 'rgba(0, 255, 136, 0.08)',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(0, 255, 136, 0.5)',
  },
  secondaryButtonText: {
    color: '#00FF88',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
