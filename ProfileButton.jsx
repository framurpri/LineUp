import * as React from 'react';
import { Button, View, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';

function ProfileButton() {
  
  const navigation = useNavigation();

    return (
      <View>
        <View style={styles.button}>
          <Button
          title="Back" 
          onPress={() => {
            navigation.goBack();
          }}
          />
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
    }
  });
  
  export default ProfileButton;
