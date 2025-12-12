import { Router } from 'express'
import { singIn, singUp } from '../controllers/authentication.controllers'

const router = Router()

router.post('/signup', singUp)
router.post('/signin', singIn)

export default router
