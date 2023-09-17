import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, Text, Modal, Pressable, Dimensions, Image} from 'react-native';
import DownBar from './DownBar.jsx'
import { TouchableOpacity, View } from 'react-native-web';
import CreatePlayer from './createPlayer.jsx';
import Circulo from './Circulo.jsx';
import Draggable from 'react-native-draggable';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { getFirestore, collection, addDoc } from "firebase/firestore"; 


function EscenaBar(){
    
    const [modalVisible, setModalVisible] = useState(false);

    const [windowDimensions, setWindowDimensions] = useState(Dimensions.get('window'));

    const [finish, setFinish] = useState(false)

    const [dictionary, setDictionary] = useState({ S: 0, O: 0, L: 0, WS: 0, MB: 0 });

    const [currentScene, setCurrentScene] = useState(0);

    const [scenes, setScenes] = useState({})
    
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
        },
        O:  {
          Refs: {
            ref1: useRef(null),
            ref2: useRef(null),
          },
        },
        L: {
          Refs: {
            ref1: useRef(null),
            ref2: useRef(null),
          },
        },
        WS: {
          Refs: {
            ref1: useRef(null),
            ref2: useRef(null),
          },
        },
        MB: {
          Refs: {
            ref1: useRef(null),
            ref2: useRef(null),
           
          },
        },
        B: {
          Refs: {
            ref: useRef(null),
           
          },
        }
      }
    ]

    /*const [showImage, setShowImage] = useState(false);
    
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowImage(true);
      }, 3000);
  
      return () => clearTimeout(timer);
    }, [capturar]);

 */

    const updateScene = () => {
    
      console.log(currentScene + 1);
    
      coord.forEach((element) => {
        Object.keys(element).forEach((key) => {
          const refs = element[key].Refs;
    
          Object.keys(refs).forEach((refKey, index) => {
            const ref = refs[refKey];
    
            if (ref.current) {
              const measureCallback = (currentIndex) => (x, y, width, height, pageX, pageY) => {
                setScenes(prevScenes => {
                  const currentSceneData = prevScenes[currentScene + 1] || {}; // Verificar si currentScene ya existe en el objeto
                  const currentCoordenada = currentSceneData.coordenada || {}; // Verificar si 'coordenada' ya existe en el objeto currentSceneData
    
                  return {
                    ...prevScenes,
                    [currentScene + 1]: {
                      ...currentSceneData,
                      coordenada: {
                        ...currentCoordenada,
                        [key]: {
                          ...currentCoordenada[key],
                          [`coordenada${currentIndex + 1}`]: [pageX, pageY],
                        },
                      },
                    },
                  };
                });
              };
    
              ref.current.measure(
                measureCallback(index)
              );
            }
          });
        });
      });
    
      console.log('Scenes: ', scenes);
      console.log(currentScene + 1);  
    };
    
    useEffect(() => {
      // Desactivar el scroll del cuerpo de la página
      document.body.style.overflow = 'hidden';

      return () => {
        // Restaurar el scroll cuando el componente se desmonte
        document.body.style.overflow = 'auto';
      };
    }, []);

    useEffect(() => {
      const updateDimensions = () => {
        const newWindowDimensions = Dimensions.get('window');
        setWindowDimensions(newWindowDimensions);
      };
  

      updateDimensions(); // Llamar al principio para obtener las dimensiones iniciales
  
      Dimensions.addEventListener('change', updateDimensions);
  
      return () => {
        Dimensions.removeEventListener('change', updateDimensions);
      };
    }, []);
    
    // const getUserInfo = async () => {
    //   const q = query(collection(db, "users"), where("email", "==", auth.currentUser.email));
    //   const querySnapshot = await getDocs(q);
    //   //console.log(querySnapshot.docs[0].data().username);
    //   setUsername(querySnapshot.docs[0].data().username);
    // }
    // getUserInfo();

    const updateParentState = (newDictionary) => {
      setDictionary(newDictionary);
    };
    //console.log(currentScene)


    const addScene = async () => {
      try {
        const docRef = await addDoc(collection(db, "plays1"), {
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

    return (
      <View style={modalVisible ? styles.centeredViewNoOp : styles.centeredViewOp}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}>
            <View style={{top:200, alignItems: 'center', justifyContent: 'center'}}>
              <CreatePlayer setModalVisible={setModalVisible} modalVisible={modalVisible} updateParentState={updateParentState} dictionary={dictionary}/>
            </View>
        </Modal>

        <Modal
            animationType="slide"
            transparent={true}
            visible={!finish}
            onRequestClose={() => {
            setFinish(!finish);
            }}>
            <View style={{top:200, alignItems: 'center', justifyContent: 'center'}}>
              <View style={styles.modalView5}>
                <Text style={styles.text1}>ARE YOU SURE ?</Text>
                <Pressable
                    style={[styles.button1]}
                    onPress={() => setFinish(!finish)}>
                    <Text style={styles.textStyle1}>Back</Text>
                </Pressable>
                <Pressable
                    style={[styles.button2]}
                    onPress={() => {setFinish(!finish)
                    updateScene()
                    addScene()
                    }}>
                    <Text style={styles.textStyle1}>Finish</Text>
                </Pressable>
              </View>
            </View>
        </Modal>

        <View style={{ bottom: 500, flex: 0, flexDirection: 'row', position: 'absolute' }}>
          
          <Draggable minX={-(0.49*windowDimensions.width)} minY={-(0.18*windowDimensions.height)} maxX={0.5*windowDimensions.width} maxY={0.46*windowDimensions.height}>
            <Image ref={coord[0].B.Refs[`ref`]} style={{width:60, height:60}} source={require('./Resources/balonDeVolley.png')} />
          </Draggable>

          {dictionary.S > 0 && (
            <React.Fragment>
              {Array(dictionary.S)
                .fill()
                .map((_, index) => (
                  <Draggable minX={-(0.49*windowDimensions.width)} minY={-(0.18*windowDimensions.height)} maxX={0.5*windowDimensions.width} maxY={0.46*windowDimensions.height} key={index}>
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
                  <Draggable minX={-(0.49*windowDimensions.width)} minY={-(0.18*windowDimensions.height)} maxX={0.5*windowDimensions.width} maxY={0.46*windowDimensions.height} key={index}>
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
                  <Draggable minX={-(0.49*windowDimensions.width)} minY={-(0.18*windowDimensions.height)} maxX={0.5*windowDimensions.width} maxY={0.46*windowDimensions.height} key={index}>
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
                  <Draggable minX={-(0.49*windowDimensions.width)} minY={-(0.18*windowDimensions.height)} maxX={0.5*windowDimensions.width} maxY={0.46*windowDimensions.height} key={index}>
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
                  <Draggable minX={-(0.49*windowDimensions.width)} minY={-(0.18*windowDimensions.height)} maxX={0.5*windowDimensions.width} maxY={0.46*windowDimensions.height} key={index}>
                    <Circulo key={index} margin={0} width={60} marginTop={9} size={30} marginT={0}>
                      <Text ref={coord[0].MB.Refs[`ref${index + 1}`]}>MB</Text>
                    </Circulo>
                  </Draggable>
                ))}
            </React.Fragment>
          )}
        </View>
                    
        <DownBar>
          <TouchableOpacity style={styles.button}
            onPress={() => setModalVisible(true)}>
            <Text style={{fontSize:15, textAlign:'center', fontWeight: 'bold'}}>Add Player</Text>
          </TouchableOpacity>
            
          <Pressable style={styles.arrows} onPress={()=> { 
            updateScene()
            currentScene > 1 ? setCurrentScene(currentScene-1):null;
            console.log(currentScene)                 
              }
            }>
            <Icon name="arrow-left" size={60} color="black"/>
          </Pressable>
          <Pressable style={styles.arrows} onPress={() => {
            updateScene();
            setCurrentScene(currentScene+1)
          }}
          >
            <Icon name="arrow-right" size={60} color="black"/>
          </Pressable>
          <TouchableOpacity style={styles.button} 
            onPress={() => {setFinish(!finish)
            }} >
              <Text style={{fontSize:20, textAlign:'center', fontWeight: 'bold'}}>Finish</Text>
          </TouchableOpacity>
        </DownBar>
    </View>
    );
  };
  
const {width, height} = Dimensions.get('window')

const heightButton = height*0.17

const styles = StyleSheet.create({
    text: {
        justifyContent: 'center',
        textAlign: 'center',
        paddingVertical: 8,
        fontSize: 16,
    },
    text1: {
      justifyContent: 'center',
      textAlign: 'center',
      fontStyle: 'italic',
      fontWeight: 'bold',
      width: 350,
      fontSize: 56,
  },
    currentScene: {
      justifyContent: 'center',
      textAlign: 'center',
      paddingVertical: '10%',
      fontSize: 25,
    },
    centeredViewOp: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '110%',
        marginTop: 22,
        opacity: 1
      },
      centeredViewNoOp: {
        flex: 1,
        width: '110%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        opacity: 0.5,
      },
      modalView5: {
        backgroundColor: '#F0F8FF',
        borderRadius: 20,
        marginHorizontal: 20,
        width: 100,
        paddingHorizontal: 180,
        paddingVertical: 20,
        top: 100,
        alignItems: 'center',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalView: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
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
      button: {
        width: heightButton*0.55,
        height: heightButton*0.55,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 20,
        backgroundColor: 'transparent',
      },
      arrows:{
        height: height*0.07,
        bottom:20,
      },
      button1: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 150,
        alignItems: 'center',
        height: 40,
        top: 30,
        right: 80,
        backgroundColor: 'red'
      },
      button2: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 150,
        alignContent: 'center',
        height: 40,
        bottom: 10,
        left: 80,
        backgroundColor: 'green'

      },
      textStyle1: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
      },
});



export default EscenaBar;