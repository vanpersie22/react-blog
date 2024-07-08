// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "react-blog-48a85.firebaseapp.com",
  projectId: "react-blog-48a85",
  storageBucket: "react-blog-48a85.appspot.com",
  messagingSenderId: "36264221211",
  appId: "1:36264221211:web:98d48ef5b56b6999cdb6be"
};

// Initialize Firebase 
export const app = initializeApp(firebaseConfig);