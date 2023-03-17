import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKey,
  authDomain: "cmmc-clue-less.firebaseapp.com",
  databaseURL: "https://cmmc-clue-less-default-rtdb.firebaseio.com",
  projectId: "cmmc-clue-less",
  storageBucket: "cmmc-clue-less.appspot.com",
  messagingSenderId: "444659808409",
  appId: process.env.REACT_APP_APPID
};
const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)