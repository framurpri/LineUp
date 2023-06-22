import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { Link } from 'react-router-native';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import  Main  from './Main';
import Basic from './BasicStructPage';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);


  const handleLogin = () => {

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Signed in!');
      const user = userCredential.user;
      console.log(user.email);
      setLoginSuccess(true);

    })
    .catch(error => {
      console.log(error);

    })

    // Aquí puedes implementar la lógica para el inicio de sesión del usuario
    console.log('Iniciando sesión...');
    console.log('Correo electrónico:', email);
    console.log('Contraseña:', password);


  };

  if (loginSuccess){
    return <Basic></Basic>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>INICIO DE SESIÓN</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
        <Button title="Iniciar sesión" onPress={handleLogin} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'grey',
  },
  text: {
    fontSize: 30,
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
});