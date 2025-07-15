// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC_T-qJsXq7uxHwzHIWUkf6nL08-BROt1s",
  authDomain: "whats-8828b.firebaseapp.com",
  databaseURL: "https://whats-8828b.firebaseio.com",
  projectId: "whats-8828b",
  storageBucket: "whats-8828b.firebasestorage.app",
  messagingSenderId: "337163129787",
  appId: "1:337163129787:web:aab0a51473ee7ec6e76a9e",
  measurementId: "G-DTVWMJWKNB"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
