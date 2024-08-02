// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

  const firebaseConfig = {
    apiKey: "AIzaSyDGmazxLF4fpRzyAWh7ylGCjHK2modr9hE",
    authDomain: "orientalramirez-a8745.firebaseapp.com",
    projectId: "orientalramirez-a8745",
    storageBucket: "orientalramirez-a8745.appspot.com",
    messagingSenderId: "277605846090",
    appId: "1:277605846090:web:e789180ca4008f38e3eab3",
    measurementId: "G-KE61W0F9HS"
  };

// Initialize Firebase

initializeApp(firebaseConfig);

export const database = getFirestore();

export const FIREBASE_APP = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
