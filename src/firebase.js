import firebase from 'firebase';
const firebaseApp = firebase.initializeApp({
    //input your firebase config
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db,auth,storage};