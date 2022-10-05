
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyADKA4ch1-eso2uDe-J0GkFBCab_XhXuRc",
  authDomain: "chat-e7817.firebaseapp.com",
  projectId: "chat-e7817",
  storageBucket: "chat-e7817.appspot.com",
  messagingSenderId: "77154326603",
  appId: "1:77154326603:web:75965b6b26d7b5b7db55ce"
};


export const app = initializeApp(firebaseConfig);
export const auth  = getAuth()
export const storage = getStorage();
export const db = getFirestore();