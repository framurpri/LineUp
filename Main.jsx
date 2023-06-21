import React from 'react'
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

