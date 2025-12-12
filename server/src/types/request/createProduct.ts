// src/types/request/createProduct.ts
import type { Request } from 'express'
import type { DocumentData } from 'firebase/firestore'
import type { ParamsDictionary } from 'express-serve-static-core'

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

export type ProductBodyReq = Request<ParamsDictionary, any, ProductBody>
export type ProductParamsReq = Request<ParamsDictionary>
