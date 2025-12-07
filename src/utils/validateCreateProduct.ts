import type { ProductParamsReq } from '../types/createProduct'
import { Error } from '../types/errorsProduct'

export const validateCreateProduct = (product: ProductParamsReq) => {
  if (!product.body.nombre) return Error.NO_NAME
  if (!product.body.precio) return Error.NO_PRICE
  if (!product.body.descripcion) return Error.NO_DESCRIPTION
  if (!product.body.stock) return Error.NO_STOCK
  if (!product.body.marca) return Error.NO_BRAND
}
