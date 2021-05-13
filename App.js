import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen, ChatbotScreen, WelcomeScreen } from './app/screens'
import { firebase } from './app/firebase/config'
import { LogBox } from 'react-native'

LogBox.ignoreLogs(['Setting a timer'])

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

   useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);

  if (loading) {
    return (
      <></>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false}}>
        { !user ? (
          <>
          <Stack.Screen 
            name="Welcome" 
            component={WelcomeScreen} />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: true, headerTitleAlign: "center" }} />
          <Stack.Screen 
            name="Registration" 
            component={RegistrationScreen}
            options={{ headerShown: true, headerTitleAlign: "center" }} />
          </>
        ) : (
          <>
          <Stack.Screen 
            name="Home">
            {props => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
          <Stack.Screen 
            name="Chatbot" 
            component={ChatbotScreen}
            options={{ headerShown: true, headerTitleAlign: "center" }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
