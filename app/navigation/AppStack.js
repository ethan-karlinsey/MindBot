import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ChatbotScreen from '../screens/ChatbotScreen';

const Stack = createStackNavigator();

export default function AppStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Chatbot' component={ChatbotScreen} options={{ headerShown: true, headerTitleAlign: 'center' }}/>
        </Stack.Navigator>
    );
}