import type { Response } from 'express'
import type { FirebaseError } from 'firebase/app'
import type { AuthParamsReq } from '../types/request/authParams'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../firebase/appFirebase'
import { validateSignupBody } from '../utils/validateSignupBody'
import { errorsResponseAuth } from '../utils/errorsResponseAuth'
import { setDoc, doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/appFirebase'
import clientRedis from '../redis/clientRedis'
import jwt from 'jsonwebtoken'
import { validateSigninBody } from '../utils/validateSigninBody'

export const singUp = async (req: AuthParamsReq, res: Response) => {
  const validationError = validateSignupBody(req.body)
  if (validationError) return res.status(400).json({ message: validationError })

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      req.body.email,
      req.body.password
    )

    await setDoc(doc(db, `users/${userCredential.user.uid}`), {
      name: req.body.name,
      email: req.body.email,
      rol: req.body.rol ?? 'user',
    })

    res.sendStatus(201)
  } catch (error) {
    const err = error as FirebaseError
    const errorResponse = errorsResponseAuth(err)
    if (errorResponse) return res.status(400).json({ message: errorResponse })
    console.error(error)
    res.status(500).send(error)
  }
}

export const singIn = async (req: AuthParamsReq, res: Response) => {
  const validationError = validateSigninBody(req.body)
  if (validationError) return res.status(400).json({ message: validationError })

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      req.body.email,
      req.body.password
    )

    const uid = userCredential.user.uid || ''

    const cacheRol = `user:${uid}:rol`
    let userRol = await clientRedis.get(cacheRol)

    if (!userRol) {
      const userSnap = await getDoc(doc(db, `users/${uid}`))
      userRol = userSnap.data()?.rol ?? 'user'
      await clientRedis.set(cacheRol, userRol as string, {
        EX: 60 * 60 * 24, // 1d
      })
    }

    const sid = crypto.randomUUID()
    const sessionKey = `sess:${sid}`
    await clientRedis.set(sessionKey, JSON.stringify({ uid, rol: userRol }), {
      EX: 60 * 60 * 24,
    })

    const token = jwt.sign(
      { uid, rol: userRol, sid },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1d',
      }
    )

    res
      .cookie('token', token, {
        httpOnly: true,
      })
      .status(202)
      .end()
  } catch (error) {
    const err = error as FirebaseError
    const errorResponse = errorsResponseAuth(err)
    if (errorResponse) return res.status(400).json({ message: errorResponse })
    console.error(error)
    res.status(500).send(error)
  }
}
