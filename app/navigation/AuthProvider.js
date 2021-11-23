import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';
import { firebase } from '../firebase/config'

export const AuthContext = createContext({});

/*
    Provides context to all children components no matter
    how deeply nested. These functions and data can be 
    accessed from any screen.
*/

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState(null);
    const [saveMessageHistory, setSaveMessageHistory] = useState(null);
    const [reloadChat, setReloadChat] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                theme,
                setTheme,
                saveMessageHistory,
                setSaveMessageHistory,
                reloadChat,
                setReloadChat,
                login: async (email, password) => {
                    try {
                        await firebase.auth().signInWithEmailAndPassword(email, password);  // sign in
                    } catch (error) {
                        Alert.alert('Error', error+"");
                    }
                },
                register: async (email, password, name) => {
                    try { 
                        await firebase.auth().createUserWithEmailAndPassword(email, password);  // create new account
                        const currentUser = firebase.auth().currentUser;    // get current user
                        
                        firebase.auth().currentUser.updateProfile({ // update user's name
                            displayName: name,
                        });

                        const db = firebase.firestore();    // store user data in firestore
                        db.collection('users')
                            .doc(currentUser.uid)
                            .set({
                                _id: currentUser.uid,
                                email: currentUser.email,
                                name: name,
                                saveMessageHistory: true,
                                theme: {
                                    background: "#EBEBEB",
                                    font: "#000000",
                                    primary: "#FFFFFF",
                                    secondary: "#8C8C8C",
                                    tertiary: "#E3E3E3"
                                }
                        });
                    } catch (error) {
                        Alert.alert('Error', error+"");
                    }
                },
                logout: async () => {
                    try {
                        await firebase.auth().signOut();    // sign out
                    } catch (error) {
                        Alert.alert('Error', error+"");
                    }
                },
                deleteAccount: async () => {
                    try {
                        /*
                            TODO: DELETE USER DATA FROM DATABASE HERE
                        */
                        const currentUser = firebase.auth().currentUser;    // get current user and delete
                        await currentUser.delete();
                    } catch (error) {
                        Alert.alert('Error', error+"");
                    }
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};