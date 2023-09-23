import React, { useState } from 'react';
import { View, Image, Text, TouchableHighlight, StyleSheet, Pressable} from 'react-native';
import { NativeRouter, Routes, Route, Link } from 'react-router-native';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore } from "firebase/firestore"; 
import Icon from 'react-native-vector-icons/FontAwesome';
import DownBar from './DownBar';
import TopBar from './TopBar';
import { TextInput } from 'react-native-web';
import Main from './Main';
import PruebaDownbar from './PruebaDownbar'

const Settings = () => {

const [confirmDeletion, setConfirmDeletion ] = useState('');

const [showDeletionInput, setShowDeletionInput ] = useState(false);

const [deletionSucceeded, setDeletionSucceeded ] = useState(false);

const [logoutSuccessful, setLogoutSuccessful ] = useState(false);


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const handleDeleteUser = () => {

    if(confirmDeletion == 'CONFIRMAR' ){

      try{
        auth.currentUser.delete();
        setDeletionSucceeded(true)
        console.log("Usuario borrado!")
      }catch {
        console.log("No se ha podido borrar el usuario.")
      }
    }

  }

  const handleLogout = () => {

    signOut(auth).then(() => {
      console.log("Logout successful.")
      setLogoutSuccessful(true);
    }).catch((error) => {
      console.log("-----------ERROR----------")
      console.error(error);
    });
  }

  if(deletionSucceeded){
    return <Main>
    </Main>
  }

  if(logoutSuccessful){
    return(
    <Main/>
    )
  }

    return (
        <View style={styles.container}>
        
    <View style={{ height: 650, justifyContent: 'center', alignItems: 'center', width: '100%' }}>

    <Text style={styles.title}>LineUp</Text>
            <Link to={{ pathname: '/settings/changePassword'}} style = {styles.button}>
                <Text >Cambiar Contraseña</Text>
          </Link>
          <Link to={{ pathname: '/settings/terms'}} style = {styles.button}>
                <Text >Términos y Condiciones</Text>
          </Link>
          <Pressable onPress = {handleLogout} style = {styles.button}>
                <Text >Salir</Text>
          </Pressable>
          <Pressable onPress = {() => {
            setShowDeletionInput(true)
            handleDeleteUser()
          }} style = {styles.buttonDelete}>

                <Text>Eliminar Cuenta</Text>
          </Pressable>

          <TextInput onChangeText = {setConfirmDeletion} placeholder = "Escriba CONFIRMAR" style = {{opacity: showDeletionInput ? 1 : 0}}/>
        </View>
</View>
      
    );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    row: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    width: '100%',
    borderBottomColor: 'gray',
    
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
    staticContainer: {
      height: 100
    },
    subview1: {
      backgroundColor: 'red',
    },
    subview2: {
      flex: 1,
      width: 393,
    },
    item: {
      height: 50,
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    subview3: {
      backgroundColor: 'blue',
    },
  });

  

  export default Settings;
