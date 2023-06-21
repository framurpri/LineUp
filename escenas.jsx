import React from 'react';
import { View, Image, StyleSheet} from 'react-native';
import EscenaBar from './EscenaBar';
import TopBar from './TopBar.jsx'

function Escenas(){
    return(
    <View style={{flex:1}}>
        <TopBar />
        <View style={styles.container}>
            <Image source={require('./Resources/cancha.png')} style={styles.image}/>
            <EscenaBar/>
        </View>
    </View>
    )
  };


  const styles = StyleSheet.create({
  image: {
    width: 395,
    height: 600,
    opacity: 0.7,
    },
    container: {
      flex: 10,
      alignItems: 'center',
      justifyContent: 'center',

    }
  })

export default Escenas;