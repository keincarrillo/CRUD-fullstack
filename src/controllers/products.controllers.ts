// db
import { db } from '../firebase/appFirebase'
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDoc,
  getDocs,
  deleteDoc,
} from 'firebase/firestore'
// utils
import { validateCreateProduct } from '../utils/validateCreateProduct'
import { validateUpdateProduct } from '../utils/validateUpdateProduct'
// types
import type { Request, Response } from 'express'
import type { ProductBodyReq, ProductParamsReq } from '../types/createProduct'

export const createProduct = async (req: ProductBodyReq, res: Response) => {
  const validateBody = validateCreateProduct(req)
  validateBody && res.status(400).json({ message: validateBody })

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

export const updateProduct = async (req: ProductBodyReq, res: Response) => {
  const product = doc(db, 'products', req.params.id)
  const validateBody = validateUpdateProduct(req)
  validateBody && res.status(400).json({ message: validateBody })
  try {
    const productData = await getDoc(product)

    !productData.exists() &&
      res.status(404).json({ message: 'Producto no encontrado' })

    productData.exists() && (await updateDoc(product, req.body))

    const updatedProduct = await getDoc(product)
    updatedProduct.exists() &&
      res
        .status(200)
        .json({ productId: updatedProduct.id, ...updatedProduct.data() })
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await getDocs(collection(db, 'products'))
    products.docs.length <= 0 &&
      res.status(404).json({ message: 'No hay productos' })
    const data = products.docs.map(doc => {
      return {
        docId: doc.id,
        ...doc.data(),
      }
    })
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

export const getProduct = async (req: ProductParamsReq, res: Response) => {
  const product = doc(db, 'products', req.params.id)
  try {
    const docSnap = await getDoc(product)
    !docSnap.exists() &&
      res.status(404).json({ message: 'Producto no encontrado' })
    docSnap.exists() &&
      res.status(200).json({ docId: docSnap.id, ...docSnap.data() })
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

export const deleteProduct = async (req: ProductParamsReq, res: Response) => {
  const product = doc(db, 'products', req.params.id)
  try {
    const docSnap = await getDoc(product)
    !docSnap.exists() &&
      res.status(404).json({ message: 'Producto no encontrado' })
    docSnap.exists() && (await deleteDoc(product))
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}
