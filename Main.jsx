import React from 'react'
import Constants from 'expo-constants'
import {Text, View, Image, StyleSheet, TouchableHighlight } from 'react-native'

  const Main = () => {
    return (
        <View style={styles.container}>
            <Image source ={require('./assets/FotoVoley.png')} style={styles.image}/>
            <Text style={styles.title}>LineUp</Text>
            <TouchableHighlight style={styles.button}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button}   >
                <Text style={styles.buttonText}>Regístrate</Text>
            </TouchableHighlight>
        </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    button: {
        backgroundColor: 'blue',
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

  export default Main

