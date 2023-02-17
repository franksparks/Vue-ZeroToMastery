import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCS_Ziq8ADbxshDyW1_LmpnT2B84vk05Oo",
  authDomain: "music-8d9ff.firebaseapp.com",
  projectId: "music-8d9ff",
  storageBucket: "music-8d9ff.appspot.com",
  appId: "1:815933073368:web:40fcccad4c9ae57694f4ad",
  measurementId: "G-VPMF55LE59",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

db.enablePersistence().catch((error) => {
  console.log(`Firebase persistence error ${error.code}`);
});

const usersCollection = db.collection("users");
const songsCollection = db.collection("songs");
const commentsCollection = db.collection("comments");

export {
  auth,
  db,
  storage,
  usersCollection,
  songsCollection,
  commentsCollection,
};
