import { NavLink } from 'react-router-dom'
import { Heart, House, Store, UserRound } from 'lucide-react'
import { cn } from '@/lib/utils'

const items = [
  { label: 'Home', to: '/', icon: House },
  { label: 'Shop', to: '/products', icon: Store },
  { label: 'Wishlist', to: '/wishlist', icon: Heart },
  { label: 'Account', to: '/account', icon: UserRound },
]

export default function MobileBottomNav() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
    >
      <ul className="grid grid-cols-4">
        {items.map(({ label, to, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors',
                  isActive ? 'text-primary' : 'text-secondary hover:text-primary'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={20} strokeWidth={isActive ? 2.2 : 1.6} />
                  {label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
