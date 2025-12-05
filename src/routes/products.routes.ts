import { Router } from 'express'
import { createProduct } from '../controllers/products.controllers'

const router = Router()

router.post('/products', createProduct)

export default router
