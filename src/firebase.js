// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfV2fBCuLDNnKI60nVGQOsXnP7QsTsQC8",
  authDomain: "she-fund.firebaseapp.com",
  projectId: "she-fund",
  storageBucket: "she-fund.firebasestorage.app",
  messagingSenderId: "423633410327",
  appId: "1:423633410327:web:95be99a3257c7f10083f52",
  measurementId: "G-LE5R1HESRN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
