import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {get, getDatabase} from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyCzqE60--_MYmqFisNQQw7sz11NyoFXMPA",
  authDomain: "cmmc-clue-less.firebaseapp.com",
  databaseURL: "https://cmmc-clue-less-default-rtdb.firebaseio.com",
  projectId: "cmmc-clue-less",
  storageBucket: "cmmc-clue-less.appspot.com",
  messagingSenderId: "444659808409",
  appId: "1:444659808409:web:7cc53b62815173665f2008"
};
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getDatabase(app)