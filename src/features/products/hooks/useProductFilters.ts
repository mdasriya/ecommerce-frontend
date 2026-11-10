import { useMemo, useState } from 'react'

import type {
  Product,
  ProductFilters,
  ProductSortOption,
  FilterOption,
} from '../types/product.types'

interface UseProductFiltersProps {
  products: Product[]
  categorySlug?: string
}

const countBy = (
  items: Product[],
  key: 'material' | 'style'
): FilterOption[] => {
  const counts = new Map<string, number>()

  for (const item of items) {
    const value = item[key]
    if (value) counts.set(value, (counts.get(value) ?? 0) + 1)
  }

  return [...counts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count)
}

const createDefaultFilters = (
  minPrice: number,
  maxPrice: number
): ProductFilters => ({
  materials: [],
  styles: [],
  minPrice,
  maxPrice,
  inStockOnly: false,
})

/**
 * Filtering + sorting for a product listing.
 *
 * State is initialised from the category's products, so render the consumer
 * with `key={categorySlug}` to start fresh when the category changes.
 */
function useProductFilters({ products, categorySlug }: UseProductFiltersProps) {
  // 1. Products in the selected category
  const categoryProducts = useMemo(
    () =>
      categorySlug
        ? products.filter((product) => product.categorySlug === categorySlug)
        : products,
    [products, categorySlug]
  )

  // 2. Available price range and filter options (with counts)
  const { minAvailablePrice, maxAvailablePrice } = useMemo(() => {
    if (categoryProducts.length === 0) {
      return { minAvailablePrice: 0, maxAvailablePrice: 0 }
    }

    const prices = categoryProducts.map((product) => product.price)
    return {
      minAvailablePrice: Math.min(...prices),
      maxAvailablePrice: Math.max(...prices),
    }
  }, [categoryProducts])

  const materialOptions = useMemo(
    () => countBy(categoryProducts, 'material'),
    [categoryProducts]
  )
  const styleOptions = useMemo(
    () => countBy(categoryProducts, 'style'),
    [categoryProducts]
  )

  // 3. Filter + sort state
  const [filters, setFilters] = useState<ProductFilters>(() =>
    createDefaultFilters(minAvailablePrice, maxAvailablePrice)
  )
  const [sortOption, setSortOption] =
    useState<ProductSortOption>('recommended')

  // 4. Apply filters and sorting
  const filteredProducts = useMemo(() => {
    const result = categoryProducts.filter((product) => {
      const matchesMaterial =
        filters.materials.length === 0 ||
        (product.material !== undefined &&
          filters.materials.includes(product.material))

      const matchesStyle =
        filters.styles.length === 0 ||
        (product.style !== undefined && filters.styles.includes(product.style))

      const matchesPrice =
        product.price >= filters.minPrice && product.price <= filters.maxPrice

      const matchesAvailability =
        !filters.inStockOnly || product.inStock === true

      return matchesMaterial && matchesStyle && matchesPrice && matchesAvailability
    })

    switch (sortOption) {
      case 'newest':
        return result.sort((a, b) => Number(b.isNew) - Number(a.isNew))
      case 'price-asc':
        return result.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return result.sort((a, b) => b.price - a.price)
      case 'bestselling':
        // Temporary popularity approximation using review count.
        return result.sort((a, b) => b.reviewCount - a.reviewCount)
      case 'recommended':
      default:
        return result.sort(
          (a, b) => Number(b.isFeatured) - Number(a.isFeatured)
        )
    }
  }, [categoryProducts, filters, sortOption])

  // 5. Active filter summary
  const isPriceFiltered =
    filters.minPrice > minAvailablePrice || filters.maxPrice < maxAvailablePrice

  const activeFilterCount =
    filters.materials.length +
    filters.styles.length +
    (filters.inStockOnly ? 1 : 0) +
    (isPriceFiltered ? 1 : 0)

  const clearFilters = () =>
    setFilters(createDefaultFilters(minAvailablePrice, maxAvailablePrice))

  return {
    categoryProducts,
    filters,
    setFilters,
    sortOption,
    setSortOption,
    filteredProducts,
    materialOptions,
    styleOptions,
    activeFilterCount,
    isPriceFiltered,
    minAvailablePrice,
    maxAvailablePrice,
    clearFilters,
  }
}

export default useProductFilters
