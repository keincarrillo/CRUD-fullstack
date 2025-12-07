import { Error } from '../types/errorsAuth'
import type { AuthBody } from '../types/authParams'

export const validateAuthBody = (body: AuthBody) => {
  if (!body?.email) return Error.NO_EMAIL
  if (!body?.password) return Error.NO_PASSWORD
  return null
}
