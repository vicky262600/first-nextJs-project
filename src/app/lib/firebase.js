// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDteWcV41veaPPONLz97KcMY_2M1IKKB-s",
  authDomain: "redux-posts-d11c6.firebaseapp.com",
  projectId: "redux-posts-d11c6",
  storageBucket: "redux-posts-d11c6.appspot.com",
  messagingSenderId: "947689171405",
  appId: "1:947689171405:web:e4909d5c554309ee577c84",
  measurementId: "G-SX0RJ59EXL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);