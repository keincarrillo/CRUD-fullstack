import type { ProductBodyReq } from '../types/createProduct'
import { Error } from '../types/errorsProduct'

export const validateUpdateProduct = (req: ProductBodyReq) => {
  if (!req.body) return Error.NO_DATA
}
