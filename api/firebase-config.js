// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtf-poWA-MYU9gdyt25pNTqbfy3oRtdak",
  authDomain: "personalized-learning-560ad.firebaseapp.com",
  projectId: "personalized-learning-560ad",
  storageBucket: "personalized-learning-560ad.appspot.com",
  messagingSenderId: "1020673841997",
  appId: "1:1020673841997:web:b38ca1c9619eadcf37b504",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
