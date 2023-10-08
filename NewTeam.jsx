import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from "firebase/firestore"; 
import Profile from './Profile';
import BottomBar from './BottomBar';

export default function NewTeam() {

  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');
  const [docRefId, setDocRefId] = useState('');
  const [createTeamSuccess, setCreateTeamSuccess] = useState(false);


  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
 
  async function docRef(){
    try {
      let players = [];
      players.push(auth.currentUser.email);
      let applicants = [];
      const docRefId = await addDoc(collection(db, "teams"), {
        team: teamName,
        description: description,
        userEmail: auth.currentUser.email,
        players: players,
        applicants: applicants,
      });
      setCreateTeamSuccess(true);
      console.log("Document written with ID: ", docRefId.id);
      createChatDoc(docRefId.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  
  if(createTeamSuccess){
    return <Profile></Profile>
  }

  function createChatDoc(teamDocId){
    try{
      addDoc(collection(db, "chat"), {
        teamId: teamDocId,
        messages: [],
      });
    console.log("Document written");
    }catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Creación de equipo</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del equipo"
        value={teamName}
        onChangeText={setTeamName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
      />
  
      <Button mode="contained" onPress = {docRef} style={{backgroundColor: '#F29C46', marginTop: '5%'}}>
              Crear equipo
        </Button>

      <BottomBar></BottomBar>
    </View>
  );
};

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
