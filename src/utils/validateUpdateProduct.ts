import type { ProductBodyReq } from '../types/createProduct'
import { Error } from '../types/errors/errorsProduct'

export const validateUpdateProduct = (req: ProductBodyReq) => {
  if (!req.body || Object.keys(req.body).length === 0) return Error.NO_DATA
}
