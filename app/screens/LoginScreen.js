import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

function LoginScreen({ navigation }, props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <ImageBackground 
            source={require("../assets/background.jpg")}
            style={styles.container}
            blurRadius={7}>
            <Image style={styles.image} source={require("../assets/logo.png")} />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    placeholderTextColor="#a8a8a8"
                    onChangeText={(email) => setEmail(email)} />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    placeholderTextColor="#a8a8a8"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)} />
            </View>
            <TouchableOpacity>
                <Text style={styles.forgotButton}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.loginButton}
                onPress={() => navigation.navigate("Home")} >
                <Text style={styles.loginText}>Sign In</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 40,
    },
    inputView: {
        backgroundColor: "#fff",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
        borderWidth: 1,
        borderColor: '#a8a8a8'
    },
    textInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    forgotButton: {
        height: 30,
        marginBottom: 30,
    },
    loginButton: {
        width: "70%",
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#ffa480",
    },
    loginText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
})

export default LoginScreen;