import type { Request } from 'express'
import type { DocumentData } from 'firebase/firestore'

export interface ProductBody extends DocumentData {
  nombre?: string
  marca?: string
  precio?: number
  descripcion?: string
  stock?: number
}

export interface ProductParams {
  id: string
}

export interface ProductParamsReq extends Request<ProductParams> {}
export interface ProductBodyReq
  extends Request<ProductParams, any, ProductBody> {}
