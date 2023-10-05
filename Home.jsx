import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';
import BottomBar from './BottomBar';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./Resources/FotoVoley.png')}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>¡Bienvenido a Line Up!</Text>
        <Text style={styles.subtitle}>Descubre el emocionante mundo del volleyball</Text>
        <TouchableOpacity style={styles.button}>
          <Link to={{pathname: '/escenas'}}>
            <Text style={styles.buttonText}>Explorar</Text>
          </Link>
        </TouchableOpacity>
      </View>
      <BottomBar focused={1}></BottomBar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '60%',
    height: '60%',
    position: 'absolute',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  contentContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FF5722',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
