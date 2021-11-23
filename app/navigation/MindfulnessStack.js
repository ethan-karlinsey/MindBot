import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MindfulnessScreen from '../screens/MindfulnessScreen';

const Stack = createStackNavigator()

/*
    Mindfulness Stack:
    Shown when mindfulness icon in tab navigator is clicked
*/

export default function MindfulnessStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen name='Mindfulness Screen' component={MindfulnessScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}