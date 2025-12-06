import { Router } from 'express'
import {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct
} from '../controllers/products.controllers'

const router = Router()

router.post('/products', createProduct)
router.put('/products/:id', updateProduct)
router.get('/products', getProducts)
router.get('/products/:id', getProduct)
router.delete('/products/:id', deleteProduct)

export default router
