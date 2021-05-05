import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// here you should import your seed file
// import { seedDatabase } from '../seed';

// configure connection to firebase database
const config = {
  apiKey: 'AIzaSyDj4FN2w9RMwnjwVqpoQnT5QtsQJWLTDhY',
  authDomain: 'insta-clone-66468.firebaseapp.com',
  projectId: 'insta-clone-66468',
  storageBucket: 'insta-clone-66468.appspot.com',
  messagingSenderId: '1095876050650',
  appId: '1:1095876050650:web:24870916e03f12bfe7efe3'
};

// initializing Firebase library
const firebase = Firebase.initializeApp(config);
// taking FieldValue from it, as I need it in index/FirebaseContext.Provider
const { FieldValue } = Firebase.firestore;

// here you should call your seed file (ONLY ONCE!)
// seedDatabase(firebase);

console.log('firebase', firebase);

export { firebase, FieldValue };
