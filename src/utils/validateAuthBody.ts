import { Error } from '../types/errors/errorsAuth'
import type { AuthBody } from '../types/authParams'

export const validateAuthBody = (body: AuthBody) => {
  if (!body) return Error.NO_BODY
  if (!body.email) return Error.NO_EMAIL
  if (!body.password) return Error.NO_PASSWORD
}
