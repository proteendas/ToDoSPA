// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJdXwKybRgQtInz1wdyNyaU4rYbKsR4lI",
  authDomain: "todo-spa-c33c4.firebaseapp.com",
  projectId: "todo-spa-c33c4",
  storageBucket: "todo-spa-c33c4.appspot.com",
  messagingSenderId: "906843865922",
  appId: "1:906843865922:web:fcc800c4c4a8123f1b7edb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);
export { db };
