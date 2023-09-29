import { addDoc, getFirestore, collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import React, { useLayoutEffect, useState, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { firebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export default function RealTimeChat() {

    const [messages, setMessages] = useState([])

    const app = initializeApp(firebaseConfig);

    const auth = getAuth(app);

    useLayoutEffect(() => {
        const collectionRef = collection(getFirestore(), 'chats');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

        const unsubcribe = onSnapshot(q, snapshot => {
            setMessages(
                snapshot.docs.map(doc => ({
                    _id: doc.id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user
                }))
            )
        })
        return unsubcribe;
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

        const { _id, createdAt, text, user} = messages[0];
        addDoc(collection(getFirestore(), 'chats'), {
            _id,
            createdAt,
            text,
            user
        })
    }, [])

    return(
        <GiftedChat 
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
            }}
        />

    )
}