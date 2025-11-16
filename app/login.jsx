import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig"; 

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('Logged in as:', user.uid);

            router.replace('/driving-data');
        } catch (error) {
            console.error('Login error:', error.message);
            alert(error.message);
        }
    };

return (
<View style={styles.container}>
    <Text style={styles.title}>Login</Text>

    <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
    />

    <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
    />

    <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Continue</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={styles.link}>Create an account</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => router.push('/reset-password')}>
        <Text style={styles.link}>Forgot password?</Text>
    </TouchableOpacity>

</View>
);
}

const styles = StyleSheet.create({
   container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
    link: { color: '#007BFF', marginBottom: 10, textAlign: 'center' },
    button: { backgroundColor: '#007BFF', padding: 15, borderRadius: 5, marginTop: 10 },
    buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});