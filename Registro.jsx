import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet , Text, CheckBox} from 'react-native';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc } from "firebase/firestore"; 
import { NativeRouter, Routes, Route, Link } from 'react-router-native';
import  Main  from './Main';


export function Registro() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);  

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  const handleRegistration = () => {

    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      console.log('Account created!')
      const user = userCredential.user;
      console.log(user);
      setRegisterSuccess(true);
      try {
        const docRef = await addDoc(collection(db, "users"), {
          email: user.email,
          username: username,
          password: password
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
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
                placeholder="Nombre de usuario"
                value={username}
                onChangeText={setUsername}
            />     
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
            <TextInput
                style={styles.input}
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />                        
            <View style={styles.checkboxContainer}>
                <CheckBox value={termsAccepted} onValueChange={setTermsAccepted} />
                <Text style={styles.checkboxLabel}>He leído y acepto los términos y condiciones</Text>
            </View>
                <Button title="Registrar" onPress={handleRegistration} disabled={!termsAccepted} />      
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


