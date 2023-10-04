import { View, StyleSheet, Dimensions } from 'react-native';

function DownBar({ children }) {

  return (
    <View style= {styles.container}>
      {children}
    </View>
  );
};

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: height*0.15,
    width: width,
    backgroundColor: '#303747',
  },
});

export default DownBar;
