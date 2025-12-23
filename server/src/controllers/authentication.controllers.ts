import type { RequestHandler, Response } from 'express'
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
import { Error as ErrorToken } from '../types/erros/errorsReq/errorsToken'
import { Error as ErrorAuth } from '../types/erros/errorsResFirebase/errorsResponseAuth'
import { validateSigninBody } from '../utils/validateSigninBody'
import type { MyJwtPayload } from '../types/request/validateTokenReq'

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

export const verify: RequestHandler = async (req, res) => {
  const cookies = (req as any).cookies ?? {}
  const token = cookies.token as string | undefined

  if (!token)
    return void res.status(401).json({ message: ErrorToken.NO_AUTHENTICATION })

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as MyJwtPayload

    const rawSession = await clientRedis.get(`sess:${payload.sid}`)
    if (!rawSession)
      return void res.status(401).json({ message: ErrorToken.SESSION_EXPIRED })

    const session = JSON.parse(rawSession)
    const userSnap = await getDoc(doc(db, `users/${session.uid}`))

    if (!userSnap.exists())
      return void res.status(404).json({ message: ErrorAuth.NO_EXISTING_USER })

    return void res.sendStatus(200)
  } catch (error) {
    console.error('Error en verificar token:', error)
    return void res.status(401).json({ message: ErrorToken.INVALID_TOKEN })
  }
}

export const signOut: RequestHandler = async (req, res) => {
  const cookies = (req as any).cookies ?? {}
  const token = cookies.token as string | undefined

  if (token) {
    try {
      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as MyJwtPayload
      await clientRedis.del(`sess:${payload.sid}`)
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  res.clearCookie('token')
  return void res.sendStatus(200)
}
