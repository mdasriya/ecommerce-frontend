
import { Link, NavLink } from 'react-router-dom'
import { Heart, Search, ShoppingBag, UserRound } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ANNOUNCEMENT, SITE_NAME } from '@/lib/site'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/products' },
  { label: 'Categories', to: '/categories' },
  { label: 'Wishlist', to: '/wishlist' },
]

const iconButton =
  'relative flex size-10 items-center justify-center rounded-full text-primary transition-colors hover:bg-soft'

function Header({ cartCount = 0 }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 w-full pt-4">
      <div className="mx-auto w-[90vw] overflow-hidden rounded-2xl border border-border bg-background/95 shadow-sm backdrop-blur-md">

        {/* Announcement bar */}
        {/* <div className="overflow-hidden border-b border-border bg-soft py-2">
          <div className="flex w-max animate-marquee motion-reduce:animate-none">
            {[0, 1].map((copy) => (
              <p
                key={copy}
                aria-hidden={copy === 1}
                className="shrink-0 whitespace-nowrap pr-16 text-[10px] font-medium uppercase tracking-[0.2em] text-secondary"
              >
                {ANNOUNCEMENT}
                <span className="px-8">·</span>
                {ANNOUNCEMENT}
              </p>
            ))}
          </div>
        </div> */}

        {/* Main bar */}
        <div className="flex h-14 items-center justify-between px-4 md:h-16 md:px-8">
          <Link
            to="/"
            className="font-heading text-xl font-semibold tracking-[0.12em] text-primary md:text-2xl"
          >
            {SITE_NAME}
          </Link>

          <nav
            aria-label="Main"
            className="hidden items-center gap-8 text-sm font-medium md:flex"
          >
            {navLinks.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  cn(
                    'transition-colors hover:text-accent',
                    isActive ? 'text-accent' : 'text-primary'
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="-mr-2 flex items-center">
            <button type="button" aria-label="Search" className={iconButton}>
              <Search size={20} strokeWidth={1.8} />
            </button>

            <Link to="/wishlist" aria-label="Wishlist" className={iconButton}>
              <Heart size={20} strokeWidth={1.8} />
            </Link>

            <Link
              to="/cart"
              aria-label={`Cart, ${cartCount} items`}
              className={iconButton}
            >
              <ShoppingBag size={20} strokeWidth={1.8} />
              {cartCount > 0 && (
                <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-accent text-[9px] font-semibold text-accent-foreground">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              to="/register"
              aria-label="Account"
              className={cn(iconButton, 'hidden md:flex')}
            >
              <UserRound size={20} strokeWidth={1.8} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
