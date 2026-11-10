import { useState, type ReactNode } from 'react'
import { ChevronDown, Leaf } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { FilterOption, ProductFilters } from '../types/product.types'

export type { ProductFilters }

interface ProductFilterSidebarProps {
  filters: ProductFilters
  onFiltersChange: (filters: ProductFilters) => void
  onReset: () => void
  materialOptions: FilterOption[]
  styleOptions: FilterOption[]
  minAvailablePrice: number
  maxAvailablePrice: number
  craftNote?: string
  /** Hide the "Refine Selection" title when the container has its own (drawer) */
  showHeading?: boolean
}

const formatPrice = (value: number) => `₹${value.toLocaleString('en-IN')}`

/** Round to a "nice" price step for the quick-select buttons. */
const roundTo = (value: number, step = 500) => Math.round(value / step) * step

function FilterGroup({
  title,
  aside,
  children,
  collapsible = true,
}: {
  title: string
  aside?: ReactNode
  children: ReactNode
  collapsible?: boolean
}) {
  const [open, setOpen] = useState(true)

  return (
    <div className="space-y-3 rounded-xl bg-soft/60 p-4">
      <div className="flex items-center justify-between gap-2">
        {collapsible ? (
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            className="flex w-full items-center justify-between text-left text-sm font-semibold text-primary"
          >
            {title}
            <ChevronDown
              size={16}
              className={cn(
                'text-secondary transition-transform',
                open && 'rotate-180'
              )}
            />
          </button>
        ) : (
          <>
            <span className="text-sm font-semibold text-primary">{title}</span>
            {aside}
          </>
        )}
      </div>
      {(open || !collapsible) && children}
    </div>
  )
}

function CheckboxList({
  options,
  selected,
  onToggle,
}: {
  options: FilterOption[]
  selected: string[]
  onToggle: (value: string) => void
}) {
  return (
    <div className="space-y-2 pt-1">
      {options.map(({ value, count }) => (
        <label
          key={value}
          className="flex cursor-pointer items-center justify-between gap-2 text-sm text-secondary transition-colors hover:text-primary"
        >
          <span className="flex items-center gap-2.5">
            <input
              type="checkbox"
              checked={selected.includes(value)}
              onChange={() => onToggle(value)}
              className="size-4 cursor-pointer rounded accent-primary"
            />
            {value}
          </span>
          <span className="text-[11px] opacity-60">{count}</span>
        </label>
      ))}
    </div>
  )
}

function ProductFilterSidebar({
  filters,
  onFiltersChange,
  onReset,
  materialOptions,
  styleOptions,
  minAvailablePrice,
  maxAvailablePrice,
  craftNote,
  showHeading = true,
}: ProductFilterSidebarProps) {
  const toggleOption = (key: 'materials' | 'styles', value: string) => {
    const current = filters[key]
    onFiltersChange({
      ...filters,
      [key]: current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    })
  }

  const setPriceRange = (minPrice: number, maxPrice: number) =>
    onFiltersChange({ ...filters, minPrice, maxPrice })

  const midPrice = roundTo((minAvailablePrice + maxAvailablePrice) / 2)
  const quickRanges = [
    { label: `Under ${formatPrice(midPrice)}`, min: minAvailablePrice, max: midPrice },
    { label: `${formatPrice(midPrice)}+`, min: midPrice, max: maxAvailablePrice },
  ]
  const hasPriceRange = maxAvailablePrice > minAvailablePrice

  return (
    <div className="space-y-4">
      {showHeading && (
        <div className="flex items-center justify-between pb-1">
          <h2 className="text-lg font-semibold text-primary">Refine Selection</h2>
          <button
            type="button"
            onClick={onReset}
            className="text-[11px] font-semibold uppercase tracking-wider text-accent hover:underline"
          >
            Reset
          </button>
        </div>
      )}

      {materialOptions.length > 0 && (
        <FilterGroup title="Material">
          <CheckboxList
            options={materialOptions}
            selected={filters.materials}
            onToggle={(value) => toggleOption('materials', value)}
          />
        </FilterGroup>
      )}

      {styleOptions.length > 0 && (
        <FilterGroup title="Silhouette">
          <CheckboxList
            options={styleOptions}
            selected={filters.styles}
            onToggle={(value) => toggleOption('styles', value)}
          />
        </FilterGroup>
      )}

      {hasPriceRange && (
        <FilterGroup
          title="Price Bracket"
          collapsible={false}
          aside={
            <span className="text-[11px] font-medium text-accent">
              {formatPrice(filters.minPrice)} — {formatPrice(filters.maxPrice)}
            </span>
          }
        >
          <div className="pt-1">
            <label htmlFor="price-max" className="sr-only">
              Maximum price
            </label>
            <input
              id="price-max"
              type="range"
              min={minAvailablePrice}
              max={maxAvailablePrice}
              step={100}
              value={filters.maxPrice}
              onChange={(event) =>
                setPriceRange(
                  filters.minPrice,
                  Math.max(Number(event.currentTarget.value), filters.minPrice)
                )
              }
              className="h-1.5 w-full cursor-pointer accent-primary"
            />
            <div className="flex justify-between pt-2 text-[11px] text-secondary">
              <span>{formatPrice(minAvailablePrice)}</span>
              <span>{formatPrice(midPrice)}</span>
              <span>{formatPrice(maxAvailablePrice)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {quickRanges.map((range) => {
              const active =
                filters.minPrice === range.min && filters.maxPrice === range.max
              return (
                <button
                  key={range.label}
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    active
                      ? setPriceRange(minAvailablePrice, maxAvailablePrice)
                      : setPriceRange(range.min, range.max)
                  }
                  className={cn(
                    'rounded px-2 py-1.5 text-center text-[11px] font-medium transition-colors',
                    active
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-surface text-primary hover:bg-border'
                  )}
                >
                  {range.label}
                </button>
              )
            })}
          </div>
        </FilterGroup>
      )}

      <div className="rounded-xl bg-soft/60 p-4">
        <label className="flex cursor-pointer items-center justify-between gap-2 text-xs font-medium text-primary">
          In Stock, Ready to Ship
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(event) =>
              onFiltersChange({
                ...filters,
                inStockOnly: event.currentTarget.checked,
              })
            }
            className="size-4 cursor-pointer rounded accent-primary"
          />
        </label>
      </div>

      {craftNote && (
        <div className="space-y-2 rounded-xl bg-soft p-4">
          <div className="flex items-center gap-2 text-accent">
            <Leaf size={16} />
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              Craft Guarantee
            </span>
          </div>
          <p className="text-[11px] leading-relaxed text-secondary">{craftNote}</p>
        </div>
      )}
    </div>
  )
}

export default ProductFilterSidebar
