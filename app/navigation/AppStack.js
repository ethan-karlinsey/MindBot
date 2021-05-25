import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ChatbotScreen from '../screens/ChatbotScreen';
import SettingsScreen from '../screens/SettingsScreen';
import UpdatePassword from '../screens/UpdatePassword';
import UpdateEmail from '../screens/UpdateEmail';

const Stack = createStackNavigator();

export default function AppStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true, headerTitleAlign: 'center' }} >
            <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false}} />
            <Stack.Screen name='Chatbot' component={ChatbotScreen} />
            <Stack.Screen name='Settings' component={SettingsScreen} />
            <Stack.Screen name='UpdatePassword' component={UpdatePassword} />
            <Stack.Screen name='UpdateEmail' component={UpdateEmail} />
        </Stack.Navigator>
    );
}