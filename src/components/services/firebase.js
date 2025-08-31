// services/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsC8rAsXxH7MGoxu0Mu1njeQppIteCLWE",
  authDomain: "rowastudio-5b8d9.firebaseapp.com",
  projectId: "rowastudio-5b8d9",
  storageBucket: "rowastudio-5b8d9.firebasestorage.app",
  messagingSenderId: "501691143768",
  appId: "1:501691143768:web:1fc8edb5e26922abe4dc2d",
  measurementId: "G-KYBVP3NPQL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app); 