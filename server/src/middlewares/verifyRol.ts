import type { Request, Response, NextFunction, RequestHandler } from 'express'
import type { MyJwtPayload } from '../types/request/validateTokenReq'
import jwt from 'jsonwebtoken'
import { validateToken } from '../utils/validateToken'
import { Error } from '../types/erros/errorsReq/errorsToken'

export const verifyRol = (role: string): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const cookies = (req as any).cookies ?? {}
    const token = cookies.token as string | undefined

    if (!token)
      return res.status(401).json({ message: Error.NO_TOKEN_PROVIDED })

    const vToken = validateToken(token)
    if (vToken) return res.status(401).json({ message: vToken })

    try {
      const { rol } = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as MyJwtPayload

      if (rol !== role)
        return res.status(403).json({ message: Error.UNAUTHORIZED })

      next()
    } catch (error) {
      console.error(error)
      res.status(401).json({ message: Error.INVALID_TOKEN })
    }
  }
}
