import React, { useState } from 'react';
import { Alert } from 'react-native';
import { StyleSheet, TouchableOpacity, Text, ImageBackground, View, TextInput } from 'react-native';
import { firebase } from '../firebase/config';
import { StackActions } from '@react-navigation/routers';

export default function UpdateEmail({ navigation }) {
    const [newEmail, setNewEmail] = useState('');
    const [confirmNewEmail, setConfirmNewEmail] = useState('');
    const [password, setPassword] = useState('');

    const reauthenticate = (password) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, password);
        return user.reauthenticateWithCredential(cred);
    }

    const onChangeEmailPress = () => {
        reauthenticate(password).then(() => {
            if (newEmail === confirmNewEmail) {
                var user = firebase.auth().currentUser;
                user.updateEmail(newEmail).then(() => {
                    firebase
                        .firestore()
                        .collection('users')
                        .doc(user.uid)
                        .update({
                            email: newEmail
                        })

                    Alert.alert('Email Updated');
                    navigation.dispatch(StackActions.pop(1));
                }).catch((error) => {
                    Alert.alert(error.message);
                });
            } else {
                Alert.alert('Emails don\'t match');
            }
        }).catch((error) => {
            Alert.alert(error.message);
        });
    }

    return (
        <ImageBackground 
            style={styles.container}
            source={require("../assets/backgrounds/1.jpg")} 
            blurRadius={5} >
            <View>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    keyboardType='email-address'
                    placeholder='New Email'
                    onChangeText={(text) => setNewEmail(text)}
                    value={newEmail}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    keyboardType='email-address'
                    placeholder='Confirm New Email'
                    onChangeText={(text) => setConfirmNewEmail(text)}
                    value={confirmNewEmail}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onChangeEmailPress()}>
                    <Text style={styles.buttonTitle}>Update Email</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        height: 48,
        width: 320,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        width: 320,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
})