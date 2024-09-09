// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBx8bpwKL9ySY_R8zyhT0Td7Fl0xwoM7Tk",
  authDomain: "todo-list-370dd.firebaseapp.com",
  projectId: "todo-list-370dd",
  storageBucket: "todo-list-370dd.appspot.com",
  messagingSenderId: "522786763490",
  appId: "1:522786763490:web:8dec2ed8e7abbfc6d264bb",
  measurementId: "G-7QLSWD3MWC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
