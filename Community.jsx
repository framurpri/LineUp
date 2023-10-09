import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, Dimensions,  } from 'react-native'
import { Link } from 'react-router-native';
import { TextInput, IconButton, List } from 'react-native-paper';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, getDocs } from "firebase/firestore"; 
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import BottomBar from './BottomBar';


function Community(){

      const [datos, setDatos] = useState({});
      const [datos1, setDatos1] = useState({});
      const [teamImgsDicc, setTeamImgsDicc] = useState({});
      const [playerImgsDicc, setPlayerImgsDicc] = useState({});
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
        const nuevosDatos = {};
        setPlayersLoaded(false);
        setTeamsLoaded(false);
        const q = query(collection(db, "teams"));
        const querySnapshot = await getDocs(q);
               
        querySnapshot.forEach(async (doc) => {
          if (doc.data().team.toLowerCase().startsWith(search.toLowerCase())) {
            await getImage(ref(storage, `teamImages/${doc.data().team}.jpg`), doc.data().team, false);
            nuevosDatos[doc.id] = doc.data();
          }
        });
        
        setTimeout(() => {
          if (Object.keys(nuevosDatos).length === 0) {
            setTeamsNotFound(true);
            console.log("Búsqueda sin resultados.");
          } else {
            setDatos(nuevosDatos)
            const teams = Object.entries(datos).map(([clave, valor]) => { return `Team id es: ${clave} y el nombre es: ${teamImgsDicc[valor.team]}` });
            setTeamsLoaded(true);
          }  
        }, 1000)
        
      };

      const getPlayersByName = async () => {
        setTeamsLoaded(false);
        setPlayersLoaded(false);
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);
        const nuevosDatos = {};
        querySnapshot.forEach(async (doc) => {
          if(doc.data().username.toLowerCase().startsWith(search.toLowerCase())){
            await getImage(ref(storage, `playerImages/${doc.data().username}.jpg`), doc.data().username, true);
            nuevosDatos[doc.id] = doc.data();
          }
        })
        
        setTimeout(() => {
          if(Object.keys(nuevosDatos).length === 0){
            setPlayersNotFound(true)
            console.log("Búsqueda sin resultados.")
          }else{
            setDatos1(nuevosDatos)
            setPlayersLoaded(true);
          }
        }, 1000)
      };

      const getImage = async (imageRef, key, isPlayer) => {
        await getDownloadURL(imageRef).then((url) => {
          isPlayer ? playerImgsDicc[key] = url : teamImgsDicc[key] = url;
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
                      setTeamsLoaded(false)
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
                        setPlayersLoaded(false)
                      }
                      }
                      />
                      <Text>Equipo</Text>
              </View>
          </View>
          <View style={styles.bottomContainer}>
              <View style={{height: '5%'}}>
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
              <View style={{height: '50%', flex: 1}}>
                <ScrollView style={styles.containerScrollView} contentContainerStyle={{ justifyContent: 'space-between' }}>
                      {teamsLoaded && (
                        <View style={{flex:1}}>
                        <List.Section style={{width:width}}>
                                {Object.entries(datos).map(([clave, valor]) => (            
                                <View key={clave} style={styles.row}>
                                  <Link to={{pathname: `/profile/teams/${clave}`}}>
                                    <List.Item 
                                    title={valor.team} 
                                    left={() => <Image
                                      source={{ uri: teamImgsDicc[valor.team] }}
                                      style={styles.imagen}
                                      resizeMode="contain"
                                    />}/>
                                  </Link>
                                </View>
                                ))}
                          </List.Section>
                          </View>
                      )
                      }
                      {playersLoaded && (
                            <View style={{flex:1}}>
                            <List.Section style={{width:width}}>
                                {Object.entries(datos1).map(([clave, valor]) => (            
                                <View key={clave} style={styles.row}>
                                    <List.Item 
                                    title={valor.username} 
                                    left={() => <Image
                                      source={{ uri: playerImgsDicc[valor.username] }}
                                      style={styles.imagen}
                                      resizeMode="contain"
                                    />}/>
                                </View>
                                ))}
                            </List.Section>
                            </View>
                      )
                    }     
                </ScrollView>
              </View>
              <View style={{height: '20%'}}>
                <BottomBar focused={2}></BottomBar>
              </View>
          </View>
      </View>
    )
}

const {width, height} = Dimensions.get('window')

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
    containerScrollView: {
      flexGrow: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      height: 200,
      width: width
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
      flex: 6.5
    },
    row: {
    flexDirection: 'row',
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
    playerList: {
      flex: 1
    },
    teamList: {
      flex: 1
    }
  });

export default Community;
