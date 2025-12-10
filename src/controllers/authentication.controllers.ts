import type { Request, Response } from 'express'
import type { FirebaseError } from 'firebase/app'
import type { AuthParamsReq } from '../types/request/authParams'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../firebase/appFirebase'
import { validateAuthBody } from '../utils/validateAuthBody'
import { errorsResponseAuth } from '../utils/errorsResponseAuth'
import { setDoc, doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/appFirebase'
import jwt from 'jsonwebtoken'

export const singUp = async (req: AuthParamsReq, res: Response) => {
  const validationError = validateAuthBody(req.body)
  if (validationError) return res.status(400).json({ message: validationError })

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      req.body.email,
      req.body.password
    )

    await setDoc(doc(db, `users/${userCredential.user.uid}`), {
      email: req.body.email,
      rol: req.body.rol ?? 'user',
    })

    res.sendStatus(201)
  } catch (err) {
    const error = err as FirebaseError
    const errorResponse = errorsResponseAuth(error)
    if (errorResponse) return res.status(400).json({ message: errorResponse })
    console.error(error)
    res.status(500).send(error)
  }
}

export const singIn = async (req: AuthParamsReq, res: Response) => {
  const validationError = validateAuthBody(req.body)
  if (validationError) return res.status(400).json({ message: validationError })

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      req.body.email,
      req.body.password
    )

    const userSnap = await getDoc(doc(db, 'users', userCredential.user.uid))
    const userRol = userSnap.data()?.rol ?? 'user'

    const token = jwt.sign({ rol: userRol }, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
    })

    res
      .cookie('token', token, {
        httpOnly: true,
      })
      .end()
  } catch (error) {
    const err = error as FirebaseError
    const errorResponse = errorsResponseAuth(err)
    if (errorResponse) return res.status(400).json({ message: errorResponse })
    console.error(error)
    res.status(500).send(error)
  }
}
