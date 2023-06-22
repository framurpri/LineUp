import React from 'react';
import { View, Image, Text, StyleSheet} from 'react-native';
import { NativeRouter, Link } from 'react-router-native';

function AuthMenu() {
  return(
        <View style={styles.container}>     
       <Image source={require('./Resources/FotoVoley.png')} style={styles.image} />
        <Text style={styles.title}>LineUp</Text>
        <Link to={{ pathname: '/authentication/login'}} style={styles.button}>
          <Text>Iniciar sesión</Text>
        </Link>
        <Link to={{ pathname: '/authentication/registro' }} style={styles.button}>
          <Text>Regístrate</Text>
        </Link>     
    </View>

  )

};


const styles = StyleSheet.create({
    container: {
      flex: 20,
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

export default AuthMenu;
