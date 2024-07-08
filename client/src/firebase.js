// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "thai-rest-2024.firebaseapp.com",
  projectId: "thai-rest-2024",
  storageBucket: "thai-rest-2024.appspot.com",
  messagingSenderId: "312318537695",
  appId: "1:312318537695:web:c66e3c21a11b83f72a5e6a",
  measurementId: "G-29RCSDTSZE",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
