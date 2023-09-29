import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, SafeAreaView , Image} from 'react-native'
import { Routes, Route, Link, useParams } from 'react-router-native';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, query, where, getDocs, QuerySnapshot } from "firebase/firestore";
import Icon from 'react-native-vector-icons/FontAwesome'
import TopBar from './TopBar.jsx'
import DownBar from './DownBar';
import MyPlays from './Jugadas';
import Teams from './Teams';
import { SegmentedButtons } from 'react-native-paper';
import BottomBar from './BottomBar';
import HeaderBar from './HeaderBar';

function Profile(){

      const [username, setUsername] = useState('');
      const [value, setValue] = useState('');

      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      const auth = getAuth(app);
   
      const q = query(collection(db, "users"), where("email", "==", auth.currentUser.email));
      const getUserInfo = async () => {
        const querySnapshot = await getDocs(q);
        setUsername(querySnapshot.docs[0].data().username);
      }

      const handleShowPlays = () => {
        setToggleShowPlays(!showPlays);
      }

      const handleShowTeams = () => {
        setToggleShowTeams(!showTeams);
      }

      getUserInfo();

    return(
            <View style={styles.container}>
              <HeaderBar></HeaderBar>             
              <View style={styles.hr}></View>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require('./Resources/pelotaVoley.jpeg')} style={styles.image}/>
                <Text style={styles.profileUsername}>{username}</Text>
              </View>
              <View style={styles.hr}></View>
              <SafeAreaView style={styles.container2}>
                <SegmentedButtons
                  value={value}
                  onValueChange={setValue}
                  buttons={[
                  {
                    value: 'plays',
                    label: 'My plays',
                  },
                  {
                    value: 'teams',
                    label: 'My teams',
                  }
                  ]}
                />
              </SafeAreaView>

                {value=='plays' && (                  
                  <MyPlays></MyPlays>)}
              

                {value=='teams' && (                  
                  <Teams></Teams>)}
                  <BottomBar></BottomBar>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    container2: {
      flex: 1,
      width: '80%',
      display: 'flex',
      alignItems: 'center'
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
      flex: 1,
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

  });

export default Profile;
