import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import MyCard from './CustomCard';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, getDocs, where, deleteDoc, doc } from "firebase/firestore"; 
import { Text } from 'react-native-paper';


const Plays = () => {
    const [datos, setDatos] = useState({});
    const [teamNames, setTeamNames] = useState([]);
    const [docsIds, setDocsIds] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Estado para indicar si se están cargando los datos
    const [expandedCardId, setExpandedCardId] = useState(null);

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);

  const q = query(collection(db, "plays"), where("designer", "==", auth.currentUser.email));
  const asyncQuery = async () => {
      try {
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          // La colección no está vacía
          querySnapshot.forEach((doc) => {
            datos[doc.id] = doc.data();
          });
          setIsLoading(false); // Se actualiza el estado para indicar que los datos se han cargado
        } else {
          // La colección está vacía
          console.log('La colección está vacía');
          setIsLoading(false); // Se actualiza el estado, pero puedes manejarlo de acuerdo a tus necesidades
        }
      } catch (error) {
        console.error('Error al consultar la colección:', error);
        setIsLoading(false); // Maneja el error según tus necesidades
      }
    };

    // Llama a la función asyncQuery para realizar la consulta
    asyncQuery();


  const handleExpand = (id) => {
    setExpandedCardId((prevId) => (prevId === id ? null : id));
  };

  const onDelete = async (idToDelete) => {
    try {
      await deleteDoc(doc(db, "plays", idToDelete));
  
      const updatedDatos = { ...datos };
      delete updatedDatos[idToDelete];
  
      setDatos(updatedDatos);
  
      if (expandedCardId === idToDelete) {
        setExpandedCardId(null);
      }
    } catch (error) {
      console.error('Error al eliminar el documento:', error);
    }
  };

  return (
    isLoading ? (
        <Text style={{justifyContent:'center', alignSelf: 'center'}}>Loading...</Text>
        ) : (
    <ScrollView contentContainerStyle={styles.container}>
        {Object.entries(datos).map(([clave, valor]) => (
          <>
          <View key={clave} style={styles.cardContainer}>
            <MyCard
              id={valor.name}
              clave={clave}
              diff={'plays'}
              descripcion={valor.descripcion}
              handleExpand={handleExpand}
              deleted={() => onDelete(clave)}
              isExpanded={expandedCardId === clave}
            />      
          </View>
          </>
        ))}
      </ScrollView>
    )
  )
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

export default Plays;
