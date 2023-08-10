// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import "firebase/firestore"
import { initializeApp } from "firebase/app";
import "firebase/compat/firestore"
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAY6haOo2M355cUDBRibKAg1MakgsCMras",
  authDomain: "carsoldb.firebaseapp.com",
  projectId: "carsoldb",
  storageBucket: "carsoldb.appspot.com",
  messagingSenderId: "796080136603",
  appId: "1:796080136603:web:e16e14b23c569d3381413e"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} 

const db = getFirestore();
const database = firebase.firestore();
const auth = getAuth();

export { auth, db, database, firebase };
