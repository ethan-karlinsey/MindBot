import React, { useContext, useState } from 'react';
import { ActivityIndicator, StyleSheet, TouchableHighlight, Text, Modal, TextInput, View, Alert, Dimensions, Switch, Pressable } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { firebase } from '../firebase/config';

const { width } = Dimensions.get("window");

export default function SettingsScreen({ navigation }) {
    const { user, logout, deleteAccount } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [confirmNewEmail, setConfirmNewEmail] = useState('');
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
    const [isEmailModalVisible, setEmailModalVisisble] = useState(false);
    const [isNameModalVisible, setNameModalVisible] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const reauthenticate = (password) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, password);
        return user.reauthenticateWithCredential(cred);
    }

    const reload = async (time) => {
        setLoading(true)
        await setTimeout(() => {
            setLoading(false);
        }, time);
        setNameModalVisible(false);
        setEmailModalVisisble(false);
        setPasswordModalVisible(false);
        setDeleteModalVisible(false);
    }

    const toggleNameModalVisibility = () => {
        setNameModalVisible(!isNameModalVisible);
        setName('');
    }

    const toggleEmailModalVisibility = () => {
        setEmailModalVisisble(!isEmailModalVisible);
        setNewEmail('');
        setConfirmNewEmail('');
    }

    const togglePasswordModalVisibility = () => {
        setPasswordModalVisible(!isPasswordModalVisible);
        setPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    }

    const toggleDeleteModalVisibility = () => {
        setDeleteModalVisible(!isDeleteModalVisible);
        setPassword('');
    }

    const onNamePress = () => {
        toggleNameModalVisibility();
    }

    const onEmailPress = () => {
        toggleEmailModalVisibility();
    }

    const onPasswordPress = () => {
        togglePasswordModalVisibility();
    }

    const onDeletePress = () => {
       toggleDeleteModalVisibility();
    }

    const onConfirmUpdateName = async () => {
        toggleNameModalVisibility();
        var user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
        }).then(() => {
            Alert.alert('Name Updated');
        }).catch((error) => {
            Alert.alert(error.message);
        })

        reload(1000);
    }

    const onConfirmUpdateEmail = () => {
        toggleEmailModalVisibility();
        reauthenticate(password).then(async () => {
            if (newEmail === confirmNewEmail) {
                var user = firebase.auth().currentUser;
                await user.updateEmail(newEmail).then(() => {
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
        }).catch((error) => {
            Alert.alert(error.message);
        });

        reload(1000);
    }

    const onConfirmUpdatePassword = () => {
        togglePasswordModalVisibility();
        reauthenticate(password).then(() => {
            if (newPassword === confirmNewPassword) {
                var user = firebase.auth().currentUser;
                user.updatePassword(newPassword).then(() => {
                    Alert.alert('Password Updated');
                }).catch((error) => {
                    Alert.alert(error.message);
                });
            } else {
                Alert.alert('New passwords don\'t match');
            }
        }).catch((error) => {
            Alert.alert(error.message);
        });
    }

    const onLogOutPress = () => {
        Alert.alert(
            'Log Out',
            null,
            [
                { text: 'Yes', onPress: () => logout() },
                { text: 'No'}
            ]
        )
    }

    const onConfirmDeletePress = () => {
        toggleDeleteModalVisibility();
        reauthenticate(password).then(() => {
            Alert.alert(
                'Delete Account',
                null,
                [
                    { text: 'Yes', onPress: () => deleteAccount() },
                    { text: 'No' }
                ]
            )
        }).catch((error) => {
            Alert.alert(error.message);
        });
        setPassword('');
    }

    //console.log(user);

    if (loading){
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <ActivityIndicator size='large' color='#6646ee' />
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>MY ACCOUNT</Text>
                <Pressable onPress={() => onNamePress()} style={styles.row}>
                    <Text style={styles.descriptorText}>Name</Text>
                    <Text style={styles.valueText}>{user.displayName}</Text>
                </Pressable>
                <Modal 
                    animationType="none"
                    transparent visible ={isNameModalVisible}
                    presentationStyle="overFullScreen"
                    onDismiss={toggleNameModalVisibility} >
                    <View style={styles.viewWrapper}>
                        <View style={styles.deleteModalContainer}>
                            <Text style={styles.modalTitleText}>Update Name</Text>
                            <TextInput 
                                style={styles.textInput}
                                placeholder={user.displayName}
                                value={name}
                                onChangeText={(value) => setName(value)}
                            />
                            <View style={styles.modalButtonContainer}>
                                <TouchableHighlight 
                                    activeOpacity={0.95}
                                    underlayColor={'#919191'}
                                    onPress={toggleNameModalVisibility} 
                                    style={styles.modalButton} >
                                    <Text style={styles.modalButtonText}>CANCEL</Text>
                                </TouchableHighlight>
                                <TouchableHighlight 
                                    activeOpacity={0.95}
                                    underlayColor={'#919191'}
                                    onPress={onConfirmUpdateName} 
                                    style={styles.modalButton} >
                                    <Text style={styles.modalButtonText}>CONFIRM</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Pressable onPress={() => onEmailPress()} style={styles.row}>
                    <Text style={styles.descriptorText}>Email</Text>
                    <Text style={styles.valueText}>{user.email}</Text>
                </Pressable>
                <Modal 
                    animationType="none"
                    transparent visible ={isEmailModalVisible}
                    presentationStyle="overFullScreen"
                    onDismiss={toggleEmailModalVisibility} >
                    <View style={styles.viewWrapper}>
                        <View style={styles.passwordModalContainer}>
                            <Text style={styles.modalTitleText}>Update Email</Text>
                            <TextInput 
                                style={styles.textInput}
                                placeholder="New email"
                                value={newEmail}
                                onChangeText={(value) => setNewEmail(value)}
                            />
                            <TextInput 
                                style={styles.textInput}
                                placeholder="Confirm email"
                                value={confirmNewEmail}
                                onChangeText={(value) => setConfirmNewEmail(value)}
                            />
                            <TextInput 
                                style={styles.textInput}
                                placeholder="Password"
                                secureTextEntry
                                value={password}
                                onChangeText={(value) => setPassword(value)}
                            />
                            <View style={styles.modalButtonContainer}>
                                <TouchableHighlight 
                                    activeOpacity={0.95}
                                    underlayColor={'#919191'}
                                    onPress={toggleEmailModalVisibility} 
                                    style={styles.modalButton} >
                                    <Text style={styles.modalButtonText}>CANCEL</Text>
                                </TouchableHighlight>
                                <TouchableHighlight 
                                    activeOpacity={0.95}
                                    underlayColor={'#919191'}
                                    onPress={onConfirmUpdateEmail} 
                                    style={styles.modalButton} >
                                    <Text style={styles.modalButtonText}>CONFIRM</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Pressable onPress={() => onPasswordPress()} style={styles.row}>
                    <Text style={styles.descriptorText}>Password</Text>
                    <Text style={styles.valueText}>********</Text>
                </Pressable>
                <Modal 
                    animationType="none"
                    transparent visible ={isPasswordModalVisible}
                    presentationStyle="overFullScreen"
                    onDismiss={togglePasswordModalVisibility} >
                    <View style={styles.viewWrapper}>
                        <View style={styles.passwordModalContainer}>
                            <Text style={styles.modalTitleText}>Update Password</Text>
                            <TextInput 
                                style={styles.textInput}
                                placeholder="Current password"
                                secureTextEntry
                                value={password}
                                onChangeText={(value) => setPassword(value)}
                            />
                            <TextInput 
                                style={styles.textInput}
                                placeholder="New password"
                                secureTextEntry
                                value={newPassword}
                                onChangeText={(value) => setNewPassword(value)}
                            />
                            <TextInput 
                                style={styles.textInput}
                                placeholder="Confirm password"
                                secureTextEntry
                                value={confirmNewPassword}
                                onChangeText={(value) => setConfirmNewPassword(value)}
                            />
                            <View style={styles.modalButtonContainer}>
                                <TouchableHighlight 
                                    activeOpacity={0.95}
                                    underlayColor={'#919191'}
                                    onPress={togglePasswordModalVisibility} 
                                    style={styles.modalButton} >
                                    <Text style={styles.modalButtonText}>CANCEL</Text>
                                </TouchableHighlight>
                                <TouchableHighlight 
                                    activeOpacity={0.95}
                                    underlayColor={'#919191'}
                                    onPress={onConfirmUpdatePassword} 
                                    style={styles.modalButton} >
                                    <Text style={styles.modalButtonText}>CONFIRM</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Text style={styles.headerText}>CHATBOT SETTINGS</Text>
                <View style={styles.row}>
                    <Text style={styles.descriptorText}>Save Message History</Text>
                    <Switch 
                        trackColor={{ false: "#ff4f64", true: "#62e046" }}
                        thumbColor={isEnabled ? "#ededed" : "#ededed"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <Text style={styles.headerText}>ACCOUNT SETTINGS</Text>
                <Pressable onPress={() => onLogOutPress()} style={styles.row2}>
                    <Text style={styles.descriptorText}>Log Out</Text>
                </Pressable>
                <Pressable onPress={() => onDeletePress()} style={styles.row2}>
                    <Text style={styles.descriptorText}>Delete Account</Text>
                </Pressable>
                <Modal 
                    animationType="none"
                    transparent visible ={isDeleteModalVisible}
                    presentationStyle="overFullScreen"
                    onDismiss={toggleDeleteModalVisibility} >
                    <View style={styles.viewWrapper}>
                        <View style={styles.deleteModalContainer}>
                            <Text style={styles.modalTitleText}>Confirm Account Deletion</Text>
                            <TextInput 
                                style={styles.textInput}
                                placeholder="Enter password"
                                secureTextEntry
                                value={password}
                                onChangeText={(value) => setPassword(value)}
                            />
                            <View style={styles.modalButtonContainer}>
                                <TouchableHighlight 
                                    activeOpacity={0.95}
                                    underlayColor={'#919191'}
                                    onPress={toggleDeleteModalVisibility} 
                                    style={styles.modalButton} >
                                    <Text style={styles.modalButtonText}>CANCEL</Text>
                                </TouchableHighlight>
                                <TouchableHighlight 
                                    activeOpacity={0.95}
                                    underlayColor={'#919191'}
                                    onPress={onConfirmDeletePress} 
                                    style={styles.modalButton} >
                                    <Text style={styles.modalButtonText}>CONFIRM</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebebeb'
    },
    headerText: {
        fontSize: 12,
        color: "#666666",
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 5,
    },
    row: {
        height: 55,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: '#e3e3e3',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    row2: {
        height: 55,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: '#e3e3e3',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    descriptorText: {
        fontSize: 16,
    },
    valueText: {
        fontSize: 16,
        color: '#8c8c8c'
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
    }
})
