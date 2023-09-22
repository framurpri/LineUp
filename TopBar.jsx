import { View, StyleSheet, Dimensions, Text } from "react-native"
import { Link } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Children } from "react";

function Bar(props){

    const {children} = props

    return(
        <View style={styles.view}>
            <Link to={{ pathname: '/home'}}>
                <Icon name="home" size={60} color={hexToRGBA('#99CCFF')}/>
            </Link>
            <View style={styles.text}>
            <Text style={styles.text1}>
                {children}
            </Text>
            </View>
        </View>
    )
} 

const hexToRGBA = (hex, alpha = 1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};


const { width, height } = Dimensions.get('window');
const imageWidth = width * 0.2; 
const imageHeight = height * 0.1; 

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '15%', 
        height: '7%', 
    },
    image: {
        width: imageWidth, 
        height: imageHeight, 
        tintColor: hexToRGBA('#99CCFF'),
    },
    text: {
        left: width*0.54,
    },
    text1: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 25 
    }
})

export default Bar;