import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ImageBackground, View } from 'react-native'

function HomeScreen({ navigation }, props) {
    return (
        <ImageBackground 
            source={require("../assets/background.jpg")}
            blurRadius={1.25}
            style={styles.container}>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate("Home")} >
                <Text style={styles.buttonText}>Mindfulness</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate("Chatbot")} >
                <Text style={styles.buttonText}>Chat Bot</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate("Home")} >
                <Text style={styles.buttonText}>Instant</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        width: "60%",
        height: 80,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#788eec",
        marginBottom: 50
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "white"
    },
})

export default HomeScreen;