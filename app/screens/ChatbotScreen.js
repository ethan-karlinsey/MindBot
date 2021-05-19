import React, { useState, Fragment } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { StyleSheet, View, Image, Text, Keyboard, } from 'react-native';
import { Avatar, ButtonGroup, Overlay } from "react-native-elements";
import firebase from 'firebase';
import 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { createNavigatorFactory } from '@react-navigation/core';
import Modal from './Modal.js';

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

const db = firebase.firestore();
const chatsRef = db.collection('chats');
const query = chatsRef.orderBy('createdAt', 'desc');
const user = ({
  _id: 'Ethan',
  name: 'React Native',
});

const emotionImages = [
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

const emotions = ['Happy', 'Sad', 'Angry', 'Crying', 'Laughing', 'Nervous', 'Surprised', 'Confused', 'Tired', 'None'];

function ChatbotScreen({ navigation }, props) {
  const [messages] = useCollectionData(query, { idField: 'id' });
  const [currentMessage, setCurrentMessage] = useState(null);
  const [showEmotions, setShowEmotions] = useState(false);
  //const user = useAuthState(auth);

  const sendMessage = (index) => {

    chatsRef.add({
      _id: currentMessage[0]._id,
      text: currentMessage[0].text,
      createdAt: Date.parse(currentMessage[0].createdAt),
      emotionIndex: index,
      emotion: emotions[index],
      user: ({
        _id: 'Ethan',
        name: 'React Native',
      }),
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

  const emotionChoice0 = () => <View style={styles.emotionChoiceView}><Image style={styles.emotionChoiceImage} source={emotionImages[0]}/><Text>Happy</Text></View>
  const emotionChoice1 = () => <View style={styles.emotionChoiceView}><Image style={styles.emotionChoiceImage} source={emotionImages[1]}/><Text>Sad</Text></View>
  const emotionChoice2 = () => <View style={styles.emotionChoiceView}><Image style={styles.emotionChoiceImage} source={emotionImages[2]}/><Text>Angry</Text></View>
  const emotionChoice3 = () => <View style={styles.emotionChoiceView}><Image style={styles.emotionChoiceImage} source={emotionImages[3]}/><Text>Crying</Text></View>
  const emotionChoice4 = () => <View style={styles.emotionChoiceView}><Image style={styles.emotionChoiceImage} source={emotionImages[4]}/><Text>Laughing</Text></View>
  const emotionChoice5 = () => <View style={styles.emotionChoiceView}><Image style={styles.emotionChoiceImage} source={emotionImages[5]}/><Text>Nervous</Text></View>
  const emotionChoice6 = () => <View style={styles.emotionChoiceView}><Image style={styles.emotionChoiceImage} source={emotionImages[6]}/><Text>Surprised</Text></View>
  const emotionChoice7 = () => <View style={styles.emotionChoiceView}><Image style={styles.emotionChoiceImage} source={emotionImages[7]}/><Text>Confused</Text></View>
  const emotionChoice8 = () => <View style={styles.emotionChoiceView}><Image style={styles.emotionChoiceImage} source={emotionImages[8]}/><Text>Tired</Text></View>
  const emotionChoice9 = () => <Text>None</Text>

  const renderEmotionChoices = () => {

    if (showEmotions == true) {
      return(
        <View>
          <Text style={{textAlign:'center'}}>Select an emotion for your message</Text>
          <ButtonGroup
            buttons={[{element: emotionChoice0}, {element: emotionChoice1}, {element: emotionChoice2}, {element: emotionChoice3}, {element: emotionChoice4}]}
            selectedIndex={null}
            onPress={(index) => getEmotion(index)}
            containerStyle={{height: '10%'}}
            textStyle={{color: 'black', textAlign:'center'}}
          />
          <ButtonGroup
            buttons={[{element: emotionChoice5}, {element: emotionChoice6}, {element: emotionChoice7}, {element: emotionChoice8}, {element: emotionChoice9}]}
            selectedIndex={null}
            onPress={(index) => getEmotion(index + Math.round((emotionImages.length + 1) / 2))}
            containerStyle={{height: '10%'}}
            textStyle={{color: 'black', textAlign:'center'}}
          />
        </View>
      )
    }
  }

  const getEmotion = (index) => {

    setShowEmotions(false);
    sendMessage(index);
  }

  return (
          <View style={styles.chatBotContainer}>
            <GiftedChat
              messages={messages}
              user={user}
              onSend={(messages) => {Keyboard.dismiss(); setCurrentMessage(messages); setShowEmotions(true);}}
              renderAvatar={(messages) => createAvatar(messages)}
              showUserAvatar={true}
              showAvatarForEveryMessage={true}
              renderAllAvatars={true}
              renderBubble={(messages) => createBubble(messages)}
              alwaysShowSend={true}
            />
            <Modal transparent={true} visible={showEmotions}>
              <View style={{backgroundColor:"#000000aa",flex:1}}>
                <View style={styles.emotionPopUp}>
                  <Text style={{textAlign:'center'}}>Select an emotion for your message</Text>
                  <ButtonGroup
                    buttons={[{element: emotionChoice0}, {element: emotionChoice1}, {element: emotionChoice2}, {element: emotionChoice3}, {element: emotionChoice4}]}
                    selectedIndex={null}
                    onPress={(index) => getEmotion(index)}
                    containerStyle={{height: '10%'}}
                    textStyle={{color: 'black', textAlign:'center'}}
                  />
                  <ButtonGroup
                    buttons={[{element: emotionChoice5}, {element: emotionChoice6}, {element: emotionChoice7}, {element: emotionChoice8}, {element: emotionChoice9}]}
                    selectedIndex={null}
                    onPress={(index) => getEmotion(index + Math.round((emotionImages.length + 1) / 2))}
                    containerStyle={{height: '10%'}}
                    textStyle={{color: 'black', textAlign:'center'}}
                  />
                </View>
              </View>
            </Modal>
            {/*renderEmotionChoices()*/}
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
    alignItems:'center',
    justifyContent:'center'
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
    margin: 50,
    padding: 40,
    borderRadius: 10,
    flex: 1
  }
});

export default ChatbotScreen;