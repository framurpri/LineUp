import React, { useState } from 'react';
import { View, StyleSheet, Modal, TextInput, TouchableHighlight } from 'react-native';
import { Card, Title, Paragraph, IconButton, Text } from 'react-native-paper';
import { Link } from 'react-router-native';

const MyCard = ({ id, handleExpand, deleted, isExpanded }) => {
  const [title, setTitle] = useState(`${id}`);
  const [paragraph, setParagraph] = useState(
    'Contenido de la tarjeta. Puedes agregar aquí todo el texto que desees, y si se excede el espacio, se mostrará un icono de "menos" para contraerlo.'
  );

  const [isParagraphModalVisible, setParagraphModalVisible] = useState(false);
  const [text, setText] = useState(paragraph);
  const [tempText, setTempText] = useState(paragraph); // Estado temporal para seguimiento de cambios

  // Función para guardar los cambios
  const handleSave = () => {
    setText(tempText);
  };

  // Función para descartar los cambios
  const handleCancel = () => {
    setTempText(text); // Restaurar el texto anterior
  };

  const expandCard = () => {
    handleExpand(id);
  };

  const handleDelete = (id) => {
    deleted(id);
  };

  return (
    <Card>
        <Link to={{pathname: `/plays/${id}`}}>
            <Card.Cover style={{width: 150, height: 150, alignSelf: 'center', marginTop:10, justifyContent: 'center'}} source={require('./Resources/cancha.png')} />
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
            onPress={() => handleDelete(id)}
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
                <Text style={{justifyContent:'center', alignSelf: 'center'}}>Back</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button2} onPress={() => {
                handleSave()
                setParagraphModalVisible(false)}}>
                <Text style={{justifyContent:'center', alignSelf: 'center'}}>Ok</Text>
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
