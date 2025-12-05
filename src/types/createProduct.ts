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

export interface Product extends Request<ProductParams, any, ProductBody> {}
