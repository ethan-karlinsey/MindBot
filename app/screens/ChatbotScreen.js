import React, { useState, useContext, useLayoutEffect } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { StyleSheet, View, Image, Text, Keyboard, TouchableOpacity, Button } from 'react-native';
import { Avatar } from "react-native-elements";
import firebase from 'firebase';
import 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Modal from './Modal.js';
import { AuthContext } from '../navigation/AuthProvider';

let emotionImages = [
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

const letsChatMessages = [
  "How are you doing today?",
  "Hey, how's it going?",
  "How are you feeling?",
  "How was your day?",
  "How have you been?",
  "What have you been up to?",
  "How's everyting going?",
  "What’s new with you?",
];

const kindMessages = [
  "You are loved and appreciated",
  "You are amazing just the way you are",
  "You can acomplish anything you put your mind to",
  "You are braver than you believe, stronger than you seem, and smarter than you think",
  "You are great",
];

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

  useLayoutEffect(() => {
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
      user: {
        _id: id,
        name: name
      }
    })
    setCurrentMessage(null);
  }

  const createAvatar = (messageInfo) => {

    // If the emotion the user selects is "None"
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

  const sendLetsChat = () => {

    const randomId = Math.random().toString(36).substring(2);

    chatsRef.add({
      _id: randomId,
      text: letsChatMessages[Math.floor(Math.random() * letsChatMessages.length)],
      createdAt: new Date().getTime(),
      emotionIndex: 0,
      emotion: emotions[0],
      user: {
        _id: 'NICUiyNjJBRQHccSDjRvZzOi3Pj2',
        name: 'MindBot'
      }
    })
  }

  const sendKindMessage = () => {

    const randomId = Math.random().toString(36).substring(2);

    chatsRef.add({
      _id: randomId,
      text: kindMessages[Math.floor(Math.random() * kindMessages.length)],
      createdAt: new Date().getTime(),
      emotionIndex: 0,
      emotion: emotions[0],
      user: {
        _id: 'NICUiyNjJBRQHccSDjRvZzOi3Pj2',
        name: 'MindBot'
      }
    })
  }

  return (
          <View style={styles.chatBotContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => sendLetsChat()}
              >
                <Text style={styles.chatButtonText}>Let's Chat</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => sendKindMessage()}
              >
                <Text style={styles.chatButtonText}>Send a kind message</Text>
              </TouchableOpacity>
            </View>
            <GiftedChat
              messages={messages}
              user={{
                _id: id,
                name: name
              }}
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
                  <Text style={{textAlign: 'center'}}>Select an emotion for your message</Text>
                  <View style={styles.emotionContainer}>
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
  buttonContainer: {
    justifyContent: 'center', 
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 30,
  },
  button: {
    width: '40%',
    height: 50,
    borderRadius: 20,
    backgroundColor: "#61dafb",
  },
  chatButtonText: {
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 50,
  },
  emotionPopUp: {
    backgroundColor: "#ffffff",
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
  },
  emotionContainer: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center'
  },
  emotionButton: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: "35%",
    height: 100
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    margin: 5
  },
  buttonImage: {
    width: 50,
    height: 50,
  }
});