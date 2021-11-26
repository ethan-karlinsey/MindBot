import * as firebase from 'firebase';
import '@firebase/auth'
import '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCLibki2gMsaJ12iRseyppjfx716FEyjp4",
    authDomain: "mindbot-f5dee.firebaseapp.com",
    projectId: "mindbot-f5dee",
    storageBucket: "mindbot-f5dee.appspot.com",
    messagingSenderId: "878029594210",
    appId: "1:878029594210:web:262a7544fac8eaed433b3b",
    measurementId: "G-RFY3TNS3M4",
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

export { firebase }
