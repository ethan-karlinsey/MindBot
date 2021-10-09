import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../screens/SettingsScreen';
import UpdatePassword from '../screens/UpdatePassword';
import UpdateEmail from '../screens/UpdateEmail';

const Stack = createStackNavigator()

export default function SettingsStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen name='Settings Screen' component={SettingsScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Update Password' component={UpdatePassword} />
            <Stack.Screen name='Update Email' component={UpdateEmail} />
        </Stack.Navigator>
    );
}