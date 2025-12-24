import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { LogOut, Plus, Package } from 'lucide-react'
import type { Product, ProductFormData } from '../../types/productType'
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../services/product.service'
import { getHttpErrorMessage } from '../../utils/httpError'
import ProductCard from '../products/ProductCard'
import ProductModal from '../products/ProductModal'
import Alert from '../ui/Alert'
import gsap from 'gsap'

const Dashboard = () => {
  const { user, signout } = useAuth()
  const navigate = useNavigate()

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const headerRef = useRef<HTMLDivElement>(null)
  const productsRef = useRef<HTMLDivElement>(null)

  // Permisos basados en rol
  const canCreate = user?.rol === 'admin'
  const canEdit = user?.rol === 'admin'
  const canDelete = user?.rol === 'admin' || user?.rol === 'moderator'

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    if (headerRef.current && productsRef.current && products.length > 0) {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

      tl.from(headerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        clearProps: 'opacity,transform',
      }).from(
        productsRef.current.children,
        {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.4,
          clearProps: 'opacity,transform',
        },
        0.3
      )
    }
  }, [products])

  const loadProducts = async () => {
    try {
      setError('')
      const data = await getProducts()
      setProducts(data)
    } catch (err) {
      setError(getHttpErrorMessage(err, 'Error al cargar los productos'))
    } finally {
      setLoading(false)
    }
  }

  const handleCreateProduct = async (data: ProductFormData) => {
    if (!canCreate) {
      setError('No tienes permisos para crear productos')
      return
    }

    try {
      setError('')
      setSuccess('')
      await createProduct(data)
      setSuccess('Producto creado exitosamente')
      await loadProducts()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(getHttpErrorMessage(err, 'Error al crear el producto'))
    }
  }

  const handleUpdateProduct = async (data: ProductFormData) => {
    if (!editingProduct) return

    if (!canEdit) {
      setError('No tienes permisos para editar productos')
      return
    }

    try {
      setError('')
      setSuccess('')
      await updateProduct(editingProduct.docId, data)
      setSuccess('Producto actualizado exitosamente')
      await loadProducts()
      setEditingProduct(null)
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(getHttpErrorMessage(err, 'Error al actualizar el producto'))
    }
  }

  const handleDeleteProduct = async (id: string) => {
    if (!canDelete) {
      setError('No tienes permisos para eliminar productos')
      return
    }

    if (!confirm('¿Estás seguro de eliminar este producto?')) return

    try {
      setError('')
      setSuccess('')
      await deleteProduct(id)
      setSuccess('Producto eliminado exitosamente')
      await loadProducts()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(getHttpErrorMessage(err, 'Error al eliminar el producto'))
    }
  }

  const handleEditClick = (product: Product) => {
    if (!canEdit) {
      setError('No tienes permisos para editar productos')
      return
    }
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingProduct(null)
  }

  const handleSignout = async () => {
    await signout()
    navigate('/signin', { replace: true })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-text-muted">Cargando productos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div
          ref={headerRef}
          className="bg-card rounded-2xl shadow-lg p-6 mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary to-primary-dark"></div>

          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-text-main mb-2">
                Dashboard
              </h1>
              <p className="text-text-muted">
                Bienvenido, <span className="font-medium">{user?.name}</span>
              </p>
              <p className="text-sm text-text-muted mt-1">
                Rol: <span className="font-medium capitalize">{user?.rol}</span>
              </p>
            </div>

            <div className="flex gap-3">
              {canCreate && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Plus className="w-5 h-5" />
                  Nuevo Producto
                </button>
              )}
              <button
                onClick={handleSignout}
                className="flex items-center gap-2 px-6 py-3 border border-border hover:bg-error hover:text-white hover:border-error text-text-main rounded-lg font-semibold transition-all duration-200"
              >
                <LogOut className="w-5 h-5" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>

        {success && <Alert variant="success" message={success} />}
        {error && <Alert variant="error" message={error} />}

        {products.length === 0 ? (
          <div className="bg-card rounded-2xl shadow-lg p-12 text-center">
            <Package className="w-16 h-16 text-text-muted mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-main mb-2">
              No hay productos
            </h3>
            <p className="text-text-muted mb-6">
              {canCreate
                ? 'Comienza agregando tu primer producto'
                : 'No hay productos disponibles para mostrar'}
            </p>
            {canCreate && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-all duration-200"
              >
                Agregar Producto
              </button>
            )}
          </div>
        ) : (
          <div
            ref={productsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {products.map(product => (
              <ProductCard
                key={product.docId}
                product={product}
                onEdit={handleEditClick}
                onDelete={handleDeleteProduct}
                canEdit={canEdit}
                canDelete={canDelete}
              />
            ))}
          </div>
        )}
      </div>

      {canCreate && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
          initialData={
            editingProduct
              ? {
                  nombre: editingProduct.nombre,
                  marca: editingProduct.marca,
                  precio: editingProduct.precio,
                  descripcion: editingProduct.descripcion,
                  stock: editingProduct.stock,
                }
              : undefined
          }
          title={editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
        />
      )}
    </div>
  )
}

export default Dashboard
