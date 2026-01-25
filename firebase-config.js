// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmhNC1TNx-3LENK3o9NQna_aBLyV9PkIc",
  authDomain: "fir-9121d.firebaseapp.com",
  projectId: "fir-9121d",
  storageBucket: "fir-9121d.firebasestorage.app",
  messagingSenderId: "25847036333",
  appId: "1:25847036333:web:c0aeb37602cb2940fa0924"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get references
const db = firebase.firestore();
const auth = firebase.auth();

console.log("[v0] Firebase initialized successfully");
