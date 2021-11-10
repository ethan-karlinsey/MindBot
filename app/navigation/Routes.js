import React, { useState, useEffect, useContext } from 'react';
import { firebase } from '../firebase/config'
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './AuthProvider';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import LoadingScreen from '../screens/LoadingScreen';

export default function Routes() {
    const [initializing, setInitializing] = useState(true);
    const [loading, setLoading] = useState(true);
    const { user, setUser, setTheme, setSaveMessageHistory, setShowEmotions} = useContext(AuthContext);

   async function onAuthStateChanged(result) {   
        await setUser(result);    // set user in authcontext

        if (result) {
            console.log(result);  
            try {
                let doc = await firebase
                    .firestore()
                    .collection("users")
                    .doc(result.uid)
                    .get();

                if (!doc.exists) {
                    console.log("User data not found");
                } else {
                    let data = doc.data();
                    await setTheme(data.theme);
                    await setSaveMessageHistory(data.saveMessageHistory);
                    await setShowEmotions(data.showEmotions);
                }
            } catch (error) {
                console.log(error);
            }
        }

        if (initializing) setInitializing(false);   
        setLoading(false);
    }

    // listen for authentication updates
    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged)
        return subscriber
    }, [])

    // show loading screen
    if (loading) {
        return <LoadingScreen />
    } 
    
    // returns main app stack if user is already authenticated
    // returns authentication stack if user is not already authenticated 
    return (
        <NavigationContainer>
            {user ? <AppStack /> : <AuthStack />} 
        </NavigationContainer>
    )
    
}