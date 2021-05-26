import { Image, ImageBackground, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function WelcomeScreen({ navigation }) {
    return (
        <ImageBackground 
            style={styles.background}
            source={require("../assets/backgrounds/1.jpg")} >
            <View style={styles.logoContainer}>
                <Image source={require("../assets/logo.png")} style={styles.logo}/>
                <Text style={styles.logoText} >MIND BOT</Text>
            </View>
            <TouchableOpacity
                style={styles.loginButton} 
                onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginButtonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.registerButton}
                onPress={() => navigation.navigate("Registration")}>
                <Text style={styles.registerButtonText}>Create Account</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        height: '100%',
        justifyContent: "flex-end",
        alignItems: 'center'
    },
    loginButton: {
        width: 320,
        height: 48,
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    registerButton: {
        width: 320,
        height: 48,
        backgroundColor: '#ffffff',
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 50,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 100,
    },
    logoContainer: {
        position: 'absolute',
        top: 90,
        alignItems: 'center',
    },
    logoText: {
        fontWeight: 'bold',
        color: '#ffffff'
    },
    loginButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    registerButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#788eec',
    }
})
