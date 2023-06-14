import Main from './Main.jsx';
import { NativeRouter } from 'react-router-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { initializeApp } from '@firebase/app';
import { firebaseConfig } from './firebase-config.js';

export default function App() {
  return <NativeRouter>
    <Main/>
  </NativeRouter>
}

