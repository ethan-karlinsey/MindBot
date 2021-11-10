import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatbotScreen from '../screens/ChatbotScreen';

const Stack = createStackNavigator()

/*
    Chatbot Stack:
    Shown when chatbot icon in tab navigator is clicked
*/

export default function ChatbotStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen name='Chatbot' component={ChatbotScreen} options={{ headerShown: false}} />
        </Stack.Navigator>
    );
}