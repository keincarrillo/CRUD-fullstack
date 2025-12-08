import type { Request, Response } from 'express'
import type { AuthParamsReq } from '../types/authParams'
import type { FirebaseError } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../firebase/appFirebase'
import { validateAuthBody } from '../utils/validateAuthBody'
import { errorsResponseAuth } from '../utils/errorsResponseAuth'

export const singUp = async (req: AuthParamsReq, res: Response) => {
  const validationError = validateAuthBody(req.body)
  if (validationError) return res.status(400).json({ message: validationError })

  try {
    await createUserWithEmailAndPassword(
      auth,
      req.body.email,
      req.body.password
    )

    res.sendStatus(201)
  } catch (err) {
    const error = err as FirebaseError
    const errorResponse = errorsResponseAuth(error)
    if (errorResponse) return res.status(400).json({ message: errorResponse })
    console.error(error)
    res.status(500).send(error)
  }
}

export const singIn = async (req: Request, res: Response) => {
  const validationError = validateAuthBody(req.body)
  if (validationError) return res.status(400).json({ message: validationError })

  try {
    await signInWithEmailAndPassword(auth, req.body.email, req.body.password)
    res.sendStatus(200)
  } catch (error) {
    const err = error as FirebaseError
    const errorResponse = errorsResponseAuth(err)
    if (errorResponse) return res.status(400).json({ message: errorResponse })
    console.error(error)
    res.status(500).send(error)
  }
}
