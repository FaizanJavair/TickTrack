// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
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
  measurementId: "G-6J9NTYT265"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export {auth}