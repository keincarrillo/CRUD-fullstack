import { Router } from 'express'
import {
  createProduct,
  updateProduct,
} from '../controllers/products.controllers'

const router = Router()

router.post('/products', createProduct)
router.put('/products/:id', updateProduct)

export default router
