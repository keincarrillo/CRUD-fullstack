import axios from 'axios'
import type { ProductFormData } from '../types/productType'

axios.defaults.withCredentials = true

const API_URL = `${import.meta.env.VITE_API_URL}/products`

export const getProducts = async () => {
  const res = await axios.get(API_URL)
  return res.data
}

export const getProduct = async (id: string) => {
  const res = await axios.get(`${API_URL}/${id}`)
  return res.data
}

export const createProduct = async (data: ProductFormData) => {
  const res = await axios.post(API_URL, data)
  return res.data
}

export const updateProduct = async (id: string, data: ProductFormData) => {
  const res = await axios.put(`${API_URL}/${id}`, data)
  return res.data
}

export const deleteProduct = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`)
  return res.data
}
