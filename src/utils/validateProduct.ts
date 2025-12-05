import type { Product } from '../types/createProduct'

export const validateProduct = (product: Product) => {
  if (!product.body) return 0
  if (
    !product.body.nombre ||
    !product.body.marca ||
    !product.body.precio ||
    !product.body.descripcion ||
    !product.body.stock
  )
    return -1
}

export const expectedData = {
  nombre: 'string',
  marca: 'string',
  precio: 'number',
  descripcion: 'string',
  stock: 'number',
}
