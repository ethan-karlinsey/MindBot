import React, { useState, useContext, useEffect } from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import {
  StatusBar, 
  StyleSheet,
  View,
  Image,
  Text,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-elements";
import firebase from "firebase";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { AuthContext } from "../navigation/AuthProvider";
import synchronousTrait from "../firebase/synchronousTrait.js"

let emotionImages = [
  require("../assets/emotions/happy.png"),
  require("../assets/emotions/sad.png"),
  require("../assets/emotions/angry.png"),
  require("../assets/emotions/crying.png"),
  require("../assets/emotions/laugh.png"),
  require("../assets/emotions/nervous.png"),
  require("../assets/emotions/surprised.png"),
  require("../assets/emotions/confused.png"),
  require("../assets/emotions/tired.png"),
];

const letsChatMessages = [
  "How are you doing today?",
  "Hey, how's it going?",
  "How are you feeling?",
  "How was your day?",
  "How have you been?",
  "What have you been up to?",
  "How's everything going?",
  "What’s new with you?",
];

const kindMessages = [
  "You are loved and appreciated",
  "You are amazing just the way you are",
  "You can accomplish anything you put your mind to",
  "You are braver than you believe, stronger than you seem, and smarter than you think",
  "You are great",
];

const emotions = [
  "Happy",
  "Sad",
  "Angry",
  "Crying",
  "Laughing",
  "Nervous",
  "Surprised",
  "Confused",
  "Tired",
  "None",
];

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function ChatbotScreen() {
  const currentMessage = synchronousTrait(null);
  const { user, theme } = useContext(AuthContext);
  const db = firebase.firestore();
  const chatsRef = db.collection(user.uid);
  const query = chatsRef.orderBy("createdAt", "desc");
  const [messages] = useCollectionData(query, { idField: "id" });
  const [showBubbles, setShowBubbles] = useState(true);
  const [selectedEmotion, setSelectedEmotion] = useState(0);

  const sendMessage = (input) => {

    const messageToSend = currentMessage.set(input);

    chatsRef.add({
      _id: messageToSend[0]._id,
      text: messageToSend[0].text,
      createdAt: Date.parse(messageToSend[0].createdAt),
      emotionIndex: selectedEmotion,
      emotion: emotions[selectedEmotion],
      user: {
        _id: user.uid,
        name: user.displayName,
      },
    });
    currentMessage.set(null);
  };

  const createCustom = (props) => {
    const { currentMessage } = props;
    const { text: currText } = currentMessage;
    return (
      <Text style={{ color: theme.font, fontSize: 12, padding: 5 }}> {currText}</Text>
    );
  };

  const createAvatar = (messageInfo) => {
    // If the emotion the user selects is "None"
    if (messageInfo.currentMessage.emotionIndex == emotionImages.length) {
      return null;
    } else {
      var emotionImage = emotionImages[messageInfo.currentMessage.emotionIndex];

      return <Avatar rounded size="medium" source={emotionImage} backgroundColor={theme.secondary}></Avatar>;
    }
  };

  const createBubble = (messages) => {
    return (
      <Bubble
        {...messages}
        textStyle={{
          right: {
            color: theme.font,
          },
          left: {
            color: theme.font,
          },
        }}
        timeTextStyle={{
          left: {
            color: theme.font,
          },
          right: {
            color: theme.font,
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: theme.primary,
          },
          right: {
            backgroundColor: theme.primary,
          },
        }}
        user={messages.currentMessage.user}
      />
    );
  };

  const sendLetsChat = () => {
    const randomId = Math.random().toString(36).substring(2);

    chatsRef.add({
      _id: randomId,
      text: letsChatMessages[
        Math.floor(Math.random() * letsChatMessages.length)
      ],
      createdAt: new Date().getTime(),
      emotionIndex: 0,
      emotion: emotions[0],
      user: {
        _id: "NICUiyNjJBRQHccSDjRvZzOi3Pj2",
        name: "MindBot",
      },
    });
  };

  const sendKindMessage = () => {
    const randomId = Math.random().toString(36).substring(2);

    chatsRef.add({
      _id: randomId,
      text: kindMessages[Math.floor(Math.random() * kindMessages.length)],
      createdAt: new Date().getTime(),
      emotionIndex: 0,
      emotion: emotions[0],
      user: {
        _id: "NICUiyNjJBRQHccSDjRvZzOi3Pj2",
        name: "MindBot",
      },
    });
  };


  return (
    <View style=
      {{flex: 1,
      justifyContent: 'center',
      backgroundColor: theme.background,
    }}>
      <StatusBar backgroundColor={theme.background} barStyle={theme.statusBar}/>
      <View style={styles(theme).buttonContainer}>
        <TouchableOpacity
          style={styles(theme).headerButton}
          onPress={() => sendLetsChat()}
        >
          <Text style={styles(theme).chatButtonText}>Start a conversation</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles(theme).headerButton}
          onPress={() => sendKindMessage()}
        >
          <Text style={styles(theme).chatButtonText}>Receive a kind message</Text>
        </TouchableOpacity>
      </View>
      {showBubbles ? (
        <GiftedChat
          messages={messages}
          user={{
            _id: user.uid,
            name: user.displayName,
          }}
          onSend={(messages) => {
            Keyboard.dismiss();
            sendMessage(messages);
          }}
          renderAvatar={(messages) => createAvatar(messages)}
          renderMessageText={(messages) => createCustom(messages)}
          showUserAvatar={true}
          showAvatarForEveryMessage={true}
          renderAllAvatars={true}
          renderBubble={(messages) => createBubble(messages)}
          alwaysShowSend={true}
        />
      ) : null}
      <View>
        <View style={styles(theme).emotionContainer}>
          <TouchableOpacity
            style={(selectedEmotion == 0) ? [styles(theme).selectedEmotionButton, {borderColor: theme.font, backgroundColor: theme.secondary,}]
                                          : [styles(theme).emotionButton, {backgroundColor: theme.secondary}]}
            activeOpacity={0.5}
            onPress={() => setSelectedEmotion(0)}
          >
            <Image style={styles(theme).buttonImage} source={emotionImages[0]} />
            <Text style={styles(theme).buttonText}>Happy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={(selectedEmotion == 1) ? [styles(theme).selectedEmotionButton, {borderColor: theme.font, backgroundColor: theme.secondary,}]
                                          : [styles(theme).emotionButton, {backgroundColor: theme.secondary}]}
            activeOpacity={0.5}
            onPress={() => setSelectedEmotion(1)}
          >
            <Image style={styles(theme).buttonImage} source={emotionImages[1]} />
            <Text style={styles(theme).buttonText}>Sad</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={(selectedEmotion == 2) ? [styles(theme).selectedEmotionButton, {borderColor: theme.font, backgroundColor: theme.secondary,}]
                                          : [styles(theme).emotionButton, {backgroundColor: theme.secondary}]}
            activeOpacity={0.5}
            onPress={() => setSelectedEmotion(2)}
          >
            <Image style={styles(theme).buttonImage} source={emotionImages[2]} />
            <Text style={styles(theme).buttonText}>Angry</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={(selectedEmotion == 3) ? [styles(theme).selectedEmotionButton, {borderColor: theme.font, backgroundColor: theme.secondary,}]
                                          : [styles(theme).emotionButton, {backgroundColor: theme.secondary}]}
            activeOpacity={0.5}
            onPress={() => setSelectedEmotion(3)}
          >
            <Image style={styles(theme).buttonImage} source={emotionImages[3]} />
            <Text style={styles(theme).buttonText}>Crying</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={(selectedEmotion == 4) ? [styles(theme).selectedEmotionButton, {borderColor: theme.font, backgroundColor: theme.secondary,}]
                                          : [styles(theme).emotionButton, {backgroundColor: theme.secondary}]}
            activeOpacity={0.5}
            onPress={() => setSelectedEmotion(4)}
          >
            <Image style={styles(theme).buttonImage} source={emotionImages[4]} />
            <Text style={styles(theme).buttonText}>Laughing</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={(selectedEmotion == 5) ? [styles(theme).selectedEmotionButton, {borderColor: theme.font, backgroundColor: theme.secondary,}]
                                          : [styles(theme).emotionButton, {backgroundColor: theme.secondary}]}
            activeOpacity={0.5}
            onPress={() => setSelectedEmotion(5)}
          >
            <Image style={styles(theme).buttonImage} source={emotionImages[5]} />
            <Text style={styles(theme).buttonText}>Nervous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={(selectedEmotion == 6) ? [styles(theme).selectedEmotionButton, {borderColor: theme.font, backgroundColor: theme.secondary,}]
                                          : [styles(theme).emotionButton, {backgroundColor: theme.secondary}]}
            activeOpacity={0.5}
            onPress={() => setSelectedEmotion(6)}
          >
            <Image style={styles(theme).buttonImage} source={emotionImages[6]} />
            <Text style={styles(theme).buttonText}>Surprised</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={(selectedEmotion == 7) ? [styles(theme).selectedEmotionButton, {borderColor: theme.font, backgroundColor: theme.secondary,}]
                                          : [styles(theme).emotionButton, {backgroundColor: theme.secondary}]}
            activeOpacity={0.5}
            onPress={() => setSelectedEmotion(7)}
          >
            <Image style={styles(theme).buttonImage} source={emotionImages[7]} />
            <Text style={styles(theme).buttonText}>Confused</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={(selectedEmotion == 8) ? [styles(theme).selectedEmotionButton, {borderColor: theme.font, backgroundColor: theme.secondary,}]
                                          : [styles(theme).emotionButton, {backgroundColor: theme.secondary}]}
            activeOpacity={0.5}
            onPress={() => setSelectedEmotion(8)}
          >
            <Image style={styles(theme).buttonImage} source={emotionImages[8]} />
            <Text style={styles(theme).buttonText}>Tired</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={(selectedEmotion == 9) ? [styles(theme).selectedEmotionButton, {borderColor: theme.font, backgroundColor: theme.secondary,}]
                                          : [styles(theme).emotionButton, {backgroundColor: theme.secondary}]}
            activeOpacity={0.5}
            onPress={() => setSelectedEmotion(9)}
          >
            <Text style={styles(theme).buttonText}>None</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = (theme) => StyleSheet.create({
  chatBotContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#E5E5E5",
  },
  buttonContainer: {
    marginTop: 10,
    padding: 5,
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerButton: {
    backgroundColor: theme.primary,
    height: 50,
    width: 185,
    padding: 8,
    marginHorizontal: 5,
    borderRadius: 15,
  },
  button: {
    backgroundColor: theme.primary,
    width: "40%",
    height: 50,
    borderRadius: 20,
  },
  chatButtonText: {
    color: theme.font,
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: 30,
  },
  emotionContainer: { 
    marginBottom: -150,
    marginTop: -40,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-end",
    justifyContent: "center",
  },
  emotionButton: {
    marginVertical: 3,
    marginHorizontal: 3,
    marginBottom:0,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "18%",
    height: "35%",
  },
  selectedEmotionButton: {
    marginVertical: 3,
    marginHorizontal: 3,
    marginBottom:0,
    borderRadius: 10,
    backgroundColor: "#c3daf3",
    justifyContent: "center",
    alignItems: "center",
    width: "18%",
    height: "35%",
    borderStyle: "solid",
    borderWidth: 5,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
  },
  buttonImage: {
    width: 30,
    height: 30,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    textAlign: "center",
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 34 / 2,
    backgroundColor: "red",
    borderColor: "black",
    borderWidth: 3,
    margin: 5,
  },
});