import * as React from 'react';
import { useContext} from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../navigation/AuthProvider';
import ChatbotStack from './ChatbotStack';
import SettingsStack from './SettingsStack';
import MindfulnessStack from './MindfulnessStack';

const Tab = createMaterialBottomTabNavigator();

/*
    Main application stack:
    Shown when the user is authenticated/signed in
    Each navigation route for the tab navigation contains its own stack navigation
    Settings tab has SettingsStack, mindfulness has MindfulnessStack, chatbot has ChatbotStack
*/
export default function AppStack() {
    const { theme } = useContext(AuthContext);

    return (
        <Tab.Navigator 
            initialRouteName='Mindfulness'
            tabBarOptions={{ keyboardHidesTabBar: false }} 
            barStyle={{ backgroundColor: theme.primary }}
            screenOptions={{ headerShown: true, headerTitleAlign: 'center' }} 
        >
            <Tab.Screen 
                name='Settings' 
                component={SettingsStack} 
                options={{ 
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="cog" color={color} size={26} />
                    ),
                }} 
            />
            <Tab.Screen 
                name='Mindfulness' 
                component={MindfulnessStack} 
                options={{ 
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="brain" color={color} size={26} />
                    ),
                }} 
            />
            <Tab.Screen 
                name='Chatbot' 
                component={ChatbotStack} 
                options={{ 
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="chat" color={color} size={26} />
                    ),
                }} 
            />
        </Tab.Navigator>
    );
}