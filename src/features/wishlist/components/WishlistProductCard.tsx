
import { Link } from 'react-router-dom'
import { Heart, ShoppingCartPlus, X } from 'lucide-react'
import type { Product } from '@/features/products/types/product.types'

interface WishlistProductCardProps {
  product: Product
  onRemove: (productId: number) => void
  onAddToCart: (product: Product) => void
}

function formatPrice(price: number) {
  return `₹${price.toLocaleString('en-IN')}`
}

export default function WishlistProductCard({
  product,
  onRemove,
  onAddToCart,
}: WishlistProductCardProps) {
  return (
    <article className="group">
      {/* Product Image */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-soft">
        <Link to={`/products/${product.slug}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium capitalize text-primary">
            {product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={() => onRemove(product.id)}
          aria-label="Remove from wishlist"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition hover:bg-red-50 hover:text-red-600"
        >
          <X size={17} />
        </button>
      </div>

      {/* Product Details */}
      <div className="pt-4">
        <p className="text-xs uppercase tracking-wider text-secondary">
          {product.category}
        </p>

        <Link
          to={`/products/${product.slug}`}
          className="mt-1 block font-serif text-lg text-primary transition hover:text-accent"
        >
          {product.name}
        </Link>

        {product.material && (
          <p className="mt-1 text-sm text-secondary">
            {product.material}
          </p>
        )}

        <div className="mt-3 flex items-center gap-2">
          <span className="font-semibold text-primary">
            {formatPrice(product.price)}
          </span>

          {product.originalPrice && (
            <span className="text-sm text-secondary line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <p className={`mt-2 text-xs ${
          product.inStock === false ? 'text-red-600' : 'text-green-700'
        }`}>
          {product.inStock === false ? 'Out of Stock' : 'In Stock'}
        </p>

        <button
          type="button"
          disabled={product.inStock === false}
          onClick={() => onAddToCart(product)}
          className="mt-4 flex w-full items-center justify-center bg-primary text-white gap-2 rounded-lg border border-primary px-4 py-3 text-sm font-medium transition hover:bg-transparent hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ShoppingCartPlus size={16} />
          Add to Cart
        </button>
      </div>
    </article>
  )
}


