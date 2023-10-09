import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Link } from 'react-router-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function BottomBar({focused}) {

useEffect(() => {
  console.log(focused);
}, [focused])

const tabColor = (tabIndex) => {
  return focused === tabIndex ? '#F29C46' : 'white';
};

  return(
    <View style={styles.container}>
      
        <Link to={{pathname: '/home'}}>
          <View style={styles.tab}>
          <Icon name="home" size={25} color={tabColor(1)}/>
          <Text style={[{color : focused === 1?'#F29C46' : 'white'}, styles.labelText]}>Escenas</Text>
          </View>
        </Link>

          
            <Link to={{pathname: '/community'}}>
              <View style={styles.tab}>
              <Icon name="account-group" size={25} color={tabColor(2)}/>
              <Text style={[{color : focused === 2?'#F29C46' : 'white'}, styles.labelText]}>Comunidad</Text>
              </View>
            </Link>

      
        <Link to={{pathname: '/profile'}}>
          <View style={styles.tab}>
          <Icon name="account" size={25} color={tabColor(3)}/>
          <Text style={[{color : focused === 3?'#F29C46' : 'white'}, styles.labelText]}>Perfil</Text>
          </View>
        </Link>
   
      
        <Link to={{pathname: '/settings'}}>
          <View style={styles.tab}>
          <Icon name="cog" size={25} color={tabColor(4)}/>
          <Text style={[{color : focused === 4?'#F29C46' : 'white'}, styles.labelText]}>Ajustes</Text>
          </View>
        </Link>
      
    </View>
);

}

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: height*0.1,
    width: width,
    backgroundColor: '#303747',
  },
  labelText: {
    fontSize: 15,
  },
  tab: {
    alignItems: 'center',
  }
});


    
     