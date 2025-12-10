import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const verifyRol = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token ?? null
  if (!token) return res.status(401).json({ message: 'No token provided' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    console.log(decoded)
    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({ message: 'Invalid token' })
  }
}
