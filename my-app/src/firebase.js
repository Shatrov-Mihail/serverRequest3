
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyAtOcyIlgsDjnQOo_S3yv_fhx3ivkOlw_I",
  authDomain: "listcase-7ecfa.firebaseapp.com",
  projectId: "listcase-7ecfa",
  storageBucket: "listcase-7ecfa.appspot.com",
  messagingSenderId: "401379356269",
  appId: "1:401379356269:web:22c673d2e00bf0a3579964",
  databaseURL: `https://listcase-7ecfa-default-rtdb.europe-west1.firebasedatabase.app/`
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app)