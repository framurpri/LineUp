import React, { useState } from 'react';
import { View, StyleSheet , Text, CheckBox, Dimensions } from 'react-native';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc } from "firebase/firestore"; 
import { Link } from 'react-router-native';
import  Main  from './Main';
import { Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

export function Registro() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false); 
  const [flatTextSecureEntry, setFlatTextSecureEntry] = useState(true); 

  const { width , height } = Dimensions.get('window');

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  const handleRegistration = () => {

    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      console.log('Account created!')
      const user = userCredential.user;
      console.log(user);
      setRegisterSuccess(true);
      try {
        const docRef = await addDoc(collection(db, "users"), {
          email: user.email,
          username: username,
          password: password
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    })
    .catch(error =>   {
      console.log(error)
    })
  
  };

  if (registerSuccess){
    return <Main></Main>
  }

  return (
        <View style={styles.container}>
          <View style={[styles.containerDiv, {width: width*0.9, height: height*0.7}]}>
            
              <Text style={styles.text}>REGISTRO</Text>
          
            
              <TextInput
              placeholder="Username"
              onChangeText={setUsername}
              left={<TextInput.Icon icon={() => (<Icon name="user" size={24} color='#303747'/>)}/>}
              style={styles.input}
              />
              <TextInput
              placeholder="Email"
              onChangeText={setEmail}
              left={<TextInput.Icon icon={() => (<Icon name="envelope" size={24} color='#303747' />)}/>}
              style={styles.input}
              />          
              <TextInput
              placeholder="Password"
              onChangeText={setPassword}
              left={<TextInput.Icon icon={() => (<Icon name="lock" size={24} color='#303747'/>)}/>}
              right={
                    <TextInput.Icon
                      icon={flatTextSecureEntry ? 'eye' : 'eye-off'}
                      onPress={() => setFlatTextSecureEntry(!flatTextSecureEntry)}
                      forceTextInputFocus={false}/>
                    }
              secureTextEntry={flatTextSecureEntry}
              style={styles.input}
              />
              <TextInput
              placeholder="Confirm password"
              onChangeText={setConfirmPassword}
              left={<TextInput.Icon icon={() => (<Icon name="lock" size={24} color='#303747'/>)}/>}
              right={
                <TextInput.Icon
                  icon={flatTextSecureEntry ? 'eye' : 'eye-off'}
                  onPress={() => setFlatTextSecureEntry(!flatTextSecureEntry)}
                  forceTextInputFocus={false}/>
                }
              secureTextEntry={flatTextSecureEntry}
              style={styles.input}
              />
            
            <View style={styles.checkboxContainer}>
                <CheckBox value={termsAccepted} onValueChange={setTermsAccepted} />
                <Text style={styles.checkboxLabel}>He leído y acepto los </Text> 
                <Link to={{ pathname: '/termsNoAuth'}} style = {styles.button}>
                  <Text style={styles.underlined}>Términos y Condiciones</Text>
                </Link>
            </View>
            <Button type="submit" mode="contained" onPress = {handleRegistration} disabled={!termsAccepted} style={{backgroundColor: '#F29C46' , opacity: termsAccepted? 1 : 0.35}}>
              Registrarse
            </Button>    
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  containerDiv: {
    backgroundColor: '#303747',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  text: {
    fontSize: 50,
    color: 'white'
  },
  input: {
    width: '90%',
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 8,
    color: 'white'
  },
  underlined: {
    textDecorationLine: 'underline',
    color: 'white'
  }
});


