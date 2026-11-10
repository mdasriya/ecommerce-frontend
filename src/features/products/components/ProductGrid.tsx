import { PackageOpen } from 'lucide-react'

import { cn } from '@/lib/utils'
import ProductCard from '@/components/common/ProductCard'
import type { Product } from '../types/product.types'

interface ProductGridProps {
  products: Product[]
  gridColumns: 3 | 4
  onClearFilters?: () => void
}

function ProductGrid({ products, gridColumns, onClearFilters }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center rounded-xl bg-soft/50 px-6 text-center">
        <PackageOpen size={40} strokeWidth={1.5} className="mb-4 text-secondary" />
        <h3 className="font-heading text-2xl text-primary">No pieces found</h3>
        <p className="mt-2 max-w-sm text-sm text-secondary">
          Nothing matches your current filters. Try removing a few to see more.
        </p>
        {onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="mt-6 rounded-lg bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-primary-foreground hover:bg-primary/85"
          >
            Clear filters
          </button>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-4 md:grid-cols-3 md:gap-x-6 md:gap-y-10',
        gridColumns === 4 && 'lg:grid-cols-4'
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} variant="card" />
      ))}
    </div>
  )
}

export default ProductGrid
