import type { FirebaseError } from 'firebase/app'
import { Error } from '../types/errorsResponseAuth'

export const errorsResponseAuth = (error: FirebaseError) => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return Error.EMAIL_ALREADY_IN_USE
    case 'auth/invalid-email':
      return Error.INVALID_EMAIL
    case 'auth/missing-email':
      return Error.MISSING_EMAIL
    case 'auth/weak-password':
      return Error.WEAK_PASSWORD
    case 'auth/admin-restricted-operation':
      return Error.NO_BODY
    case 'auth/invalid-credential':
      return Error.NO_EXISTING_USER
    default:
      return
  }
}
