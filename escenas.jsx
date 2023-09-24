import React, { useState } from 'react';
import { View, Image, StyleSheet, Text} from 'react-native';
import EscenaBar from './EscenaBar';
import TopBar from './TopBar.jsx'

function Escenas(){

  const [currentScene, setCurrentScene] = useState(0)

  const handlePlusScene = (newScene) => {
    setCurrentScene(newScene)
  }

  const handleLessScene = (newScene) => {
    if(currentScene != 0){
    setCurrentScene(newScene)
    }
  }

    return(
    <View style={{flex:1}}>
        <TopBar>
          <Text>
            ESCENA: {currentScene + 1}
          </Text>
        </TopBar>
        <View style={styles.container}>
            <Image source={require('./Resources/cancha.png')} style={styles.image}/>
            <EscenaBar handlePlusScene={handlePlusScene} handleLessScene={handleLessScene}/>
        </View>
    </View>
    )
  };


  const styles = StyleSheet.create({
  image: {
    width: '110%',
    height: '88%',
    opacity: 1,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',

    }
  })

export default Escenas;