import { Router } from 'express'
import { singIn, singUp } from '../controllers/authentication.controllers'

const router = Router()

router.post('/singup', singUp)

router.post('/singin', singIn)

export default router
