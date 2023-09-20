import React, { useState } from "react";
import { Text, View, StyleSheet, Alert, Pressable} from "react-native";
import Circulo from "./Circulo";
import UpButton from "./upButton";

function createPlayer({ updateParentState, dictionary, modalVisible, setModalVisible }){
    
    const [state, setState] = useState('S');

    const handleStateChange = (newState) => {
        setState(newState);
    };

    const [count, setCount] = useState(1);

    const increment = () => {
        var keys = Object.keys(dictionary);
        var value = dictionary[state]

        if (count == 2 || value >= 1){
            null
        }
        else if (value == 0) {
        setCount(count + 1);
        console.log(value)
        }    
        else {
            setCount(count + 1);
            console.log(value)

        }
    };
    
    const decrement = () => {
        if (count == 1){
            null
        }
        else {
        setCount(count - 1);
        }
    };

    const handleClick = () => {
        const keys = Object.keys(dictionary);
        for (var i=0; i<keys.length; i++ ){
            if(keys[i] == state){
                var array = Object.values(dictionary[keys[i]])
                if (array.length==0 && count == 1){
                    const value = 1;
                    updateParentState({ ...dictionary, [state]: [...dictionary[state], value] })
                }
                else if (array.length==0 && count == 2){
                    const value = [1,2];
                    updateParentState({ ...dictionary, [state]: [...dictionary[state], ...value] })
                }
                else if (array.length==1 && array.indexOf(1) !== -1){
                    const value = 2;
                    updateParentState({ ...dictionary, [state]: [...dictionary[state], value] })
                }
                else if (array.length==1 && array.indexOf(2) !== -1){
                    const value = 1;
                    updateParentState({ ...dictionary, [state]: [...dictionary[state], value] })
                }
                else {
                    Alert.alert(
                        'Únicamente se pueden crear 2 jugadores con el mismo rol',
                        [
                          { text: 'Aceptar', onPress: () => console.log('Alerta cerrada') }
                        ],
                        { cancelable: false }
                    );
                }
            }
        }   
       
    };

   
    return(
        <View style={styles.modalView}>
            <View style={{bottom:170, right:120}}>
                <UpButton width={50} height={20} children={'SETTER'} name={'S'} onStateChange={handleStateChange}>
                </UpButton>
            </View>
            <View style={{bottom:270, left:7}}>
                <UpButton width={65} height={40} children={'MIDDLE BLOCKER'} name={'MB'} onStateChange={handleStateChange}>
                </UpButton>
            </View>
            <View style={{bottom:365, left:120}}>
                <UpButton width={50} height={40} children={'WING SPIKER'} name={'WS'} onStateChange={handleStateChange}>
                </UpButton>
            </View>
            <View style={{bottom:355, right:110}}>
                <UpButton width={70} height={20} children={'OPPOSITE'} name={'O'} onStateChange={handleStateChange}>
                </UpButton>
            </View>
            <View style={{bottom:435}}>
                <UpButton width={50} height={20} children={'LIBERO'} name={'L'} onStateChange={handleStateChange}>
                </UpButton>
            </View>
            <View style={styles.subView}>
                <View style={{flexDirection:'row'}}>
                    <Circulo margin={30} width={70} marginTop={15} size={30} marginT={10}>
                        <Text>{state}</Text>
                    </Circulo>
                    <Text style={{marginTop:25, marginRight:70, fontSize:30, fontWeight: 'bold'}}>{count} x</Text>
                    <Text style={{marginTop:15, textAlign: 'center', alignContent:'center', alignSelf: 'center', alignItems: 'center', backgroundColor:'white', height:40, fontSize:30, width:30, fontWeight: 'bold'}} onPress={increment}>+</Text>
                    <Text style={{marginTop:15, textAlign: 'center', alignContent:'center', alignSelf: 'center', alignItems: 'center', backgroundColor:'white', height:40, fontSize:30, width:30, fontWeight: 'bold'}} onPress={decrement}>-</Text>
                </View>
            </View>
            <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Back</Text>
            </Pressable>
            <Pressable
                style={[styles.button2, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
                onPressIn={handleClick}>
                <Text style={styles.textStyle}>Create</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
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
    subView: {
        backgroundColor:'#DDA0DD', 
        alignItems: 'center',
        width:340, 
        height:150, 
        bottom:410, 
        borderRadius:20,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 150,
        alignItems: 'center',
        height: 40,
        bottom: 460,
        right: 80
    },
    button2: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 150,
        alignContent: 'center',
        height: 40,
        bottom: 500,
        left: 80
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
})

export default createPlayer;