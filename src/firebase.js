// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Use environment variables from .env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// ========================
// Example Firebase functions
// ========================

// Login with Google
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (err) {
    console.error("Login failed:", err);
    alert("Login failed! Check console for details.");
  }
};

// Save an estimate
export const saveEstimate = async (userId, estimateData) => {
  try {
    await addDoc(collection(db, "users", userId, "estimates"), estimateData);
    alert("Estimate saved successfully!");
  } catch (err) {
    console.error("Error saving estimate:", err);
    alert("Failed to save estimate!");
  }
};

// Fetch all estimates for a user
export const fetchEstimates = async (userId) => {
  try {
    const snapshot = await getDocs(collection(db, "users", userId, "estimates"));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("Error fetching estimates:", err);
    alert("Failed to fetch estimates!");
    return [];
  }
};
