import type { Request } from 'express'

export interface AuthBody {
  email: string
  password: string
  rol?: string
}

export interface AuthParamsReq extends Request<{}, any, AuthBody> {}
