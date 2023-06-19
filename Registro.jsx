import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet , Text, CheckBox} from 'react-native';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { NativeRouter, Routes, Route, Link } from 'react-router-native';
import  Main  from './Main';

function Registro() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleRegistration = () => {

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Account created!')
      const user = userCredential.user;
      console.log(user);
      setRegisterSuccess(true);
    })
    .catch(error =>   {
      console.log(error)
    })
  
  };

  if (registerSuccess){
    return <Main></Main>
  }

  return (
        <View style={styles.container}>
            <Text style={styles.text}>REGISTRO</Text>

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
            <View style={styles.checkboxContainer}>
                <CheckBox value={termsAccepted} onValueChange={setTermsAccepted} />
                <Text style={styles.checkboxLabel}>He leído y acepto los términos y condiciones</Text>
            </View>
              <Link to={{ pathname: '/home' }} style={styles.button}>
                <Button title="Registrar" onPress={handleRegistration} disabled={!termsAccepted} />
              </Link>
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
    fontSize: 50,
    padding: 70,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
});

export default Registro
