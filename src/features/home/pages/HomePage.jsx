import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BadgeCheck,
  Gem,
  Headset,
  LockKeyhole,
  Mail,
  Sparkles,
  Truck,
} from 'lucide-react'
import ProductCard from '@/components/common/ProductCard'
import SectionHeading from '@/components/common/SectionHeading'
import { featuredProducts as products } from '@/features/products/data/products'
import { categories } from '@/features/category/data/categories'
import { cn } from '@/lib/utils'

const HERO_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuARKK3_IbrV0cAirNHKl_i0dtLi_UJfCLlpArgcDcSZyo4Mwq1XV_VgFJLON7ZRmjyyJ1H-pONUUQLb_6OUUsqg7wCPEEQ2oAsiCOTh-u46a3c0-istlnE0BnvIboB057Da9uXepHmjGE-dvsfT1yV42jCSp566d6oaR1N-zvwaJ167G7PSxekxyCcklYiPWCGE5ucmtFXyz16_VzzvTNepu7ZXhDbHCylvO0bySMlf'

const EDITORIAL_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAVQTMq67_nWKYDHN82rvaGfyVmIXen37l_6wrADpJDIhiBoYh6LMDtIX6UnUNnHVqtQB3RgbiBfm68fXCvV9IH7EFocDsb-hPJHxbzETQpG83-PHsORKElC75AwZQjohnQh0G9v3PAMeP7OwJpAf-Sxz2M9PtQ5-8pUTFZXvu0QeP1Si0BqtPLOj8JqsSvJSwq3qL0Ty0uUwDQDTgvXdVCuvb5OPHN0QnEos7eFiQX'

const stats = [
  { label: 'Edition', value: '01 / 02 Curated', icon: Sparkles },
  { label: 'Integrity', value: '100% Artisanal', icon: Gem },
]

const features = [
  {
    title: 'Carefully Selected',
    icon: BadgeCheck,
    description: 'Sourced from independent artisans for enduring craftsmanship.',
  },
  {
    title: 'Secure Payments',
    icon: LockKeyhole,
    description: 'End-to-end encrypted checkout for complete peace of mind.',
  },
  {
    title: 'Reliable Delivery',
    icon: Truck,
    description: 'Eco-conscious packaging with tracking on every order.',
  },
  {
    title: 'Customer Care',
    icon: Headset,
    description: 'Personal assistance and styling advice whenever you need it.',
  },
]

const categoryCounts = products.reduce((acc, { category }) => {
  acc[category] = (acc[category] ?? 0) + 1
  return acc
}, {})

const filters = [
  { label: 'All Selections', value: 'all', count: products.length },
  ...Object.entries(categoryCounts).map(([category, count]) => ({
    label: category,
    value: category,
    count,
  })),
]

// Shared CTA styles
const ctaBase =
  'inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-xs font-semibold uppercase tracking-[0.15em] transition-colors'
const sectionX = 'px-4 md:px-8'
const container = 'mx-auto max-w-full'

function HomePage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [subscribed, setSubscribed] = useState(false)

  const visibleProducts =
    activeFilter === 'all'
      ? products
      : products.filter((p) => p.category === activeFilter)

  const handleSubscribe = (e) => {
    e.preventDefault()
    e.currentTarget.reset()
    setSubscribed(true)
  }

  return (
    <>
      {/* Hero */}
      <section>
        <div
          className='relative flex min-h-[460px] items-end overflow-hidden  bg-soft sm:min-h-[520px] lg:min-h-[600px] lg:items-center'
        >
          <img
            src={HERO_IMAGE}
            alt=""
            fetchPriority="high"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/5 lg:bg-gradient-to-r lg:from-black/65 lg:via-black/30 lg:to-transparent" />

          <div className="relative z-10 w-full p-5 text-white sm:p-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-white" />
              New Season Arrival
            </span>

            <h1 className="mt-4 font-heading text-[2rem] leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Discover Your Everyday Favourites
            </h1>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
              Explore thoughtfully selected products that bring personality,
              style, and inspiration to your everyday life.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/products"
                className={cn(
                  ctaBase,
                  'bg-primary text-primary-foreground hover:bg-primary/85'
                )}
              >
                Explore Collection
              </Link>
              <Link
                to="/products"
                className={cn(
                  ctaBase,
                  'border border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20'
                )}
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={cn(sectionX, 'pt-3 md:pt-4')}>
        <div className={cn(container, 'grid grid-cols-2 gap-3 md:gap-4')}>
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3 sm:p-4 md:p-5"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-soft text-accent md:size-11">
                <Icon size={16} strokeWidth={1.8} />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-secondary md:text-[10px]">
                  {label}
                </p>
                <p className="text-[13px] font-semibold leading-snug text-primary md:text-base">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className={cn(sectionX, 'pt-12 md:pt-20')}>
        <div className={container}>
          <SectionHeading
            title="Explore Categories"
            description="Find something that feels just right for you."
            action={
              <span className="shrink-0 pb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-secondary">
                {categories.length} Lines
              </span>
            }
          />

          <div className="grid grid-cols-2 gap-3 md:gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                to={`/categories/${category.slug}`}
                className="group flex flex-col"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-soft md:aspect-[4/3]">
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-2.5 top-2.5 rounded-sm bg-surface/90 px-2 py-1 text-[9px] font-semibold uppercase leading-none tracking-wider text-primary backdrop-blur-sm md:left-4 md:top-4">
                    Category {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="mt-3 font-heading text-lg text-primary md:text-2xl">
                  {category.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-secondary md:text-sm">
                  {category.description}
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors group-hover:text-accent md:text-sm">
                  Explore {category.name}
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Handpicked products */}
      <section className={cn(sectionX, 'pt-12 md:pt-20')}>
        <div className={container}>
          <SectionHeading
            title="Handpicked for You"
            description="Explore some of our favourite picks."
            className="mb-4"
          />

          <div
            role="group"
            aria-label="Filter products"
            className="-mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:mb-8 md:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {filters.map(({ label, value, count }) => {
              const active = activeFilter === value
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveFilter(value)}
                  className={cn(
                    'shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-colors',
                    active
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-surface text-primary hover:border-primary'
                  )}
                >
                  {label} ({count})
                </button>
              )
            })}
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 md:gap-x-6 md:gap-y-10 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 flex justify-center md:mt-12">
            <Link
              to="/products"
              className={cn(
                ctaBase,
                'w-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground md:w-auto md:px-10'
              )}
            >
              Discover All Products ({products.length})
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial banner */}
      <section className={cn(sectionX, 'pt-14 md:pt-20')}>
        <div
          className={cn(
            container,
            'relative flex min-h-[420px] items-end overflow-hidden rounded-2xl bg-soft md:min-h-[520px] md:items-center'
          )}
        >
          <img
            src={EDITORIAL_IMAGE}
            alt=""
            loading="lazy"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent md:bg-gradient-to-r md:from-black/65 md:via-black/30" />

          <div className="relative z-10 p-5 text-white sm:p-8 md:max-w-lg md:p-14">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/75">
              Editorial Feature
            </span>
            <h2 className="mt-2 font-heading text-3xl leading-tight tracking-tight md:text-5xl">
              Made to Match Your Style
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/85 md:text-base">
              Explore products that make everyday moments feel a little more
              special.
            </p>
            <Link
              to="/about"
              className={cn(
                ctaBase,
                'mt-6 border border-white/70 text-white hover:bg-white hover:text-primary'
              )}
            >
              Discover the Story
            </Link>
          </div>
        </div>
      </section>

      {/* Why shop with us */}
      <section className={cn(sectionX, 'pt-14 md:pt-20')}>
        <div className={container}>
          <SectionHeading
            title="Shopping Made Simple"
            description="Understated excellence and thoughtful execution at every step."
          />

          <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4">
            {features.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="flex flex-col rounded-xl border border-border bg-surface p-4 md:p-6"
              >
                <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-soft text-accent md:mb-4 md:size-10">
                  <Icon size={18} strokeWidth={1.8} />
                </div>
                <h3 className="text-sm font-semibold text-primary md:text-base">
                  {title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-secondary md:text-sm">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className={cn(sectionX, 'py-14 md:py-20')}>
        <div
          className={cn(
            container,
            'rounded-2xl border border-border bg-surface p-6 sm:p-10 md:p-14'
          )}
        >
          <div className="max-w-xl md:mx-auto md:text-center">
            <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-soft text-accent md:mx-auto">
              <Mail size={18} strokeWidth={1.8} />
            </div>

            <h2 className="font-heading text-2xl leading-tight tracking-tight text-primary md:text-4xl">
              A Little Inspiration in Your Inbox
            </h2>
            <p className="mt-2 text-sm text-secondary">
              Be the first to discover new arrivals, updates, and special
              collections.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="mt-6 flex flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                autoComplete="email"
                placeholder="Enter your email address"
                className="h-12 w-full min-w-0 rounded-lg sm:flex-1 border border-border bg-background px-4 text-sm text-primary placeholder:text-secondary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
              <button
                type="submit"
                className={cn(
                  ctaBase,
                  'shrink-0 bg-primary px-8 text-primary-foreground hover:bg-primary/85'
                )}
              >
                Subscribe
              </button>
            </form>

            <p role="status" className="mt-3 text-[11px] text-secondary">
              {subscribed
                ? 'Thank you for subscribing!'
                : 'We respect your privacy. Unsubscribe at any time.'}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
