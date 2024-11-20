import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBW8FNFlYSqb8byvX4RyxC8iPA5sec1kUU",
  authDomain: "checkinsapp-c3b2e.firebaseapp.com",
  projectId: "checkinsapp-c3b2e",
  storageBucket: "checkinsapp-c3b2e.appspot.com",
  messagingSenderId: "107546757583",
  appId: "1:107546757583:web:d37a7c35ff5b3897e82aba",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
