import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Pressable, ScrollView, Image, Dimensions } from 'react-native'
import { Routes, Route, Link } from 'react-router-native';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"; 
import Icon from 'react-native-vector-icons/FontAwesome';
import TopBar from './TopBar.jsx'
import DownBar from './DownBar';
import { Card, Text, Title, Paragraph, IconButton } from 'react-native-paper';
import MyCard from './CustomCard';

function Plays(){

      const [datos, setDatos] = useState({});
      const [teamNames, setTeamNames] = useState([]);
      const [docsIds, setDocsIds] = useState([]);
      const [isLoading, setIsLoading] = useState(true); // Estado para indicar si se están cargando los datos
      const [expandedCardId, setExpandedCardId] = useState(null);

      const handleExpand = (clave) => {
        setExpandedCardId((prevClave) => (prevClave === clave ? null : clave));
      };

      const onDelete = (idToDelete) => {
        // Utilizamos la función `filter` para crear una nueva lista sin el elemento a eliminar
        const newData = data.filter((item) => item.id !== idToDelete);
        setData(newData);
      };

      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      const auth = getAuth(app);

      const q = query(collection(db, "plays"));
      const asyncQuery = async () => {
        const querySnapshot = await getDocs(q);
      
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots       
          datos[doc.id] = doc.data();
          setIsLoading(false); // Se actualiza el estado para indicar que los datos se han cargado
        });
        const plays = Object.entries(datos).map(([clave, valor]) => {return `Jugada id es: ${clave} y el nombre es: ${valor.name}`});
        console.log(plays);
      };    
      asyncQuery()
      
    return(
        <View style={styles.container}>
            <View>
                <View>
                    <TopBar />
                </View>
            </View>
          <View style={{ height: 650, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <Text style={{ fontSize: 20, color: "#006775", fontWeight: 'bold', width: '100%' , textAlign: 'center'}}>My Plays</Text>
      {isLoading ? (
        <Text>Loading...</Text> // Muestra el mensaje de carga mientras se obtienen los datos
      ) : (
      <ScrollView contentContainerStyle={styles.container2}>
        {Object.entries(datos).map(([clave, valor]) => (
          <>
          <View key={clave} style={styles.cardContainer}>
            <MyCard
              id={valor.name}
              handleExpand={handleExpand}
              deleted={onDelete}
              isExpanded={expandedCardId === clave}
            />      
          </View>
          </>
        ))}
      </ScrollView>

    )}
  </View>

          <View style={styles.staticContainer}>
              <DownBar>
                  <Link to={{ pathname: '/escenas'}}>
                      <Icon name="film" size={25} color="#900"/>
                  </Link>
                  <Link to={{pathname: '/teams'}}>
                      <Icon name="group" size={25} color="#900" />
                  </Link>
                  <Link to={{ pathname: '/plays'}}>
                      <Icon name="user" size={25} color="#900" />
                  </Link>
                  <Link to={{ pathname: '/settings'}}>
                      <Icon name="cog" size={25} color="#900" />
                  </Link>
              </DownBar>
          </View>
      </View>
  )
}

const {width,height} = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
    opacity: 1,
    left: 30,
    justifyContent: "center",
    alignItems: 'center',
    },
  row: {
  flexDirection: 'row',
  paddingVertical: 8,
  borderBottomWidth: 1,
  width: '80%',
  height: '40%', 
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
    justifyContent: 'space-between',
    display: 'grid', 
    paddingHorizontal: 16,
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    marginBottom: 30 
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
  container2: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: width*0.5,
    marginBottom: 16,
    padding: 15
  },
});

export default Plays;
