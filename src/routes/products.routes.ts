import { Router } from 'express'
import {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from '../controllers/products.controllers'
import { verifyRol } from '../middlewares/verifyRol'

const router = Router()

router.post('/', createProduct)
router.put('/:id', updateProduct)
router.get('/', getProducts)
router.get('/:id', getProduct)
router.delete('/:id', deleteProduct)

export default router
