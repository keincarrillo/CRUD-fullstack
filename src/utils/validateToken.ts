import { Error } from '../types/erros/errorsReq/errorsToken'

export const validateToken = (token: string) => {
  if (!token) return Error.NO_TOKEN_PROVIDED
}
