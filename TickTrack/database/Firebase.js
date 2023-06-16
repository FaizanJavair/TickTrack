// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDz3MPyZbTKrGf2gVhSM2Q2vyjQtHr-GCQ",
  authDomain: "ticktrack-94826.firebaseapp.com",
  projectId: "ticktrack-94826",
  storageBucket: "ticktrack-94826.appspot.com",
  messagingSenderId: "1005483212838",
  appId: "1:1005483212838:web:2938450c0dbc87c1d2e6e7",
  measurementId: "G-6J9NTYT265",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
