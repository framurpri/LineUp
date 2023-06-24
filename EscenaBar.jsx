import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, Image, ImageBackground, Text, Modal, Pressable } from 'react-native';
import { Routes, Route, Link } from 'react-router-native'
import DownBar from './DownBar.jsx'
import { View } from 'react-native-web';
import CreatePlayer from './createPlayer.jsx';
import Circulo from './Circulo.jsx';
import Draggable from './Draggable.jsx';
import NuevaEscena from './NuevaEscena.jsx'

function EscenaBar(){
    const [modalVisible, setModalVisible] = useState(false);

    const [capturar, setCatch] = useState(false);

    const [dictionary, setDictionary] = useState({ S: 0, O: 0, L: 0, WS: 0, MB: 0 });
    
    const coord =[
      {
        S: {
          Refs: {
            ref1: useRef(null),
            ref2: useRef(null),
            ref3: useRef(null),
            ref4: useRef(null),
            ref5: useRef(null),
            ref6: useRef(null),
          },
          coordenadas: []
        },
        O:  {
          Refs: {
            ref1: useRef(null),
            ref2: useRef(null),
            ref3: useRef(null),
            ref4: useRef(null),
            ref5: useRef(null),
            ref6: useRef(null),
          },
          coordenadas: []
        },
        L: {
          Refs: {
            ref1: useRef(null),
            ref2: useRef(null),
            ref3: useRef(null),
            ref4: useRef(null),
            ref5: useRef(null),
            ref6: useRef(null),
          },
          coordenadas: []
        },
        WS: {
          Refs: {
            ref1: useRef(null),
            ref2: useRef(null),
            ref3: useRef(null),
            ref4: useRef(null),
            ref5: useRef(null),
            ref6: useRef(null),
          },
          coordenadas: []
        },
        MB: {
          Refs: {
            ref1: useRef(null),
            ref2: useRef(null),
            ref3: useRef(null),
            ref4: useRef(null),
            ref5: useRef(null),
            ref6: useRef(null),
          },
          coordenadas: []
        },
      }
    ]

    const keys = Object.keys(dictionary);
    const values = []

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = dictionary[key];
      values.push(value)
    }

    const keys2 = Object.keys(dictionary);
    const values2 = []

    // for (let i = 0; i < keys2.length; i++) {
    //   const key = keys2[i];
    //   const value = coordenadas[key];
    //   values2.push(value[0])
    //   values2.push(value[1])
    // }

    useEffect(() => {
      coord.forEach((element) => {
        Object.keys(element).forEach((key) => {
          const refs = element[key].Refs;
          const coordenadas = element[key].coordenadas;

          Object.keys(refs).forEach((refKey, index) => {
            const ref = refs[refKey];

            if (ref.current) {
              const measureCallback = (index) => (x, y, width, height, pageX, pageY) => {
                // Guardar las coordenadas en la posición del índice correspondiente
                coordenadas[index] = [pageX, pageY];
                console.log('Coordenadas:', coord);
              };
    
              ref.current.measure(
                measureCallback(index)
              );
            }
          });
        });
      });
    }, [capturar, coord]);

    // useEffect(() => {
    //   elementsRefs.forEach((ref, index) => {
    //     if (ref.current) {
    //       const key = Object.keys(coordenadas)[index]; // Obtener la clave correspondiente al índice
    //       const measureCallback = (ref) => (x, y, width, height, pageX, pageY) => {
    //         console.log('Coordenadas X:', pageX);
    //         console.log('Coordenadas Y:', pageY);
    //         console.log('======')
    //         setCoordenadas(prevCoordenadas => {
    //             return { ...prevCoordenadas, [key]: [pageX, pageY] };
    //           }

    //         );               
    //         console.log(coordenadas)
            
    //       };
    
    //       ref.current.measure(
    //         measureCallback(ref, index)
    //       );
    //     }
    //   });
    // }, [capturar, dictionary]);
    
  

    const updateParentState = (newDictionary) => {
      setDictionary(newDictionary);
    };

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
                    <Text style={styles.text}>Add Player</Text>
                </ImageBackground>                
            </Pressable>
            <Image source={require('./Resources/flechaIzquierda.png')} style={{width: 80, left:20, height: 80}} />
            <Pressable onPress={() => {
              setCatch(!capturar);
              }}
            >
              <Image source={require('./Resources/flechaDerecha.png')} style={{width: 70, left:40, height: 50}} />
            </Pressable>
            <Text style={{fontSize: 40, paddingLeft: 50}} >Finish</Text>
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
});



export default EscenaBar;