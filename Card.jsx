import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import MyCard from './CustomCard';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, getDocs, where, deleteDoc, doc } from "firebase/firestore"; 
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Text } from 'react-native-paper';


const Teams = () => {
    const [datos, setDatos] = useState({});
    const [teamNames, setTeamNames] = useState([]);
    const [docsIds, setDocsIds] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Estado para indicar si se están cargando los datos
    const [expandedCardId, setExpandedCardId] = useState(null);
    const [teamImgsDicc, setTeamImgsDicc] = useState({});

    const [allImagesLoaded, setAllImagesLoaded] = useState(false);


    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);
    const storage = getStorage(app);

  const q = query(collection(db, "teams"), where("userEmail", "==", auth.currentUser.email));

 

 const asyncQuery = async () => {
    try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            // La colección no está vacía
            querySnapshot.forEach(async(doc) => {
                // Llamar a getImage para cargar la imagen
                datos[doc.id] = doc.data();
            });

            // Actualizar el estado de teamImgsDicc con todas las imágenes cargadas

            setIsLoading(false);
            console.log(allImagesLoaded) // Se actualiza el estado para indicar que los datos se han cargado
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

  useEffect(()=> {
    asyncQuery()
  }, [allImagesLoaded])


    // Llama a la función asyncQuery para realizar la consulta

  const handleExpand = (id) => {
    console.log(datos)
    setExpandedCardId((prevId) => (prevId === id ? null : id));
  };

  const onDelete = async (idToDelete) => {
    try {
      await deleteDoc(doc(db, "teams", idToDelete));
  
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

  const getImage = async () => {
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      // La colección no está vacía
      querySnapshot.forEach(async(doc) => {
        await getDownloadURL(ref(storage, `teamImages/${doc.data().team}.jpg`))
        .then((url) => {
            teamImgsDicc[doc.data().team] = url;
            console.log(`URL de descarga para ${doc.data().team}: ${url}`);
        })
        .catch((error) => {
            console.error('Error al obtener la URL de descarga:', error);
            teamImgsDicc[doc.data().team] = undefined;
        })
        .finally(() => {
            setAllImagesLoaded(Object.keys(teamImgsDicc).length == Object.keys(datos).length);
        })      
      });    
      
    };
  }

    useEffect(() => {
      getImage()
    }, [])

  return (
    isLoading ? (
        <Text style={{justifyContent:'center', alignSelf: 'center'}}>Loading...</Text>
        ) : allImagesLoaded ? (
    <ScrollView contentContainerStyle={styles.container}>
        {Object.entries(datos).map(([clave, valor]) => (
          <>
          <View key={clave} style={styles.cardContainer}>
            <MyCard
              id={valor.team}
              clave={clave}
              diff={'teams'}
              descripcion={valor.description}
              handleExpand={handleExpand}
              deleted={() => onDelete(clave)}
              isExpanded={expandedCardId === clave}
              image = {teamImgsDicc[valor.team]}
            />      
          </View>
          </>
        ))}
      </ScrollView>
    ) : ( 
        null
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

export default Teams;