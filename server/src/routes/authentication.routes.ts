import { Router } from 'express'
import {
  singIn,
  singUp,
  verify,
  signOut,
} from '../controllers/authentication.controllers'

const router = Router()

router.post('/signup', singUp)
router.post('/signin', singIn)
router.get('/verify', verify)
router.post('/signout', signOut)

export default router
