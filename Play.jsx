import React, { useEffect, useRef, useState } from "react"
import EnlaceTransiciones from "./Transiccion";
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, Image } from 'react-native';
import Circulo from "./Circulo";
import { Routes, Route, Link, useParams } from 'react-router-native';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, query, where, getDocs } from "firebase/firestore";
import Draggable from "react-native-draggable";


function visualizacion(){

  const [captainEmail, setCaptainEmail] = useState('');
  const [coord, setCoord] = useState([]);
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
      const docRef = doc(db, "plays", id);

    useEffect(() =>{
    const retrieveDocument = async () => {

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data().scenes);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      setCoord(docSnap.data().scenes);
      setIsLoading(false);

      Object.keys(docSnap.data().scenes[0].coordenada).forEach((refKey, index) => {
        setNumJugadores((prevState) => ({
          ...prevState,
          [refKey]: Object.keys(docSnap.data().scenes[0].coordenada[refKey]).length,
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
        B: {
          Refs: {
            ref1: useRef(null),
          },
        },
    }


  
  const [numJugadores, setNumJugadores] = useState({S: 0, 
    O: 0, 
    L: 0, 
    WS: 0, 
    MB: 0});

    const sacarCoordenadas = (indicador, clave) =>{
            const coordenadas = [];
            const scenes = Object.entries(coord)
            console.log(coord[0])
            const keys = Object.keys(coord[0].coordenada)
            scenes.forEach((scene) =>{
            keys.forEach((key)=>{
                if(clave===key){
                    const c = `coordenada${indicador}`;
                    console.log(scene[1])
                    const coordenada = scene[1].coordenada[clave][c];
                    coordenadas.push(coordenada)
                }
            })
        })
        return coordenadas;
    }
           
    useEffect(() => {
        // Desactivar el scroll del cuerpo de la página
        document.body.style.overflow = 'hidden';
    
        return () => {
          // Restaurar el scroll cuando el componente se desmonte
          document.body.style.overflow = 'auto';
        };
      }, []);

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
                console.log(`numJugadores: ${numJugadores.S}`)
              }
            }
          }
        }
      }          
    }

  const values = [0.5, 1, 2];
  const [currentIndex, setCurrentIndex] = useState(1);

  const handleClick = () => {
    const nextIndex = (currentIndex + 1) % values.length;
    setCurrentIndex(nextIndex);
  };

  return(
    <View style={{flex:1}}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',}} >
            <View style={styles.view}>
                <Link to={{ pathname: '/profile'}}>
                    <Text style={styles.text1}>
                        Return
                    </Text>
                </Link>
            </View>
            <Image source={require('./Resources/cancha.png')} style={styles.image}/>
            <View style={styles.centeredView}>
                {isLoading ? (
                    <div>Loading...</div> // Muestra el mensaje de carga mientras se obtienen los datos
                ) : (
                <View style={{ bottom: 500, flex: 0, flexDirection: 'row', position: 'absolute' }}>
                    
                    <EnlaceTransiciones ref={refs.B.Refs[`ref${1}`]} speed={values[currentIndex]} numEscenas={Object.keys(coord).length} coordenadas={sacarCoordenadas(1,"B")}>
                      <Draggable disabled={true}>
                            <Image style={{width:60, height:60, top: (coord[0].coordenada.B[`coordenada${1}`][1] - 351.3333435058594), left:((coord[0].coordenada.B[`coordenada${1}`][0]) - 196.6666717529297) }} source={require('./Resources/balonDeVolley.png')} />
                      </Draggable>
                    </EnlaceTransiciones>

                    {numJugadores.S > 0 && (
                        <React.Fragment>
                            {Array(numJugadores.S)
                            .fill()
                            .map((_, index) => (
                                <EnlaceTransiciones ref={refs.S.Refs[`ref${index + 1}`]} speed={values[currentIndex]} key={index} numEscenas={Object.keys(coord).length} coordenadas={sacarCoordenadas(index+1,"S")}>
                                    <Draggable disabled={true} key={index}>
                                    <Circulo key={index} top={coord[0].coordenada.S[`coordenada${index+1}`][1] - 357.3333435058594} left={(coord[0].coordenada.S[`coordenada${index+1}`][0]) - 218.25} margin={0} width={60} marginTop={6} size={30} marginT={0}>
                                    <Text key={index}>S</Text>
                                    </Circulo>
                                    </Draggable>
                                </EnlaceTransiciones>
                            ))}
                        </React.Fragment>
                    )}

                    {numJugadores.O > 0 && (
                        <React.Fragment>
                            {Array(numJugadores.O)
                            .fill()
                            .map((_, index) => (
                                <EnlaceTransiciones ref={refs.O.Refs[`ref${index + 1}`]} speed={values[currentIndex]} key={index} numEscenas={Object.keys(coord).length} coordenadas={sacarCoordenadas(index+1,"O")}>
                                    <Draggable disabled={true} key={index}>
                                        <Circulo key={index} top={coord[0].coordenada.O[`coordenada${index+1}`][1] - 357.3333435058594} left={(coord[0].coordenada.O[`coordenada${index+1}`][0]) - 215.2916717529297} margin={0} width={60} marginTop={6} size={30} marginT={0}>
                                        <Text key={index}>O</Text>
                                        </Circulo>
                                    </Draggable>
                                </EnlaceTransiciones>
                            ))}
                        </React.Fragment>
                    )} 
                    {numJugadores.L > 0 && (
                        <React.Fragment>
                            {Array(numJugadores.L)
                            .fill()
                            .map((_, index) => (
                                <EnlaceTransiciones ref={refs.L.Refs[`ref${index + 1}`]} speed={values[currentIndex]} key={index} numEscenas={Object.keys(coord).length} coordenadas={sacarCoordenadas(index+1,"L")}>
                                    <Draggable disabled={true} key={index}>
                                        <Circulo key={index} top={coord[0].coordenada.L[`coordenada${index+1}`][1] - 357.3333435058594} left={(coord[0].coordenada.L[`coordenada${index+1}`][0]) - 218.98959350585938} margin={0} width={60} marginTop={6} size={30} marginT={0}>
                                            <Text key={index}>L</Text>
                                        </Circulo>
                                    </Draggable>
                                </EnlaceTransiciones>
                            ))}
                        </React.Fragment>
                    )} 
                    {numJugadores.WS > 0 && (
                        <React.Fragment>
                            {Array(numJugadores.WS)
                            .fill()
                            .map((_, index) => (
                                <EnlaceTransiciones ref={refs.WS.Refs[`ref${index + 1}`]} speed={values[currentIndex]} key={index} numEscenas={Object.keys(coord).length} coordenadas={sacarCoordenadas(index+1,"WS")}>
                                    <Draggable disabled={true} key={index}>
                                        <Circulo key={index} top={coord[0].coordenada.WS[`coordenada${index+1}`][1] - 357.3333435058594} left={(coord[0].coordenada.WS[`coordenada${index+1}`][0]) - 203.17709350585938} margin={0} width={60} marginTop={9} size={30} marginT={0}>
                                            <Text key={index}>WS</Text>
                                        </Circulo>
                                    </Draggable>
                                </EnlaceTransiciones>
                            ))}
                        </React.Fragment>
                    )}
                    {numJugadores.MB > 0 && (
                        <React.Fragment>
                            {Array(numJugadores.MB)
                            .fill()
                            .map((_, index) => (
                                <EnlaceTransiciones ref={refs.MB.Refs[`ref${index + 1}`]} speed={values[currentIndex]} key={index} numEscenas={Object.keys(coord).length} coordenadas={sacarCoordenadas(index+1,"MB")}>
                                    <Draggable disabled={true} key={index}>
                                        <Circulo key={index} top={coord[0].coordenada.MB[`coordenada${index+1}`][1] - 357.3333435058594} left={(coord[0].coordenada.MB[`coordenada${index+1}`][0]) - 202.6875} margin={0} width={60} marginTop={9} size={30} marginT={0}>
                                            <Text>MB</Text>
                                        </Circulo>
                                    </Draggable>
                                </EnlaceTransiciones>
                            ))}
                        </React.Fragment>
                    )} 
                </View>
                )};
                <View style={styles.container}>
                    <TouchableOpacity onPress={activarAnimacion} style={styles.button}>
                        <Text style={styles.buttonText}>Iniciar Transición</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleClick} style={styles.buttonSpeed}>
                      <Text style={styles.buttonTextSpeed}>
                        {values[currentIndex]}x
                      </Text>
                    </TouchableOpacity>
                </View>
            </View>
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

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'blue',
        borderRadius: 5,
        marginBottom: 80,
        width: 120,
        height:60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonSpeed: {
      backgroundColor: 'blue',
      borderRadius: 5,
      marginBottom: 80,
      width: 120,
      height:60,
      justifyContent: 'center',
      alignItems: 'center'
  },
    centeredView: {
        flex: 1,
        width: '110%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        opacity: 1,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: height*0.2,
        width: width,
        backgroundColor: 'grey',
    },
    buttonText: {
    color: 'white',
    fontSize: 16,
    },
    buttonTextSpeed: {
      color: 'white',
      fontSize: 36,
      },
    image: {
        width: '110%',
        height: '88%',
        opacity: 1,
      },
      view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '15%', 
        height: '7%', 
    },
    text1: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 25 
    }
})

export default visualizacion;