import React, {useRef, useState} from 'react';
import {Animated, View, StyleSheet, PanResponder} from 'react-native';

function Draggable({children}){
  const pan = useRef(new Animated.ValueXY()).current;

  

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,

      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}],
        {useNativeDriver: false}),

      onPanResponderRelease: () => {
        pan.extractOffset();

      },
    }),
  ).current;

  return (
    <View style={styles.container} >
      <Animated.View
        style={{
          transform: [{translateX: pan.x}, {translateY: pan.y}],
        }}
        {...panResponder.panHandlers}
        >
          {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Draggable;