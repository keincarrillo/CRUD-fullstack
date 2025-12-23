import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type { SigninFormData } from '../types/signinFormType'
import type { SignupFormData } from '../types/signupFormType'
import {
  signinRequest,
  signupRequest,
  verifyAuth,
  signout as signoutReq,
} from '../services/auth.service'

export type AuthUser = {
  uid: string
  email: string
  name: string
  rol: string
}

type AuthContextType = {
  user: AuthUser | null
  loading: boolean
  isAuthenticated: boolean
  refresh: () => Promise<void>
  signin: (data: SigninFormData) => Promise<void>
  signup: (data: SignupFormData) => Promise<void>
  signout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe ser usado dentro de AuthProvider')
  return ctx
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    try {
      const me = await verifyAuth()
      setUser(me)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  const signin = async (data: SigninFormData) => {
    const me = await signinRequest(data)
    setUser(me)
  }

  const signup = async (data: SignupFormData) => {
    await signupRequest(data)
  }

  const signout = async () => {
    await signoutReq()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        refresh,
        signin,
        signup,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
