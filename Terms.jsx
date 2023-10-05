import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button, Pressable, ScrollView } from 'react-native'
import { Routes, Route, Link } from 'react-router-native';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth, updatePassword } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore"; 
import Icon from 'react-native-vector-icons/FontAwesome';
import TopBar from './TopBar.jsx'
import DownBar from './DownBar';
import Main from './Main';
import BottomBar from './BottomBar';

function Terms(){

    return(
      <View style={styles.container}>

        <View style={{ height: 650, justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: 20 }}>
          <Text style={styles.title}>Términos y Condiciones Legales</Text>
          <ScrollView style={{paddingHorizontal: 16, paddingTop: 25, paddingBottom: 20}}>
            <Text style={{textAlign: 'justify'}}>
            Por favor, lea detenidamente los siguientes términos y condiciones antes de utilizar la aplicación informática multiplataforma LineUp, diseñada para crear alineaciones y gestionar equipos de voleibol (en adelante, "la aplicación"). Al utilizar la aplicación, usted acepta cumplir con estos términos y condiciones legales, así como con todas las leyes y regulaciones aplicables. Si no está de acuerdo con alguno de estos términos, se le solicita que no utilice la aplicación.

              {"\n"}{"\n"}
              <Text style={styles.subtitle}>Uso de LineUp</Text>
              {"\n"}

          1.1 Licencia de uso: Se otorga una licencia no exclusiva, no transferible y revocable para utilizar LineUp de acuerdo con estos términos y condiciones.
          {"\n"}

          1.2 Restricciones de uso: No se permite copiar, modificar, distribuir, vender, alquilar, sublicenciar, descompilar, realizar ingeniería inversa o intentar obtener el código fuente de LineUp, a menos que esté expresamente permitido por la ley aplicable.
          {"\n"}

          1.3 Contenido generado por el usuario: El usuario es responsable de todo el contenido que genere utilizando LineUp. Asegúrese de que el contenido que suba o comparta no infrinja los derechos de propiedad intelectual de terceros ni viole ninguna ley o regulación aplicable.
          {"\n"}{"\n"}
              <Text style={styles.subtitle}>Propiedad intelectual</Text>
          {"\n"}
          2.1 Derechos de propiedad: LineUp y todo su contenido, incluidos, pero no limitados a, textos, gráficos, logotipos, iconos, imágenes, clips de audio, descargas digitales y compilaciones de datos, son propiedad de los propietarios de la aplicación y están protegidos por las leyes de propiedad intelectual aplicables.
          {"\n"}
          2.2 Marcas comerciales: Todas las marcas comerciales, logotipos y nombres comerciales utilizados en LineUp son propiedad de sus respectivos propietarios y no se otorga ningún derecho de uso sobre ellos.
          {"\n"}{"\n"}
          <Text style={styles.subtitle}>Protección de datos personales</Text>

          {"\n"}

          3.1 Recopilación de datos: Al utilizar LineUp, se pueden recopilar y procesar ciertos datos personales según lo descrito en nuestra Política de Privacidad. Al aceptar estos términos y condiciones, el usuario acepta el tratamiento de sus datos personales de acuerdo con nuestra Política de Privacidad.
          {"\n"}
          3.2 Uso de datos: Los datos personales recopilados a través de LineUp se utilizarán únicamente para los fines establecidos en nuestra Política de Privacidad, que pueden incluir la mejora de la aplicación, el análisis estadístico y la comunicación con el usuario en relación con LineUp.
          {"\n"}
          3.3 Confidencialidad: Se mantendrán confidenciales los datos personales del usuario y no se compartirán con terceros, excepto en los casos en que sea necesario para el funcionamiento y la mejora de LineUp o cuando exista una obligación legal de hacerlo.
          {"\n"}{"\n"}
          <Text style={styles.subtitle}>Responsabilidad y exención de garantía</Text>
              {"\n"}
          4.1 Uso bajo su propio riesgo: El usuario utiliza LineUp bajo su propio riesgo. La aplicación se proporciona "tal cual" y "según disponibilidad", sin garantías de ningún tipo, ya sean expresas o implícitas.
          {"\n"}
          4.2 Limitación de responsabilidad: En la máxima medida permitida por la ley aplicable, los propietarios de LineUp no serán responsables de ningún daño directo, indirecto, incidental, especial, consecuente o punitivo derivado del uso o la imposibilidad de uso de la aplicación.
          {"\n"}{"\n"}
          <Text style={styles.subtitle}>Ley aplicable y jurisdicción</Text>
          {"\n"}
          Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes de España. Cualquier disputa que surja en relación con LineUp se someterá a la jurisdicción exclusiva de los tribunales competentes de España.
          {"\n"}{"\n"}
          <Text style={styles.subtitle}>Modificaciones a los términos y condiciones</Text>
          {"\n"}
          Se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Cualquier modificación se publicará en LineUp y entrará en vigor a partir de su publicación. Se recomienda al usuario que revise periódicamente estos términos y condiciones para estar informado de cualquier cambio.
          {"\n"}
          Al utilizar LineUp, el usuario reconoce haber leído, entendido y aceptado estos términos y condiciones legales. Si no está de acuerdo con alguno de estos términos, se solicita al usuario que no utilice LineUp. Si tiene alguna pregunta o inquietud sobre estos términos y condiciones, puede ponerse en contacto a través de los canales de soporte proporcionados en LineUp.
                      </Text>
          </ScrollView>
        </View>
        <BottomBar></BottomBar>
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
  input: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
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
    title: {
      fontSize: 22,
      fontWeight: 'bold'
    },
    text: {
      fontsize: 15,
    },
    subtitle: {
      fontsize: 20,
      color: '#002060',
      fontWeight: 'bold'
    }
  });

export default Terms;
