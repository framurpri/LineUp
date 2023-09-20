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
import {Button, ButtonGroup} from "@nextui-org/react";


function Community(){

      const [datos, setDatos] = useState({});
      const [textInputSearch, setTextInputSearch] = useState('');
      const [playerInputSearch, setPlayerInputSearch] = useState('');
      const [teamsLoaded, setTeamsLoaded] = useState(false);
      const [teamsNotFound, setTeamsNotFound] = useState(false);
      const [playersLoaded, setPlayersLoaded] = useState(false);
      const [playersNotFound, setPlayersNotFound] = useState(false);
      


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
      const getTeamsByName = async () => {
        debugger;
        const q = query(collection(db, "teams"));
        console.log("Au!")
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          
          if(doc.data().team.includes(textInputSearch)){
            datos[doc.id] = doc.data();
          }
        })
        
        if(Object.keys(datos).length === 0){
          setTeamsNotFound(true)
          console.log("Búsqueda sin resultados.")
        }else{
          const teams = Object.entries(datos).map(([clave, valor]) => {return `Team id es: ${clave} y el nombre es: ${valor.team}`});
          console.log(teams);
          setTeamsLoaded(true);
        }
      };

      const getPlayersByName = async () => {
        debugger; 
        const q = query(collection(db, "users"));
        console.log("Au!")
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.data())
          if(doc.data().username.includes(playerInputSearch)){
            datos[doc.id] = doc.data();
          }
        })
        
        if(Object.keys(datos).length === 0){
          setPlayersNotFound(true)
          console.log("Búsqueda sin resultados.")
        }else{
          const players = Object.entries(datos).map(([clave, valor]) => {return `Player id es: ${clave} y el nombre es: ${valor.username}`});
          console.log(players);
          setPlayersLoaded(true);
        }
      };

      
    return(
      <View style={styles.container}>
          <View>
            <View>
              <TopBar />
            </View>
            <View>
              <View>
                <View style = {{paddingTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>¿Buscas un equipo?</Text>
                </View>
                <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                  <View style={{width: '80%'}}>  
                    <TextInput style={styles.input} onChangeText={setTextInputSearch}></TextInput>
                  </View>  
                  <Pressable style={styles.pressable} onPress= {getTeamsByName}>
                    <Icon name="search" size={25} color="black"/>
                  </Pressable>
                </View>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {teamsNotFound && (
                <Text style={{fontSize: 17}}>No existen equipos con el nombre que buscas.</Text>
                )}
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {playersNotFound && (
                <Text style={{fontSize: 17}}>No existen jugadores con el nombre que buscas.</Text>
                )}
              </View>
              <View>
                <View style = {{paddingTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>¿Buscas un jugador?</Text>
                </View>
                <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                  <View style={{width: '80%'}}>  
                    <TextInput style={styles.input} onChangeText={setPlayerInputSearch}></TextInput>
                  </View>  
                  <Pressable style={styles.pressable} onPress= {getPlayersByName}>
                    <Icon name="search" size={25} color="black"/>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>

          <View style={{ height: 650, alignItems: 'center', width: '100%' }}>
            <Link style={styles.button} to={{ pathname: '/community/newTeam' }}>
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
          <View>
            {playersLoaded && (
            <ScrollView contentContainerStyle={styles.subview2}>
              {Object.entries(datos).map(([clave, valor]) => (
                <View key={clave} style={styles.row}>
                  <Link to={{pathname: `/profile/${clave}`}}>
                    <Text style={{ fontSize: 20 }}>{valor.username}</Text>
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
    input: {
      height: 40,
      marginBottom: 10,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      backgroundColor: '#fff',
    },
    pressable: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      backgroundColor: '#fff',
    },
    button: {
      backgroundColor: '#3498db',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default Community;
