import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Draggable  from './Draggable.jsx';

function Circulo(props){

  const {children, margin, width, marginTop, size, marginT} = props;

  return(
    <View style={{height: 50,
      width: width,
      height: width,
      alignItems: 'center',
      alignContent: 'center', 
      backgroundColor: 'blue',
      borderRadius: 80,
      marginTop: marginT,
      marginRight: margin}}>
      <Text selectable={false} style={{fontSize: size,
        fontWeight: 'bold',
        marginTop: marginTop,}}>
          {children}
      </Text>
    </View>
)}


export default Circulo;