import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions} from 'react-native';
import { NativeRouter, Link } from 'react-router-native';
import { Button } from 'react-native-paper';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import PruebaDownbar from './PruebaDownbar'; 
function AuthMenu() {

  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

if(auth.currentUser == null){
  
}
  
  function adjustWidth(){
    const { width , height } = Dimensions.get('window');
/*actualDimensions in case of an screen rotation. JS detects it automatically now, so this code may be deprecated
    const actualDimensions = {
      height: (height<width) ? width : height,
      width: (width>height) ? height : width
    }
*/
    let newWidth = 0;
    switch(true){
      case (width < 500):
        newWidth = width * 0.35
        break;
      case width >= 500 && width < 900:
        newWidth = width * 0.4
        break;
      case width >= 900:
        newWidth = width * 0.20
        break;
    }
    return newWidth;
  }

  adjustWidth();

  return(
        <View style={styles.container}>     
          
          <Image source={require('./Resources/logoLineUpMigue.png')} style={styles.image}/>
          <Text style={styles.title}>LineUp</Text>
          
          <Link to={{ pathname: '/authentication/login'}}>
            <Button mode="contained" style={[styles.button, {width: adjustWidth()}]}>
              Login
            </Button>
          </Link>
          <Link to={{ pathname: '/authentication/registro'}}>
            <Button mode="contained" style={[styles.button2, {width: adjustWidth()}]}>
              Regístrate
            </Button>
          </Link>
        </View>
  )

};


const styles = StyleSheet.create({
    container: {
      flex: 20,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
        backgroundColor: '#F29C46'
    },
    button2: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      marginTop: 10,
      backgroundColor: '#303747'
  },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: -55,
    },
    title: {
        marginBottom: 70,
        fontSize: 30,
        fontStyle: 'italic',
        fontWeight: 'bold'
    }
  });

export default AuthMenu;
