import type { ProductBodyReq } from '../types/errorsReq/createProduct'
import { Error } from '../types/errorsResFirebase/errorsProduct'

export const validateUpdateProduct = (req: ProductBodyReq) => {
  if (!req.body || Object.keys(req.body).length === 0) return Error.NO_DATA
}
