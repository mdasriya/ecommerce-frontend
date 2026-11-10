import { Link } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'

import { cn } from '@/lib/utils'
import { SITE_NAME } from '@/lib/site'
import { categories } from '@/features/category/data/categories'
import type { Category } from '@/features/category/types/category.types'

interface CategoryHeaderProps {
  /** Undefined when showing all products */
  category?: Category
}

const chipBase =
  'flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition-colors sm:px-5'

function CategoryHeader({ category }: CategoryHeaderProps) {
  const eyebrow = category?.collectionNumber
    ? `Collection ${category.collectionNumber} · ${SITE_NAME} Edit`
    : 'The Full Collection'

  return (
    <section className="flex flex-col justify-between gap-6 pb-8 pt-4 md:flex-row md:items-end">
      <div className="max-w-2xl">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-soft px-2.5 py-1">
          <span className="size-1.5 rounded-full bg-accent" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">
            {eyebrow}
          </span>
        </span>

        <h1 className="font-heading text-3xl tracking-tight text-primary md:text-[40px] md:leading-[48px]">
          {category?.name ?? 'All Products'}
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-relaxed text-secondary md:text-base">
          {category?.description ??
            'Discover thoughtfully selected pieces for every style and occasion.'}
        </p>
      </div>

      {/* Category switcher */}
      <nav
        aria-label="Categories"
        className="-mx-4 flex items-center gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((item) => {
          const isActive = item.slug === category?.slug

          return (
            <Link
              key={item.id}
              to={`/categories/${item.slug}`}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                chipBase,
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-soft text-primary hover:bg-border'
              )}
            >
              {item.name}
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none',
                  isActive ? 'bg-white/20' : 'bg-border text-secondary'
                )}
              >
                {item.productCount}
              </span>
            </Link>
          )
        })}

        <Link
          to="/products"
          aria-current={!category ? 'page' : undefined}
          className={cn(
            chipBase,
            'gap-1.5',
            !category
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'bg-soft text-secondary hover:bg-border hover:text-primary'
          )}
        >
          <SlidersHorizontal size={14} />
          View All
        </Link>
      </nav>
    </section>
  )
}

export default CategoryHeader
