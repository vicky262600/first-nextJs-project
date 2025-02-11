// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics"; // Import analytics directly

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDteWcV41veaPPONLz97KcMY_2M1IKKB-s",
  authDomain: "redux-posts-d11c6.firebaseapp.com",
  projectId: "redux-posts-d11c6",
  storageBucket: "redux-posts-d11c6.appspot.com",
  messagingSenderId: "947689171405",
  appId: "1:947689171405:web:e4909d5c554309ee577c84",
  measurementId: "G-SX0RJ59EXL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

// Ensure Analytics only runs on the client side
let analytics = null;
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app); // Ensure proper initialization
  } catch (error) {
    console.error("Firebase Analytics initialization failed:", error);
  }
}

export { app, analytics };
