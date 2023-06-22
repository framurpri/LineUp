import React, {useState} from 'react';
import { StyleSheet, Image, ImageBackground, Text, Modal, Pressable} from 'react-native';
import DownBar from './DownBar.jsx'
import { View } from 'react-native-web';
import CreatePlayer from './createPlayer.jsx';
import Circulo from './Circulo.jsx';
import Draggable from './Draggable.jsx';

function EscenaBar(){
    const [modalVisible, setModalVisible] = useState(false);

    const [dictionary, setDictionary] = useState({ L: 1, O: 1, WS: 1, MB: 1, S: 1 });
    
    const [coordenadas, setCoordenadas] = useState({ L: [[0,0]], O: [[0,0]], WS: [[0,0]], MB: [[0,0]], S: [[0,0]] })

    const keys = Object.keys(dictionary);
    const values = []

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = dictionary[key];
      values.push(value)
    }

    const keys2 = Object.keys(dictionary);
    const values2 = []

    for (let i = 0; i < keys2.length; i++) {
      const key = keys2[i];
      const value = coordenadas[key];
      values2.push(value[0])
      values2.push(value[1])
    }

    const updateParentState = (newDictionary) => {
      setDictionary(newDictionary);
    };

    const updateCoordenadas = (newCoordenadas) => {
      setCoordenadas(newCoordenadas);
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
          {values2}
          {dictionary.S > 0 && (
            <React.Fragment>
              {Array(dictionary.S)
                .fill()
                .map((_, index) => (
                  <Draggable key={index} coordenadas={coordenadas} updateCoordenadas={updateCoordenadas}>
                    <Circulo key={index} margin={0} width={60} marginTop={6} size={30} marginT={0}>
                      <Text>S</Text>
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
                  <Draggable key={index} updateCoordenadas={updateCoordenadas} coordenadas={coordenadas}>
                    <Circulo key={index} margin={0} width={60} marginTop={6} size={30} marginT={0}>
                      <Text>O</Text>
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
                  <Draggable key={index} updateCoordenadas={updateCoordenadas} coordenadas={coordenadas}>
                    <Circulo key={index} margin={0} width={60} marginTop={6} size={30} marginT={0}>
                      <Text>L</Text>
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
                  <Draggable key={index} updateCoordenadas={updateCoordenadas} coordenadas={coordenadas}>
                    <Circulo key={index} margin={0} width={60} marginTop={9} size={30} marginT={0}>
                      <Text>WS</Text>
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
                  <Draggable key={index} updateCoordenadas={updateCoordenadas} coordenadas={coordenadas}>
                    <Circulo margin={0} width={60} marginTop={9} size={30} marginT={0}>
                      <Text>MB</Text>
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
            <Image source={require('./Resources/flechaDerecha.png')} style={{width: 70, left:40, height: 50}} />
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