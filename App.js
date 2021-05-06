import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './app/screens/WelcomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import HomeScreen from './app/screens/HomeScreen';
import ChatbotScreen from './app/screens/ChatbotScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={{ headerTitleAlign: "center" }} />
        <Stack.Screen
          name="Sign In"
          component={LoginScreen}
          options={{ headerTitleAlign: "center", headerShown: true }} />
        <Stack.Screen 
          name="Home"
          component={HomeScreen}
          options={{ headerTitleAlign: "center" }}/>
        <Stack.Screen 
          name="Chat Bot"
          component={ChatbotScreen}
          options={{ headerTitleAlign: "center", headerShown: true }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


