import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { firebaseConfig } from '../config/firebase'

const appFirebase = initializeApp(firebaseConfig)

const db = getFirestore(appFirebase)
const auth = getAuth(appFirebase)

export { db, auth }
