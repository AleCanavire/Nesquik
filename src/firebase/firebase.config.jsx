// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCEE-yj0OB7C9L_5nKVh78-nOs30IKNLCc",
  authDomain: "nesquik-726d3.firebaseapp.com",
  projectId: "nesquik-726d3",
  storageBucket: "nesquik-726d3.appspot.com",
  messagingSenderId: "6313946854",
  appId: "1:6313946854:web:06836524b5e83670155527"
};

const app = initializeApp(firebaseConfig);

export const DB = getFirestore(app);
export const auth = getAuth(app);