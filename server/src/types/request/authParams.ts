import type { Request } from 'express'

export interface AuthBody {
  name?: string
  email: string
  password: string
  rol?: string
}

export interface AuthParamsReq extends Request<{}, any, AuthBody> {}
