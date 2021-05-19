import React, { useState, useContext, useEffect, Fragment } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { StyleSheet, View, Image, Text, Keyboard, TouchableOpacity } from 'react-native';
import { Avatar, ButtonGroup, Overlay } from "react-native-elements";
import firebase from 'firebase';
import 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { createNavigatorFactory } from '@react-navigation/core';
import Modal from './Modal.js';
import { AuthContext } from '../navigation/AuthProvider';
import { Platform } from 'react-native';

let emotionImages;

if (Platform.OS === 'web') {
  emotionImages = [
    require('../assets/emotions/happy.png'),
    require('../assets/emotions/sad.png'),
    require('../assets/emotions/angry.png'),
    require('../assets/emotions/crying.png'),
    require('../assets/emotions/laugh.png'),
    require('../assets/emotions/nervous.png'),
    require('../assets/emotions/surprised.png'),
    require('../assets/emotions/confused.png'),
    require('../assets/emotions/tired.png'),
  ];
} else {
  emotionImages = [
    require('../assets/emotions/happy.png'),
    require('../assets/emotions/sad.png'),
    require('../assets/emotions/angry.png'),
    require('../assets/emotions/crying.png'),
    require('../assets/emotions/laugh.png'),
    require('../assets/emotions/nervous.png'),
    require('../assets/emotions/surprised.png'),
    require('../assets/emotions/confused.png'),
    require('../assets/emotions/tired.png'),
  ];
}

const emotions = ['Happy', 'Sad', 'Angry', 'Crying', 'Laughing', 'Nervous', 'Surprised', 'Confused', 'Tired', 'None'];

export default function ChatbotScreen({ navigation }, props) {
  
  const [currentMessage, setCurrentMessage] = useState(null);
  const [showEmotions, setShowEmotions] = useState(false);
  const { user } = useContext(AuthContext);
  const db = firebase.firestore();
  const chatsRef = db.collection(user.uid);
  const query = chatsRef.orderBy('createdAt', 'desc');
  const [messages] = useCollectionData(query, { idField: 'id' });
  const [id, setId] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
        let isMounted = true;
        async function getUserInfo() {
            try {
                let doc = await firebase
                    .firestore()
                    .collection('users')
                    .doc(user.uid)
                    .get();

                if (!doc.exists) {
                    console.log('User data not found');
                } else {
                    let data = doc.data();
                    if (isMounted) {
                      setName(data.name);
                      setId(data._id);
                    } 
                }
            } catch (error) {
                console.log(error);
            }
        }
        getUserInfo();
        return () => { isMounted = false }
    })

  const sendMessage = (index) => {

    chatsRef.add({
      _id: currentMessage[0]._id,
      text: currentMessage[0].text,
      createdAt: Date.parse(currentMessage[0].createdAt),
      emotionIndex: index,
      emotion: emotions[index],
      user: ({
        _id: id,
        name: name
      })
    })
    setCurrentMessage(null);
  }

  const createAvatar = (messageInfo) => {

    if (messageInfo.currentMessage.emotionIndex == emotionImages.length) {
      return null;

    } else {

      var emotionImage = emotionImages[messageInfo.currentMessage.emotionIndex];

      return(
        <Avatar
          rounded
          size = 'medium'
          source = {emotionImage}
        ></Avatar>
      )
    }
  }

  const createBubble = (messages) => {

    return (
      <Bubble
        {... messages}

        textStyle={{
          right: {
            color: 'black',
          },
          left: {
            color: 'black',
          },
        }}

        timeTextStyle={{
          left: { 
             color: 'black' 
          },
          right: { 
            color:'black'
          } 
        }}

        wrapperStyle={{
          left: {
            backgroundColor: '#F2AE6F',
          },
          right: {
            backgroundColor: '#99BBFF'
          },
        }}

        user={messages.currentMessage.user}
      />
    )
  }

  const getEmotion = (index) => {

    setShowEmotions(false);
    sendMessage(index);
  }

  return (
          <View style={styles.chatBotContainer}>
            <GiftedChat
              messages={messages}
              user={({
                _id: id,
                name: name
              })}
              onSend={(messages) => {Keyboard.dismiss(); setCurrentMessage(messages); setShowEmotions(true);}}
              renderAvatar={(messages) => createAvatar(messages)}
              showUserAvatar={true}
              showAvatarForEveryMessage={true}
              renderAllAvatars={true}
              renderBubble={(messages) => createBubble(messages)}
              alwaysShowSend={true}
            />
            <Modal transparent={true} visible={showEmotions}>
              <View style={{backgroundColor:"#000000aa", flex:1}}>
                <View style={styles.emotionPopUp}>
                  <TouchableOpacity style={styles.emotionButton} activeOpacity={0.5} onPress={() => getEmotion(0)}><Image style={styles.buttonImage} source={emotionImages[0]}/><Text style={styles.buttonText}>Happy</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.emotionButton} activeOpacity={0.5} onPress={() => getEmotion(1)}><Image style={styles.buttonImage} source={emotionImages[1]}/><Text style={styles.buttonText}>Sad</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.emotionButton} activeOpacity={0.5} onPress={() => getEmotion(2)}><Image style={styles.buttonImage} source={emotionImages[2]}/><Text style={styles.buttonText}>Angry</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.emotionButton} activeOpacity={0.5} onPress={() => getEmotion(3)}><Image style={styles.buttonImage} source={emotionImages[3]}/><Text style={styles.buttonText}>Crying</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.emotionButton} activeOpacity={0.5} onPress={() => getEmotion(4)}><Image style={styles.buttonImage} source={emotionImages[4]}/><Text style={styles.buttonText}>Laughing</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.emotionButton} activeOpacity={0.5} onPress={() => getEmotion(5)}><Image style={styles.buttonImage} source={emotionImages[5]}/><Text style={styles.buttonText}>Nervous</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.emotionButton} activeOpacity={0.5} onPress={() => getEmotion(6)}><Image style={styles.buttonImage} source={emotionImages[6]}/><Text style={styles.buttonText}>Surprised</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.emotionButton} activeOpacity={0.5} onPress={() => getEmotion(7)}><Image style={styles.buttonImage} source={emotionImages[7]}/><Text style={styles.buttonText}>Confused</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.emotionButton} activeOpacity={0.5} onPress={() => getEmotion(8)}><Image style={styles.buttonImage} source={emotionImages[8]}/><Text style={styles.buttonText}>Tired</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.emotionButton} activeOpacity={0.5} onPress={() => getEmotion(9)}><Text style={styles.buttonText}>None</Text></TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        )
};

const styles = StyleSheet.create({
  chatBotContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E5E5E5',
  },
  emotionChoiceView: {
    flex:1,
  },
  emotionChoiceImage: {
    flex: 1,
    resizeMode: 'contain'
  },
  emotionChoiceFragment: {
    backgroundColor: '#DEE0E3'
  },
  emotionPopUp: {
    backgroundColor: "#ffffff",
    margin: 10,
    borderRadius: 10,
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  emotionButton: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: "35%"
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    margin: 5
  },
  buttonImage: {
    width: 75,
    height: 75,
    alignItems: 'center'
  }
});