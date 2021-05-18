import React, { useState, useEffect, useContext } from 'react';
import { firebase } from '../firebase/config'
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext, AuthProvider } from './AuthProvider';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import LoadingScreen from '../screens/LoadingScreen';

export default function Routes() {
    const [initializing, setInitializing] = useState(true);
    const [loading, setLoading] = useState(true);
    const { user, setUser } = useContext(AuthContext);

    function onAuthStateChanged(result) {
        setUser(result);
        if (initializing) setInitializing(false);
        setLoading(false);
    }

    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged)
        return subscriber
    }, [])

    if (loading) {
        return <LoadingScreen />
    }

    return (
        <NavigationContainer>
            {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    )
}