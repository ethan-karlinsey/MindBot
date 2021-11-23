import React, { useContext, useState } from 'react';
import { StatusBar, ActivityIndicator, StyleSheet, TouchableHighlight, TouchableOpacity, Text, Modal, TextInput, View, Alert, Dimensions, Switch, Pressable, ScrollView } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { firebase } from '../firebase/config';

const { width } = Dimensions.get("window");

const colorOptions = [
  "#B4B5A9",
  "#242428",
  "#1D529F",
  "#358179",
  "#FBAA60",
];

const themes = [
  { // light
    statusBar: 'dark-content',
    background: "#B4B5A9",
    font: "#000000",
    primary: "#E4E5D6",
    secondary: "#FDFDFB",
    tertiary: "#666666"
  },
  { // dark
    statusBar: 'light-content',
    background: "#242428",
    font: "#FFFFFF",
    primary: "#515155",
    secondary: "#9D9D9F",
    tertiary: "#E4E5D6"
  },
  { // blue
    statusBar: 'dark-content',
    background: "#1D529F",
    font: "#000000",
    primary: "#4C78B9",
    secondary: "#9AB3D7",
    tertiary: "#E4E5D6"
  },
  { // green
    statusBar: 'dark-content',
    background: "#358179",
    font: "#000000",
    primary: "#60A099",
    secondary: "#A5C9C5",
    tertiary: "#E4E5D6"
  },
  { // red
    statusBar: 'dark-content',
    background: "#FBAA60",
    font: "#000000",
    primary: "#FBC490",
    secondary: "#F0CCB0",
    tertiary: "#4f4f4f"
  },
];

export default function SettingsScreen({ navigation }) {
    const { user, theme, setTheme, saveMessageHistory, setSaveMessageHistory, setReloadChat, logout, deleteAccount } = useContext(AuthContext); // functions and states from auth provider
    const [name, setName] = useState(''); // used to store updated name
    const [password, setPassword] = useState(''); // used to store current password
    const [newPassword, setNewPassword] = useState(''); // used to store new updated password
    const [confirmNewPassword, setConfirmNewPassword] = useState(''); // used to confirm updated paswword
    const [newEmail, setNewEmail] = useState(''); // used to store new updated email
    const [confirmNewEmail, setConfirmNewEmail] = useState(''); // used to confirm updated email
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false); // used set delete modal visibilty
    const [isPasswordModalVisible, setPasswordModalVisible] = useState(false); // used to set password update modal visibilty
    const [isEmailModalVisible, setEmailModalVisisble] = useState(false); // used to set email update modal visibilty
    const [isNameModalVisible, setNameModalVisible] = useState(false); // used to set name update modal visibilty
    const [loading, setLoading] = useState(false); // used to reload the screen

    // toggles the save message history switch on/off
    const toggleSaveMessageHistorySwitch = async () => {
        await setSaveMessageHistory(previousState => !previousState); // change switch state
        firebase // update value in firebase
            .firestore()
            .collection('users')
            .doc(user.uid)
            .update({
                saveMessageHistory: !saveMessageHistory
            });
    }

    // sets app theme to input theme and stores current theme in firebase
    const updateTheme = async (newTheme) => {
        await setTheme(newTheme); // update theme in auth context
        if (theme !== newTheme) { // update theme in firebase
            firebase
                .firestore()
                .collection('users')
                .doc(user.uid)
                .update({
                    theme: newTheme
                });
        }
    }

    // used to reauthenitcate user with input password, required for password/email changes
    const reauthenticate = (password) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, password);
        return user.reauthenticateWithCredential(cred);
    }

    // used to reload the page, shows loading screen for input amount of time (in milliseconds)
    const reload = async (time) => {
        setLoading(true)
        await setTimeout(() => {
            setLoading(false);
        }, time);
        // set all modals to not visible
        setNameModalVisible(false);
        setEmailModalVisisble(false);
        setPasswordModalVisible(false);
        setDeleteModalVisible(false);
    }

    // sets name update modal to visible/not visible based on previous state
    const toggleNameModalVisibility = () => {
        setNameModalVisible(!isNameModalVisible);
        setName('');
    }

    // sets email update modal to visible/not visible based on previous state
    const toggleEmailModalVisibility = () => {
        setEmailModalVisisble(!isEmailModalVisible);
        setNewEmail('');
        setConfirmNewEmail('');
    }

    // sets password update modal to visible/not visible based on previous state
    const togglePasswordModalVisibility = () => {
        setPasswordModalVisible(!isPasswordModalVisible);
        setPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    }

    // sets delete account modal to visible/not visible based on previous state
    const toggleDeleteModalVisibility = () => {
        setDeleteModalVisible(!isDeleteModalVisible);
        setPassword('');
    }

    // called when name field is clicked
    const onNamePress = () => {
        toggleNameModalVisibility();
    }

    // called when email field is cliced
    const onEmailPress = () => {
        toggleEmailModalVisibility();
    }

    // called when password field is clicked
    const onPasswordPress = () => {
        togglePasswordModalVisibility();
    }

    // called when delete account button pressed
    const onDeletePress = () => {
        toggleDeleteModalVisibility();
    }

    // called when confirm button pressed in update name modal
    const onConfirmUpdateName = async () => {
        toggleNameModalVisibility(); // set modal to not visible
        var user = firebase.auth().currentUser; // get current user
        user.updateProfile({ // update name for user
            displayName: name
        }).then(() => { // update name in firebase
            firebase
                .firestore()
                .collection('users')
                .doc(user.uid)
                .update({
                    name: name
                })

            Alert.alert('Name Updated');
        }).catch((error) => {
            Alert.alert(error.message);
        })

        reload(1000); // reload screen to show changes
    }

    // called when confirm button pressed in update email modal
    const onConfirmUpdateEmail = () => {
        toggleEmailModalVisibility(); // set modal to not visible
        reauthenticate(password).then(async () => {
            if (newEmail === confirmNewEmail) { // check if emails match
                var user = firebase.auth().currentUser;
                await user.updateEmail(newEmail).then(() => { // update email for user, then update in firebase
                    firebase
                        .firestore()
                        .collection('users')
                        .doc(user.uid)
                        .update({
                            email: newEmail
                        })

                    Alert.alert('Email Updated');
                }).catch((error) => {
                    Alert.alert(error.message);
                });
            } else {
                Alert.alert('Emails don\'t match');
            }
        }).catch((error) => { // error trying to reauthenticate
            Alert.alert(error.message);
        });

        reload(1000);
    }

    // called when confirm button pressed in update password modal
    const onConfirmUpdatePassword = () => {
        togglePasswordModalVisibility(); // set modal to not visible
        reauthenticate(password).then(() => {
            if (newPassword === confirmNewPassword) { // check if passwords match
                var user = firebase.auth().currentUser;
                user.updatePassword(newPassword).then(() => { // update password for user
                    Alert.alert('Password Updated');
                }).catch((error) => {
                    Alert.alert(error.message);
                });
            } else {
                Alert.alert('New passwords don\'t match');
            }
        }).catch((error) => { // error trying to reauthenticate
            Alert.alert(error.message);
        });
    }

    // called when logout button pressed
    const onLogOutPress = () => {
        Alert.alert(
            'Log Out',
            null,
            [
                { text: 'Yes', onPress: () => logout() }, // log out when yes pressed
                { text: 'No'}
            ]
        )
    }

    // called when confrim button pressed in delete account modal
    const onConfirmDeletePress = () => {
        toggleDeleteModalVisibility(); // set modal to not visible
        reauthenticate(password).then(() => {
            Alert.alert(
                'Delete Account',
                null,
                [
                    { text: 'Yes', onPress: () => deleteAccount() }, // delete account when yes pressed
                    { text: 'No' }
                ]
            )
        }).catch((error) => { // error trying to reauthenticate
            Alert.alert(error.message);
        });
        setPassword('');
    }

    if (loading){
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <StatusBar backgroundColor={theme.background} barStyle={theme.statusBar}/>
                <ActivityIndicator size='large' color='#6646ee' />
            </View>
        );
    } else {
        return (
            <ScrollView style={styles(theme).container}>
                <StatusBar backgroundColor={theme.background} barStyle={theme.statusBar}/>
                <Text style={styles(theme).headerText}>MY ACCOUNT</Text>
                <Pressable onPress={() => onNamePress()} style={styles(theme).row}>
                    <Text style={styles(theme).descriptorText}>Name</Text>
                    <Text style={styles(theme).valueText}>{user.displayName}</Text>
                </Pressable>
                <Modal 
                    animationType="none"
                    transparent visible ={isNameModalVisible}
                    presentationStyle="overFullScreen"
                    onDismiss={toggleNameModalVisibility} >
                    <View style={styles(theme).viewWrapper}>
                        <View style={styles(theme).deleteModalContainer}>
                            <Text style={styles(theme).modalTitleText}>Update Name</Text>
                            <TextInput 
                                style={styles(theme).textInput}
                                placeholder={user.displayName}
                                value={name}
                                onChangeText={(value) => setName(value)}
                            />
                            <View style={styles(theme).modalButtonContainer}>
                                <TouchableHighlight 
                                    activeOpacity={0.95}
                                    underlayColor={'#919191'}
                                    onPress={toggleNameModalVisibility} 
                                    style={styles(theme).modalButton} >
                                    <Text style={styles(theme).modalButtonText}>CANCEL</Text>
                                </TouchableHighlight>
                                <TouchableHighlight 
                                    activeOpacity={0.95}
                                    underlayColor={'#919191'}
                                    onPress={onConfirmUpdateName} 
                                    style={styles(theme).modalButton} >
                                    <Text style={styles(theme).modalButtonText}>CONFIRM</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Pressable onPress={() => onEmailPress()} style={styles(theme).row}>
                    <Text style={styles(theme).descriptorText}>Email</Text>
                    <Text style={styles(theme).valueText}>{user.email}</Text>
                </Pressable>
                <Modal 
                    animationType="none"
                    transparent visible ={isEmailModalVisible}
                    presentationStyle="overFullScreen"
                    onDismiss={toggleEmailModalVisibility} >
                    <View style={styles(theme).viewWrapper}>
                        <View style={styles(theme).passwordModalContainer}>
                            <Text style={styles(theme).modalTitleText}>Update Email</Text>
                            <TextInput 
                                style={styles(theme).textInput}
                                placeholder="New email"
                                value={newEmail}
                                onChangeText={(value) => setNewEmail(value)}
                            />
                            <TextInput 
                                style={styles(theme).textInput}
                                placeholder="Confirm email"
                                value={confirmNewEmail}
                                onChangeText={(value) => setConfirmNewEmail(value)}
                            />
                            <TextInput 
                                style={styles(theme).textInput}
                                placeholder="Password"
                                secureTextEntry
                                value={password}
                                onChangeText={(value) => setPassword(value)}
                            />
                            <View style={styles(theme).modalButtonContainer}>
                                <TouchableHighlight 
                                    activeOpacity={0.95}
                                    underlayColor={'#919191'}
                                    onPress={toggleEmailModalVisibility} 
                                    style={styles(theme).modalButton} >
                                    <Text style={styles(theme).modalButtonText}>CANCEL</Text>
                                </TouchableHighlight>
                                <TouchableHighlight 
                                    activeOpacity={0.95}
                                    underlayColor={'#919191'}
                                    onPress={onConfirmUpdateEmail} 
                                    style={styles(theme).modalButton} >
                                    <Text style={styles(theme).modalButtonText}>CONFIRM</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Pressable onPress={() => onPasswordPress()} style={styles(theme).row}>
                    <Text style={styles(theme).descriptorText}>Password</Text>
                    <Text style={styles(theme).valueText}>********</Text>
                </Pressable>
                <Modal 
                    animationType="none"
                    transparent visible ={isPasswordModalVisible}
                    presentationStyle="overFullScreen"
                    onDismiss={togglePasswordModalVisibility} >
                    <View style={styles(theme).viewWrapper}>
                        <View style={styles(theme).passwordModalContainer}>
                            <Text style={styles(theme).modalTitleText}>Update Password</Text>
                            <TextInput 
                                style={styles(theme).textInput}
                                placeholder="Current password"
                                secureTextEntry
                                value={password}
                                onChangeText={(value) => setPassword(value)}
                            />
                            <TextInput 
                                style={styles(theme).textInput}
                                placeholder="New password"
                                secureTextEntry
                                value={newPassword}
                                onChangeText={(value) => setNewPassword(value)}
                            />
                            <TextInput 
                                style={styles(theme).textInput}
                                placeholder="Confirm password"
                                secureTextEntry
                                value={confirmNewPassword}
                                onChangeText={(value) => setConfirmNewPassword(value)}
                            />
                            <View style={styles(theme).modalButtonContainer}>
                                <TouchableHighlight 
                                    activeOpacity={0.95}
                                    underlayColor={'#919191'}
                                    onPress={togglePasswordModalVisibility} 
                                    style={styles(theme).modalButton} >
                                    <Text style={styles(theme).modalButtonText}>CANCEL</Text>
                                </TouchableHighlight>
                                <TouchableHighlight 
                                    activeOpacity={0.95}
                                    underlayColor={'#919191'}
                                    onPress={onConfirmUpdatePassword} 
                                    style={styles(theme).modalButton} >
                                    <Text style={styles(theme).modalButtonText}>CONFIRM</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Text style={styles(theme).headerText}>CHATBOT SETTINGS</Text>
                <View style={styles(theme).row}>
                    <Text style={styles(theme).descriptorText}>Save Message History</Text>
                    <Switch 
                        trackColor={{ false: "#ff4f64", true: "#62e046" }}
                        thumbColor={saveMessageHistory ? "#ededed" : "#ededed"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSaveMessageHistorySwitch}
                        value={saveMessageHistory}
                    />
                </View>
                <Text style={styles(theme).headerText}>APP SETTINGS</Text>
                <View style={styles(theme).row}>
                    <Text style={styles(theme).descriptorText}>Theme Color</Text>
                    <View style={{ flexDirection: "row", padding: 0 }}>
                        {colorOptions.map((x, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles(theme).circle, { backgroundColor: colorOptions[index] }]}
                                onPress={() => { 
                                    updateTheme(themes[index]);
                                    setReloadChat(true); 
                                }}
                            />
                        ))}
                    </View>
                </View>
                <View style={styles(theme).row}>
                    <Text style={styles(theme).descriptorText}>Font Size</Text>
                    <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}> 
                        <Text style={styles(theme).smallText}>Small</Text>
                        <Text style={styles(theme).mediumText}>Medium</Text>
                        <Text style={styles(theme).largeText}>Large</Text>
                    </View>
                </View>
                <Text style={styles(theme).headerText}>ACCOUNT SETTINGS</Text>
                <Pressable onPress={() => onLogOutPress()} style={styles(theme).row2}>
                    <Text style={styles(theme).descriptorText}>Log Out</Text>
                </Pressable>
                <Pressable onPress={() => onDeletePress()} style={styles(theme).row3}>
                    <Text style={styles(theme).descriptorText}>Delete Account</Text>
                </Pressable>
                <Modal 
                    animationType="none"
                    transparent visible ={isDeleteModalVisible}
                    presentationStyle="overFullScreen"
                    onDismiss={toggleDeleteModalVisibility} >
                    <View style={styles(theme).viewWrapper}>
                        <View style={styles(theme).deleteModalContainer}>
                            <Text style={styles(theme).modalTitleText}>Confirm Account Deletion</Text>
                            <TextInput 
                                style={styles(theme).textInput}
                                placeholder="Enter password"
                                secureTextEntry
                                value={password}
                                onChangeText={(value) => setPassword(value)}
                            />
                            <View style={styles(theme).modalButtonContainer}>
                                <TouchableHighlight 
                                    activeOpacity={0.95}
                                    underlayColor={'#919191'}
                                    onPress={toggleDeleteModalVisibility} 
                                    style={styles(theme).modalButton} >
                                    <Text style={styles(theme).modalButtonText}>CANCEL</Text>
                                </TouchableHighlight>
                                <TouchableHighlight 
                                    activeOpacity={0.95}
                                    underlayColor={'#919191'}
                                    onPress={onConfirmDeletePress} 
                                    style={styles(theme).modalButton} >
                                    <Text style={styles(theme).modalButtonText}>CONFIRM</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        )
    }
}

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background
    },
    headerText: {
        fontSize: 12,
        color: theme.tertiary,
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 5,
    },
    row: {
        height: 55,
        backgroundColor: theme.primary,
        borderWidth: 0.5,
        borderColor: theme.background,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    row2: {
        height: 55,
        backgroundColor: theme.primary,
        borderWidth: 0.5,
        borderColor: theme.background,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    row3: {
        height: 55,
        backgroundColor: theme.primary,
        borderWidth: 0.5,
        borderColor: theme.background,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginBottom: 40
    },
    descriptorText: {
        fontSize: 16,
        color: theme.font,
    },
    valueText: {
        fontSize: 16,
        color: theme.font
    },
    smallText: {
        fontSize: 12,
        color: theme.font,
        marginHorizontal: 10
    },
    mediumText: {
        fontSize: 16,
        color: theme.font,
        marginHorizontal: 10
    },
    largeText: {
        fontSize: 20,
        color: theme.font,
        marginHorizontal: 10
    },
    viewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    passwordModalContainer: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "35%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) }, 
                    { translateY: -90 }],
        height: 320,
        width: width * 0.8,
        backgroundColor: "#fff",
        borderRadius: 7,
    },
    deleteModalContainer: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "40%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) }, 
                    { translateY: -90 }],
        height: 220,
        width: width * 0.8,
        backgroundColor: "#fff",
        borderRadius: 7,
    },
    modalTitleText: {
        color: '#666666',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    textInput: {
        width: "80%",
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        marginBottom: 8,
    },
    modalButtonContainer: {
        flexDirection: 'row',
    },  
    modalButton: {
        width: 100,
        height: 40,
        marginTop: 20,
        marginHorizontal: 10,
        backgroundColor: '#666666',
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    modalButtonText: {
        fontWeight: 'bold',
        color: 'white',
    },

    circle: {
        width: 24,
        height: 24,
        borderRadius: 24 / 2,
        backgroundColor: "red",
        borderColor: "white",
        borderWidth: 1,
        marginLeft: 5,
        marginRight: 5,
    },
})
