import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import type { ProductFormData } from '../../types/productType'
import FormField from '../ui/FormField'
import { useCallback, useEffect } from 'react'
import gsap from 'gsap'

type Props = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ProductFormData) => Promise<void>
  initialData?: ProductFormData
  title: string
}

const ProductModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormData>({
    defaultValues: initialData,
  })

  // Actualizar el formulario cuando cambien los datos iniciales
  useEffect(() => {
    if (initialData) {
      reset(initialData)
    }
  }, [initialData, reset])

  const onInputFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    gsap.to(e.target, { scale: 1.02, duration: 0.2, ease: 'power2.out' })
  }, [])

  const onInputBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    gsap.to(e.target, { scale: 1, duration: 0.2, ease: 'power2.out' })
  }, [])

  const onTextareaFocus = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>) => {
      gsap.to(e.target, { scale: 1.02, duration: 0.2, ease: 'power2.out' })
    },
    []
  )

  const onTextareaBlur = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>) => {
      gsap.to(e.target, { scale: 1, duration: 0.2, ease: 'power2.out' })
    },
    []
  )

  if (!isOpen) return null

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleFormSubmit = async (data: ProductFormData) => {
    await onSubmit(data)
    reset()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary to-primary-dark"></div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-text-main">{title}</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-primary-soft rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-text-muted" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="space-y-4">
            <FormField
              label="Nombre del producto"
              htmlFor="nombre"
              error={errors.nombre?.message}
            >
              <input
                id="nombre"
                type="text"
                {...register('nombre', {
                  required: 'El nombre es obligatorio',
                  minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                })}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 outline-none bg-primary-soft text-text-main focus:bg-card"
                placeholder="Ej: Laptop Dell"
              />
            </FormField>

            <FormField
              label="Marca"
              htmlFor="marca"
              error={errors.marca?.message}
            >
              <input
                id="marca"
                type="text"
                {...register('marca', {
                  required: 'La marca es obligatoria',
                })}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 outline-none bg-primary-soft text-text-main focus:bg-card"
                placeholder="Ej: Dell"
              />
            </FormField>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Precio"
                htmlFor="precio"
                error={errors.precio?.message}
              >
                <input
                  id="precio"
                  type="number"
                  step="0.01"
                  {...register('precio', {
                    required: 'El precio es obligatorio',
                    min: { value: 0, message: 'Debe ser mayor a 0' },
                    valueAsNumber: true,
                  })}
                  onFocus={onInputFocus}
                  onBlur={onInputBlur}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 outline-none bg-primary-soft text-text-main focus:bg-card"
                  placeholder="0.00"
                />
              </FormField>

              <FormField
                label="Stock"
                htmlFor="stock"
                error={errors.stock?.message}
              >
                <input
                  id="stock"
                  type="number"
                  {...register('stock', {
                    required: 'El stock es obligatorio',
                    min: { value: 0, message: 'Debe ser mayor o igual a 0' },
                    valueAsNumber: true,
                  })}
                  onFocus={onInputFocus}
                  onBlur={onInputBlur}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 outline-none bg-primary-soft text-text-main focus:bg-card"
                  placeholder="0"
                />
              </FormField>
            </div>

            <FormField
              label="Descripción"
              htmlFor="descripcion"
              error={errors.descripcion?.message}
            >
              <textarea
                id="descripcion"
                {...register('descripcion', {
                  required: 'La descripción es obligatoria',
                  minLength: { value: 10, message: 'Mínimo 10 caracteres' },
                })}
                onFocus={onTextareaFocus}
                onBlur={onTextareaBlur}
                rows={4}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 outline-none bg-primary-soft text-text-main focus:bg-card resize-none"
                placeholder="Describe el producto..."
              />
            </FormField>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 border border-border text-text-main rounded-lg font-semibold hover:bg-primary-soft transition-all duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductModal
