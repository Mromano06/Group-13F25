import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function DrivingData() {
  const router = useRouter();

  const drivingStats = {
    DriverScore: 85, // Determined by the acceleration
    topSpeed: '123km/h',
    avgSpeed: '77km/h',
    tripDuration: '5h 30m',
    startLocation: 'New York',
    endLocation: 'Los Angeles',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driving Data Dashboard</Text>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Trip Started')}>
          <Text style={styles.buttonText}>Start Trip</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Trip Ended')}>
          <Text style={styles.buttonText}>End Trip</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Download Requested')}>
          <Text style={styles.buttonText}>Download Data</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Driver Score:</Text>
        <Text style={styles.value}>{drivingStats.DriverScore}</Text>

        <Text style={styles.label}>Top Speed:</Text>
        <Text style={styles.value}>{drivingStats.topSpeed}</Text>

        <Text style={styles.label}>Average Speed:</Text>
        <Text style={styles.value}>{drivingStats.avgSpeed}</Text>

        <Text style={styles.label}>Trip Duration:</Text>
        <Text style={styles.value}>{drivingStats.tripDuration}</Text>

        <Text style={styles.label}>Start Location:</Text>
        <Text style={styles.value}>{drivingStats.startLocation}</Text>

        <Text style={styles.label}>End Location:</Text>
        <Text style={styles.value}>{drivingStats.endLocation}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 20,
  },
  label: { fontSize: 16, color: '#555', marginTop: 10 },
  value: { fontSize: 20, fontWeight: '600', marginTop: 5 },
  buttonGroup: { marginTop: 10 },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
