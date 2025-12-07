import type { Request, Response } from 'express'
import type { AuthParamsReq } from '../types/authParams'
import { Error } from '../types/errorsAuth'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/appFirebase'
import { validateAuthBody } from '../utils/validateAuthBody'

export const singUp = async (req: AuthParamsReq, res: Response) => {
  const validationError = validateAuthBody(req.body)

  validationError === Error.NO_EMAIL &&
    res.status(400).json({ message: 'No se recibio email' })

  validationError === Error.NO_PASSWORD &&
    res.status(400).json({ message: 'No se recibio password' })

  try {
    await createUserWithEmailAndPassword(
      auth,
      req.body.email,
      req.body.password
    )
    res.sendStatus(201)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

export const singIn = (req: Request, res: Response) => {
  res.send('signin')
}
