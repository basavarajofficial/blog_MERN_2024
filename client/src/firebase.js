
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "tech-blogs-d41bd.firebaseapp.com",
  projectId: "tech-blogs-d41bd",
  storageBucket: "tech-blogs-d41bd.appspot.com",
  messagingSenderId: "525225955965",
  appId: "1:525225955965:web:0c95db4d451e1a0a98d714"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);