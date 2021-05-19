import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';
import { firebase } from '../firebase/config'

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {
                    try {
                        await firebase.auth().signInWithEmailAndPassword(email, password);
                    } catch (error) {
                        Alert.alert('Error', error+"");
                    }
                },
                register: async (email, password, name) => {
                    try { 
                        await firebase.auth().createUserWithEmailAndPassword(email, password);
                        const currentUser = firebase.auth().currentUser;
                        const db = firebase.firestore();
                        db.collection('users')
                            .doc(currentUser.uid)
                            .set({
                                _id: currentUser.uid,
                                email: currentUser.email,
                                name: name
                        });
                    } catch (error) {
                        Alert.alert('Error', error+"");
                    }
                },
                logout: async () => {
                    try {
                        await firebase.auth().signOut();
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