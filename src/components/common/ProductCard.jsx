import { Link } from 'react-router-dom'
import { Heart, Star } from 'lucide-react'

function ProductCard({ product }) {
  const discount = Math.round(
    ((product.originalPrice - product.price) /
      product.originalPrice) * 100
  )

  return (
    <article className="group min-w-0">
      <div className="relative overflow-hidden rounded-xl bg-soft">
        <Link to={`/products/${product.slug}`}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {product.isNew && (
          <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs">
            New
          </span>
        )}

        <button
          aria-label="Add to wishlist"
          className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-sm"
        >
          <Heart size={17} />
        </button>

        <span className="absolute bottom-3 left-3 rounded-md bg-white px-2 py-1 text-xs">
          {discount}% OFF
        </span>
      </div>

      <div className="pt-3">
        <p className="text-xs text-secondary">{product.category}</p>

        <Link to={`/products/${product.slug}`}>
          <h3 className="mt-1 line-clamp-2 text-sm font-medium text-primary">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm font-semibold">
            ₹{product.price.toLocaleString('en-IN')}
          </span>

          <span className="text-xs text-secondary line-through">
            ₹{product.originalPrice.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-1 text-xs text-secondary">
          <Star size={13} className="fill-amber-400 text-amber-400" />
          {product.rating} ({product.reviewCount})
        </div>
      </div>
    </article>
  )
}

export default ProductCard