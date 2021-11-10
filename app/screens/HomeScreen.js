import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { firebase } from '../firebase/config';
import { AuthContext } from '../navigation/AuthProvider';

export default function HomeScreen({ navigation }) {
    const { user, logout } = useContext(AuthContext);
    const [name, setName] = useState('');

    const onLogOutPress = () => {
        logout();
    }

    useEffect(() => {
        let isMounted = true;
        async function getUserInfo() {
            try {
                let doc = await firebase
                    .firestore()
                    .collection('users')
                    .doc(user.uid)
                    .get();

                if (!doc.exists) {
                    console.log('User data not found');
                } else {
                    let data = doc.data();
                    if (isMounted) setName(data.name);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getUserInfo();
        return () => { isMounted = false }
    })

    return (
        <ImageBackground 
            source={require("../assets/background.jpg")}
            blurRadius={1.25}
            style={styles.container}>
            <Text style={styles.greeting}>Hello {name}</Text>
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
            <TouchableOpacity 
                style={styles.logOutButton}
                onPress={onLogOutPress} >
                <Text style={styles.buttonText}>Log Out</Text>
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
    greeting: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#383838',
        marginTop: 100,
        marginBottom: 30,
    },
    button: {
        width: "75%",
        height: 75,
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 25,
        marginBottom: 25,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    logOutButton: {
        width: "55%",
        height: 50,
        backgroundColor: '#ff7269',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 100,
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