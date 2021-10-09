import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MindfulnessScreen from '../screens/MindfulnessScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator()

export default function MindfulnessStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen name='Mindfulness Screen' component={MindfulnessScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Home Screen' component={HomeScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}