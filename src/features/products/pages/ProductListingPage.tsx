import { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'

import EmptyState from '@/components/common/EmptyState'
import NewsletterSignup from '@/components/common/NewsletterSignup'
import { getCategoryBySlug } from '@/features/category/data/categories'
import type { Category } from '@/features/category/types/category.types'
import { products } from '../data/products'

import CategoryBreadcrumb from '../components/CategoryBreadcrumb'
import CategoryHeader from '../components/CategoryHeader'
import ProductToolbar, { type ActiveFilter } from '../components/ProductToolbar'
import ProductFilterSidebar from '../components/ProductFilterSidebar'
import ProductGrid from '../components/ProductGrid'
import MobileFilterDrawer from '../components/MobileFilterDrawer'
import ProductPagination from '../components/ProductPagination'
import ConsultationBanner from '../components/ConsultationBanner'

import useProductFilters from '../hooks/useProductFilters'
import type { ProductFilters, ProductSortOption } from '../types/product.types'

/** 12 fills complete rows in both the 3- and 4-column grids. */
const PAGE_SIZE = 12

const formatPrice = (value: number) => `₹${value.toLocaleString('en-IN')}`

/**
 * Handles /products (all products) and /categories/:slug.
 * Keyed by slug so filters, sorting and paging reset when the category changes.
 */
function ProductListingPage() {
  const { slug } = useParams<{ slug?: string }>()
  const category = getCategoryBySlug(slug)

  if (slug && !category) {
    return (
      <div className="px-4 pt-24 md:pt-28">
        <EmptyState
          title="Category not found"
          description="This collection doesn't exist or may have moved."
          actionLabel="Browse all products"
          actionLink="/products"
        />
      </div>
    )
  }

  return <ProductListing key={slug ?? 'all'} category={category} />
}

function ProductListing({ category }: { category?: Category }) {
  const {
    filters,
    setFilters,
    sortOption,
    setSortOption,
    filteredProducts,
    materialOptions,
    styleOptions,
    isPriceFiltered,
    minAvailablePrice,
    maxAvailablePrice,
    clearFilters,
  } = useProductFilters({ products, categorySlug: category?.slug })

  const [gridColumns, setGridColumns] = useState<3 | 4>(3)
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  // Any change to filters or sorting starts paging from the top again.
  const updateFilters = (next: ProductFilters) => {
    setFilters(next)
    setVisibleCount(PAGE_SIZE)
  }
  const updateSort = (next: ProductSortOption) => {
    setSortOption(next)
    setVisibleCount(PAGE_SIZE)
  }
  const resetFilters = () => {
    clearFilters()
    setVisibleCount(PAGE_SIZE)
  }
  const closeDrawer = useCallback(() => setIsFilterDrawerOpen(false), [])

  const visibleProducts = filteredProducts.slice(0, visibleCount)

  const activeFilters: ActiveFilter[] = [
    ...filters.materials.map((value) => ({
      id: `material-${value}`,
      label: value,
      onRemove: () =>
        updateFilters({
          ...filters,
          materials: filters.materials.filter((item) => item !== value),
        }),
    })),
    ...filters.styles.map((value) => ({
      id: `style-${value}`,
      label: value,
      onRemove: () =>
        updateFilters({
          ...filters,
          styles: filters.styles.filter((item) => item !== value),
        }),
    })),
    ...(isPriceFiltered
      ? [
          {
            id: 'price',
            label: `${formatPrice(filters.minPrice)} – ${formatPrice(filters.maxPrice)}`,
            onRemove: () =>
              updateFilters({
                ...filters,
                minPrice: minAvailablePrice,
                maxPrice: maxAvailablePrice,
              }),
          },
        ]
      : []),
    ...(filters.inStockOnly
      ? [
          {
            id: 'in-stock',
            label: 'In stock',
            onRemove: () => updateFilters({ ...filters, inStockOnly: false }),
          },
        ]
      : []),
  ]

  const filterProps = {
    filters,
    onFiltersChange: updateFilters,
    onReset: resetFilters,
    materialOptions,
    styleOptions,
    minAvailablePrice,
    maxAvailablePrice,
    craftNote: category?.craftNote,
  }

  return (
    // Top padding clears the fixed header (72px mobile / 80px desktop)
    <div className="px-4 pb-16 pt-[72px] text-primary md:px-8 md:pt-20">
      <div className="mx-auto max-w-7xl">
        <CategoryBreadcrumb categoryName={category?.name} />
        <CategoryHeader category={category} />
      </div>

      <ProductToolbar
        visibleCount={visibleProducts.length}
        totalCount={filteredProducts.length}
        sortOption={sortOption}
        onSortChange={updateSort}
        gridColumns={gridColumns}
        onGridColumnsChange={setGridColumns}
        onOpenFilters={() => setIsFilterDrawerOpen(true)}
        activeFilters={activeFilters}
        onClearFilters={resetFilters}
      />

      <div className="mx-auto max-w-7xl">
        <div className="flex items-start gap-8 py-8">
          <aside className="sticky top-40 hidden w-64 shrink-0 lg:block">
            <ProductFilterSidebar {...filterProps} />
          </aside>

          <div className="min-w-0 flex-1">
            <ProductGrid
              products={visibleProducts}
              gridColumns={gridColumns}
              onClearFilters={activeFilters.length > 0 ? resetFilters : undefined}
            />

            <ProductPagination
              visibleCount={visibleProducts.length}
              totalCount={filteredProducts.length}
              onLoadMore={() => setVisibleCount((count) => count + PAGE_SIZE)}
            />

            <ConsultationBanner
              title={category?.consultationTitle}
            />
          </div>
        </div>

        <NewsletterSignup />
      </div>

      <MobileFilterDrawer
        {...filterProps}
        isOpen={isFilterDrawerOpen}
        onClose={closeDrawer}
        resultCount={filteredProducts.length}
      />
    </div>
  )
}

export default ProductListingPage
