import type { Request, Response } from 'express'
import { collection, addDoc } from 'firebase/firestore'
import db from '../firebase/appFirebase'

export const createProduct = async (req: Request, res: Response) => {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      first: 'Ada',
      last: 'Lovelace',
      born: 1815,
    })
    res.status(201).send(docRef.id)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}
