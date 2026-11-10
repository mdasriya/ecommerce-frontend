
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Share2, ShoppingBag } from 'lucide-react'

import { wishlistItems as initialWishlistItems } from '@/features/wishlist/data/wishlist'
import WishlistProductCard from '@/features/wishlist/components/WishlistProductCard'
import type { WishlistItem } from '@/features/wishlist/types/wishlist.types'
import type { Product } from '@/features/products/types/product.types'

export default function Wishlist() {
  const [items, setItems] = useState<WishlistItem[]>(initialWishlistItems)
  const [activeCategory, setActiveCategory] = useState('All Items')

  // Get unique categories from wishlist products
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(items.map((item) => item.product.category)),
    ]

    return ['All Items', ...uniqueCategories]
  }, [items])

  // Filter products by selected category
  const filteredItems = useMemo(() => {
    if (activeCategory === 'All Items') {
      return items
    }

    return items.filter(
      (item) => item.product.category === activeCategory
    )
  }, [items, activeCategory])

  // Remove product from wishlist
  const handleRemove = (productId: number) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId)
    )
  }

  // Temporary handler until cart functionality is connected
  const handleAddToCart = (product: Product) => {
    console.log('Add to cart:', product)
  }

  return (
    <main className="min-h-screen bg-background px-4 pb-20 pt-32 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Breadcrumb */}
        {/* <div className="mb-8 text-sm text-secondary">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-primary">Wishlist</span>
        </div> */}

        {/* Page Heading */}
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            {/* <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Private Archive
            </p> */}

            <h1 className="font-serif text-4xl text-primary sm:text-5xl">
              My Wishlist
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-7 text-secondary">
              All the things you love, saved in one place. Curate your
              timeless personal collection for home and daily adornment.
            </p>

            <p className="mt-4 text-sm text-secondary">
              {items.length} {items.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => console.log('Share wishlist')}
              className="flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm text-primary transition hover:bg-soft"
            >
              <Share2 size={16} />
              Share Wishlist
            </button>

            <button
              type="button"
              disabled={items.length === 0}
              onClick={() => console.log('Move all to cart')}
              className="flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ShoppingBag size={16} />
              Move All to Cart
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8 flex flex-wrap gap-3 border-b border-border pb-5">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-lg px-5 py-2.5 text-sm transition ${
                activeCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-white text-primary hover:text-accent shadow-sm font-semibold'
              }`}
            >
              {category} (10)
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => (
              <WishlistProductCard
                key={item.id}
                product={item.product}
                onRemove={handleRemove}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <h2 className="font-serif text-3xl text-primary">
              Your Wishlist Is Waiting
            </h2>

            <p className="mt-3 text-sm text-secondary">
              Save your favourite pieces and they will appear here.
            </p>

            <Link
              to="/categories"
              className="mt-7 inline-flex rounded-full bg-primary px-7 py-3 text-sm text-white transition hover:opacity-90"
            >
              Explore Products
            </Link>
          </div>
        )}

      </div>
    </main>
  )
}
