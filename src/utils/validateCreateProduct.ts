import type { Product } from '../types/createProduct'
import { Error } from '../types/errorsProduct'

export const validateProduct = (product: Product) => {
  if (!product.body) return Error.NO_DATA
  if (
    !product.body.nombre ||
    !product.body.marca ||
    !product.body.precio ||
    !product.body.descripcion ||
    !product.body.stock
  )
    return Error.MISSING_DATA
}

export const expectedData = {
  nombre: 'string',
  marca: 'string',
  precio: 'number',
  descripcion: 'string',
  stock: 'number',
}
