// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyColdfMxBX5QlAU3o-jrojN99x2v5oJYC0",
  authDomain: "trip-planner-5a52f.firebaseapp.com",
  projectId: "trip-planner-5a52f",
  storageBucket: "trip-planner-5a52f.appspot.com",
  messagingSenderId: "487781692185",
  appId: "1:487781692185:web:122f28a96f336dc5ad4b88",
  measurementId: "G-07KEJ3Y3HP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;