import React, { useEffect, useRef, useState } from "react"
import EnlaceTransiciones from "./Transiccion";
import { Animated, View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import Circulo from "./Circulo";
import { Routes, Route, Link, useParams } from 'react-router-native';
import { ImageBackground } from "react-native-web";
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, query, where, getDocs } from "firebase/firestore";


function visualizacion(){

  const [captainEmail, setCaptainEmail] = useState('');
  const [coord, setCoord] = useState();
  const [isLoading, setIsLoading] = useState(true); // Estado para indicar si se están cargando los datos

  const [extract, setExtract] = useState(
    
    {
      S: {

      }, 
      O: {

      }, 
      L: {

      }, 
      WS: {

      }, 
      MB: {

      }
    })


    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);
    
    const params = useParams();
      const {id} = params;
      console.log(id)
      const docRef = doc(db, "plays1", id);

    useEffect(() =>{
    const retrieveDocument = async () => {

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data().scenes[1]);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      setCoord(docSnap.data().scenes);
      setIsLoading(false);

      Object.keys(docSnap.data().scenes[1].coordenada).forEach((refKey, index) => {
        setNumJugadores((prevState) => ({
          ...prevState,
          [refKey]: Object.keys(docSnap.data().scenes[1].coordenada[refKey]).length,
        }));
      });
      
    };
    retrieveDocument()
  }, [])


    

    const refs = {
        S: {
          Refs: {
            ref1: useRef(null),
            ref2: useRef(null),
          },
        },
        O:  {
          Refs: {
            ref1: useRef(null),
            ref2: useRef(null),
          },
        },
        L: {
          Refs: {
            ref1: useRef(null),
            ref2: useRef(null),
          },
        },
        WS: {
          Refs: {
            ref1: useRef(null),
            ref2: useRef(null),
          },
        },
        MB: {
          Refs: {
            ref1: useRef(null),
            ref2: useRef(null),
          },
        },
    }


  
  const [numJugadores, setNumJugadores] = useState({S: 0, 
    O: 0, 
    L: 0, 
    WS: 0, 
    MB: 0});

    const obtenerJugadores = () => {
      Object.keys(coord[1].coordenada).forEach((refKey, index) => {
          setNumJugadores((prevState) => ({
            ...prevState,
            [refKey]: Object.keys(coord[1].coordenada[refKey]).length,
          }));
          console.log(Object.keys(coord[1].coordenada[refKey]).length)
      });
    }

    const sacarCoordenadas = (indicador, clave) =>{
            const coordenadas = [];
            const scenes = Object.entries(coord)
            console.log(scenes)
            const keys = Object.keys(coord[1].coordenada)
            scenes.forEach((scene) =>{
            keys.forEach((key)=>{
                if(clave===key){
                    const c = `coordenada${indicador}`;
                    const coordenada = scene[1].coordenada[clave][c];
                    coordenadas.push(coordenada)
                }
            })
        })
        console.log(coordenadas)
        return coordenadas;
    }
           
    const activarAnimacion = ()=>{
        for (const key in refs) {
            if (refs.hasOwnProperty(key)) {
              const refObj = refs[key].Refs;
              for (const refKey in refObj) {
                if (refObj.hasOwnProperty(refKey)) {
                  const ref = refObj[refKey];
                  if (ref.current) {
                    ref.current.iniciarTransicion();
                  } else {
                    console.log(`La referencia ${refKey} en la clave ${key} no ha sido utilizada.`);
                  }
                }
              }
            }
          }          
    }

  return(
    <View style={{ flex: 1, justifyContent: 'center',alignItems: 'center',marginTop: 22,}} >
      <View style={styles.view}>
                <Image source={require('./Resources/flechaIzquierda.png')} style={styles.image2} />
        </View>
      <ImageBackground source={require('./Resources/cancha.png')} style={styles.image}/>
      {isLoading ? (
        <div>Loading...</div> // Muestra el mensaje de carga mientras se obtienen los datos
      ) : (
      <View style={{ right: 50, bottom:750,  flex: 1, flexDirection: 'row' }}>
          {numJugadores.S > 0 && (
            <React.Fragment>
              {Array(numJugadores.S)
                .fill()
                .map((_, index) => (
                    <EnlaceTransiciones ref={refs.S.Refs[`ref${index + 1}`]} key={index} numEscenas={Object.keys(coord).length} coordenadas={sacarCoordenadas(index+1,"S")}>
                        <Circulo key={index} margin={0} top={coord[1].coordenada.S[`coordenada${index+1}`][1]} left={(coord[1].coordenada.S[`coordenada${index+1}`][0] - 150) } width={60} marginTop={6} size={30} marginT={0}>
                        <Text key={index}>S</Text>
                        </Circulo>
                    </EnlaceTransiciones>
                ))}
            </React.Fragment>
          )}

         {numJugadores.O > 0 && (
            <React.Fragment>
              {Array(numJugadores.O)
                .fill()
                .map((_, index) => (
                    <EnlaceTransiciones ref={refs.O.Refs[`ref${index + 1}`]} key={index} numEscenas={Object.keys(coord).length} coordenadas={sacarCoordenadas(index+1,"O")}>
                        <Circulo key={index} top={coord[1].coordenada.O[`coordenada${index+1}`][1]} left={(coord[1].coordenada.O[`coordenada${index+1}`][0] - 150)} margin={0} width={60} marginTop={6} size={30} marginT={0}>
                        <Text key={index}>O</Text>
                        </Circulo>
                    </EnlaceTransiciones>
                ))}
            </React.Fragment>
          )} 
          {numJugadores.L > 0 && (
            <React.Fragment>
              {Array(numJugadores.L)
                .fill()
                .map((_, index) => (
                    <EnlaceTransiciones ref={refs.L.Refs[`ref${index + 1}`]} key={index} numEscenas={Object.keys(coord).length} coordenadas={sacarCoordenadas(index+1,"L")}>
                        <Circulo key={index} top={coord[1].coordenada.L[`coordenada${index+1}`][1]} left={(coord[1].coordenada.L[`coordenada${index+1}`][0] - 150)} margin={0} width={60} marginTop={6} size={30} marginT={0}>
                            <Text key={index}>L</Text>
                        </Circulo>
                    </EnlaceTransiciones>
                ))}
            </React.Fragment>
          )} 
          {numJugadores.WS > 0 && (
            <React.Fragment>
              {Array(numJugadores.WS)
                .fill()
                .map((_, index) => (
                    <EnlaceTransiciones ref={refs.WS.Refs[`ref${index + 1}`]} key={index} numEscenas={Object.keys(coord).length} coordenadas={sacarCoordenadas(index+1,"WS")}>
                        <Circulo key={index} top={coord[1].coordenada.WS[`coordenada${index+1}`][1]} left={(coord[1].coordenada.WS[`coordenada${index+1}`][0] - 150 )} margin={0} width={60} marginTop={9} size={30} marginT={0}>
                            <Text key={index}>WS</Text>
                        </Circulo>
                    </EnlaceTransiciones>
                ))}
            </React.Fragment>
          )}
          {numJugadores.MB > 0 && (
            <React.Fragment>
              {Array(numJugadores.MB)
                .fill()
                .map((_, index) => (
                    <EnlaceTransiciones ref={refs.MB.Refs[`ref${index + 1}`]} key={index} numEscenas={Object.keys(coord).length} coordenadas={sacarCoordenadas(index+1,"MB")}>
                        <Circulo key={index} top={coord[1].coordenada.MB[`coordenada${index+1}`][1]} left={(coord[1].coordenada.MB[`coordenada${index+1}`][0] - 150)} margin={0} width={60} marginTop={9} size={30} marginT={0}>
                            <Text>MB</Text>
                        </Circulo>
                    </EnlaceTransiciones>
                ))}
            </React.Fragment>
          )} 
          </View>
      )};
          <View style={{flex:1, bottom:750, }}>
            <TouchableOpacity onPress={activarAnimacion} style={styles.button}>
                <Text style={styles.buttonText}>Iniciar Transición</Text>
            </TouchableOpacity>
          </View>
      </View>
  )
}

const hexToRGBA = (hex, alpha = 1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};


const styles = StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
        marginBottom: 20,
        width: 100,
        height:60,
        top:690,
        left:130
    },
    buttonText: {
    color: 'white',
    fontSize: 16,
    },
    image: {
      width: 395,
      height: 648,
      opacity: 1,
      },
      view: {
        flex: 1,
        left: 0,
        right: 0,
        width: 80, 
        height: 80, 
    },
    image2: {
        width: 70, 
        height: 70, 
        borderRadius: 90,
        right: 150,
        bottom: 7,
        backgroundColor: '#900',
        tintColor: hexToRGBA('#99CCFF'),
    },
})

export default visualizacion;