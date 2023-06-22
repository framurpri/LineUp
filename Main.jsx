import React from 'react'
import Constants from 'expo-constants'
import { View, StyleSheet } from 'react-native'
import Basic from './BasicStructPage.jsx'
import Login from './Login.jsx'
import Escenas from './escenas.jsx'
import CreatePlayer from './createPlayer.jsx'
import { View, Text } from 'react-native'
import { NavMenu } from './NavMenu'
import  AuthMenu from './AuthMenu'

export default function Main() {
    return (
        <View style={{ flex: 1 }}>
          <AuthMenu></AuthMenu>
        </View>
    )
  }

