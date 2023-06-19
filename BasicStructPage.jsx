import React from 'react';
import { StyleSheet, View , Image } from 'react-native';
import { Routes, Route, Link } from 'react-router-native';
import TopBar from './TopBar.jsx';
import Escenas from './escenas.jsx';
import  Registro  from './Registro.jsx'
import Log from './Login.jsx';
import DownBar from './DownBar.jsx';
import Settings from './Settings.jsx'
import Icon from 'react-native-vector-icons/FontAwesome';
import AuthMenu from './AuthMenu.jsx'

function Basic(){
    return (
        <View style={{flex:1}}>
            <TopBar/>
            <AuthMenu/>
            <DownBar>
                <Link to={{ pathname: '/escenas'}}>
                    <Icon name="film" size={25} color="#900" />
                </Link>
                <Link to={{ pathname: '/group'}}>
                    <Icon name="group" size={25} color="#900" />
                </Link>
                <Link to={{ pathname: '/user'}}>
                    <Icon name="user" size={25} color="#900" />
                </Link>
                <Link to={{ pathname: '/settings'}}>
                    <Icon name="cog" size={25} color="#900" />
                </Link>
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
        <Route path="/settings" element={<Settings />} />
      </Routes>
  )};

const styles = StyleSheet.create({
    image: {
        width: 60, 
        height: 60, 
        backgroundColor: 'transparent',
    },
    button: {
        backgroundColor: '#99CCFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: 140,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default PagBasic;