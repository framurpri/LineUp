import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView, TextInput } from 'react-native'
import { Routes, Route, Link } from 'react-router-native';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"; 
import Icon from 'react-native-vector-icons/FontAwesome';
import TopBar from './TopBar.jsx'
import DownBar from './DownBar';

function Community(){

      const [datos, setDatos] = useState({});
      const [textInputSearch, setTextInputSearch] = useState('');
      const [teamsLoaded, setTeamsLoaded] = useState(false);


      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      const auth = getAuth(app);

/*
      const q = query(collection(db, "teams"), where("team", "==", textInputSearch));
      const getTeamsByName = async () => {
        console.log("Au!")
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            
          datos[doc.id] = doc.data();
        })
        const teams = Object.entries(datos).map(([clave, valor]) => {return `Team id es: ${clave} y el nombre es: ${valor.team}`});
        console.log(teams);
        setTeamsLoaded(true);
      };
*/
      const q = query(collection(db, "teams"));
      const getTeamsByName = async () => {
        console.log("Au!")
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          
          if(doc.data().team.includes(textInputSearch)){
            
            datos[doc.id] = doc.data();
          }

        })
        const teams = Object.entries(datos).map(([clave, valor]) => {return `Team id es: ${clave} y el nombre es: ${valor.team}`});
        console.log(teams);
        setTeamsLoaded(true);
      };
    return(
      <View style={styles.container}>
          <View>
            <View>
              <TopBar />
            </View>
            <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <View style={{width: '80%'}}>  
              <TextInput onChangeText={setTextInputSearch}></TextInput>
              </View>  
            <Pressable onPress= {getTeamsByName}>
                <Icon name="search" size={25} color="black"/>
            </Pressable>
            </View>
          </View>
          <View style={{ height: 650, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <Link to={{ pathname: '/community/newTeam' }}>
              <Text style={{ fontSize: 20, color: "#900", fontWeight: 'bold', width: '100%' }}>+   Create New team</Text>
            </Link>
          </View>
          <View>
            {teamsLoaded && (
            <ScrollView contentContainerStyle={styles.subview2}>
              {Object.entries(datos).map(([clave, valor]) => (
                <View key={clave} style={styles.row}>
                  <Link to={{pathname: `/profile/teams/${clave}`}}>
                    <Text style={{ fontSize: 20 }}>{valor.team}</Text>
                  </Link>
                </View>
              ))}
            </ScrollView>
            )
            }
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

export default Community;
