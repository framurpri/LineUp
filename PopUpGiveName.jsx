import React, { useState } from 'react';
import { View, Button, TextInput, Modal } from 'react-native';

const PopUp = ({ visible, onClose, onSend }) => {
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    onSend(inputText);
    setInputText('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TextInput
          style={{ width: '80%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
          onChangeText={text => setInputText(text)}
          value={inputText}
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </Modal>
  );
};
export default PopUp;
