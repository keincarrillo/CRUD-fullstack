import type { Request } from 'express'

export interface ProductBody {
  nombre: string
  marca: string
  precio: number
  descripcion: string
  stock: number
}

export interface Product extends Request<{}, any, ProductBody> {}
