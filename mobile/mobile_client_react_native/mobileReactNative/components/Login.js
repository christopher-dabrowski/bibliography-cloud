import React, { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';


export default function disableExpoCliLogging({ setLogin, setScreen, globalState, refreshPublications }) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const credentials = { 'jan': 'AAA', 'zupan': 'gros', 'Atrox': 'password' };

    const handleLogin = async () => {
        // const request = await fetch('http://localhost:8090');
        // alert(request.status);

        if (!credentials[login]) {
            alert('Nieprawidłowy login');
            return;
        }
        if (password !== credentials[login]) {
            alert('Nieprawidłowe hasło');
            return;
        }

        setLogin(login);

        refreshPublications();
        setScreen('PublicationList');
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