import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Placeholder to handle the logins logic
        console.log('Logging in with:', email, password);
    };

return (
<View style={styleSheet.container}>
    <Text style={styleSheet.title}>Login</Text>

    <TextInput
        style={styleSheet.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
    />

    <TextInput
        style={styleSheet.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
    />

    <Link href= "/register" style={styles.link}>Create an account</Link>
    <Link href= "/reset-password" style={styles.link}>Forgot password?</Link>

    <TouchableOpacity onPress={() => navigation.navigate('handleLogin')}>
        <Text style={styleSheet.link}>Continue</Text>
    </TouchableOpacity>
</View>
);
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 10, matignBottom: 10, borderRadius: 5 },
    link: { color: '#007BFF', marginBottom: 10, textAlign: 'center' },
    button: { backgroundColour: "#007BFF", padding: 15, borderRadius: 5, marginTop: 10 },
    buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold'},
});