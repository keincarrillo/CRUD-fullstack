import type { Request, Response } from 'express'
import type {
  ProductBodyReq,
  ProductParamsReq,
} from '../types/request/createProduct'
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
import { validateCreateProduct } from '../utils/validateCreateProduct'
import { validateUpdateProduct } from '../utils/validateUpdateProduct'

export const createProduct = async (req: ProductBodyReq, res: Response) => {
  const validateBody = validateCreateProduct(req)
  if (validateBody) return res.status(400).json({ message: validateBody })

  const { nombre, marca, precio, descripcion, stock } = req.body

  try {
    const docRef = await addDoc(collection(db, 'products'), {
      nombre,
      marca,
      precio,
      descripcion,
      stock,
    })

    return res.status(201).json({ docId: docRef.id })
  } catch (error) {
    console.error(error)
    return res.status(500).send(error)
  }
}

export const updateProduct = async (req: ProductBodyReq, res: Response) => {
  const { id } = req.params as { id: string }

  if (!id) {
    return res.status(400).json({ message: 'Product id is required' })
  }

  const productRef = doc(db, 'products', id)
  const validateBody = validateUpdateProduct(req)
  if (validateBody) return res.status(400).json({ message: validateBody })

  try {
    const productData = await getDoc(productRef)

    if (!productData.exists()) {
      return res.sendStatus(404)
    }

    await updateDoc(productRef, req.body)

    const updatedProduct = await getDoc(productRef)

    if (updatedProduct.exists()) {
      return res
        .status(200)
        .json({ productId: updatedProduct.id, ...updatedProduct.data() })
    }

    return res.sendStatus(500)
  } catch (error) {
    console.error(error)
    return res.status(500).send(error)
  }
}

export const getProducts = async (req: Request, res: Response) => {
  try {
    const productsSnap = await getDocs(collection(db, 'products'))

    if (productsSnap.docs.length <= 0) {
      return res.sendStatus(404)
    }

    const data = productsSnap.docs.map(docSnap => ({
      docId: docSnap.id,
      ...docSnap.data(),
    }))

    return res.status(200).json(data)
  } catch (error) {
    console.error(error)
    return res.status(500).send(error)
  }
}

export const getProduct = async (req: ProductParamsReq, res: Response) => {
  const { id } = req.params as { id: string }

  if (!id) {
    return res.status(400).json({ message: 'Product id is required' })
  }

  const productRef = doc(db, 'products', id)

  try {
    const docSnap = await getDoc(productRef)

    if (!docSnap.exists()) {
      return res.sendStatus(404)
    }

    return res.status(200).json({ docId: docSnap.id, ...docSnap.data() })
  } catch (error) {
    console.error(error)
    return res.status(500).send(error)
  }
}

export const deleteProduct = async (req: ProductParamsReq, res: Response) => {
  const { id } = req.params as { id: string }

  if (!id) {
    return res.status(400).json({ message: 'Product id is required' })
  }

  const productRef = doc(db, 'products', id)

  try {
    const docSnap = await getDoc(productRef)

    if (!docSnap.exists()) {
      return res.sendStatus(404)
    }

    await deleteDoc(productRef)
    return res.sendStatus(204)
  } catch (error) {
    console.error(error)
    return res.status(500).send(error)
  }
}
