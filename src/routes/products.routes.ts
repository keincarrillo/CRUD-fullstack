import { Router } from 'express'
import { createProduct } from '../controllers/products.controllers'
import { doc, updateDoc } from 'firebase/firestore'
import db from '../firebase/appFirebase'

const router = Router()

router.post('/products', createProduct)
router.put('/products/:id', async (req, res) => {
  const product = doc(db, 'products', 'kFSxMZNW3psiKvL584Aj')
  try {
    await updateDoc(product, { name: 'Lovelace' })
    res.status(200).send('ok')
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})

export default router
