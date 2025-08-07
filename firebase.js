import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5_uYDR8gjXyymalLaVsg9sAt31pNudNA",
  authDomain: "event-organizer-89d81.firebaseapp.com",
  projectId: "event-organizer-89d81",
  storageBucket: "event-organizer-89d81.firebasestorage.app",
  messagingSenderId: "658049344652",
  appId: "1:658049344652:web:9b00fdf1e77f86bfd287a9"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
