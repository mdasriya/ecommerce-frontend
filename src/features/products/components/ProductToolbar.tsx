import { Columns4, LayoutGrid, ListFilter, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import Select, { type SelectOption } from '@/components/ui/Select'
import type { ProductSortOption } from '../types/product.types'

export interface ActiveFilter {
  id: string
  label: string
  onRemove: () => void
}

interface ProductToolbarProps {
  visibleCount: number
  totalCount: number
  sortOption: ProductSortOption
  onSortChange: (value: ProductSortOption) => void
  gridColumns: 3 | 4
  onGridColumnsChange: (value: 3 | 4) => void
  onOpenFilters: () => void
  activeFilters: ActiveFilter[]
  onClearFilters: () => void
}

const sortOptions: SelectOption<ProductSortOption>[] = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'newest', label: 'Newest Additions' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'bestselling', label: "Curator's Choice" },
]

const gridButtons = [
  { columns: 3 as const, label: '3 column grid', icon: LayoutGrid },
  { columns: 4 as const, label: '4 column grid', icon: Columns4 },
]

function ProductToolbar({
  visibleCount,
  totalCount,
  sortOption,
  onSortChange,
  gridColumns,
  onGridColumnsChange,
  onOpenFilters,
  activeFilters,
  onClearFilters,
}: ProductToolbarProps) {
  return (
    // Sticks just below the fixed header (72px mobile / 80px desktop)
    <div className="sticky top-[72px] z-30 -mx-4 bg-background/95 px-4 py-3 shadow-[0_1px_0_var(--border)] backdrop-blur-md md:top-20 md:-mx-8 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        {/* Left: mobile filter trigger + count */}
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onOpenFilters}
            className="flex shrink-0 items-center gap-2 rounded-lg bg-soft px-3 py-2 text-xs font-medium text-primary transition-colors hover:bg-border lg:hidden"
          >
            <ListFilter size={16} />
            Filters
            {activeFilters.length > 0 && ` (${activeFilters.length})`}
          </button>

          <p className="flex min-w-0 items-center gap-2 text-xs text-secondary">
            <span className="hidden size-2 shrink-0 rounded-full bg-accent sm:block" />
            <span className="truncate">
              <span className="hidden sm:inline">Showing </span>
              <span className="font-semibold text-primary">{visibleCount}</span>{' '}
              of {totalCount}
              <span className="hidden sm:inline"> pieces</span>
            </span>
          </p>
        </div>

        {/* Right: active pills, sort, grid toggle */}
        <div className="flex shrink-0 items-center gap-3">
          {activeFilters.length > 0 && (
            <>
              <div className="hidden items-center gap-2 xl:flex">
                {activeFilters.map((filter) => (
                  <span
                    key={filter.id}
                    className="flex items-center gap-1.5 rounded bg-soft px-2.5 py-1 text-[11px] font-medium text-primary"
                  >
                    {filter.label}
                    <button
                      type="button"
                      onClick={filter.onRemove}
                      aria-label={`Remove ${filter.label} filter`}
                      className="flex items-center transition-colors hover:text-destructive"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
                <button
                  type="button"
                  onClick={onClearFilters}
                  className="px-1 text-[11px] font-medium text-accent hover:underline"
                >
                  Clear all
                </button>
              </div>
              <div className="hidden h-4 w-px bg-border xl:block" />
            </>
          )}

          <Select
            value={sortOption}
            onValueChange={onSortChange}
            options={sortOptions}
            ariaLabel="Sort products"
            prefix="Sort:"
            menuTitle="Sort by"
          />

          <div className="hidden items-center gap-0.5 rounded-lg bg-soft p-1 lg:flex">
            {gridButtons.map(({ columns, label, icon: Icon }) => (
              <button
                key={columns}
                type="button"
                aria-label={label}
                aria-pressed={gridColumns === columns}
                onClick={() => onGridColumnsChange(columns)}
                className={cn(
                  'flex items-center justify-center rounded p-1 transition-all',
                  gridColumns === columns
                    ? 'bg-surface text-primary shadow-sm'
                    : 'text-secondary hover:text-primary'
                )}
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductToolbar
