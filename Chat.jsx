import React, { useState , useEffect } from 'react';
import Constants from 'expo-constants'
import { View, StyleSheet, Text, TextInput, Pressable } from 'react-native'
import { useParams } from 'react-router-native';
import Basic from './BasicStructPage.jsx'
import Login from './Login.jsx'
import CreatePlayer from './createPlayer.jsx'
import { NavMenu } from './NavMenu.jsx'
import  AuthMenu from './AuthMenu.jsx'
import Teams from './Teams.jsx'
import { NewTeam } from './NewTeam.jsx'
import Team from './Team.jsx';
import ChangePassword from './ChangePassword.jsx'
import Icon from 'react-native-vector-icons/FontAwesome';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, query, where, getDocs, updateDoc } from "firebase/firestore";


export default function Chat() {

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);
    const params = useParams();
    const { id } = params;
    const [teamName, setTeamName] = useState('');
    const [msgContent, setMsgContent] = useState('');

    //Get el doc de la colección chat del team en concreto
    //Updatear el array messages. Appendear un message. 
    //Luego ya mostrarlos y tal.

    
    console.log( "Hello" + id);
/*
    const retrieveTeamDocument = async () => {
      const docRef = doc(db, "teams", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      setTeamName(docSnap.data().team);
      console.log(teamName);
    }
    retrieveDocument();
 */

    async function retrieveChatDocument(){
      
      const q1 = query(collection(db, "users"), where("email", "==", auth.currentUser.email));
      const querySnapshot1 = await getDocs(q1);
      console.log(querySnapshot1.docs[0].data().username);
      let loggedUsername = querySnapshot1.docs[0].data().username;
      const q = query(collection(db, "chat"), where("teamId", "==", id));
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot.docs[0].data().messages);
      let mensajes = [];
      mensajes = querySnapshot.docs[0].data().messages;
      mensajes.push({content: msgContent, fecha: new Date(), user: loggedUsername})
      console.log(mensajes);
      console.log(msgContent);
      updateChat(mensajes, querySnapshot.docs[0].ref);
    }

    async function updateChat(mensajes, docRefId){
      await updateDoc(docRefId, {
        messages : mensajes
      })
      console.log("Update succesful!");
    }


    return (
        <View style={{ flex: 1 }}>
            <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{width: '80%'}}>  
                  <TextInput
                    placeholder=""
                    value={msgContent}
                    onChangeText={setMsgContent}
                  />
                </View>  
                <Pressable onPress={retrieveChatDocument}>
                    <Icon name="send" size={25} color="black"/>
                </Pressable>
            </View>
            <Text>Hola</Text>
        </View>
    )
  }

