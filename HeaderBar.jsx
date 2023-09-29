import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function HeaderBar() {

  return(
    <View style={styles.container}>
      <View style={styles.tab}>
        <Link to={{ pathname: "/home"}}>
            <Icon name="home" size={40} color='white'/>      
        </Link>
      </View>
    </View>
);
}

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    top: 0,    
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: height*0.15,
    width: width,
    backgroundColor: '#303747',
  },
  labelText: {
    fontSize: 15,
  },
  tab: {
    margin: 35
  }
});


    
     



