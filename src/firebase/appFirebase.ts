import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { firebaseConfig } from '../config/firebase'

const appFirebase = initializeApp(firebaseConfig)

const db = getFirestore(appFirebase)

export default db
