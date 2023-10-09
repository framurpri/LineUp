import React, { useState , useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import { Link, useParams } from 'react-router-native';
import { Avatar, Text} from 'react-native-paper';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, query, where, getDocs, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { List } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome'
import BottomBar from './BottomBar';

function Team(){

      const [datos, setDatos] = useState({});
      //const [teamNames, setTeamNames] = useState([]);
      const [docsIds, setDocsIds] = useState([]);
      const [playersLoaded, setPlayersLoaded] = useState(false);
      const [teamName, setTeamName] = useState('');
      const [captainEmail, setCaptainEmail] = useState('');
      const [captainName, setCaptainName] = useState('');
      const [teamPlayers, setTeamPlayers] = useState([]);
      const [teamDoc, setTeamDoc] = useState("");
      const [teamApplicants, setTeamApplicants] = useState([]);
      const [applied, setApplied] = useState(false);
      const [selectedImage, setSelectedImage] = useState(null);
      const [isLoading, setIsLoading] = useState(true);
      const [teamImgUrl, setTeamImgUrl] = useState('');
      const [imgAlreadySet, setImgAlreadySet ] = useState(false);

      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      const auth = getAuth(app);
      const storage = getStorage(app);
      const [teamImageRef, setTeamImageRef] = useState();

      const params = useParams();
      const { id } = params;
     
      useEffect(() => {
        retrieveDocument();
      }, [])

      useEffect(() => {
        setTeamImageRef(ref(storage, `teamImages/${teamName}.jpg`));
        getImage(ref(storage, `teamImages/${teamName}.jpg`))
      }, [teamName])
      
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

      useEffect(() => {
        console.log('teamApplicants ha cambiado:', teamApplicants);
        if(teamApplicants.includes(auth.currentUser.email) || teamPlayers.includes(auth.currentUser.email)){
          setApplied(true);
        }
      }, [teamApplicants]);

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
        setTeamImageRef(ref(storage, `teamImages/${teamName}.jpg`));
        setCaptainEmail(docSnap.data().userEmail);
        setIsLoading(false);
        console.log(docSnap.data().players)
        setTeamPlayers(docSnap.data().players);
        console.log(docSnap.data().applicants);
        setTeamApplicants(docSnap.data().applicants);
        console.log(teamApplicants); //Esta línea no se printea , no entiendo por qué
        //getCaptainInfo();
      }

      const openImagePicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      
        if (!result.canceled) {
          setSelectedImage(result.assets[0].uri);
          const response = await fetch(result.uri);
          const blob = await response.blob();
          try{
            await uploadBytes(teamImageRef, blob);
            console.log('Imagen subida con éxito.');
            getImage(teamImageRef);
          }catch (error){
            console.error('Error al cargar la imagen: ', error)
          }
        }
      };

      const getImage = async (teamImageRef) => {
        getDownloadURL(teamImageRef).then((url) => {
          setSelectedImage(true)
          setTeamImgUrl(url)
        }).catch((error) => {
          console.error('Error al obtener la URL de descarga:', error);
          setSelectedImage(false);
          setTeamImgUrl(null);
        })
      }

      const getCaptainInfo = async () => {
        const q = query(collection(db, "users"), where("email", "==", captainEmail));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot.docs[0].data().username);
        setCaptainName(querySnapshot.docs[0].data().username);
      }

      async function applyToTeam (){
        let newApplicants = [];
        newApplicants = teamApplicants;
        if(!newApplicants.includes(auth.currentUser.email)){
          newApplicants.push(auth.currentUser.email);
          await updateDoc(teamDoc, {
            applicants : newApplicants
          })
          setTeamApplicants(newApplicants);
          console.log(newApplicants);
          console.log("Update succesful!");
        }
      }

      function userIsCaptain(){
        return captainEmail == auth.currentUser.email;
      }

      function isPartOfTheTeam(){
        return teamPlayers.includes(auth.currentUser.email);
      }

    return(
      <View style={styles.container}>       
        <View style={styles.topContainer}>
          <View style={styles.leftContainer}>
            <View style={styles.avatarContainer}>
              {selectedImage ? (
                // Si hay una imagen seleccionada, muestra la imagen
                  <TouchableOpacity onLongPress={openImagePicker}>
                    <Image
                      source={{ uri: teamImgUrl }}
                      style={styles.imagen}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
              ) : (
              // Si no hay una imagen seleccionada, muestra el icono "+" y el texto "Agregar imagen"
                <>
                  <TouchableOpacity onPress={openImagePicker}>
                    <Avatar.Icon
                      style={styles.avatar}
                      icon="plus"
                      size={80}
                    />
                  </TouchableOpacity>
                  <Text style={{color: 'white'}}>Agregar imagen</Text>
                </>
                  )}
            </View>
          </View>
          <View style={styles.rightContainer}>
            <View style={styles.teamNameContainer}>
                  {isLoading ? (
                    <Text style={{justifyContent:'center', alignSelf: 'center', color: 'white'}}>Loading...</Text>
                    ) : (
                    <Text style={{fontWeight: 'bold', fontStyle: 'italic', color: 'white', fontSize: 30}}>{teamName}</Text>
                  )}
            </View>
            <View style={styles.buttonsContainer}>
                {isPartOfTheTeam() ? (
                  <Link to={{pathname: `/profile/teams/${id}/chat`}}>               
                    <Icon name="comments" size={40} color="#c9d8ff"/>
                  </Link>
                ) : null 
                }
                {!applied && !userIsCaptain() ?(
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
          </View>
        </View>
        <View style={styles.bottomContainer}>
            { playersLoaded && (
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 25, marginTop: 20}}>Jugadores</Text>
                <ScrollView style={{width: '90%'}}>
                  {teamPlayers.map((player) =>(
                    <View key={player} style={styles.row}>
                      <List.Item
                        title={player}
                        description=""
                        style={{width: '100%', flex: 1, justifyContent: 'center', marginLeft: 30}}
                        left={props => <List.Icon {...props} icon="account" style={{color: '#303747'}}/>}
                      />
                    </View>
                  ))}
                </ScrollView>
              </View>
             
            )
          }
        </View>
        <BottomBar></BottomBar>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column'
    },
    topContainer: {
      flex: 2.5,
      flexDirection: 'row',
      backgroundColor: '#303747'
    },
    bottomContainer: {
      flex: 7.5,
      backgroundColor: '#FFF4E8'
    },
    leftContainer: {
      flex: 3.5,
      backgroundColor: '#303747',
      alignItems: 'center',
      justifyContent: 'center',
    },
    rightContainer: {
      flex: 6.5,
      backgroundColor: '#303747',
      flexDirection: 'column',
    },
    avatarContainer: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    teamNameContainer: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50%'
    },
    buttonsContainer: {
      flex: 1,
      width: '100%',
      height: '50%',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    },
    imagen: {
      width: 100,
      height: 100,
      borderRadius: 30,
    },
    avatar: {
      backgroundColor: 'gray',
      width: 100,
      height: 100,
      borderRadius: 30,
    },
    row: {
      flex: 1,
      width: '100%',
      backgroundColor: '#F29C46',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 7,
    }
  })

export default Team;
