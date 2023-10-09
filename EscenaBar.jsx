import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, Text, Modal, Pressable, Dimensions, Image, TextInput} from 'react-native';
import DownBar from './DownBar.jsx'
import { TouchableOpacity, View } from 'react-native-web';
import CreatePlayer from './createPlayer.jsx';
import Circulo from './Circulo.jsx';
import Draggable from 'react-native-draggable';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import Icon from 'react-native-vector-icons/FontAwesome5'
import ConfettiExplosion from 'react-confetti-explosion';
import { Alert } from 'react-native';

function EscenaBar({handlePlusScene, handleLessScene}){
    
  const [modalVisible, setModalVisible] = useState(false);

  const [windowDimensions, setWindowDimensions] = useState(Dimensions.get('window'));

  const [finish, setFinish] = useState(false)

  const [capturar, setCatch] = useState(false);

  const [dictionary, setDictionary] = useState({ S: [], O: [], L: [], WS: [], MB: [] });

  const [currentScene, setCurrentScene] = useState(0);

  const [scenes, setScenes] = useState({})
  
  const [isDragged, setIsDragged] = useState(false);

  const [state, setState] = useState('S');

  const [name, setName] = useState('')

  const [showConfetti, setShowConfetti] = useState(false); // Nuevo estado para controlar la explosión de confeti

  const [notDeleted, setNotDeleted] = useState(true);

  const [nombreJugada, setNombreJugada] = useState('')

  const [secondModal, setSecondModal] = useState(false)

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  const auth = getAuth(app);

  const numJugadores = Object.values(dictionary).every((array) => array.length === 0);

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

  const handleDraggableStart = () => {
    setIsDragged(true);
  };

  useEffect(() => { 
    coord.forEach((element) => {
      Object.keys(element).forEach((key) => {
        const refs = element[key].Refs;
        Object.keys(refs).forEach((refKey, index) => {
          const ref = refs[refKey];
          if (ref.current) {
            const measureCallback = (currentIndex) => (x, y, width, height, pageX, pageY) => {
              setScenes(prevScenes => {
                const currentSceneData = prevScenes[currentScene] || {}; // Verificar si currentScene ya existe en el objeto
                const currentCoordenada = currentSceneData.coordenada || {}; // Verificar si 'coordenada' ya existe en el objeto currentSceneData
                return {
                  ...prevScenes,
                  [currentScene]: {
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
  }, [capturar]);
  
  useEffect(() => {
    // Desactivar el scroll del cuerpo de la página
    document.body.style.overflow = 'hidden';

    return () => {
      // Restaurar el scroll cuando el componente se desmonte
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  const updateParentState = (newDictionary) => {
    setDictionary(newDictionary);
  };

  const handleDraggableRelease = (event, gesture) => {
    if(gesture.moveY > 690 && gesture.moveX < 250 && gesture.moveX > 150){
      deletePlayer(state,name);
      setIsDragged(false);
      setShowConfetti(true)
      setTimeout(() => {
        setShowConfetti(false);
      }, 1000); 
    } else {
      setIsDragged(false);
    }
  }

  const deletePlayer = (newState, newName) => {
    // Si el Draggable se suelta en la zona de eliminación, ocúltalo
    const keys = Object.keys(dictionary);
    for (var i=0; i<keys.length; i++ ){
      if(keys[i] == newState){
        const array = dictionary[keys[i]];
        const indiceAEliminar = array.indexOf(newName);
        if (indiceAEliminar !== -1) {
          array.splice(indiceAEliminar, 1);
        }

      }
    }
  };

  const addScene = async () => {
    try {
      const docRef = await addDoc(collection(db, "plays"), {
        designer: auth.currentUser.email,
        name: nombreJugada,
        descripcion: '',
        scenes: scenes
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const handleStateAndNameChange = (newState, newName) =>{
    setState(newState);
    setName(newName);
};

  const confettiChange = (newState) =>{
    setShowConfetti(newState)
  }

  const dropZoneStyle = isDragged
    ? styles.dropZoneDragged
    : styles.dropZone;

    const dropIcon = isDragged
    ? styles.iconDragged
    : styles.icon;

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
            <CreatePlayer setModalVisible={setModalVisible} confettiChange={confettiChange} modalVisible={modalVisible} updateParentState={updateParentState} dictionary={dictionary}/>
          </View>
      </Modal>

      <Modal
          animationType="fade"
          transparent={true}
          visible={finish}
          onRequestClose={() => {
          setFinish(!finish);
          }}>
          <View style={{top:200, alignItems: 'center', justifyContent: 'center'}}>
            <View style={styles.modalView5}>
              <Text style={styles.text1}>¿Estás seguro?</Text>
              <Pressable
                  style={[styles.button1]}
                  onPress={() => setFinish(!finish)}>
                  <Text style={styles.textStyle1}>Atrás</Text>
              </Pressable>
              <Pressable
                  style={[styles.button2]}
                  onPress={() => {setSecondModal(!secondModal)}}
                  >
                  <Text style={styles.textStyle1}>Finalizar</Text>
              </Pressable>
            </View>
          </View>
      </Modal>

      <Modal
          animationType="fade"
          transparent={true}
          visible={secondModal}
          onRequestClose={() => {
          setSecondModal(!secondModal);
          }}>
          <View style={{top:200, alignItems: 'center', justifyContent: 'center'}}>
            <View style={styles.modalView4}>
              <TextInput style={styles.text11}
              placeholder="Introduce un titulo para la jugada"
              onChangeText={setNombreJugada}/>
              <Pressable
                  style={[styles.button11]}
                  onPress={() => {setFinish(!finish)
                  setSecondModal(!secondModal)
                  }}>
                  <Text style={styles.textStyle1}>Atrás</Text>
              </Pressable>
              <Pressable
                  style={[styles.button22]}
                  onPress={() => {setFinish(!finish)
                  setSecondModal(!secondModal)
                  setCatch(!capturar)
                  addScene()
                  }}
                  >
                  <Text style={styles.textStyle1}>Crear jugada</Text>
              </Pressable>
            </View>
          </View>
      </Modal>

      <View style={{ bottom: 500, flex: 0, flexDirection: 'row', position: 'absolute' }}>
        
        <Draggable minX={-(0.49*windowDimensions.width)} minY={-(0.18*windowDimensions.height)} maxX={0.5*windowDimensions.width} maxY={0.46*windowDimensions.height}>
          <Image ref={coord[0].B.Refs[`ref`]} style={{width:60, height:60}} source={require('./Resources/balonDeVolley.png')} />
        </Draggable>

        {Object.keys(dictionary.S).length > 0 && (
          <React.Fragment>
            {Object.values(dictionary.S)
              .map((value, index) => (
                <Draggable x={0} y={0} 
                onDragRelease={notDeleted ? handleDraggableRelease : null} 
                onDrag={handleDraggableStart}
                minX={-(0.49*windowDimensions.width)} 
                minY={-(0.18*windowDimensions.height)} 
                maxX={0.5*windowDimensions.width} 
                maxY={0.46*windowDimensions.height} 
                key={value}>
                  <Circulo key={value} state={'S'} hola={handleStateAndNameChange} name={value} margin={0} width={60} marginTop={6} size={30} marginT={0}>
                    <Text key={value} ref={coord[0].S.Refs[`ref${value}`]}>S</Text>
                  </Circulo>
                </Draggable>
              ))}
          </React.Fragment>
        )}

        {Object.keys(dictionary.O).length > 0 && (
          <React.Fragment>
            {Object.values(dictionary.O)
              .map((value, index) => (
                <Draggable x={0} y={0} 
                onDragRelease={notDeleted ? handleDraggableRelease : null} 
                onDrag={handleDraggableStart}
                minX={-(0.49*windowDimensions.width)} 
                minY={-(0.18*windowDimensions.height)} 
                maxX={0.5*windowDimensions.width} 
                maxY={0.46*windowDimensions.height} 
                key={value}>
                  <Circulo key={value} state={'O'} hola={handleStateAndNameChange} name={value} margin={0} width={60} marginTop={6} size={30} marginT={0}>
                    <Text key={value} ref={coord[0].O.Refs[`ref${value}`]}>O</Text>
                  </Circulo>
                </Draggable>
              ))}
          </React.Fragment>
        )}
        {Object.keys(dictionary.L).length > 0 && (
          <React.Fragment>
            {Object.values(dictionary.L)
              .map((value, index) => (
                <Draggable x={0} y={0} 
                onDragRelease={notDeleted ? handleDraggableRelease : null} 
                onDrag={handleDraggableStart}
                minX={-(0.49*windowDimensions.width)} 
                minY={-(0.18*windowDimensions.height)} 
                maxX={0.5*windowDimensions.width} 
                maxY={0.46*windowDimensions.height} 
                key={value}>
                  <Circulo key={value} state={'L'} hola={handleStateAndNameChange} name={value} margin={0} width={60} marginTop={6} size={30} marginT={0}>
                    <Text key={value} ref={coord[0].L.Refs[`ref${value}`]}>L</Text>
                  </Circulo>
                </Draggable>
              ))}
          </React.Fragment>
        )}
        {Object.keys(dictionary.WS).length > 0 && (
          <React.Fragment>
            {Object.values(dictionary.WS)
              .map((value, index) => (
                <Draggable x={0} y={0} 
                onDragRelease={notDeleted ? handleDraggableRelease : null} 
                onDrag={handleDraggableStart}
                minX={-(0.49*windowDimensions.width)} 
                minY={-(0.18*windowDimensions.height)} 
                maxX={0.5*windowDimensions.width} 
                maxY={0.46*windowDimensions.height} 
                key={value}>
                  <Circulo key={value} state={'WS'} hola={handleStateAndNameChange} name={value} margin={0} width={60} marginTop={6} size={30} marginT={0}>
                    <Text key={value} ref={coord[0].WS.Refs[`ref${value}`]}>WS</Text>
                  </Circulo>
                </Draggable>
              ))}
          </React.Fragment>
        )}
        {Object.keys(dictionary.MB).length > 0 && (
          <React.Fragment>
            {Object.values(dictionary.MB)
              .map((value, index) => (
                <Draggable x={0} y={0} 
                onDragRelease={notDeleted ? handleDraggableRelease : null} 
                onDrag={handleDraggableStart}
                minX={-(0.49*windowDimensions.width)} 
                minY={-(0.18*windowDimensions.height)} 
                maxX={0.5*windowDimensions.width} 
                maxY={0.46*windowDimensions.height} 
                key={value}>
                  <Circulo key={value} state={'MB'} hola={handleStateAndNameChange} name={value} margin={0} width={60} marginTop={6} size={30} marginT={0}>
                    <Text key={value} ref={coord[0].MB.Refs[`ref${value}`]}>MB</Text>
                  </Circulo>
                </Draggable>
              ))}
          </React.Fragment>
        )}

      </View>
      
      <Modal
          animationType="fade"
          transparent={true}
          visible={isDragged && notDeleted}
          onRequestClose={() => {
          setIsDragged(!isDragged);
          }}>
        <View style={dropZoneStyle}>
          <Icon name="trash-alt" size={30} style={dropIcon}></Icon>
          {showConfetti && (
          <ConfettiExplosion
            style={{left: 20}}
            particleCount={30} 
            force={0.4}
            width={400}
            colors={['blue']}
            color='blue'
            particleSize={10}
            timeout={2000} 
          />
          )}

        </View>
      </Modal>
                  
      <DownBar>
        <TouchableOpacity style={styles.button}
          onPress={() => setModalVisible(true)}>
          <Text style={{fontSize:15, textAlign:'center', fontWeight: 'bold'}}>Crear jugador</Text>
        </TouchableOpacity>
          
        <Pressable style={styles.arrows} onPress={()=> { 
          setCatch(!capturar)
          handleLessScene(currentScene-1)
          setTimeout(() => {
            currentScene > 0 ? setCurrentScene(currentScene-1):null;
          }, 1); 
            }
          }>
          <Icon name="arrow-left" size={60} color="black"/>
        </Pressable>
        <Pressable style={styles.arrows} onPress={() => {
          if(currentScene===0){
            setNotDeleted(false)
          }
          if(!numJugadores){
            setCatch(!capturar)
            handlePlusScene(currentScene+1)
            setTimeout(() => {
            setCurrentScene(currentScene+1);
          }, 1); 
          }else{
            Alert.alert(
              'Añade al menos un jugador para poder inicar la jugada',
              [
                { text: 'Aceptar', onPress: () => console.log('Alerta cerrada') }
              ],
              { cancelable: false }
          );
          }
          
        }}
        >
          <Icon name="arrow-right" size={60} color="black"/>
        </Pressable>
        <TouchableOpacity style={styles.button} 
          onPress={() => {setFinish(!finish)
          }} >
            <Text style={{fontSize:20, textAlign:'center', fontWeight: 'bold'}}>Fin</Text>
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
  text11: {
    justifyContent: 'center',
    textAlign: 'center',
    fontStyle: 'italic',
    width: 230,
    fontSize: 15,
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
  modalView4: {
    backgroundColor: '#F0F8FF',
    borderRadius: 20,
    marginHorizontal: 20,
    width: 60,
    paddingHorizontal: 130,
    paddingVertical: 20,
    top: 150,
    alignItems: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    bottom: 15,
    backgroundColor: 'transparent',
  },
  arrows:{
    height: height*0.07,
    bottom:20,
  },
  button11: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 100,
    alignItems: 'center',
    height: 40,
    top: 50,
    right: 70,
    backgroundColor: '#f56141'
  },
  button22: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 100,
    alignContent: 'center',
    height: 40,
    left: 70,
    top: 10,
    backgroundColor: '#62f541'
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
    backgroundColor: '#f56141'
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
    backgroundColor: '#62f541'
  },
  textStyle1: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  dropZone: {
    width: '0%',
    height: 0,
    top: 700,
    left: 170,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon:{
    color: "transparent"
  },
  iconDragged:{
    color: "black"
  },
  dropZoneDragged: {
    backgroundColor: 'red',
    width: 50,
    height: 50,
    borderRadius: 70,
    top: 700,
    left: 170,
    justifyContent: 'center',
    alignItems: 'center', 
  },
});



export default EscenaBar;