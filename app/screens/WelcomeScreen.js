import { Image, ImageBackground, StyleSheet, View, Text, TouchableWithoutFeedback, TouchableOpacity, Button } from 'react-native';
import React, { useState } from 'react';

function WelcomeScreen({ navigation }, props) {
    return (
        <ImageBackground 
            style={styles.background}
            source={require("../assets/background.jpg")} >
            <View style={styles.logoContainer}>
                <Image source={require("../assets/logo.png")} style={styles.logo}/>
                <Text style={styles.logoText} >MIND BOT</Text>
            </View>
            <TouchableOpacity
                style={styles.loginButton} 
                onPress={() => navigation.navigate("Sign In")}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.registerButton}
                onPress={() => navigation.navigate("Sign In")}>
                <Text style={styles.buttonText}>Create Account</Text>
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
        width: '70%',
        height: 50,
        borderRadius: 30,
        backgroundColor: "#ffa480",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    registerButton: {
        width: '70%',
        height: 50,
        borderRadius: 30,
        backgroundColor: "#a8a8a8",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
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
        color: '#949494'
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    }
})

export default WelcomeScreen;