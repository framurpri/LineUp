import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HeaderBar from './HeaderBar';
import BottomBar from './BottomBar';

export default function Home() {

  return(
    <View style={styles.container}>
      <HeaderBar/>
      <Text style={styles.text}>Line Up!</Text>
      <BottomBar/>
    </View>
);
}

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 50,
    color: 'black'
  }
});


    
     



