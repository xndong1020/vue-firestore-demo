import firebase from 'firebase/app';
import "firebase/firestore";

const firebaseConfig = {
  apiKey: <your apikey>,
  authDomain: 'ninja-smoothies-d1d93.firebaseapp.com',
  databaseURL: 'https://ninja-smoothies-d1d93.firebaseio.com',
  projectId: 'ninja-smoothies-d1d93',
  storageBucket: 'ninja-smoothies-d1d93.appspot.com',
  messagingSenderId: '252867717890',
  appId: '1:252867717890:web:d21cd3017b307c6a',
}
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()

export default db
