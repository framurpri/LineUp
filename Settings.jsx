import React from 'react';
import { View, Image, Text, TouchableHighlight, StyleSheet} from 'react-native';
import { NativeRouter, Routes, Route, Link } from 'react-router-native';

const Settings = () => {
    return (
      <View style={styles.container}>
            <Text style={styles.title}>LineUp</Text>
            <Link to={{ pathname: '/'}} style = {styles.button}>
                <Text >Cambiar Contraseña</Text>
          </Link>
          <Link to={{ pathname: '/'}} style = {styles.button}>
                <Text >Términos y Condiciones</Text>
          </Link>
          <Link to={{ pathname: '/'}} style = {styles.button}>
                <Text >Salir</Text>
          </Link>
          <Link to={{ pathname: '/'}} style={styles.buttonDelete}>
                <Text>Eliminar Cuenta</Text>
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
    },
    button: {
        backgroundColor: '#99CCFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: 140,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    buttonDelete: {
        backgroundColor: '#ff7272',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: 140,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
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

  export default Settings;
