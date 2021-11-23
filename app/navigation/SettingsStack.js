import * as React from 'react';
import { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../screens/SettingsScreen';
import { AuthContext } from './AuthProvider';

const Stack = createStackNavigator()

/*
    Settings Stack:
    Shown when the settings icon in tab navigator is clicked
*/
export default function SettingsStack() {
    const { theme } = useContext(AuthContext);

    return (
        <Stack.Navigator screenOptions={{ 
            headerShown: true, 
            headerTitleAlign: 'center', 
            headerStyle: { backgroundColor: theme.primary, },
            headerTitleStyle: { color: theme.font }, 
        }}>
            <Stack.Screen name='Settings' component={SettingsScreen} options={{ headerShown: true }} />
        </Stack.Navigator>
    );
}