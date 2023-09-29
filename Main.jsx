import React from 'react';
import Constants from 'expo-constants';
import { View, StyleSheet, Text} from 'react-native';
import Basic from './BasicStructPage.jsx';
import Login from './Login.jsx';
import CreatePlayer from './createPlayer.jsx';
import { NavMenu } from './NavMenu';
import  AuthMenu from './AuthMenu';
import Teams from './Teams.jsx';
import  NewTeam from './NewTeam.jsx';
import Team from './Team.jsx';
import ChangePassword from './ChangePassword.jsx';
import Chat from './Chat.jsx';
import Profile from './Profile.jsx';
import PruebaDownbar from './PruebaDownbar.jsx';
import { NavigationContainer } from '@react-navigation/native';
import Escenas from './escenas.jsx'
import Plays from './Plays.jsx';
import RealTimeChat from './RealTimeMessage.jsx';

export default function Main() {
    return (
        <View style={{ flex: 1 }}>
            <AuthMenu/>
        </View>
    )
  }
  