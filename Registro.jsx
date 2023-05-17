import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet , Text, CheckBox} from 'react-native';

const Registro = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleRegistration = () => {
    // Aquí puedes implementar la lógica para manejar el registro del usuario
    console.log('Registrando usuario...');
    console.log('Nombre de usuario:', username);
    console.log('Correo electrónico:', email);
    console.log('Contraseña:', password);
    console.log('Confirmar contraseña:', confirmPassword);
    console.log('Términos y condiciones aceptados:', termsAccepted);

  };

  return (
        <View style={styles.container}>
            <Text style={styles.text}>REGISTRO</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <View style={styles.checkboxContainer}>
                <CheckBox value={termsAccepted} onValueChange={setTermsAccepted} />
                <Text style={styles.checkboxLabel}>He leído y acepto los términos y condiciones</Text>
            </View>
            
            <Button title="Registrar" onPress={handleRegistration} disabled={!termsAccepted} />

        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'grey',
  },
  text: {
    fontSize: 50,
    padding: 70,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
});

export default Registro
