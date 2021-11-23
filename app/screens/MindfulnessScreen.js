import React, { useContext } from 'react';
import { StyleSheet, StatusBar, TouchableHighlight, Text, Image, ImageBackground, View } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';

export default function HomeScreen({ navigation }) {
    const { theme } = useContext(AuthContext); // get theme from auth context

    return (
        <ImageBackground 
            source={require("../assets/backgrounds/rocks1.jpg")}
            blurRadius={1.5}
            style={styles.container}>
            <StatusBar backgroundColor={theme.background} barStyle={theme.statusBar}/>
            <View style={{ alignItems: 'center'}} >
                <Text style={styles.greeting}>Take a deep breath and let's do this!</Text>
                <Image source={require("../assets/meditation.png")} style={styles.image}/>
            </View>
            <TouchableHighlight 
                activeOpacity={0.95}
                underlayColor={'#a9cfc2'}
                style={styles.guidedButton}
                onPress={() => console.log("guided button clicked")} >
                <Text style={styles.buttonText}>Guided Mindfulness</Text>
            </TouchableHighlight>
            <View style={{ flexDirection:"row" }} >
                <TouchableHighlight 
                    activeOpacity={0.95}
                    underlayColor={'#a9cfc2'}
                    style={styles.instantButton}
                    onPress={() => console.log("instant button clicked")} >
                    <Text style={styles.buttonText}>Instant Mindfulness</Text>
                </TouchableHighlight>
                <TouchableHighlight 
                    activeOpacity={0.95}
                    underlayColor={'#a9cfc2'}
                    style={styles.everydayButton}
                    onPress={() => console.log("everyday button clicked")} >
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
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontFamily: 'sans-serif-medium',
        color: '#5b5b5b',
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
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#608075'
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
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#608075'
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
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#608075'
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