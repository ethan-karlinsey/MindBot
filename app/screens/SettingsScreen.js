import React, { useContext } from 'react';
import { Alert } from 'react-native';
import { StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';

export default function SettingsScreen({ navigation }) {
    const { logout } = useContext(AuthContext);

    const onLogOutPress = () => {
        Alert.alert(
            'Log Out',
            null,
            [
                { text: 'Yes', onPress: () => logout()},
                { text: 'No'}
            ]
        )
    }

    return (
        <ImageBackground 
            style={styles.container}
            source={require("../assets/backgrounds/settings2.jpg")} 
            blurRadius={5} >
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Update Password')}>
                    <Text style={styles.buttonText}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Update Email')}>
                    <Text style={styles.buttonText}>Change Email</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLogOutPress()}>
                    <Text style={styles.buttonText}>Chatbot Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLogOutPress()}>
                    <Text style={styles.buttonText}>Log Out</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button} >
                    <Text style={styles.buttonText}>Delete Account</Text>
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
        backgroundColor: '#796a8a',
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