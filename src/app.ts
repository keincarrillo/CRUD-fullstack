import express from 'express'
import db from './firebase/appFirebase'
import { collection, addDoc } from 'firebase/firestore'

const server = express()

try {
  const docRef = await addDoc(collection(db, 'users'), {
    first: 'Ada',
    last: 'Lovelace',
    born: 1815,
  })
  console.log(docRef)
} catch (error) {
  console.error(error)
}

server.get('/', (req, res) => {
  res.send('Hello World!')
})

export default server
