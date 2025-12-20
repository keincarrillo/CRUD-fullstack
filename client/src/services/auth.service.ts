import axios from 'axios'
import type { SignupFormData } from '../types/signupFormType'
import type { SigninFormData } from '../types/signinFormType'

export async function signupRequest(data: SignupFormData) {
  const res = await axios.post('/api/auth/signup', {
    name: data.name,
    email: data.email,
    password: data.password,
  })
  return res.data
}

export async function signinRequest(data: SigninFormData) {
  const res = await axios.post('/api/auth/signin', {
    email: data.email,
    password: data.password,
  })
  return res.data
}
