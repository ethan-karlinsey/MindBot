import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ChatbotStack from './ChatbotStack';
import SettingsStack from './SettingsStack';
import MindfulnessStack from './MindfulnessStack';

const Tab = createMaterialBottomTabNavigator();

/*
    Main application stack:
    Shown when the user is authenticated/signed in
    Each navigation route for the tab navigation contains its own stack
    Settings tab has SettingsStack, mindfulness has MindfulnessStack, chatbot has ChatbotStack
*/
export default function AppStack() {
    return (
        <Tab.Navigator 
            initialRouteName='Mindfulness'
            tabBarOptions={{ keyboardHidesTabBar: false }} 
            barStyle={{ backgroundColor: '#545454' }}
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