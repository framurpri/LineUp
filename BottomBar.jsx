import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Touchable, Pressable, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableHighlight } from 'react-native-web';

export default function BottomBar( ) {

const [focused, setFocused] = useState(null);

useEffect(() => {
  debugger;
  console.log(focused);
}, [focused])

const tabColor = (tabIndex) => {
  return focused === tabIndex ? '#F29C46' : 'white';
};

  return(
    <View style={styles.container}>
      <Pressable  onPress={() => setFocused(1)}>
        <View style={styles.tab}>
        <Icon name="movie-open" size={25} color={tabColor(1)}/>
        <Text style={[{color : focused === 1?'#F29C46' : 'white'}, styles.labelText]}>Escenas</Text>
        </View>
      </Pressable>
        <Link to={{pathname: '/settings'}}>
          <TouchableOpacity onPress={() => setFocused(2)}>
          <View style={styles.tab}>
          <Icon name="account-group" size={25} color={tabColor(2)}/>
          <Text style={[{color : focused === 2?'#F29C46' : 'white'}, styles.labelText]}>Comunidad</Text>
          </View>
          </TouchableOpacity>
        </Link>
      <Pressable onPress={() => setFocused(3)}>
        <View style={styles.tab}>
        <Icon name="account" size={25} color={tabColor(3)}/>
        <Text style={[{color : focused === 3?'#F29C46' : 'white'}, styles.labelText]}>Perfil</Text>
        </View>
      </Pressable>
      <Pressable onPress={() => setFocused(4)}>
        <View style={styles.tab}>
        <Icon name="cog" size={25} color={tabColor(4)}/>
        <Text style={[{color : focused === 4?'#F29C46' : 'white'}, styles.labelText]}>Ajustes</Text>
        </View>
      </Pressable>
    </View>
);

}

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: height*0.15,
    width: width,
    backgroundColor: '#303747',
  },
  labelText: {
    fontSize: 15,
  },
  tab: {
    alignItems: 'center',
  }
});


    
     



