import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native'
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
      const [isLoading, setIsLoading] = useState(true);
      const [teamName, setTeamName] = useState('');
      const [captainEmail, setCaptainEmail] = useState('');
      const [captainName, setCaptainName] = useState('');

      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      const auth = getAuth(app);
      
      const params = useParams();
      const { id } = params;
      console.log(id)

      const retrieveDocument = async () => {
    
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
        console.log(captainEmail);
        getCaptainInfo();
      }

      const getCaptainInfo = async () => {
        const q = query(collection(db, "users"), where("email", "==", captainEmail));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot.docs[0].data().username);
        setCaptainName(querySnapshot.docs[0].data().username);
      }

      retrieveDocument();

      
    return(
      <View style={styles.container}>
                <View>
                    <TopBar />
                </View>           
            <View style={{ height: 650, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
              <Text>{teamName}</Text>
              <Text>Capitán: {captainName}</Text>
            </View>

            <View style={styles.staticContainer}>
              <DownBar>
                  <Link to={{ pathname: '/escenas'}}>
                      <Icon name="film" size={25} color="#900"/>
                  </Link>
                  <Link to={{pathname: '/teams'}}>
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
  });

export default Team;
