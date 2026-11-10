import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">

        <div>
          <h2 className="font-heading text-2xl font-semibold">YourBrand</h2>
          <p className="mt-3 max-w-xs text-sm text-secondary">
            Discover thoughtfully selected products for every style and occasion.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Explore</h3>
          <div className="mt-3 flex flex-col gap-2 text-sm text-secondary">
            <Link to="/">Home</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/products">Shop</Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">My Account</h3>
          <div className="mt-3 flex flex-col gap-2 text-sm text-secondary">
            <Link to="/account/profile">My Profile</Link>
            <Link to="/account/orders">My Orders</Link>
            <Link to="/wishlist">Wishlist</Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Customer Support</h3>
          <p className="mt-3 text-sm text-secondary">
            Have questions? Contact our support team.
          </p>
        </div>
      </div>

      <div className="border-t border-border px-4 py-5 text-center text-xs text-secondary">
        © {new Date().getFullYear()} YourBrand. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer