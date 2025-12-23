export interface Product {
  docId: string
  nombre: string
  marca: string
  precio: number
  descripcion: string
  stock: number
}

export interface ProductFormData {
  nombre: string
  marca: string
  precio: number
  descripcion: string
  stock: number
}
