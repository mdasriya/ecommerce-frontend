import { Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import StoreLayout from '../layouts/StoreLayout'
import AuthLayout from '../layouts/AuthLayout'
import Loader from '../components/ui/Loader'
import Wishlist from '@/features/wishlist/Wishlist'
import Cart from '@/features/cart/pages/Cart'
import Checkout from '@/features/cart/checkout/Checkout'
import OrderConfirmation from '@/features/cart/confirmation/OrderConfirmation'
import MyOrders from '@/features/orders/pages/MyOrders'
import MyProfile from '@/features/profile/pages/MyProfile'
import Register from '@/features/auth/Register/Register'
import SignIn from '@/features/auth/signIn/SignIn'
import ForgotPassword from '@/features/auth/ForgotPassword/ForgotPassword'
import ResetPassword from '@/features/auth/ResetPassword/ResetPassword'

const HomePage = lazy(() => import('../features/home/pages/HomePage'))
const CategoryPage = lazy(() => import('../features/category/pages/category'))
const ProductListingPage = lazy(() =>
  import('../features/products/pages/ProductListingPage')
)
const NotFoundPage = lazy(() => import('../features/errors/pages/NotFoundPage'))

function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

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
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/my-profile" element={<MyProfile />} />
        </Route>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}

export default App
