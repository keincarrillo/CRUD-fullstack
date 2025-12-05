// db
import db from '../firebase/appFirebase'
import { collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore'
// utils
import { expectedData, validateProduct } from '../utils/validateCreateProduct'
import { validateBodyReq } from '../utils/validateUpdateProduct'
import { Error } from '../types/errorsProduct'
// types
import type { Response } from 'express'
import type { Product } from '../types/createProduct'

export const createProduct = async (req: Product, res: Response) => {
  const result = validateProduct(req)
  result === Error.MISSING_DATA &&
    res
      .status(400)
      .json({ message: 'No se recibieron datos', reqBody: expectedData })
  result === Error.NO_DATA &&
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

export const updateProduct = async (req: Product, res: Response) => {
  const product = doc(db, 'products', req.params.id)
  try {
    const productData = await getDoc(product)

    validateBodyReq(req) === Error.NO_DATA &&
      res.status(400).json({ message: 'No se recibieron datos' })

    if (productData.exists()) await updateDoc(product, req.body)

    const updatedProduct = await getDoc(product)
    if (updatedProduct.exists())
      res
        .status(200)
        .json({ productId: updatedProduct.id, data: updatedProduct.data() })
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}
