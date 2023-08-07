import React, { useState , useEffect } from 'react';
import Constants from 'expo-constants'
import { View, StyleSheet, Text, TextInput, Pressable } from 'react-native'
import { useParams } from 'react-router-native';
import Basic from './BasicStructPage.jsx'
import Login from './Login.jsx'
import CreatePlayer from './createPlayer.jsx'
import { NavMenu } from './NavMenu.jsx'
import  AuthMenu from './AuthMenu.jsx'
import Teams from './Teams.jsx'
import { NewTeam } from './NewTeam.jsx'
import Team from './Team.jsx';
import ChangePassword from './ChangePassword.jsx'
import Icon from 'react-native-vector-icons/FontAwesome';
import { firebaseConfig } from './firebase-config.js';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, query, where, getDocs, updateDoc } from "firebase/firestore";


export default function Applications() {

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);
    const params = useParams();
    const { id } = params;
    const [teamName, setTeamName] = useState('');
    const [msgContent, setMsgContent] = useState('');
   

    return (
        <View style={{ flex: 1 }}>
            <Text>Hola</Text>
        </View>
    )
  }

