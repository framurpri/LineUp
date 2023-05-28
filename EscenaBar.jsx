import React from 'react';
import { StyleSheet, Image, ImageBackground, Text } from 'react-native';
import DownBar from './DownBar.jsx'

function EscenaBar(){
    return (
            <DownBar>
                <ImageBackground source={require('./Resources/buttonAddPlayer.png')} style={{width: 70, height: 70}}>
                    <Text style={styles.text}>Add Player</Text>
                </ImageBackground>
                <Image source={require('./Resources/flechaIzquierda.png')} style={{width: 80, height: 80}} />
                <Image source={require('./Resources/flechaDerecha.png')} style={{width: 70, height: 50}} />
                <Text style={{fontSize: 40}} >Finish</Text>
            </DownBar>
    );
};

const styles = StyleSheet.create({
    text: {
        justifyContent: 'center',
        textAlign: 'center',
        paddingVertical: 8,
        fontSize: 16,
    }
});

export default EscenaBar;