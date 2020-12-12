import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: 'AIzaSyDyA4k8AnSyy7c_KgAhfDvuELFNpg9y_-s',
  authDomain: 'slack-clone-fe6cf.firebaseapp.com',
  projectId: 'slack-clone-fe6cf',
  storageBucket: 'slack-clone-fe6cf.appspot.com',
  messagingSenderId: '418078400045',
  appId: '1:418078400045:web:486b847006bdcc0bafe2a4',
  measurementId: 'G-T0RLSH3MF0',
})
const db = firebase.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db
