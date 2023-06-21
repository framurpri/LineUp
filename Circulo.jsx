import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Draggable } from './Draggable.jsx';

class Circulo extends React.Component {
    render() { 
      return (
        <Draggable>
          <View style={styles.container}>
              <View style={styles.outerCircle}>
                <View style={styles.innerCircle} />
              </View>
          </View>
        </Draggable>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    outerCircle: {
      borderRadius: 40,
      width: 80,
      height: 80,
      backgroundColor: 'white',
    },
    innerCircle: {
      borderRadius: 35,
      width: 70,
      height: 70,
      margin: 5,
      backgroundColor: 'black'
    },
  });

  export default Circulo;