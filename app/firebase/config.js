import * as firebase from 'firebase';
import '@firebase/auth'
import '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBLo3MIDiCutOt63VqJNkEMgLbI71gxBDE",
  authDomain: "chatapp-6a550.firebaseapp.com",
  databaseURL: "https://chatapp-6a550-default-rtdb.firebaseio.com",
  projectId: "chatapp-6a550",
  storageBucket: "chatapp-6a550.appspot.com",
  messagingSenderId: "432038414833",
  appId: "1:432038414833:web:6a8228bf2fd1f997219c50"
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

export { firebase }