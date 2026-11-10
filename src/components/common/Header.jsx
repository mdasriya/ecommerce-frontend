
import { Link } from 'react-router-dom'
import {
  Search,
  Heart,
  ShoppingBag,
  UserRound,
} from 'lucide-react'

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4">
      <div className="mx-auto flex w-[90%] max-w-7xl items-center justify-between rounded-2xl border border-border bg-white/95 px-6 py-4 shadow-sm backdrop-blur-md">

        {/* Logo */}
        <Link
          to="/"
          className="font-heading text-2xl font-semibold text-primary"
        >
          YourBrand
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <Link to="/" className="hover:text-accent">Home</Link>
          <Link to="/categories" className="hover:text-accent">Categories</Link>
          <Link to="/products" className="hover:text-accent">Shop</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button aria-label="Search">
            <Search size={20} />
          </button>

          <Link to="/wishlist" aria-label="Wishlist">
            <Heart size={20} />
          </Link>

          <Link to="/account/cart" aria-label="Cart">
            <ShoppingBag size={20} />
          </Link>

          <Link to="/account/profile" aria-label="Account">
            <UserRound size={20} />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
