import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import {SegmentedButtons, Avatar, IconButton, Text} from 'react-native-paper';
import Plays from './Plays';
import Teams from './Card';
import BottomBar from './BottomBar';

const AvatarExample = () => {
  const [imagenUri, setImagenUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [username, setUsername] = useState('');
  const [value, setValue] = useState('plays');
  const [isLoading, setIsLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [tempName, setTempName] = useState(''); // Estado temporal para seguimiento de cambios
  const [playerImageRef, setPlayerImageRef] = useState();
  const [playerImgUrl, setPlayerImgUrl] = useState('');

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app);

  const q = query(collection(db, "users"), where("email", "==", auth.currentUser.email));

  const getUserInfo = async () => {
    const querySnapshot = await getDocs(q);
    setUsername(querySnapshot.docs[0].data().username);
    setIsLoading(false)
  }

  useEffect(() => {
    setPlayerImageRef(ref(storage, `playerImages/${username}.jpg`));
    getImage(ref(storage, `playerImages/${username}.jpg`))
  }, [username])
  
  getUserInfo();

  useEffect(() => {
    setTempName(username);
  }, [username]);

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
          await uploadBytes(playerImageRef, blob);
          console.log('Imagen subida con éxito.');
          getImage(playerImageRef);
        }catch (error){
          console.error('Error al cargar la imagen: ', error)
        }
    }
  };

  const getImage = async (playerImageRef) => {
    getDownloadURL(playerImageRef).then((url) => {
      setSelectedImage(true)
      setPlayerImgUrl(url)
    }).catch((error) => {
      console.error('Error al obtener la URL de descarga:', error);
      setSelectedImage(false);
      setPlayerImgUrl(null);
    })
  }
  
  const handleSave = async () => {
    setEditing(false);
    const querySnapshot = await getDocs(q);
    const chatDocRef = doc(db, 'users', querySnapshot.docs[0].id);
      await updateDoc(chatDocRef, {
        username: tempName,
      });
  };

  const handleCameraLaunch = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 2],
      quality: 1,
    });
  
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleSeleccionarImagen = () => {
    // Abre el modal para seleccionar una imagen
    setModalVisible(true);
  };

  const handleCerrarModal = () => {
    // Cierra el modal sin seleccionar ninguna imagen
    setModalVisible(false);
  };

  // const handleTomarFoto = () => {
  //   // Opciones de configuración para la cámara
  //   const options = {
  //     title: 'Selecciona una imagen',
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };

  //   // Abre la cámara o la galería para seleccionar una imagen
  //   ImagePicker.showImagePicker(options, (response) => {
  //     if (response.didCancel) {
  //       // El usuario canceló la selección
  //       console.log('Selección de imagen cancelada');
  //     } else if (response.error) {
  //       // Ocurrió un error al seleccionar la imagen
  //       console.error('Error al seleccionar la imagen:', response.error);
  //     } else {
  //       // Seleccionar la imagen exitosamente
  //       setImagenUri(response.uri);
  //       setImagenSeleccionada(true);
  //       setModalVisible(false); // Cierra el modal después de seleccionar la imagen
  //     }
  //   });
  // };

  return (
    <View style={{flex:1, backgroundColor: '#eeeeee'}}>
        {selectedImage ? (
          // Si hay una imagen seleccionada, muestra la imagen
          <View style={styles.containerView}>
            {editing ? (
              <TouchableOpacity style={{borderRadius: 40, justifyContent:'center', left:300, bottom:170, position:'absolute', alignContent:'center', alignItems: 'center', width: 40, height: 40, backgroundColor:'purple'}} onPress={handleSave}>
                <IconButton iconColor='black' icon={'check'} size={35}/>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={{borderRadius: 40, justifyContent:'center', left:300, bottom:170, position:'absolute', alignContent:'center', alignItems: 'center', width: 40, height: 40, backgroundColor:'purple'}} onPress={() => setEditing(true)}>
                <IconButton iconColor='black' icon={'pencil'} size={35}/>
              </TouchableOpacity>
            )}
            <View style={styles.avatarContainer}>
              <TouchableOpacity onLongPress={openImagePicker}>
                <Image
                  source={{ uri: playerImgUrl }}
                  style={styles.imagen}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View style={styles.textView}>
                {editing ? (
                  <TextInput
                    value={tempName}
                    onChangeText={(text) => setTempName(text)}
                    style={styles.input}
                  />
                ) : (
                  <Text numberOfLines={2} style={{ fontWeight: 'bold', textAlign: 'center', maxWidth: 180, fontSize: 20, fontStyle: 'italic', textDecorationColor: 'white' }}>{tempName}</Text>
                )}
              </View>
            </View>
          </View>
        ) : (
          // Si no hay una imagen seleccionada, muestra el icono "+" y el texto "Agregar imagen"
          <View style={styles.containerView}>
            {editing ? (
              <TouchableOpacity style={{borderRadius: 40, justifyContent:'center', left:300, bottom:170, position:'absolute', alignContent:'center', alignItems: 'center', width: 40, height: 40, backgroundColor:'purple'}} onPress={handleSave}>
                <IconButton iconColor='black' icon={'check'} size={35}/>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={{borderRadius: 40, justifyContent:'center', left:300, bottom:170, position:'absolute', alignContent:'center', alignItems: 'center', width: 40, height: 40, backgroundColor:'purple'}} onPress={() => setEditing(true)}>
                <IconButton iconColor='black' icon={'pencil'} size={35}/>
              </TouchableOpacity>
            )}
            <View style={styles.avatarContainer1}>
              <TouchableOpacity onPress={openImagePicker}>
                <Avatar.Icon
                  style={styles.avatar}
                  icon="plus"
                  size={80}
                />
              </TouchableOpacity>
              <Text>Agregar imagen</Text>
              <View style={styles.textView1}>
                {editing ? (
                  <TextInput
                  value={tempName}
                  onChangeText={(text) => setTempName(text)}
                    style={styles.input}
                  />
                ) : (
                  <Text numberOfLines={2} style={{ fontWeight: 'bold', textAlign: 'center', maxWidth: 180, fontSize: 20, fontStyle: 'italic', textDecorationColor: 'white' }}>{tempName}</Text>
                )}
              </View>
            </View>
          </View>
        )}
      <View style={styles.hr}/>
        <View style={{flex:1}}>
        <View style={styles.container}>
          <SegmentedButtons
            value={value}
            onValueChange={setValue}
            buttons={[
            {
              value: 'plays',
              label: 'Mis jugadas',
            },
            {
              value: 'teams',
              label: 'Mis equipos',
            }
            ]}
          />
        </View>
        <View style={{flex: 1}}>
          
          {value=='plays' && (  
            <View style={{marginBottom:10, marginTop:20, flex:1}}>                
              <Plays/>
            </View>
            )}

          {value=='teams' && (   
            <View style={{marginBottom:10, marginTop:20, flex:1}}>                               
              <Teams/>
            </View>
            )}
        </View>
        
      </View>
      <BottomBar focused={3}></BottomBar>
  </View>

  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    width: 180,
    height: 50,
    borderRadius: 10,
    padding: 10,
    height:'50%', 
    borderWidth:0,
    borderColor: 'transparent'
  },
  imagen: {
    width: 100,
    height: 100,
    borderRadius: 30,
  },
  textView: {
    left:120, 
    bottom:110, 
    width: 180, 
    borderRadius:30, 
    height:130, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  textView1: {
    left:120, 
    bottom:130, 
    width: 180, 
    borderRadius:30, 
    height:130, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerView: {
    height: 200,
    width: '85%',
    borderRadius: 30,
    alignContent: 'center',
    marginLeft: 28,
    marginTop: 50,
    justifyContent: 'center',
    backgroundColor: '#303747',
    },
  avatarContainer: {
    alignItems: 'baseline',
    marginLeft: 25,
    marginTop: 20,
    top: 50
  },
  avatarContainer1: {
    alignItems: 'baseline',
    marginLeft: 25,
    marginTop: 20,
    top: 60
  },
  avatar: {
    backgroundColor: 'gray',
    width: 100,
    height: 100,
    borderRadius: 30,

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  hr: {
    height: 1,
    width: '100%',
    top:5,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  container: {
    width: '90%',
    top: 10,
    display: 'flex',
    alignSelf:'center',
    alignItems: 'center',
  },
});

export default AvatarExample;
