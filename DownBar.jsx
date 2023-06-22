import { View, StyleSheet } from 'react-native';

function DownBar({ children }) {

  return (
    <View style= {styles.container}>
      {children}
    </View>
  );
};

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
    height: 100,
    backgroundColor: 'grey',
  },
});

export default DownBar;
