import type { FirebaseError } from 'firebase/app'
import { Error } from '../types/errorsResponseAuth'

export const errorsResponseAuth = (error: FirebaseError) => {
  if (error.code === 'auth/email-already-in-use') return Error.EMAIL_ALREADY_IN_USE
  if (error.code === 'auth/invalid-email') return Error.INVALID_EMAIL
  if (error.code === 'auth/missing-email') return Error.MISSING_EMAIL
  if (error.code === 'auth/weak-password') return Error.WEAK_PASSWORD
  if (error.code === 'auth/admin-restricted-operation') return Error.NO_BODY
}
