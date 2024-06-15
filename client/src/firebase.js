// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJtvXUcyHNtSYo100FQ9ilW_lPUY1DjP0",
  authDomain: "quiz-app-b1448.firebaseapp.com",
  projectId: "quiz-app-b1448",
  storageBucket: "quiz-app-b1448.appspot.com",
  messagingSenderId: "158074202280",
  appId: "1:158074202280:web:97c4f1640fc61e581d7a9d",
  measurementId: "G-B127TVKFJX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);