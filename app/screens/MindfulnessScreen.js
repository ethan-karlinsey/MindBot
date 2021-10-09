import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, TouchableHighlight, Text, Image, ImageBackground, View } from 'react-native';
import { firebase } from '../firebase/config';
import { AuthContext } from '../navigation/AuthProvider';

export default function HomeScreen({ navigation }) {
    return (
        <ImageBackground 
            source={require("../assets/backgrounds/rocks1.jpg")}
            blurRadius={1.5}
            style={styles.container}>
            <View style={{ alignItems: 'center'}} >
                <Text style={styles.greeting}>TAKE A DEEP BREATH AND LET'S DO THIS</Text>
                <Image source={require("../assets/meditation.png")} style={styles.image}/>
            </View>
            <TouchableHighlight 
                activeOpacity={0.95}
                underlayColor={'#a9cfc2'}
                style={styles.guidedButton}
                onPress={() => navigation.navigate("Home Screen")} >
                <Text style={styles.buttonText}>Guided Mindfulness</Text>
            </TouchableHighlight>
            <View style={{ flexDirection:"row" }} >
                <TouchableHighlight 
                    activeOpacity={0.95}
                    underlayColor={'#a9cfc2'}
                    style={styles.instantButton}
                    onPress={() => navigation.navigate("Home Screen")} >
                    <Text style={styles.buttonText}>Instant Mindfulness</Text>
                </TouchableHighlight>
                <TouchableHighlight 
                    activeOpacity={0.95}
                    underlayColor={'#a9cfc2'}
                    style={styles.everydayButton}
                    onPress={() => navigation.navigate("Home Screen")} >
                    <Text style={styles.buttonText}>Everyday Mindfulness</Text>
                </TouchableHighlight>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    greeting: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-medium',
        color: '#383838',
        marginBottom: 15,
    },
    guidedButton: {
        width: 340,
        height: 100,
        backgroundColor: '#84b0a1',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 25,
        marginBottom: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    instantButton: {
        width: 160,
        height: 100,
        backgroundColor: '#84b0a1',
        marginLeft: 30,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 75,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    everydayButton: {
        width: 160,
        height: 100,
        backgroundColor: '#84b0a1',
        marginLeft: 10,
        marginRight: 30,
        marginTop: 10,
        marginBottom: 75,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "white",
        textAlign: 'center'
    },
    image: {
        width: 150,
        height: 100,
        marginBottom: 50,
    },
})