import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MoveUpRight,
} from 'lucide-react'
import { categories } from '@/features/category/data/categories'




function CategoriesPage() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

const handleSubscribe = (
  event: React.SyntheticEvent<HTMLFormElement>
) => {
  event.preventDefault()

  if (!email.trim()) return

  setSubscribed(true)
  setEmail('')
}

  const totalCollections = String(categories.length).padStart(2, '0')

  return (
    <div className="min-h-screen bg-background px-4 pb-16 pt-32 text-primary md:px-8">
      <div className="mx-auto w-full max-w-7xl">

        {/* Ambient background glow */}
        <div className="pointer-events-none fixed left-1/2 top-20 -z-0 h-80 w-[840px] -translate-x-1/2 rounded-full bg-[#DEC1A7]/15 blur-3xl" />

        <div className="relative z-10">

          {/* Breadcrumb */}
          {/* <nav
            aria-label="Breadcrumb"
            className="mb-12 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-secondary"
          >
            <Link
              to="/"
              className="flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Home size={14} />
              Home
            </Link>

            <span className="text-[#C4C7C7]">/</span>

            <span aria-current="page" className="text-primary">
              Categories
            </span>
          </nav> */}

          {/* Page Introduction */}
          <section className="mb-12 border-b border-border pb-8 md:mb-16">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

              <div className="max-w-2xl">
                <div className="mb-3 flex items-center gap-3">
                  <span className="h-px w-8 bg-accent" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">
                    Atelier Departments
                  </span>
                </div>

                <h1 className="font-heading text-4xl leading-tight tracking-tight md:text-5xl">
                  Explore All Categories
                </h1>

                <p className="mt-4 max-w-xl text-sm leading-7 text-secondary md:text-base">
                  Find something special for every style, occasion, and
                  moment. Thoughtfully selected objects designed to bring
                  beauty into everyday life.
                </p>
              </div>

              {/* Collection count */}
              <div className="flex w-fit items-center gap-3 rounded-lg border border-border bg-white px-4 py-3 shadow-sm">
                <span className="size-2 animate-pulse rounded-full bg-accent" />

                <span className="text-xs uppercase tracking-wider text-secondary">
                  <strong className="font-semibold text-primary">
                    {totalCollections}
                  </strong>{' '}
                  Active Collections
                </span>
              </div>
            </div>
          </section>

          {/* Category Cards */}
          <section aria-label="Collections" className="mb-16">
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:gap-10">

              {categories.map((category) => (
                <article
                  key={category.id}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all duration-500 hover:shadow-xl"
                >
                  {/* Image */}
                  <Link
                    to={`/categories/${category.slug}`}
                    className="relative block aspect-[4/3] overflow-hidden bg-soft"
                  >
                    <img
                      src={category.image}
                      alt={`${category.name} collection`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <span className="absolute left-4 top-4 rounded-md bg-white/90 px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-secondary shadow-sm backdrop-blur-md">
                      {category.badge}
                    </span>

                    <span className="absolute right-4 top-4 flex size-10 translate-y-1 items-center justify-center rounded-full bg-white/90 text-primary opacity-0 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <MoveUpRight size={19} />
                    </span>
                  </Link>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
                    <div>
                      <div className="mb-2 flex items-baseline justify-between gap-3">
                        <h2 className="font-heading text-2xl transition-colors duration-300 group-hover:text-accent">
                          {category.name}
                        </h2>

                        <span className="shrink-0 font-mono text-[10px] tracking-wider text-secondary">
                          COLLECTION // {category.collectionNumber}
                        </span>
                      </div>

                      <p className="line-clamp-2 text-sm leading-7 text-secondary">
                        {category.description}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-[#F0EEE9] pt-6">
                      <Link
                        to={`/categories/${category.slug}`}
                        className="group/link inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-accent"
                      >
                        Explore {category.name}

                        <ArrowRight
                          size={17}
                          className="transition-transform duration-300 group-hover/link:translate-x-1"
                        />
                      </Link>

                      <span className="text-[10px] uppercase tracking-widest text-secondary">
                        {category.productCount} Pieces
                      </span>
                    </div>
                  </div>
                </article>
              ))}

            </div>
          </section>

          {/* Editorial Banner */}
          <section className="relative mb-16 overflow-hidden rounded-2xl border border-border bg-[#EEEAE2] shadow-sm">

            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0oNtVDADI7ZKPNgFLOZzU9u8N4Gu2PpoKNY7jjca049y06-skdLPRDeswMS4Tx6-ca3-akWZjz3QDmJHqoIyhohBJHp0NY-K90rhP9m61JIFoiZjmDIkDhOyzX5cLhuos8WetImpHVc5AhQ96VFQkKv9Vpo0sRwire3Gu96eI3W2ClL9N_Q_xeny7C9UVga75dxNt65sNz_ij5jJXvrHLFmO8ouZnpetlOTZTKYOu"
              alt="Warm and peaceful lifestyle interior"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-multiply"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#EEEAE2] via-[#EEEAE2]/95 to-[#EEEAE2]/60" />

            <div className="relative z-10 max-w-2xl px-7 py-14 sm:px-12 sm:py-20 md:px-16">
              <span className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-secondary">
                <span className="size-1.5 rounded-full bg-accent" />
                The Atelier Experience
              </span>

              <h2 className="font-heading text-3xl leading-tight tracking-tight md:text-5xl">
                Something Special Is Waiting
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-secondary md:text-base">
                Take a moment to explore and discover your next favourite.
                From beautiful accessories to meaningful home pieces,
                each creation has a story.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/products"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-7 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#383838]"
                >
                  Start Shopping
                  <ArrowRight size={17} />
                </Link>

                <Link
                  to="/"
                  className="inline-flex h-12 items-center justify-center rounded-lg px-6 text-sm font-semibold text-primary transition-colors hover:bg-white/50"
                >
                  Our Philosophy
                </Link>
              </div>
            </div>
          </section>

          {/* Newsletter */}
          <section className="relative overflow-hidden rounded-2xl border border-border bg-white px-6 py-12 text-center shadow-sm sm:px-12 lg:px-16">

            <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-[#DEC1A7]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 size-72 rounded-full bg-[#EEEAE2]/70 blur-3xl" />

            <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center">

              <div className="mb-5 flex size-12 items-center justify-center rounded-full bg-soft text-accent">
                <Mail size={23} />
              </div>

              <span className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-secondary">
                Stay In The Circle
              </span>

              <h2 className="font-heading text-3xl tracking-tight md:text-4xl">
                A Little Inspiration in Your Inbox
              </h2>

              <p className="mb-8 mt-4 max-w-md text-sm leading-7 text-secondary">
                Be the first to discover new arrivals, updates, and
                special collections.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 rounded-lg bg-soft px-6 py-4 text-sm text-primary">
                  <CheckCircle2 size={18} className="text-accent" />
                  Thank you for subscribing!
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter your email address"
                    aria-label="Email address"
                    required
                    className="h-12 min-w-0 flex-1 rounded-lg border border-border bg-white px-4 text-sm outline-none transition-colors placeholder:text-secondary/70 focus:border-primary"
                  />

                  <button
                    type="submit"
                    className="h-12 shrink-0 rounded-lg bg-primary px-7 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#383838]"
                  >
                    Subscribe
                  </button>
                </form>
              )}

              <p className="mt-5 text-[11px] text-secondary">
                By signing up, you agree to our{' '}
                <Link to="/privacy-policy" className="underline hover:text-primary">
                  Privacy Policy
                </Link>
                . Unsubscribe at any time.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}

export default CategoriesPage
