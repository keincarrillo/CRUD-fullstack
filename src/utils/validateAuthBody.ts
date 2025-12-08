import { Error } from '../types/errorsResFirebase/errorsAuth'
import type { AuthBody } from '../types/errorsReq/authParams'

export const validateAuthBody = (body: AuthBody) => {
  if (!body) return Error.NO_BODY
  if (!body.email) return Error.NO_EMAIL
  if (!body.password) return Error.NO_PASSWORD
}
