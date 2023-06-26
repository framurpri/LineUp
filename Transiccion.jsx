import React, { forwardRef, useEffect, useRef , useImperativeHandle} from 'react';
import { Animated, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Circulo from './Circulo';

const EnlaceTransiciones = forwardRef((props, ref) => {

    const {numEscenas, coordenadas, children} = props;

    const position = useRef(new Animated.ValueXY()).current;

    useImperativeHandle(ref, () =>{
        return {iniciarTransicion
        }
    })

    const iniciarTransicion = () =>{
    const duration = 2000; // Duración de cada animación en milisegundos

    const transiciones = {};

    for (let i = 0; i < numEscenas; i++) {
      const nombreTransicion = `transicion${i}`;
    
      transiciones[nombreTransicion] = Animated.timing(position, {
        toValue: { x: coordenadas[i][0], y: coordenadas[i][1] },
        duration,
        useNativeDriver: false,
      });
    }

    const secuencia = Animated.sequence(Object.values(transiciones));

    secuencia.start();// Repetir la secuencia indefinidamente
  };

  return (
    <View style={styles.container}>
      <View>
        <Animated.View style={[position.getLayout()]}>
           {children}
        </Animated.View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  boxContainer: {
    height: 200,
    width: 200,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
});

export default EnlaceTransiciones;
