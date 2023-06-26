import React, { useRef, useState } from "react"
import EnlaceTransiciones from "./Transiccion";
import { Animated, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Circulo from "./Circulo";

function visualizacion(){

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
    
const coord =[
    {
        primero: {
            S: {
                coordenadas: [[10,10]]
            },
            O:  {
                coordenadas: [[20,20]]
            },
            L: {
                coordenadas: [[30,30]]
            },
            WS: {
                coordenadas: [[40,40], [0,0]]
            },
            MB: {
                coordenadas: [[50,50]]
            },
        },
        segundo: {
            S: {
                coordenadas: [[50,50]]
            },
            O:  {
                coordenadas: [[40,40]]
            },
            L: {
                coordenadas: [[30,30]]
            },
            WS: {
                coordenadas: [[20,20], [30,30]]
            },
            MB: {
                coordenadas: [[10,10]]
            },
        },
        tercero: {
            S: {
                coordenadas: [[10,10]]
            },
            O:  {
                coordenadas: [[20,20]]
            },
            L: {
                coordenadas: [[30,30]]
            },
            WS: {
                coordenadas: [[40,40], [10,10]]
            },
            MB: {
                coordenadas: [[50,50]]
            },
        },
}
  ]

  const [numJugadores, setNumJugadores] = useState({S: coord[0].primero.S.coordenadas.length, 
    O: coord[0].primero.O.coordenadas.length, 
    L: coord[0].primero.L.coordenadas.length, 
    WS: coord[0].primero.WS.coordenadas.length, 
    MB: coord[0].primero.MB.coordenadas.length});

    const sacarCoordenadas = (indicador, clave) =>{
            const coordenadas = [];
            const scenes = Object.entries(coord[0])
            const keys = Object.keys(coord[0].primero)
            scenes.forEach((scene) =>{
            keys.forEach((key)=>{
                if(clave===key){
                    const coordenada = scene[1][clave].coordenadas[indicador];
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
    <View style={{ flex: 1, flexDirection: 'row' }}>

          {numJugadores.S > 0 && (
            <React.Fragment>
              {Array(numJugadores.S)
                .fill()
                .map((_, index) => (
                    <EnlaceTransiciones ref={refs.S.Refs[`ref${index + 1}`]} key={index} numEscenas={Object.keys(coord[0]).length} coordenadas={sacarCoordenadas(index,"S")}>
                        <Circulo key={index} margin={0} top={coord[0].primero.S.coordenadas[index][1]} left={coord[0].primero.S.coordenadas[index][0]} width={60} marginTop={6} size={30} marginT={0}>
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
                    <EnlaceTransiciones ref={refs.O.Refs[`ref${index + 1}`]} key={index} numEscenas={Object.keys(coord[0]).length} coordenadas={sacarCoordenadas(index, "O")}>
                        <Circulo key={index} top={coord[0].primero.O.coordenadas[index][1]} left={coord[0].primero.O.coordenadas[index][0]} margin={0} width={60} marginTop={6} size={30} marginT={0}>
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
                    <EnlaceTransiciones ref={refs.L.Refs[`ref${index + 1}`]} key={index} numEscenas={Object.keys(coord[0]).length} coordenadas={sacarCoordenadas(index, "L")}>
                        <Circulo key={index} top={coord[0].primero.L.coordenadas[index][1]} left={coord[0].primero.L.coordenadas[index][0]} margin={0} width={60} marginTop={6} size={30} marginT={0}>
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
                    <EnlaceTransiciones ref={refs.WS.Refs[`ref${index + 1}`]} key={index} numEscenas={Object.keys(coord[0]).length} coordenadas={sacarCoordenadas(index, "WS")}>
                        <Circulo key={index} top={coord[0].primero.WS.coordenadas[index][1]} left={coord[0].primero.WS.coordenadas[index][0]} margin={0} width={60} marginTop={9} size={30} marginT={0}>
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
                    <EnlaceTransiciones ref={refs.MB.Refs[`ref${index + 1}`]} key={index} numEscenas={Object.keys(coord[0]).length} coordenadas={sacarCoordenadas(index, "MB")}>
                        <Circulo key={index} top={coord[0].primero.MB.coordenadas[index][1]} left={coord[0].primero.MB.coordenadas[index][0]} margin={0} width={60} marginTop={9} size={30} marginT={0}>
                            <Text>MB</Text>
                        </Circulo>
                    </EnlaceTransiciones>
                ))}
            </React.Fragment>
          )} 
            <TouchableOpacity onPress={activarAnimacion} style={styles.button}>
                <Text style={styles.buttonText}>Iniciar Transición</Text>
            </TouchableOpacity>
        </View>
  )
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
        marginBottom: 20,
        width: 100,
        height:60,
        top:790,
        right:0
    },
    buttonText: {
    color: 'white',
    fontSize: 16,
    },
})

export default visualizacion;