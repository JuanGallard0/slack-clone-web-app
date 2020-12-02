import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAEDx3yJbG5CoRjRBrKuCxwpCXBaqApjto",
    authDomain: "chat-app-a0dab.firebaseapp.com",
    databaseURL: "https://chat-app-a0dab.firebaseio.com",
    projectId: "chat-app-a0dab",
    storageBucket: "chat-app-a0dab.appspot.com",
    messagingSenderId: "668709680229",
    appId: "1:668709680229:web:e8d6b47cd21251e2d8028c",
    measurementId: "G-8VC2NME2CW",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
