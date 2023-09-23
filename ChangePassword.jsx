import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button, Pressable, ScrollView } from 'react-native'
import { Routes, Route, Link } from 'react-router-native';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth, updatePassword } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore"; 
import Icon from 'react-native-vector-icons/FontAwesome';
import TopBar from './TopBar.jsx'
import DownBar from './DownBar';
import Main from './Main';

function  ChangePassword(){

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userDocId, setUserDocId] = useState('');
    const [changePasswordSuccess, setChangePasswordSuccess] = useState(false);

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);

    const handlePasswordChange = async () => {
      debugger;
      getUser();
      if(newPassword == confirmPassword){
        const docRef = doc(db, "users", userDocId);
        await updateDoc(docRef, {
          password : newPassword
        })
        await updatePassword(auth.currentUser, newPassword).then(() => {
          console.log("La contraseña se ha actualizado correctamente.")
        }).catch((error) => {
          console.log("La contraseña no ha podido actualizarse.")
        });
      console.log("Referencia actualizada.")
      setChangePasswordSuccess(true);
      }else{
        console.log("Las contraseñas no coinciden. Pon un alert");
      }
    }

    const getUser = async () => {
      const q = query(collection(db, "users"), where("email", "==", auth.currentUser.email));
      const querySnapshot = await getDocs(q);
      setUserDocId(querySnapshot.docs[0].id);
    }
    
    if(changePasswordSuccess){
      return <Main></Main>;    
    }

    return(
      <View style={styles.container}>
          <View>
            <TopBar />
          </View>
        <View style={{ height: 650, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <Text style={styles.text}>Cambiar contraseña</Text>
          
          <TextInput
              style={styles.input}
              placeholder="Contraseña"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
          />
          <TextInput
              style={styles.input}
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
          />                        

          <Button title="Cambiar Contraseña" onPress={handlePasswordChange}/>      
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
    )
}

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
  input: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
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

export default ChangePassword;
