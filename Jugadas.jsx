import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView, Image } from 'react-native'
import { Routes, Route, Link } from 'react-router-native';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"; 
import Icon from 'react-native-vector-icons/FontAwesome';
import TopBar from './TopBar.jsx'
import DownBar from './DownBar';

function Plays(){

      const [datos, setDatos] = useState({});
      const [teamNames, setTeamNames] = useState([]);
      const [docsIds, setDocsIds] = useState([]);
      const [isLoading, setIsLoading] = useState(true); // Estado para indicar si se están cargando los datos

    
      const addNewItem = () => {
        const newItem = { id: datos.length + 1, name: `Elemento ${datos.length + 1}` };
        setDatos([...datos, newItem]);
      };

      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      const auth = getAuth(app);

      const q = query(collection(db, "plays1"), where("designer", "==", auth.currentUser.email));
      const asyncQuery = async () => {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots       
        datos[doc.id] = doc.data();
        setIsLoading(false); // Se actualiza el estado para indicar que los datos se han cargado
      });
        const plays = Object.entries(datos).map(([clave, valor]) => {return `Jugada id es: ${clave} y el nombre es: ${valor.name}`});
        console.log(plays);
      } 
      asyncQuery()
      
    return(
      <View style={styles.container}>
          <View style={{ height: 650, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            {isLoading ? (
              <Text>Loading...</Text> // Muestra el mensaje de carga mientras se obtienen los datos
            ) : (
              <ScrollView contentContainerStyle={styles.subview2}>
                {Object.entries(datos).map(([clave, valor]) => (
                  <View key={clave} style={styles.row}>
                    <Link to={{pathname: `/profile/plays/${clave}`}}>
                      <React.Fragment>
                        <Image source={require('./Resources/cancha.png')} style={styles.image} />
                        <Text style={{ fontSize: 20 }}>{valor.name}</Text>
                      </React.Fragment>
                    </Link>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      width: 150,
      height: 150,
      opacity: 1,
      left: 10,
      alignItems: 'center',
      },
    row: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    width: '50%', 
    backgroundColor: 'grey'
  },
    staticContainer: {
      height: 100
    },
    subview1: {
      backgroundColor: 'red',
    },
    subview2: {
      flex: 1,
      width: 393,
      alignItems: 'center',
    },
    item: {
      height: 50,
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    subview3: {
      backgroundColor: 'blue',
    },
  });

export default Plays;
