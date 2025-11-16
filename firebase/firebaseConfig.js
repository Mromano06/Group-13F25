// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfGfwBb4yh4SLpO3P6qj91jvIH_cguuK4",
  authDomain: "triptracker-de4db.firebaseapp.com",
  databaseURL: "https://triptracker-de4db-default-rtdb.firebaseio.com",
  projectId: "triptracker-de4db",
  storageBucket: "triptracker-de4db.firebasestorage.app",
  messagingSenderId: "942281935168",
  appId: "1:942281935168:web:ed5fc785342070daaed2a5",
  measurementId: "G-ZVNRG4WH6R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);  

export { auth };
export { database };