import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { Link } from 'react-router-native';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"; 

function Teams(){

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

      const q = query(collection(db, "teams"), where("userEmail", "==", auth.currentUser.email));
      const asyncQuery = async () => {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots       
        datos[doc.id] = doc.data();
      });
      setIsLoading(false); // Se actualiza el estado para indicar que los datos se han cargado
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
              <Link to={{pathname: `/profile/teams/${clave}`}}>
                <Text style={{ fontSize: 20 }}>{valor.team}</Text>
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
    row: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    width: '100%',
    borderBottomColor: 'gray',
    
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

export default Teams;
