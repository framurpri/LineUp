import React from 'react'
import Constants from 'expo-constants'
import { View } from 'react-native'
import Basic from './BasicStructPage.jsx'
import Login from './Login.jsx'

  const Main = () => {
    return (
        <View style={{ flex: 1 }}>
            <Login/>
            <Basic/>
        </View>
    )
  }

  export default Main

