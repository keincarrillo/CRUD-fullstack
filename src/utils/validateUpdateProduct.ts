import type { ProductBodyReq } from '../types/createProduct'
import { Error } from '../types/errorsProduct'

export const validateBodyReq = (req: ProductBodyReq) => {
  if (!req.body) return Error.NO_DATA
}
