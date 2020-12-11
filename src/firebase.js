import firebase from 'firebase'
const firebaseConfig = {
  apiKey: 'AIzaSyDyA4k8AnSyy7c_KgAhfDvuELFNpg9y_-s',
  authDomain: 'slack-clone-fe6cf.firebaseapp.com',
  projectId: 'slack-clone-fe6cf',
  storageBucket: 'slack-clone-fe6cf.appspot.com',
  messagingSenderId: '418078400045',
  appId: '1:418078400045:web:486b847006bdcc0bafe2a4',
  measurementId: 'G-T0RLSH3MF0',
}
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db
