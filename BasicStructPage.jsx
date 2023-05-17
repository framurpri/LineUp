import React from 'react';
import { StyleSheet, View , Text} from 'react-native';
import DownBar from './DownBar.jsx'
const Basic = () => {
    return (
        <View>
        <DownBar>
            <Text style={styles.buttonText}>Opción 1</Text>
            <Text style={styles.buttonText}>Opción 2</Text>
            <Text style={styles.buttonText}>Opción 3</Text>
            <Text style={styles.buttonText}>Opción 3</Text>
        </DownBar>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Basic;