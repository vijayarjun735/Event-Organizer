import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyD5_uYDR8gjXyymalLaVsg9sAt31pNudNA",
  authDomain: "event-organizer-89d81.firebaseapp.com",
  projectId: "event-organizer-89d81",
  storageBucket: "event-organizer-89d81.firebasestorage.app",
  messagingSenderId: "658049344652",
  appId: "1:658049344652:web:9b00fdf1e77f86bfd287a9"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore(app);

export { auth, db };


