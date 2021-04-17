import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC40Hl4ARN43txaclwhEWT2MouUof7ypgY",
  authDomain: "instagram-8928a.firebaseapp.com",
  projectId: "instagram-8928a",
  storageBucket: "instagram-8928a.appspot.com",
  messagingSenderId: "117417708342",
  appId: "1:117417708342:web:58d8a428a56c93e128c197",
  measurementId: "G-1NHZVTTGKY",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = firebase.firestore();
const fs = firebase.firestore;
const auth = firebase.auth();
//const storage = firebase.storage();

export { db, auth, fs };
