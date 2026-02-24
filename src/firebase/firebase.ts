import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import type { FirebaseApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCNx6pfG5fZFXUZ7mpv7a-MnlOnzrAmxAw",
  authDomain: "automatic-fish-feeder-b8234.firebaseapp.com",
  databaseURL: "https://automatic-fish-feeder-b8234-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "automatic-fish-feeder-b8234",
  storageBucket: "automatic-fish-feeder-b8234.firebasestorage.app",
  messagingSenderId: "604112999492",
  appId: "1:604112999492:web:3d8d18866d965424721811"
};

// init firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
// init database
export const db = getDatabase(app);
