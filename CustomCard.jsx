import React, { useState } from 'react';
import { View, StyleSheet, Modal, TextInput, TouchableHighlight } from 'react-native';
import { Card, Title, Paragraph, IconButton, Text } from 'react-native-paper';
import { Link } from 'react-router-native';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const MyCard = ({ id, clave, diff, descripcion, handleExpand, deleted, isExpanded, image }) => {
  const [title, setTitle] = useState(`${id}`);
  const [paragraph, setParagraph] = useState(descripcion !== '' ? descripcion : 'Añade una descripción');

  const [isParagraphModalVisible, setParagraphModalVisible] = useState(false);
  const [text, setText] = useState(paragraph);
  const [tempText, setTempText] = useState(paragraph); // Estado temporal para seguimiento de cambios
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);

  // Función para guardar los cambios
  const handleSave = () => {
    setText(tempText);
  };

  // Función para descartar los cambios
  const handleCancel = () => {
    setTempText(text); // Restaurar el texto anterior
  };

  const expandCard = () => {
    handleExpand(clave);
  };

  const updateDescripcion = async () => {
    const chatDocRef = doc(db, 'plays', clave);
      await updateDoc(chatDocRef, {
        descripcion: tempText,
      });
  }

  const handleDelete = () => {
    deleted(clave);
  };


  return (
    <Card>
      <Link to={{pathname: `/profile/${diff}/${clave}`}}>
      {image === undefined && diff === 'plays' ? (
        <Card.Cover style={styles.image} source={require('./Resources/cancha.png')} />
      ) : image === undefined && diff === 'teams' ? (
        <Card.Cover style={styles.image} />
      ) : (
        <Card.Cover style={styles.image} source={{ uri: image }} />
      )}
      </Link>
      <Card.Content>
        <Title>{title}</Title>
        <Paragraph numberOfLines={isExpanded ? 0 : 2}>{tempText}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <IconButton
          icon={isExpanded ? 'arrow-collapse' : 'arrow-expand'}
          onPress={expandCard}
        />
        <IconButton
          icon="pencil"
          onPress={() => setParagraphModalVisible(true)}
          style={styles.editButton}
        />
        <IconButton
          icon="delete"
          iconColor='red'
          onPress={() => setIsDeleteVisible(true)}
          style={styles.editButton}
        />
      </Card.Actions>

      {/* Modal para editar el párrafo */}
      <Modal visible={isParagraphModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={{height:'50%', width:250, borderWidth:0, borderColor: 'transparent'}}
              label="Contenido"
              value={tempText}
              multiline={true}
              onChangeText={(newText) => setTempText(newText)}
            />
            <TouchableHighlight style={styles.button1} onPress={() => {
              handleCancel()
              setParagraphModalVisible(false)}}>
              <Text style={{justifyContent:'center', alignSelf: 'center'}}>Atrás</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button2} onPress={() => {
              handleSave()
              setParagraphModalVisible(false)
              updateDescripcion()}}>
            <Text style={{justifyContent:'center', alignSelf: 'center'}}>Ok</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <Modal visible={isDeleteVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text
              style={{height:'50%', width:250, fontSize: 50, fontWeight:'bold',marginLeft:10,fontStyle:'italic', textAlign:'center', justifyContent: 'center', alignSelf:'center', borderWidth:0, borderColor: 'transparent'}}
            >
              Estás seguro ?
            </Text>
            <TouchableHighlight style={styles.button1} onPress={() => {
              setIsDeleteVisible(false)}}>
              <Text style={{justifyContent:'center', alignSelf: 'center'}}>Atrás</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button2} onPress={() => {
              handleDelete()
              setIsDeleteVisible(false)}}>
            <Text style={{justifyContent:'center', alignSelf: 'center'}}>Borrar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </Card>
  );
};

const styles = StyleSheet.create({
  editButton: {
    marginLeft: 'auto',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  image: {
    width: 120, 
    height: 120, 
    alignSelf: 'center', 
    marginTop:10, 
    justifyContent: 'center'
    },
  modalContent: {
    backgroundColor: '#F0F8FF',
    borderRadius: 20,
    marginHorizontal: 20,
    paddingHorizontal: 0,
    paddingVertical: 0,
    height:170,
    alignItems: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button1: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 70,
    alignItems: 'center',
    height: 40,
    top: 30,
    right: 80,
    backgroundColor: 'red'
  },
  button2: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 70,
    alignContent: 'center',
    height: 40,
    bottom: 10,
    left: 80,
    backgroundColor: 'green'
  }
  // Estilos personalizados para MyCard si es necesario
});

export default MyCard;
