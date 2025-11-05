import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, styleSheet } from 'react-native'

export default function LoginScreen({ navigation }) {
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

    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styleSheet.link}>Create an account</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
        <Text style={styleSheet.link}>Forgot password?</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate('handleLogin')}>
        <Text style={styleSheet.link}>Continue</Text>
    </TouchableOpacity>
</View>
);
}