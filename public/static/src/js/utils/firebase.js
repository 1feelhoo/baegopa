const firebaseConfig = {
    apiKey: "AIzaSyBQ0NC98EtjQhgrp46T2q4sF_opPJR6gxo",
    authDomain: "baegopa-22613.firebaseapp.com",
    projectId: "baegopa-22613",
    storageBucket: "baegopa-22613.appspot.com",
    messagingSenderId: "688807257519",
    appId: "1:688807257519:web:682e4a9f7491d981a1fb5a",
    measurementId: "G-6VJVB8PTR2"
};

firebase.initializeApp(firebaseConfig);
const firebaseInstance = firebase;
const authService = firebase.auth();
const dbService = firebase.firestore();
export {firebaseInstance, authService, dbService};
