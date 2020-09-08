import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC7-hzYoPd2WF0k8XqDoqsOMPgU0ApawII",
  authDomain: "marcos-ig-clone-react.firebaseapp.com",
  databaseURL: "https://marcos-ig-clone-react.firebaseio.com",
  projectId: "marcos-ig-clone-react",
  storageBucket: "marcos-ig-clone-react.appspot.com",
  messagingSenderId: "1085944683513",
  appId: "1:1085944683513:web:4b27b4cdc6bf57abfdfb28",
  measurementId: "G-1SL0936ZZT"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };