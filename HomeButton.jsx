import * as React from 'react';
import { Button, View, StyleSheet, TouchableOpacity, Text } from 'react-native';

function HomeButton({ navigation: { navigate }}) {
    return (
      <View>
        <View style={styles.button}>
          <Button onPress={() => navigate('Profile')}/>
        </View>
      </View>

    );
  }

  const styles = StyleSheet.create({
    button: {
      flex: 1, 
      alignItems: 'right', 
      justifyContent: 'right',
      backgroundColor: 'oldlace',
      alignSelf: 'flex-start',
      marginHorizontal: '1%',
      marginBottom: 6,
      textAlign: 'center',
    },
    image:{
      width: 40,
      height: 40,
      resizeMode: 'contain',
    }
  });

  export default HomeButton;