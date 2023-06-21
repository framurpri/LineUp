import { View, StyleSheet, Image } from "react-native"
import { Routes, Route, Link } from 'react-router-native';
import Basic from './BasicStructPage.jsx'


function Bar(){
    return(
        <View style={styles.view}>
            <Link to={{ pathname: '/'}}>
                <Image source={require('./Resources/home.png')} style={styles.image} />
            </Link>
        </View>
    )
} 

const hexToRGBA = (hex, alpha = 1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};




const styles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: 'column',
        top: 0,
        left: 0,
        right: 0,
        width: 80, 
        height: 80, 
    },
    image: {
        width: 80, 
        height: 80, 
        borderRadius: 70,
        backgroundColor: 'transparent',
        tintColor: hexToRGBA('#99CCFF'),
    },
})

export default Bar;