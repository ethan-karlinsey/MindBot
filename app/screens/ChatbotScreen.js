import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
//import AsyncStorage from '@react-native-community/async-storage'
import { GiftedChat } from 'react-native-gifted-chat'
import { AsyncStorage } from 'react-native'
import { StyleSheet, Text, TextInput, Button, View, LogBox } from 'react-native';
import * as firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBLo3MIDiCutOt63VqJNkEMgLbI71gxBDE",
  authDomain: "chatapp-6a550.firebaseapp.com",
  projectId: "chatapp-6a550",
  storageBucket: "chatapp-6a550.appspot.com",
  messagingSenderId: "432038414833",
  appId: "1:432038414833:web:6a8228bf2fd1f997219c50"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

LogBox.ignoreAllLogs()

const db = firebase.firestore()
const chatsRef = db.collection('chats')

function ChatbotScreen({ navigation }, props) {
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    readUser()
    const unsubscribe = chatsRef.onSnapshot(querySnapshot => {
      const messageFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === 'added')
        .map(({ doc }) => {
          const message = doc.data()
          return { ...message, createdAt: message.createdAt.toDate() }
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      appendMessages(messageFirestore)
    })
    return () => unsubscribe()
  }, [])

  const appendMessages = useCallback((messages) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
  }, [messages])

  async function readUser() {
    const user = await AsyncStorage.getItem('user')
    if (user) {
      setUser(JSON.parse(user))
    }
  }

  async function handlePress() {
    const _id = Math.random().toString(36).substring(7)
    const user = {_id, name}
    await AsyncStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }

  async function handleSend(messages) {
    const writes = messages.map(m => chatsRef.add(m))
    await Promise.all(writes)
  }

  if (!user) {
    return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Enter Name" value={name} onChangeText={setName} />
      <Button onPress={handlePress} title="Enter" />
    </View>
    );
  }

  return <GiftedChat messages={messages} user={user} onSend={handleSend} />
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
    borderColor: 'gray'
  }
});

export default ChatbotScreen;