import React from 'react';
import { View, Text } from 'react-native';

function Circulo(props){

  const {children, margin, width, name, state, hola, top, left,  marginTop, size, marginT} = props;

  const onPressState = () => {
    hola(state, name)
  }

  return(
    <View onTouchStart={onPressState}
    style={{
      width: width,
      height: width,
      alignItems: 'center',
      alignContent: 'center', 
      backgroundColor: 'blue',
      borderRadius: 80,
      top: top,
      left: left,
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