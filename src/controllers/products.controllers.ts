// db
import db from '../firebase/appFirebase'
import { collection, addDoc } from 'firebase/firestore'
// utils
import { expectedData, validateProduct } from '../utils/validateProduct'
// types
import type { Response } from 'express'
import type { Product } from '../types/createProduct'

export const createProduct = async (req: Product, res: Response) => {
  const result = validateProduct(req)
  result === 0 &&
    res
      .status(400)
      .json({ message: 'No se recibieron datos', reqBody: expectedData })
  result === -1 &&
    res.status(400).json({ message: 'Faltan datos', reqBody: expectedData })

  const { nombre, marca, precio, descripcion, stock } = req.body

  try {
    const docRef = await addDoc(collection(db, 'products'), {
      nombre,
      marca,
      precio,
      descripcion,
      stock,
    })
    res.status(201).json({ docId: docRef.id })
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}
