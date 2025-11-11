import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';

// For testing 6UVc39PXQxT9VcdI1OApmrEciTs1, is my uid 

export default function DashboardScreen() {
  const [tracking, setTracking] = useState(false);
  const [locationSubscription, setLocationSubscription] = useState(null);
  const [locationData, setLocationData] = useState([]);

  const startTracking = async () => { // Request location permissions
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Location access is required to start tracking.');
      return;
    }

    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (location) => {
        const { latitude, longitude, speed } = location.coords;
        const timestamp = location.timestamp;

        // add check for null/-1 speed
        const newEntry = { latitude, longitude, speed, timestamp };
        setLocationData((prev) => [...prev, newEntry]); // Append new data point
      }
    );

    setLocationSubscription(subscription);
    setTracking(true);
    Alert.alert('Trip Started', 'Tracking has begun.');
  };

  const stopTracking = () => {
    if (locationSubscription) {
      locationSubscription.remove();
      setLocationSubscription(null);
    }
    setTracking(false);
    Alert.alert('Trip Ended', `Tracking stopped. ${locationData.length} data points collected.`);
  };

  const downloadData = () => {
    console.log('Collected Data:', locationData);
    Alert.alert('Download Requested', 'Data logged to console for now.');
    // Later: send to backend or export as file
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driving Data Dashboard</Text>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button} onPress={startTracking}>
          <Text style={styles.buttonText}>Start Trip</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={stopTracking}>
          <Text style={styles.buttonText}>End Trip</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={downloadData}>
          <Text style={styles.buttonText}>Download Data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  buttonGroup: {
    flexDirection: 'column',
    gap: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});