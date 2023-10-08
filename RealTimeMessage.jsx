import { doc, getFirestore, getDocs, collection, query, onSnapshot, where, updateDoc, arrayUnion } from 'firebase/firestore'
import React, { useLayoutEffect, useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { View, StyleSheet, Text } from 'react-native';
import AvatarExample from './Profile';
import { Link, useParams } from 'react-router-native';


export default function RealTimeChat() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [idChat, setIdChat] = useState();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const { id } = useParams();
  const db = getFirestore(app);

  const handleGoBack = () => {
    return <AvatarExample/>
  };

  useLayoutEffect(() => {
    const getUserInfo = async () => {
      console.log(id);
      const q = query(collection(db, "users"), where("email", "==", auth.currentUser.email));
      const querySnapshot = await getDocs(q);
      setUsername(querySnapshot.docs[0].data().username);
      const q1 = query(collection(db, "chat"), where("teamId", "==", id));
      const querySnapshot1 = await getDocs(q1);
      setIdChat(querySnapshot1.docs[0].id);
    };
    getUserInfo();
  }, [db, auth.currentUser.email, id]);

  useEffect(() => {
    if (idChat) {
      const chatDocRef = doc(db, 'chat', idChat);
      const unsubscribe = onSnapshot(chatDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const chatData = docSnapshot.data();
          setMessages(
            chatData.messages.map((message) => ({
              ...message,
              createdAt: message.createdAt.toDate(),
            }))
          );
        }
      });

      return unsubscribe;
    }
  }, [db, idChat]);

  const onSend = useCallback(
    async (newMessages = []) => {
      if (idChat) {
        const chatDocRef = doc(db, 'chat', idChat);
        try {
          await updateDoc(chatDocRef, {
            messages: arrayUnion(newMessages[0]),
          });
        } catch (error) {
          console.error('Error al agregar el mensaje:', error);
        }
      }
    },
    [db, idChat]
  );

  return (
    <View style={{flex:1}}>
        <View style={styles.container}>
            <View style={styles.backButton}>
                <Link to={{ pathname: `/profile/teams/${id}`}}>
                    <Text style={styles.backButtonText}>Return</Text>
                </Link>
            </View>
            <Text style={styles.title}>Chat</Text>
        </View>
        <View style={{flex:10}}>
        <GiftedChat
        messages={messages.reverse()}
        onSend={onSend}
        user={{
            _id: auth?.currentUser?.email,
            name: username,
        }}
        />
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#007AFF', // Color de fondo de la barra superior
    },
    backButton: {
      position: 'absolute',
      left: 10,
    },
    backButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold'
    },
    title: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });