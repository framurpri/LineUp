import React, {useState} from 'react';
import { StyleSheet, Image, ImageBackground, Text, Modal, Pressable} from 'react-native';
import DownBar from './DownBar.jsx'
import { View } from 'react-native-web';
import CreatePlayer from './createPlayer.jsx';

function EscenaBar(){
    const [modalVisible, setModalVisible] = useState(false);
    return (
    <View style={modalVisible ? styles.centeredViewNoOp : styles.centeredViewOp}>
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}>
            <View style={{flex:1, top:200}}>
              <CreatePlayer/>
              <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>Back</Text>
              </Pressable>
              <Pressable
                        style={[styles.button2, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>Create</Text>
              </Pressable>
            </View>
        </Modal>
        <DownBar style={{backgroundColor:'#99CCFF'}}>
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

        opacity: 0.3
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
        marginBottom: 15,
        textAlign: 'center',
      },
});

export default EscenaBar;