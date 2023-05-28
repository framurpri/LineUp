import React from 'react';
import { StyleSheet, View , Image } from 'react-native';
import { Routes, Route, Link } from 'react-router-native';
import DownBar from './DownBar.jsx'
import TopBar from './TopBar.jsx';
import Escenas from './escenas.jsx';
import  Registro  from './Registro.jsx'
import Log from './Login.jsx';

function Basic(){
    return (
        <View style={{flex:1}}>
            <TopBar />
            <DownBar>
                <Link to={{ pathname: '/escenas'}}>
                    <Image source={require('./Resources/escenas.png')} style={styles.image} />
                </Link>
                <Image source={require('./Resources/equipo.png')} style={{width: 80, height: 80}} />
                <Image source={require('./Resources/perfil.png')} style={styles.image} />
                <Image source={require('./Resources/ajustes.png')} style={styles.image} />
            </DownBar>
        </View>
    );
};

function PagBasic(){
    return(
      <Routes>
        <Route path="/" element={<Basic />} />
        <Route path="/escenas" element={<Escenas />} />
        <Route path="/login" element={<Log />} />
        <Route path="/registro" element={<Registro />}/>
      </Routes>
  )};

const styles = StyleSheet.create({
    image: {
        width: 60, 
        height: 60, 
        backgroundColor: 'transparent',
    },
});

export default PagBasic;