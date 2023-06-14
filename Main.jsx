import React from 'react'
import Constants from 'expo-constants'
import { View } from 'react-native'
import Basic from './BasicStructPage.jsx'
import AuthRoutes from './AuthMenu.jsx'

  const Main = () => {
    return (
        <View style={{ flex: 1 }}>
            <AuthRoutes/>
            <Basic/>
        </View>
    )
  }

  export default Main

