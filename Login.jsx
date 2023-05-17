import React from 'react';
import { View, Image, Text, TouchableHighlight, StyleSheet} from 'react-native';
import { NativeRouter, Routes, Route, Link } from 'react-router-native';
import  Registro  from './Registro.jsx'

const Log = () => (
  <View style={styles.container}>
    <Image source={require('./assets/FotoVoley.png')} style={styles.image} />
    <Text style={styles.title}>LineUp</Text>
    <Link to={{ pathname: '/login', search: '?param1=value1' }} style={styles.button}>
      <Text>Iniciar sesión</Text>
    </Link>
    <Link to={{ pathname: '/registro', search: '?param2=value2' }} style={styles.button}>
      <Text>Regístrate</Text>
    </Link>
  </View>
);



const Login = () => (
    <Routes>
      <Route path="/" element={<Log />} />
      <Route path="/login" element={<Log />} />
      <Route path="/registro" element={<Registro />} />
    </Routes>
);


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    button: {
        backgroundColor: '#99CCFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: 140,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: 10,
    },
    title: {
        marginBottom: 70,
        fontSize: 30,
    }
  });

  export default Login;
