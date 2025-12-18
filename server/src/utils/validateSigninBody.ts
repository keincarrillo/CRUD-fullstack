import type { AuthBody } from '../types/request/authParams'
import { Error } from '../types/erros/errorsResFirebase/errorsAuth'

export const validateSigninBody = (body: AuthBody) => {
  if (!body) return Error.NO_BODY
  if (!body.email) return Error.NO_EMAIL
  if (!body.password) return Error.NO_PASSWORD
}
