import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, Image, ImageBackground, Text, Modal, Pressable } from 'react-native';
import { Routes, Route, Link } from 'react-router-native'
import DownBar from './DownBar.jsx'
import { View } from 'react-native-web';
import CreatePlayer from './createPlayer.jsx';
import Circulo from './Circulo.jsx';
import Draggable from './Draggable.jsx';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore"; 


function EscenaBar(){
    const [modalVisible, setModalVisible] = useState(false);

    const [username, setUsername] = useState('');

    const [modalVisible1, setModalVisible1] = useState(false);

    const [capturar, setCatch] = useState(false);

    const [dictionary, setDictionary] = useState({ S: 0, O: 0, L: 0, WS: 0, MB: 0 });

    const [coordenada, setCoordenada] = useState( {S: {}, O: {}, L: {}, WS: {}, MB: {}});

    const [currentScene, setCurrentScene] = useState(0);

    const [username, setUsername] = useState('');

    const [scenes, setScenes] = useState({})
    
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);
    
    const [coordenada, setCoordenada] = useState({ S: [], O: [], L: [], WS: [], MB: [] })

    const [numScene, setNumScene] = useState(0)

    const [finish, setFinish] = useState('')

    const [scenes, setScenes] = useState({});

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);
    

    const coord =[
      {
        S: {
          Refs: {
            ref1: useRef(null),
            ref2: useRef(null),
          },
          coordenadas: []
        },
        O:  {
          Refs: {
            ref1: useRef(null),
            ref2: useRef(null),
          },
          coordenadas: []
        },
        L: {
          Refs: {
            ref1: useRef(null),
            ref2: useRef(null),
          },
          coordenadas: []
        },
        WS: {
          Refs: {
            ref1: useRef(null),
            ref2: useRef(null),
          },
          coordenadas: []
        },
        MB: {
          Refs: {
            ref1: useRef(null),
            ref2: useRef(null),
           
          },
          coordenadas: []
        },
      }
    ]
    const updateState = (newState) => {
      setScenes(newState);
    };
    
    /*const [showImage, setShowImage] = useState(false);
    
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowImage(true);
      }, 3000);
  
      return () => clearTimeout(timer);
    }, [capturar]);

 */

    
    useEffect(() => {
      debugger;
      console.log(currentScene)
      coord.forEach((element) => {
        Object.keys(element).forEach((key) => {
          const refs = element[key].Refs;

          Object.keys(refs).forEach((refKey, index) => {
            const ref = refs[refKey];

            if (ref.current) {
              const measureCallback = (index) => (x, y, width, height, pageX, pageY) => {
                debugger;
                // Guardar las coordenadas en la posición del índice correspondiente

                coordenada[key][`coordenada${index+1}`] = [pageX, pageY];

                
              };
              const updatedDictionary = { ...scenes };

              // Actualizar el valor utilizando la clave
              updatedDictionary[currentScene] = JSON.parse(JSON.stringify(coordenada));

              // Actualizar el estado con el diccionario actualizado
              setScenes(updatedDictionary, () => {
                console.log('Scenes actualizado:', scenes);
              });
              
              ref.current.measure(
                measureCallback(index)
                );
              }
            });
          });
        });

        console.log('Coordenadas:', coordenada);
        console.log('Scenes: ',scenes)
        setCurrentScene(currentScene + 1);
        console.log(currentScene);
    }, [capturar]);
    
    const getUserInfo = async () => {
      const q = query(collection(db, "users"), where("email", "==", auth.currentUser.email));
      const querySnapshot = await getDocs(q);
      //console.log(querySnapshot.docs[0].data().username);
      setUsername(querySnapshot.docs[0].data().username);
    }
    getUserInfo();

    const updateParentState = (newDictionary) => {
      setDictionary(newDictionary);
    };
    //console.log(currentScene)



    const addScene = async () => {
      try {
        const docRef = await addDoc(collection(db, "plays"), {
          designer: auth.currentUser.email,
          name: "nombre de prueba",
          //scenes: [{ [currentScene]: coordenada }]
          scenes: scenes
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }




    const addScene = async () => {
      try {
        const docRef = await addDoc(collection(db, "plays"), {
          designer: username,
          name: "nombre de prueba",
          //scenes: [{ [currentScene]: coordenada }]
          scenes: scenes
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

    return (
      <View style={modalVisible ? styles.centeredViewNoOp : styles.centeredViewOp}>
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}>
            <View style={{top:200}}>
              <CreatePlayer setModalVisible={setModalVisible} modalVisible={modalVisible} updateParentState={updateParentState} dictionary={dictionary}/>
            </View>
        </Modal>
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible1}
            onRequestClose={() => {
            setModalVisible1(!modalVisible1);
            }}>
            <View style={{top:200}}>
              <CreatePlayer setModalVisible={setModalVisible} modalVisible={modalVisible} updateParentState={updateParentState} dictionary={dictionary}/>
            </View>
        </Modal>
        <View style={{ bottom: 500, flex: 0, flexDirection: 'row' }}>
          {dictionary.S > 0 && (
            <React.Fragment>
              {Array(dictionary.S)
                .fill()
                .map((_, index) => (
                  <Draggable key={index}>
                    <Circulo key={index} margin={0} width={60} marginTop={6} size={30} marginT={0}>
                      <Text key={index} ref={coord[0].S.Refs[`ref${index + 1}`]}>S</Text>
                    </Circulo>
                  </Draggable>
                ))}
            </React.Fragment>
          )}

          {dictionary.O > 0 && (
            <React.Fragment>
              {Array(dictionary.O)
                .fill()
                .map((_, index) => (
                  <Draggable key={index}>
                    <Circulo key={index} margin={0} width={60} marginTop={6} size={30} marginT={0}>
                      <Text key={index} ref={coord[0].O.Refs[`ref${index + 1}`]}>O</Text>
                    </Circulo>
                  </Draggable>
                ))}
            </React.Fragment>
          )}
          {dictionary.L > 0 && (
            <React.Fragment>
              {Array(dictionary.L)
                .fill()
                .map((_, index) => (
                  <Draggable key={index}>
                    <Circulo key={index} margin={0} width={60} marginTop={6} size={30} marginT={0}>
                      <Text key={index} ref={coord[0].L.Refs[`ref${index + 1}`]}>L</Text>
                    </Circulo>
                  </Draggable>
                ))}
            </React.Fragment>
          )}
          {dictionary.WS > 0 && (
            <React.Fragment>
              {Array(dictionary.WS)
                .fill()
                .map((_, index) => (
                  <Draggable key={index} >
                    <Circulo key={index} margin={0} width={60} marginTop={9} size={30} marginT={0}>
                      <Text key={index} ref={coord[0].WS.Refs[`ref${index + 1}`]}>WS</Text>
                    </Circulo>
                  </Draggable>
                ))}
            </React.Fragment>
          )}
          {dictionary.MB > 0 && (
            <React.Fragment>
              {Array(dictionary.MB)
                .fill()
                .map((_, index) => (
                  <Draggable key={index}>
                    <Circulo key={index} margin={0} width={60} marginTop={9} size={30} marginT={0}>
                      <Text ref={coord[0].MB.Refs[`ref${index + 1}`]}>MB</Text>
                    </Circulo>
                  </Draggable>
                ))}
            </React.Fragment>
          )}
        </View>
                    
        <View style={{flex:1}}>
        <DownBar>
            <Pressable
                onPress={() => setModalVisible(true)}>
                <ImageBackground source={require('./Resources/buttonAddPlayer.png')} style={{width: 70, height: 70}}>
                    <Text style={styles.currentScene}>Add Player</Text>
                </ImageBackground>                
            </Pressable>
            
            <Pressable onPress={()=> { 
              currentScene > 1 ? setCurrentScene(currentScene-1):null;
              console.log(currentScene)                 
                }
              }>
              <Image source={require('./Resources/flechaIzquierda.png')} style={{width: 80, left:20, height: 80}} />
            </Pressable>
            <Pressable onPress={() => {
              setCatch(!capturar);
              //addScene();
            }}
            >
              <Image source={require('./Resources/flechaDerecha.png')} style={{width: 70, left:40, height: 50}} />
            </Pressable>
            <Text style={{fontSize: 40, paddingLeft: 50}} onPress={() => {addScene()}} >Finish</Text>
        </DownBar>
        </View>
    </View>
    );
  };
  
const styles = StyleSheet.create({
    text: {
        justifyContent: 'center',
        textAlign: 'center',
        paddingVertical: 8,
        fontSize: 16,
    },
    currentScene: {
      justifyContent: 'center',
      textAlign: 'center',
      paddingVertical: 8,
      fontSize: 16,
    },
    centeredViewOp: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        opacity: 1
      },
      centeredViewNoOp: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,

        opacity: 0.5
      },
      modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        marginHorizontal: 20,
        padding: 180,
        width: 100,
        height: 100,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 150,
        height: 40,
        bottom: 50,
        left: 50
      },
      button2: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 150,
        height: 40,
        bottom: 90,
        left: 210
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
      },
      modalText: {
        top: 100,
        width: 40,
        textAlign: 'center',
      },
      modalView: {
        backgroundColor: '#F0F8FF',
        borderRadius: 20,
        marginHorizontal: 20,
        height: 100,
        width: 100,
        padding: 180,
        alignItems: 'center',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
});



export default EscenaBar;