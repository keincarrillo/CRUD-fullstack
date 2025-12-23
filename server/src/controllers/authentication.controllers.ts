import type { RequestHandler } from 'express'
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

export const singUp: RequestHandler = async (req, res) => {
  const validationError = validateSignupBody((req as AuthParamsReq).body)
  if (validationError)
    return void res.status(400).json({ message: validationError })

  try {
    const body = (req as AuthParamsReq).body

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      body.email,
      body.password
    )

    await setDoc(doc(db, `users/${userCredential.user.uid}`), {
      name: body.name,
      email: body.email,
      rol: body.rol ?? 'user',
    })

    return void res.sendStatus(201)
  } catch (error) {
    const err = error as FirebaseError
    const errorResponse = errorsResponseAuth(err)
    if (errorResponse)
      return void res.status(400).json({ message: errorResponse })
    console.error(error)
    return void res.status(500).send(error)
  }
}

export const singIn: RequestHandler = async (req, res) => {
  const validationError = validateSigninBody((req as AuthParamsReq).body)
  if (validationError)
    return void res.status(400).json({ message: validationError })

  try {
    const body = (req as AuthParamsReq).body

    const userCredential = await signInWithEmailAndPassword(
      auth,
      body.email,
      body.password
    )

    const uid = userCredential.user.uid || ''

    const userSnap = await getDoc(doc(db, `users/${uid}`))
    if (!userSnap.exists())
      return void res.status(404).json({ message: ErrorAuth.NO_EXISTING_USER })

    const dbUser = userSnap.data() as {
      name: string
      email: string
      rol?: string
    }
    const userRol = dbUser.rol ?? 'user'

    const sid = crypto.randomUUID()
    await clientRedis.set(
      `sess:${sid}`,
      JSON.stringify({ uid, rol: userRol }),
      {
        EX: 60 * 60 * 24,
      }
    )

    const token = jwt.sign(
      { uid, rol: userRol, sid },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    )

    return void res
      .cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
      })
      .status(202)
      .json({ uid, name: dbUser.name, email: dbUser.email, rol: userRol })
  } catch (error) {
    const err = error as FirebaseError
    const errorResponse = errorsResponseAuth(err)
    if (errorResponse)
      return void res.status(400).json({ message: errorResponse })
    console.error(error)
    return void res.status(500).send(error)
  }
}

export const verify: RequestHandler = async (req, res) => {
  const token = (req as any).cookies?.token as string | undefined
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

    const session = JSON.parse(rawSession) as { uid: string; rol: string }

    const userSnap = await getDoc(doc(db, `users/${session.uid}`))
    if (!userSnap.exists())
      return void res.status(404).json({ message: ErrorAuth.NO_EXISTING_USER })

    const dbUser = userSnap.data() as {
      name: string
      email: string
      rol?: string
    }

    return void res.status(200).json({
      uid: session.uid,
      name: dbUser.name,
      email: dbUser.email,
      rol: dbUser.rol ?? session.rol ?? 'user',
    })
  } catch (error) {
    console.error('Error en verificar token:', error)
    return void res.status(401).json({ message: ErrorToken.INVALID_TOKEN })
  }
}

export const signOut: RequestHandler = async (req, res) => {
  const token = (req as any).cookies?.token as string | undefined

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

  res.clearCookie('token', { sameSite: 'lax', secure: false })
  return void res.sendStatus(200)
}
