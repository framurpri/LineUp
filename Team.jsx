import React, { useState , useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView, Image } from 'react-native'
import { Routes, Route, Link, useParams } from 'react-router-native';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, query, where, getDocs } from "firebase/firestore";
import Icon from 'react-native-vector-icons/FontAwesome'
import TopBar from './TopBar.jsx'
import DownBar from './DownBar';

function Team(){

      const [datos, setDatos] = useState({});
      //const [teamNames, setTeamNames] = useState([]);
      const [docsIds, setDocsIds] = useState([]);
      const [playersLoaded, setPlayersLoaded] = useState(false);
      const [teamName, setTeamName] = useState('');
      const [captainEmail, setCaptainEmail] = useState('');
      const [captainName, setCaptainName] = useState('');
      const [teamPlayers, setTeamPlayers] = useState()

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
        setTeamName(docSnap.data().team);
        setCaptainEmail(docSnap.data().userEmail);
        console.log(Object.keys(docSnap.data().players))
        setTeamPlayers(Object.keys(docSnap.data().players))
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

     // retrieveDocument();

      
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
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Image source={require('./Resources/voleyballCaptain.png')} style={styles.image2}/>
              <Text style={styles.teamAndCaptainText}>Capitán: {captainName}</Text>
            </View>
            <View style={styles.hr}></View>
            { playersLoaded && (
              <ScrollView>
                {teamPlayers.forEach((player) =>{
                  <View key={player} style={styles.row}>
                    <Text style={{ fontSize: 20 }}>{player}</Text>
                  </View>
                })}
              </ScrollView>
            )

            }
            </View>

            <View style={styles.staticContainer}>
              <DownBar>
                  <Link to={{ pathname: '/escenas'}}>
                      <Icon name="film" size={25} color="#900"/>
                  </Link>
                  <Link to={{pathname: '/community'}}>
                      <Icon name="group" size={25} color="#900" />
                  </Link>
                  <Link to={{pathname: '/profile'}}>
                      <Icon name="user" size={25} color="#900" />
                  </Link>
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
