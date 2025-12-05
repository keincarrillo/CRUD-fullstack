import type { Product } from '../types/createProduct'
import { Error } from '../types/errorsProduct'

export const validateBodyReq = (req: Product) => {
  if (!req.body) return Error.NO_DATA
}
