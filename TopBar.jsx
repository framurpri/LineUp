import { View, StyleSheet, Dimensions } from "react-native"
import { Link } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome'

function Bar(){

    return(
        <View style={styles.view}>
            <Link to={{ pathname: '/home'}}>
                <Icon name="home" size={60} color={hexToRGBA('#99CCFF')}/>
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


const { width, height } = Dimensions.get('screen');
const imageWidth = width * 0.2; 
const imageHeight = height * 0.1; 

const styles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        left: 0,
        right: 0,
        width: '20%', 
        height: '20%', 
    },
    image: {
        width: imageWidth, 
        height: imageHeight, 
        borderRadius: 70,
        backgroundColor: 'transparent',
        tintColor: hexToRGBA('#99CCFF'),
    },
})

export default Bar;