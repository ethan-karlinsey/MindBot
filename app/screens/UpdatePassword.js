import React, { useState } from 'react';
import { Alert } from 'react-native';
import { StyleSheet, TouchableOpacity, Text, ImageBackground, View, TextInput } from 'react-native';
import { firebase } from '../firebase/config';
import { StackActions } from '@react-navigation/routers';

export default function UpdatePassword({ navigation }) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }

    const onChangePasswordPress = () => {
        reauthenticate(currentPassword).then(() => {
            if (newPassword === confirmNewPassword) {
                var user = firebase.auth().currentUser;
                user.updatePassword(newPassword).then(() => {
                    Alert.alert('Password Updated');
                    navigation.dispatch(StackActions.pop(1));
                }).catch((error) => {
                    Alert.alert(error.message);
                });
            } else {
                Alert.alert('New passwords don\'t match');
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
                    secureTextEntry
                    placeholder='Current Password'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setCurrentPassword(text)}
                    value={currentPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='New Password (At least 6 characters)'
                    onChangeText={(text) => setNewPassword(text)}
                    value={newPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password (At least 6 characters)'
                    onChangeText={(text) => setConfirmNewPassword(text)}
                    value={confirmNewPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onChangePasswordPress()}>
                    <Text style={styles.buttonTitle}>Change Password</Text>
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