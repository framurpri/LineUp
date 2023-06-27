import React, { useRef, useState } from "react"
import EnlaceTransiciones from "./Transiccion";
import { Animated, View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import Circulo from "./Circulo";
import { ImageBackground } from "react-native-web";

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
      0: {
        S: {
            coordenada1: [278,213]
        },
        O:  {
            coordenada1: [356,396]
        },
        L: {
            coordenada1: [108,435]
        },
        WS: {
            coordenada1: [216,466],
            coordenada2: [-2,273]
        },
        MB: {
            coordenada1: [138,268]
        },
    },
        1: {
            S: {
              coordenada1: [278,213]
          },
          O:  {
              coordenada1: [356,396]
          },
          L: {
              coordenada1: [108,435]
          },
          WS: {
              coordenada1: [216,466],
              coordenada2: [-20,273]
          },
          MB: {
              coordenada1: [138,268]
          },
        },
}
  ]

  const [numJugadores, setNumJugadores] = useState({S: Object.keys(coord[0][0].S).length, 
    O: Object.keys(coord[0][0].O).length, 
    L: Object.keys(coord[0][0].L).length, 
    WS: Object.keys(coord[0][0].WS).length, 
    MB: Object.keys(coord[0][0].MB).length});

  //   MB: {
  //     coordenada1: [50,50]
  // },
  
  // MB: {
  //   coordenadas: [[50,50]]
  // }

    const sacarCoordenadas = (indicador, clave) =>{
            const coordenadas = [];
            const scenes = Object.entries(coord[0])
            const keys = Object.keys(coord[0][0])
            scenes.forEach((scene) =>{
            keys.forEach((key)=>{
                if(clave===key){
                    const c = `coordenada${indicador}`;
                    const coordenada = scene[1][clave][c];
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
    <View style={{ flex: 1, justifyContent: 'center',alignItems: 'center',marginTop: 22,}}>
      <ImageBackground source={require('./Resources/cancha.png')} style={styles.image}/>
      <View style={{ right: 50, bottom:700,  flex: 0, flexDirection: 'row' }}>
          {numJugadores.S > 0 && (
            <React.Fragment>
              {Array(numJugadores.S)
                .fill()
                .map((_, index) => (
                    <EnlaceTransiciones ref={refs.S.Refs[`ref${index + 1}`]} key={index} numEscenas={Object.keys(coord[0]).length} coordenadas={sacarCoordenadas(index+1,"S")}>
                        <Circulo key={index} margin={0} top={coord[0][0].S[`coordenada${index+1}`][1]} left={coord[0][0].S[`coordenada${index+1}`][0]} width={60} marginTop={6} size={30} marginT={0}>
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
                    <EnlaceTransiciones ref={refs.O.Refs[`ref${index + 1}`]} key={index} numEscenas={Object.keys(coord[0]).length} coordenadas={sacarCoordenadas(index+1, "O")}>
                        <Circulo key={index} top={coord[0][0].O[`coordenada${index+1}`][1]} left={coord[0][0].O[`coordenada${index+1}`][0]-60} margin={0} width={60} marginTop={6} size={30} marginT={0}>
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
                    <EnlaceTransiciones ref={refs.L.Refs[`ref${index + 1}`]} key={index} numEscenas={Object.keys(coord[0]).length} coordenadas={sacarCoordenadas(index+1, "L")}>
                        <Circulo key={index} top={coord[0][0].L[`coordenada${index+1}`][1]} left={coord[0][0].L[`coordenada${index+1}`][0]-120} margin={0} width={60} marginTop={6} size={30} marginT={0}>
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
                    <EnlaceTransiciones ref={refs.WS.Refs[`ref${index + 1}`]} key={index} numEscenas={Object.keys(coord[0]).length} coordenadas={sacarCoordenadas(index+1, "WS")}>
                        <Circulo key={index} top={coord[0][0].WS[`coordenada${index+1}`][1]} left={coord[0][0].WS[`coordenada${index+1}`][0]-180} margin={0} width={60} marginTop={9} size={30} marginT={0}>
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
                    <EnlaceTransiciones ref={refs.MB.Refs[`ref${index + 1}`]} key={index} numEscenas={Object.keys(coord[0]).length} coordenadas={sacarCoordenadas(index+1, "MB")}>
                        <Circulo key={index} top={coord[0][0].MB[`coordenada${index+1}`][1]} left={coord[0][0].MB[`coordenada${index+1}`][0]-240} margin={0} width={60} marginTop={9} size={30} marginT={0}>
                            <Text>MB</Text>
                        </Circulo>
                    </EnlaceTransiciones>
                ))}
            </React.Fragment>
          )} 
          </View>
          <View style={{flex:1, bottom:750}}>
            <TouchableOpacity onPress={activarAnimacion} style={styles.button}>
                <Text style={styles.buttonText}>Iniciar Transición</Text>
            </TouchableOpacity>
          </View>
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
    image: {
      width: 395,
      height: 679,
      opacity: 1,
      },
})

export default visualizacion;