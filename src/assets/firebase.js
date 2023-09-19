// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJhBNWYZ2R5DtENJ9yMZceDs0v78RbCys",
  authDomain: "culinary-oasis.firebaseapp.com",
  databaseURL: "https://culinary-oasis-default-rtdb.firebaseio.com",
  projectId: "culinary-oasis",
  storageBucket: "culinary-oasis.appspot.com",
  messagingSenderId: "762818705546",
  appId: "1:762818705546:web:4c4f5edc794a1e76a3d573",
  measurementId: "G-GNWMBLF8RW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const database = getDatabase(app);
export const auth = getAuth(app);
