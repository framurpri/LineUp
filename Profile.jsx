import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView , Image} from 'react-native'
import { Routes, Route, Link, useParams } from 'react-router-native';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, query, where, getDocs, QuerySnapshot } from "firebase/firestore";
import Icon from 'react-native-vector-icons/FontAwesome'
import TopBar from './TopBar.jsx'
import DownBar from './DownBar';

function Profile(){

      const [username, setUsername] = useState('');

      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      const auth = getAuth(app);
   
      const q = query(collection(db, "users"), where("email", "==", auth.currentUser.email));
      const getUserInfo = async () => {
        const querySnapshot = await getDocs(q);
        setUsername(querySnapshot.docs[0].data().username);
      }

      getUserInfo();
      
    return(
      <View style={styles.container}>
                <View>
                    <TopBar />
                </View>           
            <View style={{ height: 650, alignItems: 'center', width: '100%'}}>
              <View style={styles.hr}></View>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require('./Resources/pelotaVoley.jpeg')} style={styles.image}/>
                <Text style={styles.profileUsername}>{username}</Text>
              </View>
              <View style={styles.hr}></View>
              <Text style={styles.textMyPlays}>My plays</Text>
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
  image: {
    width: 40,
    height: 40,
    opacity: 1,
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
    profileUsername: {
      paddingTop: 20,
      paddingBottom: 20,
      fontSize: 20,
    },
    textMyPlays: {
      fontSize: 17,
      paddingTop: 20,
      fontWeight: 'bold'
    }

  });

export default Profile;
