import React, { useContext } from 'react';
import { Alert } from 'react-native';
import { StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';

export default function SettingsScreen({ navigation }) {
    const { logout } = useContext(AuthContext);

    const onLogOutPress = () => {
        /* commenting this out so logging out works on web
        Alert.alert(
            'Log Out',
            null,
            [
                { text: 'Yes', onPress: () => logout()},
                { text: 'No'}
            ]
        )
        */

        logout();
    }

    return (
        <ImageBackground 
            style={styles.container}
            source={require("../assets/backgrounds/1.jpg")} 
            blurRadius={5} >
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('UpdatePassword')}>
                    <Text style={styles.buttonText}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('UpdateEmail')}>
                    <Text style={styles.buttonText}>Change Email</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLogOutPress()}>
                    <Text style={styles.buttonText}>Log Out</Text>
                </TouchableOpacity>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 300,
        height: 50,
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 25,
        marginBottom: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "white"
    },
})