import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import type {
  Product,
  ProductBadge,
} from '@/features/products/types/product.types'

interface ProductCardProps {
  product: Product
  /** "plain" = image + text (home page), "card" = white card (listing pages) */
  variant?: 'plain' | 'card'
  className?: string
}

const formatPrice = (value: number) => `₹${value.toLocaleString('en-IN')}`

const badgeStyles: Record<ProductBadge, { label: string; className: string }> = {
  new: { label: 'New', className: 'bg-surface/90 text-primary' },
  bestseller: { label: 'Bestseller', className: 'bg-accent text-accent-foreground' },
  sale: { label: 'Sale', className: 'bg-primary text-primary-foreground' },
  'curators-pick': { label: "Curator's Pick", className: 'bg-surface/90 text-primary' },
}

function ProductCard({ product, variant = 'plain', className }: ProductCardProps) {
  const { name, slug, image, category, price, originalPrice, badge, finish } =
    product
  const [wishlisted, setWishlisted] = useState(false)
  const hasDiscount = originalPrice !== undefined && originalPrice > price
  const isCard = variant === 'card'
  const badgeStyle = badge ? badgeStyles[badge] : undefined

  return (
    <article
      className={cn(
        'group flex min-w-0 flex-col',
        isCard &&
          'overflow-hidden rounded-xl bg-surface shadow-sm transition-shadow duration-300 hover:shadow-md',
        className
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden bg-soft',
          !isCard && 'rounded-xl'
        )}
      >
        <Link to={`/products/${slug}`} className="block">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {badgeStyle && (
          <span
            className={cn(
              'absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase leading-none tracking-wider backdrop-blur-sm sm:left-3 sm:top-3',
              badgeStyle.className
            )}
          >
            {badgeStyle.label}
          </span>
        )}

        <button
          type="button"
          aria-label={`Add ${name} to wishlist`}
          aria-pressed={wishlisted}
          onClick={() => setWishlisted((value) => !value)}
          className="absolute right-2.5 top-2.5 flex size-8 items-center justify-center rounded-full bg-surface/90 text-primary shadow-sm backdrop-blur-sm transition-colors hover:text-accent sm:right-3 sm:top-3 sm:size-9"
        >
          <Heart
            size={15}
            className={cn(wishlisted && 'fill-accent text-accent')}
          />
        </button>
      </div>

      <div
        className={cn(
          isCard ? 'flex flex-1 flex-col justify-between gap-2 p-3 sm:p-4' : 'pt-3'
        )}
      >
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-secondary">
            {category}
          </p>

          <h3
            className={cn(
              'mt-1 truncate font-medium text-primary',
              isCard ? 'text-sm sm:text-base' : 'text-sm'
            )}
          >
            <Link to={`/products/${slug}`} className="hover:text-accent">
              {name}
            </Link>
          </h3>
        </div>

        <div
          className={cn(
            'flex items-baseline gap-2',
            isCard ? 'justify-between' : 'mt-1'
          )}
        >
          <div className="flex shrink-0 items-baseline gap-1.5">
            <span className="text-sm font-semibold text-primary">
              {formatPrice(price)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-secondary line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>

          {isCard && finish && (
            <span className="hidden min-w-0 truncate text-[11px] text-secondary sm:block">
              {finish}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProductCard
