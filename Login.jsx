import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-native'
import Registro from './Registro';
import { View,  StyleSheet, Text, Dimensions } from 'react-native';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import  Main  from './Main';
import Basic from './BasicStructPage';
import PruebaDownbar from './PruebaDownbar';
import { Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home.jsx';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [flatTextSecureEntry, setFlatTextSecureEntry] = useState(true);

  const { width , height } = Dimensions.get('window');

  const initialState = () => {
    flatTextPassword: 'Password';
    flatTextSecureEntry: true;
  }

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const inputActionHandler = (type, payload) =>
    dispatch({
      type: type,
      payload: payload,
    });

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
  }

    // Aquí puedes implementar la lógica para el inicio de sesión del usuario
   

  if (loginSuccess){
    console.log('Iniciando sesión...');
    console.log('Correo electrónico:', email);
    console.log('Contraseña:', password);
    return <>
      <NavigationContainer>
        <Home></Home>
      </NavigationContainer>
    </>
  }

  return (
    <View style={styles.container}>
    
      <View style={[styles.containerDiv, {width: width*0.85, height: height*0.6}]}>
        
        <Text style={styles.text}>INICIO DE SESIÓN</Text>

        <TextInput
              placeholder="Email"
              onChangeText={setEmail}
              left={
                <TextInput.Icon
                icon={() => (
                  <Icon
                    name="envelope"
                    size={24}
                    color = '#F29C46'
                  />
                )}
                />
              }
              style={[styles.input, {width: width*0.60}]}
            />

        <TextInput
              placeholder="Password"
              onChangeText={setPassword}
              value={password}
              secureTextEntry={flatTextSecureEntry}
              left={
                <TextInput.Icon
                icon={() => (
                  <Icon
                    name="lock"
                    size={24}
                    color='#F29C46'
                  />
                )}
                />
              }
              right={
                <TextInput.Icon
                  icon={flatTextSecureEntry ? 'eye' : 'eye-off'}
                  onPress={() => setFlatTextSecureEntry(!flatTextSecureEntry)}
                  forceTextInputFocus={false}
                  color = '#F29C46'
                />
              }
              style={[styles.input, {width: width*0.60}]}
          />

          <Button mode="contained" onPress = {handleLogin} style={{backgroundColor: '#F29C46'}}>
              Iniciar sesión
          </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 30,
    padding: 20,
    color: 'white'
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'white',
    color: 'black',
  },
  containerDiv: {
    backgroundColor: '#303747',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 5
  }
});
