import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { auth, database } from '../firebase/firebaseConfig';
import {ref, push, set} from 'firebase/database';

export default function DashboardScreen() {
  const router = useRouter();
  const [tracking, setTracking] = useState(false);
  const [locationSubscription, setLocationSubscription] = useState(null);
  const [locationData, setLocationData] = useState([]);
  const [tripID, setTripID] = useState(null);

  const startTracking = async () => { // Request location permissions
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Location access is required to start tracking.');
      return;
    }

    const newTripID = Date.now().toString();
    setTripID(newTripID);

    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 500,
        distanceInterval: 1,
      },
      (location) => {
        const { latitude, longitude, speed } = location.coords;
        const timestamp = location.timestamp;

        if (speed == null || speed == -1) return;

        const newEntry = { latitude, longitude, speed, timestamp };
        setLocationData((prev) => [...prev, newEntry]);
      }
    );

    setLocationSubscription(subscription);
    setTracking(true);
    Alert.alert('Trip Started', 'Tracking has begun.');
  };

  const stopTracking = async () => {
    if (locationSubscription) {
      locationSubscription.remove();
      setLocationSubscription(null);
    }

    setTracking(false);

    const userID = auth.currentUser.uid;
    const tripRef = push(ref(database, `trips/${userID}/${tripID}`));

    const tripData = {
      startTime: locationData[0]?.timestamp || new Date().toISOString(),
      endTime: locationData[locationData.length - 1]?.timestamp || new Date().toISOString(),
      sensorData: locationData,
    }

    await set(tripRef, tripData);

    Alert.alert('Trip Ended', 'Tracking has stopped.');
    setLocationData([]); // Clear data
    setTripID(null);
  }

  // TODO: Download to file option implementation
  const downloadData = () => {
    console.log('Collected Data:', locationData);
    Alert.alert('Download Requested', 'Data logged to console for now.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>Driving Data</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={async () => {
            try {
              await auth.signOut();
              // Navigate to login screen after successful logout
              router.replace('/login');
            } catch (error) {
              Alert.alert('Logout Error', error.message);
            }
          }}
          accessibilityLabel="Logout"
          activeOpacity={0.7}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Driving Data Dashboard</Text>
        <View style={styles.statusContainer}> 
          <Text style={styles.statusCombined}>
            Tracking Status: {''}
            <Text style={[tracking ? styles.online : styles.offline]}>
              {tracking ? 'Online' : 'Offline'}
            </Text>
          </Text>
        </View>
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
  statusContainer: {
    marginBottom: 40,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
  },
  online: {
    color: 'green',
  },
  offline: {
    color: 'red',
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});