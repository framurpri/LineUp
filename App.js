import { StyleSheet, View } from 'react-native';
import Circulo from './Circulo.jsx';
import Draggable from './Draggable.jsx';
import Navegator from './navigator.jsx';

export default function App() {
  return (
    <View style={styles.container}>
      
      {/* <Draggable>
        <Circulo></Circulo>
      </Draggable> */}
        <Navegator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f',
    alignItems: 'top',
    justifyContent: 'top',
    padding: 0,
    flexDirection: 'row',
  },
});
