import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Routes, Route, Link } from 'react-router-native'
import DownBar from './DownBar.jsx'
import Escenas from './escenas.jsx'
import TopBar from './TopBar.jsx'
import  Registro  from './Registro.jsx'
import Log from './Login.jsx'
import Settings from './Settings.jsx'
import Icon from 'react-native-vector-icons/FontAwesome'

const Basic = () => {
    return (
        <View style={{flex: 1}}>
            <TopBar />
            <DownBar>
                <Link to={{ pathname: '/escenas'}}>
                    <Icon name="film" size={25} color="#900"/>
                </Link>
                <Icon name="group" size={25} color="#900" />
                <Icon name="user" size={25} color="#900" />
                <Link to={{ pathname: '/settings'}}>
                    <Icon name="cog" size={25} color="#900" />
                </Link>
            </DownBar>
        </View>
    );
};

export default Basic;