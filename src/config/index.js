import firebase from 'firebase';

require('firebase/firestore');

const config = {
  // enter your Firebase config object here
  // https://firebase.google.com/
};

firebase.initializeApp(config);

const db = firebase.firestore();

export default db;
