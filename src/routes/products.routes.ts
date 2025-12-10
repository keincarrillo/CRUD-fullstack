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
router.get('/', verifyRol('admin'), getProducts)
router.get('/:id', verifyRol('admin'), getProduct)
router.delete('/:id', verifyRol('moderator'), deleteProduct)

export default router
