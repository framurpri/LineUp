import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView,  } from 'react-native'
import { Routes, Route, Link } from 'react-router-native';
import { Button, TextInput, IconButton, List } from 'react-native-paper';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TopBar from './TopBar.jsx'
import DownBar from './DownBar';


function Community(){

      const [datos, setDatos] = useState({});
      const [teamImgsDicc, setTeamImgsDicc] = useState({});
      const [textInputSearch, setTextInputSearch] = useState('');
      const [playerInputSearch, setPlayerInputSearch] = useState('');
      const [teamsLoaded, setTeamsLoaded] = useState(false);
      const [teamsNotFound, setTeamsNotFound] = useState(false);
      const [playersLoaded, setPlayersLoaded] = useState(false);
      const [playersNotFound, setPlayersNotFound] = useState(false);
      const [search, setSearch] = useState("");
      const [teamSearch, setTeamSearch] = useState(false);
      const [playerSearch, setPlayerSearch] = useState(false);
      const [chooseSearch, setChooseSearch] = useState(false);
      const [teamImgUrl, setTeamImgUrl] = useState('');
      
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      const auth = getAuth(app);
      const storage = getStorage(app);

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
      const checkSearchType = () => {
        if(teamSearch){
          getTeamsByName()
        }else if(playerSearch){
          getPlayersByName()
        }else{
          setChooseSearch(true)
          console.log("Por favor seleccione equipos o jugadores.")
        }
      }
      const getTeamsByName = async () => {
        setPlayersLoaded(false);
        setTeamsLoaded(false);
        const q = query(collection(db, "teams"));
        console.log("Au!")
        const querySnapshot = await getDocs(q);
               
        querySnapshot.forEach(async (doc) => {
          if (doc.data().team.toLowerCase().includes(search.toLowerCase())) {
            await getImage(ref(storage, `teamImages/${doc.data().team}.jpg`), doc.data().team);
            datos[doc.id] = doc.data();
          }
        });
     
        if (Object.keys(datos).length === 0) {
          setTeamsNotFound(true);
          console.log("Búsqueda sin resultados.");
        } else {
          const teams = Object.entries(datos).map(([clave, valor]) => { return `Team id es: ${clave} y el nombre es: ${teamImgsDicc[valor.team]}` });
          console.log(teams);
          setTeamsLoaded(true);
        }
      };

      const getPlayersByName = async () => {
        setPlayersLoaded(false);
        setTeamsLoaded(false);
        const q = query(collection(db, "users"));
        console.log("Au!")
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.data())
          if(doc.data().username.includes(search)){
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

      const getImage = async (teamImageRef, teamName) => {
        await getDownloadURL(teamImageRef).then((url) => {
          teamImgsDicc[teamName] = url
        }).catch((error) => {
          console.error('Error al obtener la URL de descarga:', error);
        })
      }

      
    return(
      <View style={styles.container}>
          <View style={styles.topContainer}>
              <View style={styles.topLeftContainer}>
                  <TextInput
                    placeholder="Yuji Nishida..."
                    onChangeText={setSearch}
                  />
                  <IconButton
                  icon="magnify"
                  iconColor="#F29C46"
                  containerColor="#303747"
                  size={40}
                  onPress={() => 
                    checkSearchType()
                  }
                  />
              </View>
              <View style={styles.topRightContainer}>
                  <Link to={{pathname: '/community/newTeam'}}>
                    <IconButton
                      icon="plus"
                      iconColor="#F29C46"
                      containerColor="#303747"
                      size={40}
                      />
                  </Link>
              </View>
          </View>
          <View style={styles.middleContainer}>
              <View style={styles.middleLeftContainer}>
                  <IconButton
                    icon="account"
                    iconColor="#F29C46"
                    containerColor="#303747"
                    size={40}
                    style={{opacity: playerSearch?1:0.7}}
                    onPress={() => {          
                      setPlayerSearch(true)
                      setTeamsNotFound(false)
                      setTeamSearch(false)
                      setChooseSearch(false)
                    }
                    }
                    />
                  <Text>Jugador</Text>
              </View>
              <View style={styles.middleRightContainer}>
                  <IconButton
                      icon="account-group"
                      iconColor="#F29C46"
                      containerColor="#303747"
                      size={40}
                      style={{opacity: teamSearch?1:0.7}}
                      onPress={() => {
                        setTeamSearch(true)
                        setPlayersNotFound(false)
                        setPlayerSearch(false)
                        setChooseSearch(false)
                      }
                      }
                      />
                      <Text>Equipo</Text>
              </View>
          </View>
          <View style={styles.bottomContainer}>
              <View style={styles.searchResultTexts}>
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                      {chooseSearch && (
                      <Text style={{fontSize: 17}}>Por favor, seleccione si desea buscar equipos o jugadores.</Text>
                      )}
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
              </View>
              <View style={styles.teamList}>
                  {teamsLoaded && (
                    <List.Section>
                          <ScrollView contentContainerStyle={styles.subview2}>
                            {Object.entries(datos).map(([clave, valor]) => (            
                            <View key={clave} style={styles.row}>
                              <Link to={{pathname: `/profile/teams/${clave}`}}>
                                <List.Item title={valor.team} left={() => <Image
                                                                            source={{ uri: teamImgsDicc[valor.team] }}
                                                                            style={styles.imagen}
                                                                            resizeMode="contain"
                                                                          />}/>
                              </Link>
                            </View>
                            ))}
                          </ScrollView>
                        </List.Section>
                  )
                  }
              </View>
              <View style={styles.playerList}>
                  {playersLoaded && (
                  <ScrollView contentContainerStyle={styles.subview2}>
                        <List.Section>
                            {Object.entries(datos).map(([clave, valor]) => (            
                            <View key={clave} style={styles.row}>
                              <Link to={{pathname: `/profile/${clave}`}}>
                                <List.Item title={valor.username} left={() => <List.Icon icon="account-group" />}/>
                                </Link>
                            </View>
                            ))}
                        </List.Section>
                  </ScrollView>
                  )
                  }     
              </View>
          </View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    topContainer: {
      flex: 2,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    topLeftContainer: {
      flex: 7,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    topRightContainer: {
      flex: 2.5,
      alignItems: 'center'
    },
    middleContainer: {
      flex: 1.5,
      flexDirection: 'row',
      justifyContent: 'flex',
      alignItems: 'center'
    },
    middleLeftContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    middleRightContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    bottomContainer: {
      flex: 7
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
    imagen: {
      width: 100,
      height: 100,
      borderRadius: 30,
    },
  });

export default Community;
