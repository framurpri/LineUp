import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import MyCard from './CustomCard';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, getDocs } from "firebase/firestore"; 


const CardsList = () => {
    const [datos, setDatos] = useState({});
    const [teamNames, setTeamNames] = useState([]);
    const [docsIds, setDocsIds] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Estado para indicar si se están cargando los datos
    const [expandedCardId, setExpandedCardId] = useState(null);

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
    };    
    asyncQuery()

  const handleExpand = (id) => {
    setExpandedCardId((prevId) => (prevId === id ? null : id));
  };

  const onDelete = (idToDelete) => {
    // Utilizamos la función `filter` para crear una nueva lista sin el elemento a eliminar
    const newData = data.filter((item) => item.id !== idToDelete);
    setData(newData);
  }; 

  const { width } = Dimensions.get('window');

  return (
    <ScrollView contentContainerStyle={styles.container}>
        {Object.entries(datos).map(([clave, valor]) => (
          <>
          <View style={styles.cardContainer}>
            <MyCard
              id={valor.name}
              clave={clave}
              handleExpand={handleExpand}
              deleted={onDelete}
              isExpanded={expandedCardId === clave}
            />      
          </View>
          </>
        ))}
      </ScrollView>
  );
};

const {width,height} = Dimensions.get('window')

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between', 
      height: 50,
    },
    lineBreak: {
      width: '100%',
      height: 16, // Espacio entre las filas de tarjetas
    },
    cardContainer: {
      width: width*0.5,
      padding: 15
    },
  });

export default CardsList;
