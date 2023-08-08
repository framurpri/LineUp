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
import { firebaseConfig } from './firebase-config.js';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, query, where, getDocs, updateDoc } from "firebase/firestore";
import { ScrollView } from 'react-native-web';


export default function Applications() {

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);
    const params = useParams();
    const { id } = params;
    const [docRef, setDocRef] = useState('');
    const [teamApplicants, setTeamApplicants] = useState([]);
    const [teamPlayers, setTeamPlayers] = useState([]);
   
    const retrieveTeamDocument = async () => {
        
        console.log(id)
        const docRef = doc(db, "teams", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
        setTeamApplicants(docSnap.data().applicants);
        setTeamPlayers(docSnap.data().players);
        console.log(docSnap.data().applicants);
        setDocRef(docRef);
      }

      useEffect(() => {
        retrieveTeamDocument();
      }, [])

      async function acceptApplicant(applicant){
        let newPlayer = [];
        newPlayer = teamPlayers;
        newPlayer.push(applicant);
        let updatedApplicants = [];
        updatedApplicants = teamApplicants;
        let index = updatedApplicants.indexOf(applicant);
        updatedApplicants.splice(index, 1);
        await updateDoc(docRef, {
          players : newPlayer,
          applicants : updatedApplicants
        })
      }

      async function denyApplicant(applicant){
        let updatedApplicants = [];
        updatedApplicants = teamApplicants;
        let index = updatedApplicants.indexOf(applicant);
        updatedApplicants.splice(index, 1);
        await updateDoc(docRef, {
            applicants : updatedApplicants
        })
      }

    return (
        <View style={{ flex: 1 }}>
            <Text>Hola</Text>
            <ScrollView>
                {teamApplicants.map(applicant => (
                    <View key={applicant} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Text>{applicant}</Text>
                        <Icon name="check" size={40} color="#03E833" style={{paddingLeft: 20}} onPress={acceptApplicant(applicant)}/>
                        <Icon name="minus" size={40} color="#E80311" style={{paddingLeft: 20}} onPress={denyApplicant(applicant)}/>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
  }

