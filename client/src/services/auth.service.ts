import axios from 'axios'
import type { SignupFormData } from '../types/signupFormType'
import type { SigninFormData } from '../types/signinFormType'

axios.defaults.withCredentials = true

const API_URL = 'http://localhost:3000/api/auth'

export const signupRequest = async (data: SignupFormData) => {
  const res = await axios.post(`${API_URL}/signup`, {
    name: data.name,
    email: data.email,
    password: data.password,
  })
  return res.data
}

export const signinRequest = async (data: SigninFormData) => {
  const res = await axios.post(`${API_URL}/signin`, {
    email: data.email,
    password: data.password,
  })
  return res.data
}

export const verifyAuth = async () => {
  const res = await axios.get(`${API_URL}/verify`)
  return res.data
}

export const signout = async () => {
  const res = await axios.post(`${API_URL}/signout`)
  return res.data
}
