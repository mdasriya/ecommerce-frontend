import { Link } from 'react-router-dom'
import { Menu, Search, Heart, ShoppingBag, Mail, Share, Globe, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProductCard from '@/components/common/ProductCard'

function HomePage() {
  const products = [
    {
      id: 1,
      name: 'Pearl Drop Earrings',
      slug: 'pearl-drop-earrings',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC9-NciIuCq_DBK_oUFrIRR7HXvm9LWfyVLsfySLmXIEiAo3levcho1ftpXwOGzVtdC9HyR1rK15iBIh1YAmnM2QYUjWz-vl4cVL7sfBE_mAlJ7A9XhWOAey0M1LDeFO411SlgI_ieXqcGSQPMW6VBbNb2sZ-hiq-EWGGu3WlZ0_c1mFdSf4S1wWSPeVSBOJotBXA3osg7HgFJOolc3QLPiY2sARu4D3oND98izFm8c',
      category: 'Earrings',
      price: 4500,
      originalPrice: 6500,
      rating: 4.8,
      reviewCount: 128,
      isNew: true,
    },
    {
      id: 2,
      name: 'Modern Frames',
      slug: 'modern-frames',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBKtvBaOYkKvRSLMWDtcayVQk7dElJGTOR_a7Iq98nq0EY1mMy7bU5qBzkcpqja4Gvug8irg3htzbL6yZ07Iio-Bkj_mR1bJtjfe0HPkbtfh_mSO4ktkvEuNelxFANNRQn2D7vRlamhFbNOru4kfOuMKjmZR0ugHuukL2kcaTbI-efJNv7VFIvs0aoCaZ4r7JWlL14PpUbYPZeDs3hsJRvATp0FSXwKszjkPEy7dFsa',
      category: 'Frames',
      price: 3200,
      originalPrice: 4800,
      rating: 4.5,
      reviewCount: 92,
    },
    {
      id: 3,
      name: 'Silhouette Pendant',
      slug: 'silhouette-pendant',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC9-NciIuCq_DBK_oUFrIRR7HXvm9LWfyVLsfySLmXIEiAo3levcho1ftpXwOGzVtdC9HyR1rK15iBIh1YAmnM2QYUjWz-vl4cVL7sfBE_mAlJ7A9XhWOAey0M1LDeFO411SlgI_ieXqcGSQPMW6VBbNb2sZ-hiq-EWGGu3WlZ0_c1mFdSf4S1wWSPeVSBOJotBXA3osg7HgFJOolc3QLPiY2sARu4D3oND98izFm8c',
      category: 'Necklaces',
      price: 2800,
      originalPrice: 4200,
      rating: 4.7,
      reviewCount: 67,
      isNew: true,
    },
    {
      id: 4,
      name: 'Artisan Profile',
      slug: 'artisan-profile',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBKtvBaOYkKvRSLMWDtcayVQk7dElJGTOR_a7Iq98nq0EY1mMy7bU5qBzkcpqja4Gvug8irg3htzbL6yZ07Iio-Bkj_mR1bJtjfe0HPkbtfh_mSO4ktkvEuNelxFANNRQn2D7vRlamhFbNOru4kfOuMKjmZR0ugHuukL2kcaTbI-efJNv7VFIvs0aoCaZ4r7JWlL14PpUbYPZeDs3hsJRvATp0FSXwKszjkPEy7dFsa',
      category: 'Frames',
      price: 3500,
      originalPrice: 5200,
      rating: 4.3,
      reviewCount: 45,
    },
    {
      id: 5,
      name: 'Gold Chain Link',
      slug: 'gold-chain-link',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC9-NciIuCq_DBK_oUFrIRR7HXvm9LWfyVLsfySLmXIEiAo3levcho1ftpXwOGzVtdC9HyR1rK15iBIh1YAmnM2QYUjWz-vl4cVL7sfBE_mAlJ7A9XhWOAey0M1LDeFO411SlgI_ieXqcGSQPMW6VBbNb2sZ-hiq-EWGGu3WlZ0_c1mFdSf4S1wWSPeVSBOJotBXA3osg7HgFJOolc3QLPiY2sARu4D3oND98izFm8c',
      category: 'Necklaces',
      price: 5800,
      originalPrice: 8500,
      rating: 4.9,
      reviewCount: 234,
      isNew: true,
    },
    {
      id: 6,
      name: 'Diamond Studs',
      slug: 'diamond-studs',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBKtvBaOYkKvRSLMWDtcayVQk7dElJGTOR_a7Iq98nq0EY1mMy7bU5qBzkcpqja4Gvug8irg3htzbL6yZ07Iio-Bkj_mR1bJtjfe0HPkbtfh_mSO4ktkvEuNelxFANNRQn2D7vRlamhFbNOru4kfOuMKjmZR0ugHuukL2kcaTbI-efJNv7VFIvs0aoCaZ4r7JWlL14PpUbYPZeDs3hsJRvATp0FSXwKszjkPEy7dFsa',
      category: 'Earrings',
      price: 7200,
      originalPrice: 9800,
      rating: 5.0,
      reviewCount: 312,
    },
    {
      id: 7,
      name: 'Minimalist Band',
      slug: 'minimalist-band',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC9-NciIuCq_DBK_oUFrIRR7HXvm9LWfyVLsfySLmXIEiAo3levcho1ftpXwOGzVtdC9HyR1rK15iBIh1YAmnM2QYUjWz-vl4cVL7sfBE_mAlJ7A9XhWOAey0M1LDeFO411SlgI_ieXqcGSQPMW6VBbNb2sZ-hiq-EWGGu3WlZ0_c1mFdSf4S1wWSPeVSBOJotBXA3osg7HgFJOolc3QLPiY2sARu4D3oND98izFm8c',
      category: 'Rings',
      price: 3800,
      originalPrice: 5500,
      rating: 4.6,
      reviewCount: 89,
      isNew: true,
    },
    {
      id: 8,
      name: 'Signature Watch',
      slug: 'signature-watch',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBKtvBaOYkKvRSLMWDtcayVQk7dElJGTOR_a7Iq98nq0EY1mMy7bU5qBzkcpqja4Gvug8irg3htzbL6yZ07Iio-Bkj_mR1bJtjfe0HPkbtfh_mSO4ktkvEuNelxFANNRQn2D7vRlamhFbNOru4kfOuMKjmZR0ugHuukL2kcaTbI-efJNv7VFIvs0aoCaZ4r7JWlL14PpUbYPZeDs3hsJRvATp0FSXwKszjkPEy7dFsa',
      category: 'Accessories',
      price: 8500,
      originalPrice: 12000,
      rating: 4.8,
      reviewCount: 156,
    },
  ]
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="bg-surface-container-high py-2 px-4 text-center text-xs uppercase tracking-wider text-secondary">
          Discover something special. Shop your favourites today.
        </div>
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              aria-label="Toggle menu"
              className="md:hidden flex items-center justify-center p-1 rounded hover:bg-accent hover:text-surface transition-colors"
            >
              <Menu size={24} />
            </button>
            <Link
              to="/"
              className="flex items-center gap-3 font-heading text-2xl font-semibold tracking-tight text-primary"
            >
              <span className="font-heading text-2xl font-semibold">BRAND</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/" className="hover:text-accent">Home</Link>
            <Link to="/shop" className="hover:text-accent">Shop</Link>
            <Link to="/categories" className="hover:text-accent">Categories</Link>
            <Link to="/about-us" className="hover:text-accent">About Us</Link>
            <Link to="/contact" className="hover:text-accent">Contact</Link>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              aria-label="Search"
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-accent hover:text-surface transition-colors"
            >
              <Search size={20} />
            </button>
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-accent hover:text-surface transition-colors"
            >
              <Heart size={20} />
            </Link>
            <Link
              to="/cart"
              aria-label="Cart"
              className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-accent hover:text-surface transition-colors"
            >
              <ShoppingBag size={20} />
            </Link>
            <div className="pl-2">
              <Link
                to="/account"
                className="block p-0.5 rounded-full hover:ring-2 hover:ring-accent transition-all"
              >
                <img
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8mUb1uirK6QkMxbj6IRZXfri3pQYi70n9avmRJfhvbYHxCH4PvAnjzhkVdJiPtMJsYsSURXkz54wBnJe51BBMbIqD9ydxZCNSBlLzI0GDeuHexr9Zi_PaaixV3EPvRMulsaXZPyFfmnDweWh5Aqbgt8FWRivCIa86RYm-Be2609_uP0mJmzaCqzPXi38hrG99AMXhDc2m-nTjtiesLUxXsL6KyefTohJkUGqQd3uP"
                />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full  bg-background">
        {/* Hero Banner */}
        <section className="w-full px-4 md:px-8 py-6 md:py-16 pb-20">
          <div className="mx-auto max-w-[1440px]">
            <div className="relative rounded-2xl overflow-hidden bg-accent min-h-[580px] lg:min-h-[640px] flex items-center shadow-sm">
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-1000 scale-[1.01]"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuARKK3_IbrV0cAirNHKl_i0dtLi_UJfCLlpArgcDcSZyo4Mwq1XV_VgFJLON7ZRmjyyJ1H-pONUUQLb_6OUUsqg7wCPEEQ2oAsiCOTh-u46a3c0-istlnE0BnvIboB057Da9uXepHmjGE-dvsfT1yV42jCSp566d6oaR1N-zvwaJ167G7PSxekxyCcklYiPWCGE5ucmtFXyz16_VzzvTNepu7ZXhDbHCylvO0bySMlf')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/75 to-transparent md:w-3/4 lg:w-3/5" />
              <div className="relative z-10 p-4 md:p-8 max-w-2xl flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/80 backdrop-blur-md mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span className="text-[10px] uppercase tracking-widest text-secondary">The 2024 Collection</span>
                </div>
                <h1 className="font-heading text-4xl md:text-5xl text-primary tracking-tight mb-4 leading-[1.1]">
                  Discover Your Everyday Favourites
                </h1>
                <p className="text-lg md:text-xl mb-6 max-w-lg leading-relaxed">
                  Explore thoughtfully selected products that bring personality, style, and inspiration to your everyday life.
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto">
                    EXPLORE COLLECTION
                  </Button>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    SHOP NOW
                  </Button>
                </div>
                <div className="mt-8 pt-4 flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-2xl font-heading text-primary">01 / 02</span>
                    <span className="text-xs uppercase tracking-widest">Curated Editions</span>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div className="flex flex-col">
                    <span className="text-2xl font-heading text-primary">100%</span>
                    <span className="text-xs uppercase tracking-widest">Artisanal Sourcing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Shop by Category */}
        <section className="w-full px-4 md:px-8 py-12">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest block mb-1">Curation</span>
                <h2 className="font-heading text-2xl md:text-3xl text-primary tracking-tight">Explore Our Categories</h2>
                <p className="text-sm mt-1">Find something that feels just right for you.</p>
              </div>
              <Link
                to="/categories"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-accent transition-colors group"
              >
                View All Categories
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: 'Earrings',
                  slug: 'earrings',
                  image:
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuBKtvBaOYkKvRSLMWDtcayVQk7dElJGTOR_a7Iq98nq0EY1mMy7bU5qBzkcpqja4Gvug8irg3htzbL6yZ07Iio-Bkj_mR1bJtjfe0HPkbtfh_mSO4ktkvEuNelxFANNRQn2D7vRlamhFbNOru4kfOuMKjmZR0ugHuukL2kcaTbI-efJNv7VFIvs0aoCaZ4r7JWlL14PpUbYPZeDs3hsJRvATp0FSXwKszjkPEy7dFsa',
                  description: 'Artisanal silhouettes and timeless modern finishes.',
                },
                {
                  name: 'Frames',
                  slug: 'frames',
                  image:
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuBKtvBaOYkKvRSLMWDtcayVQk7dElJGTOR_a7Iq98nq0EY1mMy7bU5qBzkcpqja4Gvug8irg3htzbL6yZ07Iio-Bkj_mR1bJtjfe0HPkbtfh_mSO4ktkvEuNelxFANNRQn2D7vRlamhFbNOru4kfOuMKjmZR0ugHuukL2kcaTbI-efJNv7VFIvs0aoCaZ4r7JWlL14PpUbYPZeDs3hsJRvATp0FSXwKszjkPEy7dFsa',
                  description: 'Handcrafted profiles designed to celebrate your memories.',
                },
              ].map((category) => (
                <Link
                  key={category.slug}
                  to={`/categories/${category.slug}`}
                  className="group relative rounded-2xl overflow-hidden bg-background p-6 flex flex-col justify-between transition-all hover:shadow-md"
                >
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-accent">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-md bg-white/90 backdrop-blur-sm text-[10px] uppercase tracking-wider font-medium">
                        Category 01
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-primary  transition-colors">
                        {category.name}
                      </h3>
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-primary group-hover:text-surface transition-all">
                        <ArrowRight size={18} />
                      </div>
                    </div>
                    <p className="text-sm mt-1 mb-3">{category.description}</p>
                    <span className="text-sm font-medium inline-flex items-center gap-1 group-hover:underline">
                      Explore {category.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="w-full px-4 md:px-8 py-16 bg-accent/50">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-secondary block mb-1">Selected Goods</span>
                <h2 className="font-heading text-2xl md:text-3xl text-primary tracking-tight">Handpicked for You</h2>
                <p className="text-sm text-secondary mt-1">Explore some of our favourite picks.</p>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <Button size="sm">All Selections</Button>
                <Button size="sm" variant="outline">Earrings</Button>
                <Button size="sm" variant="outline">Frames</Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button size="lg">DISCOVER ALL PRODUCTS</Button>
            </div>
          </div>
        </section>

        {/* Editorial Lifestyle Banner */}
        <section className="w-full px-4 md:px-8 py-12">
          <div className="mx-auto max-w-[1440px]">
            <div className="relative rounded-2xl overflow-hidden min-h-[480px] lg:min-h-[520px] flex items-center p-4 md:p-8 bg-surface-container shadow-sm">
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAVQTMq67_nWKYDHN82rvaGfyVmIXen37l_6wrADpJDIhiBoYh6LMDtIX6UnUNnHVqtQB3RgbiBfm68fXCvV9IH7EFocDsb-hPJHxbzETQpG83-PHsORKElC75AwZQjohnQh0G9v3PAMeP7OwJpAf-Sxz2M9PtQ5-8pUTFZXvu0QeP1Si0BqtPLOj8JqsSvJSwq3qL0Ty0uUwDQDTgvXdVCuvb5OPHN0QnEos7eFiQX')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent md:w-3/5" />
              <div className="relative z-10 max-w-lg flex flex-col items-start">
                <span className="text-[10px] uppercase tracking-widest text-secondary mb-2">Editorial Narrative</span>
                <h2 className="font-heading text-2xl md:text-3xl text-primary tracking-tight mb-4 leading-tight">
                  Made to Match Your Style
                </h2>
                <p className="text-lg md:text-xl text-secondary mb-6 leading-relaxed">
                  Explore products that make everyday moments feel a little more special.
                </p>
                <Button size="lg">
                  DISCOVER THE STORY
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Shop With Us */}
        <section className="w-full px-4 md:px-8 py-16 bg-accent/50">
          <div className="mx-auto max-w-[1440px]">
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="text-[10px] uppercase tracking-widest text-secondary block mb-1">The Experience</span>
              <h2 className="font-heading text-2xl md:text-3xl text-primary tracking-tight">Shopping Made Simple</h2>
              <p className="text-sm text-secondary mt-2">Understated excellence and thoughtful execution at every step.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Carefully Selected Products',
                  icon: 'verified',
                  description: 'Every item in our collection is chosen for enduring craftsmanship and aesthetic clarity.',
                },
                {
                  title: 'Secure Payments',
                  icon: 'lock',
                  description: 'Industry-standard encrypted checkout supporting major cards and digital wallets.',
                },
                {
                  title: 'Reliable Shopping Experience',
                  icon: 'local_shipping',
                  description: 'Transparent order tracking and prompt fulfillment on every purchase.',
                },
                {
                  title: 'Customer Support',
                  icon: 'support_agent',
                  description: 'Dedicated assistance ready to help with orders, inquiries, or style guidance.',
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="flex flex-col items-start bg-background p-6 rounded-xl shadow-sm hover:-translate-y-1 transition-transform duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-primary mb-4">
                    <span className="material-symbols-outlined text-[20px]">{feature.icon}</span>
                  </div>
                  <h3 className="font-heading text-base text-primary mb-2">{feature.title}</h3>
                  <p className="text-sm text-secondary leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="w-full px-4 md:px-8 py-16">
          <div className="mx-auto max-w-[1440px]">
            <div className="relative rounded-3xl bg-accent/50 p-8 md:p-12 overflow-hidden shadow-sm">
              <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-widest text-secondary mb-2">Correspondence</span>
                <h2 className="font-heading text-2xl md:text-3xl text-primary tracking-tight mb-2">
                  A Little Inspiration in Your Inbox
                </h2>
                <p className="text-sm md:text-base text-secondary mb-6 max-w-lg">
                  Be the first to discover new arrivals, updates, and special collections.
                </p>
                <form
                  className="w-full max-w-md flex flex-col sm:flex-row gap-3 mb-3"
                  onSubmit={(e) => {
                    e.preventDefault()
                    const input = e.currentTarget.querySelector('input')
                    if (input) input.value = ''
                    alert('Thank you for subscribing.')
                  }}
                >
                  <input
                    className="flex-grow h-12 px-4 rounded-xl bg-background text-primary font-body-md placeholder:text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                    placeholder="Enter your email address"
                    type="email"
                    required
                  />
                  <Button>SUBSCRIBE</Button>
                </form>
                <p className="text-[10px] text-secondary">We respect your privacy. Unsubscribe at any time.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full bg-surface-container-low mt-20 shadow-[0_-1px_8px_rgba(0,0,0,0.02)]">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 flex flex-col pr-8 lg:pr-0">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-heading text-2xl font-semibold tracking-tight text-primary">BRAND NAME</span>
              </div>
              <p className="text-sm text-secondary max-w-sm mb-6">
                Thoughtfully curated lifestyle goods, designed to bring understated elegance and inspiration to your everyday routine.
              </p>
              <div className="flex items-center gap-3">
                <a href="#" className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-secondary hover:bg-accent/80 transition-colors" aria-label="Share">
                  <Share size={18} />
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-secondary hover:bg-accent/80 transition-colors" aria-label="Public">
                  <Globe size={18} />
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-secondary hover:bg-accent/80 transition-colors" aria-label="Mail">
                  <Mail size={18} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-medium uppercase tracking-wider text-secondary mb-4">Shop</h4>
              <ul className="flex flex-col gap-2.5">
                <li><Link to="/shop" className="text-sm text-secondary hover:text-primary transition-colors">Shop All</Link></li>
                <li><Link to="/categories" className="text-sm text-secondary hover:text-primary transition-colors">Earrings</Link></li>
                <li><Link to="/categories/frames" className="text-sm text-secondary hover:text-primary transition-colors">Frames</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-medium uppercase tracking-wider text-secondary mb-4">Customer Support</h4>
              <ul className="flex flex-col gap-2.5">
                <li><Link to="/contact" className="text-sm text-secondary hover:text-primary transition-colors">Contact Us</Link></li>
                <li><Link to="/faqs" className="text-sm text-secondary hover:text-primary transition-colors">FAQs</Link></li>
                <li><Link to="/shipping" className="text-sm text-secondary hover:text-primary transition-colors">Shipping Information</Link></li>
                <li><Link to="/returns" className="text-sm text-secondary hover:text-primary transition-colors">Returns and Refunds</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-medium uppercase tracking-wider text-secondary mb-4">Legal</h4>
              <ul className="flex flex-col gap-2.5">
                <li><Link to="/privacy" className="text-sm text-secondary hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-sm text-secondary hover:text-primary transition-colors">Terms and Conditions</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[10px] text-secondary">© 2024 BRAND NAME. All rights reserved.</p>
            <p className="text-[10px] text-secondary">Editorial calm &amp; understated craftsmanship.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default HomePage
