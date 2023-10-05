import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Routes, Route, Link } from 'react-router-native';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth, updatePassword } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore"; 
import Icon from 'react-native-vector-icons/FontAwesome';
import TopBar from './TopBar.jsx'
import DownBar from './DownBar';
import Main from './Main';
import BottomBar from './BottomBar';

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
          <Button mode="contained" onPress = {handlePasswordChange} style={{backgroundColor: '#F29C46', marginTop: '5%'}}>
              Cambiar contraseña
          </Button>  
        <BottomBar></BottomBar>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#303747',
  },
  text: {
    fontSize: 30,
    padding: 20,
    color: 'white'
  },
  input: {
    width: '80%',
    height: 40,
    marginBottom: '5%',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    },
  });

export default ChangePassword;
