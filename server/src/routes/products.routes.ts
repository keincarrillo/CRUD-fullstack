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

router.post('/', verifyRol('admin'), createProduct)
router.put('/:id', verifyRol('admin'), updateProduct)
router.get('/', getProducts)
router.get('/:id', getProduct)
router.delete('/:id', verifyRol('moderator'), deleteProduct)

export default router
