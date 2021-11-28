// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtb4Bd89pkTHv42-l81beqthXrnjLlJi0",
  authDomain: "query-app-c9e7b.firebaseapp.com",
  projectId: "query-app-c9e7b",
  storageBucket: "query-app-c9e7b.appspot.com",
  messagingSenderId: "718748677768",
  appId: "1:718748677768:web:d4b5a558ba0b6081d8913d",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

const storage = getStorage();

export { app, db, storage };
