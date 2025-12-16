import type { Request, Response, NextFunction, RequestHandler } from 'express'
import type { MyJwtPayload } from '../types/request/validateTokenReq'
import jwt from 'jsonwebtoken'
import { validateToken } from '../utils/validateToken'
import { Error } from '../types/erros/errorsReq/errorsToken'
import clientRedis from '../redis/clientRedis'

export const verifyRol = (role: string): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const cookies = (req as any).cookies ?? {}
    const token = cookies.token as string | undefined

    if (!token)
      return res.status(401).json({ message: Error.NO_TOKEN_PROVIDED })

    const vToken = validateToken(token)
    if (vToken) return res.status(401).json({ message: vToken })

    try {
      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as MyJwtPayload

      const rawSession = await clientRedis.get(`sess:${payload.sid}`)
      if (!rawSession)
        return res.status(401).json({ message: Error.INVALID_TOKEN })

      const session = JSON.parse(rawSession) as { uid: string; rol: string }

      if (session.rol !== role) {
        return res.status(403).json({ message: Error.UNAUTHORIZED })
      }

      next()
    } catch (error) {
      console.error(error)
      return res.status(401).json({ message: Error.INVALID_TOKEN })
    }
  }
}
