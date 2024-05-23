// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzNGJuXUFF9z3QjD5s9cP3U2YuUiaji2o",
  authDomain: "task10k.firebaseapp.com",
  projectId: "task10k",
  storageBucket: "task10k.appspot.com",
  messagingSenderId: "1073164277187",
  databaseURL: "https://task10k-default-rtdb.firebaseio.com/",
  appId: "1:1073164277187:web:331d36e6b7e5e539b39976"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getDatabase(app);