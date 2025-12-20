import axios from 'axios'
import type { SignupFormData } from '../types/signupFormType'
import type { SigninFormData } from '../types/signinFormType'

axios.defaults.withCredentials = true

export const signupRequest = async (data: SignupFormData) => {
  const res = await axios.post('http://localhost:3000/api/auth/signup', {
    name: data.name,
    email: data.email,
    password: data.password,
  })
  return res.data
}

export const signinRequest = async (data: SigninFormData) => {
  const res = await axios.post('http://localhost:3000/api/auth/signin', {
    email: data.email,
    password: data.password,
  })
  return res.data
}
