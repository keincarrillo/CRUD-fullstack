import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type { SigninFormData } from '../types/signinFormType'
import {
  signinRequest,
  verifyAuth,
  signout as signoutReq,
} from '../services/auth.service'

export interface User {
  uid: string
  email: string
  name: string
  rol: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  signin: (data: SigninFormData) => Promise<void>
  signout: () => Promise<void>
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  return ctx
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    try {
      const me = await verifyAuth()
      setUser(me)
    } catch {
      setUser(null)
    }
  }

  useEffect(() => {
    ;(async () => {
      await refresh()
      setLoading(false)
    })()
  }, [])

  const signin = async (data: SigninFormData) => {
    await signinRequest(data)
    await refresh()
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
        signin,
        signout,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
