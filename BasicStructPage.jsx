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

export default PagBasic;