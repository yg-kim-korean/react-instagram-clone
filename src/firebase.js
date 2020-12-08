import firebase from 'firebase';
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDbZd9LEgX7wA7GE93XBSBnXIuEiCtWztQ",
    authDomain: "react-instagram-clone-5e019.firebaseapp.com",
    databaseURL: "https://react-instagram-clone-5e019-default-rtdb.firebaseio.com",
    projectId: "react-instagram-clone-5e019",
    storageBucket: "react-instagram-clone-5e019.appspot.com",
    messagingSenderId: "838016168315",
    appId: "1:838016168315:web:c007d75e585d21f7950dde",
    measurementId: "G-FME3C109K9"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db,auth,storage};