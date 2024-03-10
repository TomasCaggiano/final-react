// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBolC7ddDbY-e2O8pv1tX4V_vWs6BBGCM",
  authDomain: "proyectofinalreact-3f8e6.firebaseapp.com",
  projectId: "proyectofinalreact-3f8e6",
  storageBucket: "proyectofinalreact-3f8e6.appspot.com",
  messagingSenderId: "568599156024",
  appId: "1:568599156024:web:3701159a02b368d82c9dcd",
  measurementId: "G-53RTM8T5DC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);