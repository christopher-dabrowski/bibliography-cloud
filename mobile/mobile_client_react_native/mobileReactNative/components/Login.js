import React, { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';


export default function disableExpoCliLogging() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const credentials = { 'jan': 'AAA', 'zupan': 'gros', 'Atrox': 'password' };

    const handleLogin = () => {
        if (!credentials[login]) {
            alert('Nieprawidłowy login');
            return;
        }
        if (password !== credentials[login]) {
            alert('Nieprawidłowe hasło');
            return;
        }
    };

    return (
        <View>
            <Text>Zaloguj się na swoje konto</Text>
            <TextInput
                style={{ height: 40 }}
                placeholder="Login"
                value={login}
                onChangeText={(text) => setLogin(text)}
            />
            <TextInput
                style={{ height: 40 }}
                placeholder="Hasło"
                value={password}
                textContentType="password"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
            />
            <Button title="Zaloguj" onPress={handleLogin} />
        </View>
    );
}