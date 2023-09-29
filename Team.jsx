import React, { useState , useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView, Image } from 'react-native'
import { Routes, Route, Link, useParams } from 'react-router-native';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, query, where, getDocs, updateDoc } from "firebase/firestore";
import Icon from 'react-native-vector-icons/FontAwesome'
import TopBar from './TopBar.jsx'
import DownBar from './DownBar';
import Chat from './Chat.jsx';
import Applications from './Applications.jsx';
import PruebaDownbar from './PruebaDownbar';
import { NavigationContainer } from '@react-navigation/native';
import BottomBar from './BottomBar';

function Team(){

      const [datos, setDatos] = useState({});
      //const [teamNames, setTeamNames] = useState([]);
      const [docsIds, setDocsIds] = useState([]);
      const [playersLoaded, setPlayersLoaded] = useState(false);
      const [teamName, setTeamName] = useState('');
      const [captainEmail, setCaptainEmail] = useState('');
      const [captainName, setCaptainName] = useState('');
      const [teamPlayers, setTeamPlayers] = useState();
      const [teamDoc, setTeamDoc] = useState("");
      const [teamApplicants, setTeamApplicants] = useState([]);

      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      const auth = getAuth(app);

      const params = useParams();
      const { id } = params;


      const retrieveDocument = async () => {
        
        console.log(id)
        const docRef = doc(db, "teams", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
        setTeamDoc(docSnap.ref);
        setTeamName(docSnap.data().team);
        setCaptainEmail(docSnap.data().userEmail);
        console.log(docSnap.data().players)
        setTeamPlayers(docSnap.data().players);
        console.log(docSnap.data().applicants);
        setTeamApplicants(docSnap.data().applicants);
        console.log(teamApplicants); //Esta línea no se printea , no entiendo por qué
        //getCaptainInfo();
      }

      useEffect(() => {
        retrieveDocument();
      }, [])

      useEffect(() => {
        if(teamPlayers){
          setPlayersLoaded(true);
          console.log(teamPlayers)
        }
      }, [teamPlayers])

      useEffect(() => {

      if (captainEmail !== '') {
        getCaptainInfo();
        }
      }, [captainEmail])

      const getCaptainInfo = async () => {
        const q = query(collection(db, "users"), where("email", "==", captainEmail));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot.docs[0].data().username);
        setCaptainName(querySnapshot.docs[0].data().username);
      }

      async function applyToTeam (){
        let newApplicants = [];
        newApplicants = teamApplicants;
        newApplicants.push(auth.currentUser.email);
        await updateDoc(teamDoc, {
          applicants : newApplicants
        })
        console.log(newApplicants);
        console.log("Update succesful!");
      }

      function hasNotApplied(){
        return !teamApplicants.includes(auth.currentUser.email);
      }

      function userIsCaptain(){
        return captainEmail == auth.currentUser.email;
      }

    return(
      <View style={styles.container}>
                <View>
                    <TopBar />
                </View>           
            <View style={{ height: 650, alignItems: 'center', width: '100%' }}>
            <View style={styles.hr}></View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Image source={require('./Resources/voleyballTeam.png')} style={styles.image}/>
              <Text style={styles.teamAndCaptainText}>{teamName}</Text>
              <Link to={{pathname: `/profile/teams/${id}/chat`}}>               
                <Icon name="comments" size={40} color="#c9d8ff" style={{paddingLeft: 20}}/>
              </Link>
              {hasNotApplied() ? (
                <Icon name="user-plus" size={40} color="#c9d8ff" onPress={applyToTeam} />
              ) : null
              }
              {userIsCaptain() ? (
                <Link to={{pathname: `/profile/teams/${id}/applications`}}>
                  <Icon name="envelope" size={40} color="#c9d8ff"/>
                </Link>
              ) : null
              }
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Image source={require('./Resources/voleyballCaptain.png')} style={styles.image2}/>
              <Text style={styles.teamAndCaptainText}>Capitán: {captainName}</Text>
            </View>
            <View style={styles.hr}></View>
            { playersLoaded && (
              <View>
                <Text>Jugadores</Text>
                <ScrollView>
                  {teamPlayers.map((player) =>(
                    <View key={player} style={styles.row}>
                      <Text style={{ fontSize: 20 }}>{player}</Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )

            }
            </View>
            <BottomBar/>
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
    hr: {
      height: 1,
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
    },
    teamAndCaptainText: {
      paddingTop: 20,
      paddingBottom: 20,
      fontSize: 20,
    },
    image: {
      width: 40,
      height: 40,
      opacity: 1,
      },
      image2: {
        width: 70,
        height: 70,
        opacity: 1,
        },
  });

export default Team;
