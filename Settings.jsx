import React from 'react';
import { View, Image, Text, TouchableHighlight, StyleSheet} from 'react-native';
import { NativeRouter, Routes, Route, Link } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DownBar from './DownBar';
import TopBar from './TopBar';

const Settings = () => {
    return (
      <View style={styles.container}>
        <View>
        <TopBar/>
        </View>
        <View>
            <Text style={styles.title}>LineUp</Text>
            <Link to={{ pathname: '/settings/changePassword'}} style = {styles.button}>
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
            <View style={styles.staticContainer}>
                <DownBar>
                    <Link to={{ pathname: '/escenas'}}>
                        <Icon name="film" size={25} color="#900"/>
                    </Link>
                    <Icon name="group" size={25} color="#900" />
                    <Icon name="user" size={25} color="#900" />
                    <Link to={{ pathname: '/settings'}}>
                        <Icon name="cog" size={25} color="#900" />
                    </Link>
                </DownBar>
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
    },
    staticContainer: {
        height: 100
      },
  });

  export default Settings;
