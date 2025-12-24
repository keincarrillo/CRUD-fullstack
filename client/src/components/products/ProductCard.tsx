import { Pencil, Trash2 } from 'lucide-react'
import type { Product } from '../../types/productType'

type Props = {
  product: Product
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
  canEdit: boolean
  canDelete: boolean
}

const ProductCard = ({
  product,
  onEdit,
  onDelete,
  canEdit,
  canDelete,
}: Props) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-text-main mb-1">
            {product.nombre}
          </h3>
          <p className="text-sm text-text-muted">{product.marca}</p>
        </div>
        {(canEdit || canDelete) && (
          <div className="flex gap-2">
            {canEdit && (
              <button
                onClick={() => onEdit(product)}
                className="p-2 bg-primary-soft hover:bg-primary hover:text-white text-primary rounded-lg transition-all duration-200"
                title="Editar producto"
              >
                <Pencil className="w-4 h-4" />
              </button>
            )}
            {canDelete && (
              <button
                onClick={() => onDelete(product.docId)}
                className="p-2 bg-red-50 hover:bg-error hover:text-white text-error rounded-lg transition-all duration-200"
                title="Eliminar producto"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      <p className="text-sm text-text-muted mb-4 line-clamp-2">
        {product.descripcion}
      </p>

      <div className="flex justify-between items-center pt-4 border-t border-border">
        <div>
          <p className="text-2xl font-bold text-primary">
            ${product.precio.toFixed(2)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-text-muted">Stock</p>
          <p className="text-lg font-semibold text-text-main">
            {product.stock}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
