// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase
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

// Check if `window` is defined to ensure code only runs on the client side
let analytics;
if (typeof window !== "undefined") {
  // Firebase Analytics is only initialized in the client-side environment
  const { getAnalytics } = require("firebase/analytics");
  analytics = getAnalytics(app);
}

export const storage = getStorage(app);
export { analytics }; // You can now use analytics safely in your client-side code
