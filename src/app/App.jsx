import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import StoreLayout from '../layouts/StoreLayout'
import Loader from '../components/ui/Loader'
import Wishlist from '@/features/wishlist/Wishlist'
import Cart from '@/features/cart/pages/Cart'

const HomePage = lazy(() => import('../features/home/pages/HomePage'))
const CategoryPage = lazy(() => import('../features/category/pages/category'))
const ProductListingPage = lazy(() =>
  import('../features/products/pages/ProductListingPage')
)
const NotFoundPage = lazy(() => import('../features/errors/pages/NotFoundPage'))

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<StoreLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/categories/:slug" element={<ProductListingPage />} />
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}

export default App
