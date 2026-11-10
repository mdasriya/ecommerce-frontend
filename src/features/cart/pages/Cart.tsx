
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Heart,
  Info,
  LockKeyhole,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  X,
  Truck,
  RotateCcw,
  Tag,
  Headphones,
} from 'lucide-react'

interface CartItem {
  id: number
  name: string
  category: string
  description: string
  price: number
  image: string
  quantity: number
}

const initialItems: CartItem[] = [
  {
    id: 1,
    name: 'Aura Sculpted Hoops',
    category: 'Earrings',
    description: 'Finish: 18k Gold Vermeil • Size: Classic (24mm)',
    price: 84,
    image:
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Nordic Oak Gallery Frame',
    category: 'Frames',
    description: 'Size: 11x14 format • Material: Natural Solid Oak',
    price: 62,
    image:
      'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=500',
    quantity: 1,
  },
  {
    id: 3,
    name: 'Solstice Pearl Drops',
    category: 'Earrings',
    description: 'Finish: 14k Solid Gold • Length: Regular',
    price: 110,
    image:
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=500',
    quantity: 1,
  },
]

const recommendations = [
  {
    name: 'Molten Brass Trinket Valet',
    category: 'Objects',
    price: 48,
    image:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500',
  },
  {
    name: 'Cedar & Vetiver Essence',
    category: 'Apothecary',
    price: 38,
    image:
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500',
  },
  {
    name: 'Atelier Precious Metal Cloth',
    category: 'Care',
    price: 16,
    image:
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500',
  },
  {
    name: 'Dune Miniature Bud Vase',
    category: 'Ceramics',
    price: 32,
    image:
      'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500',
  },
]

const formatPrice = (price: number) => `$${price.toFixed(2)}`

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>(initialItems)
  const [promoCode, setPromoCode] = useState('ATELIER10')
  const [isPromoApplied, setIsPromoApplied] = useState(true)
  const [promoMessage, setPromoMessage] = useState('')
  const [savedItems, setSavedItems] = useState<number[]>([])
  const [showEmpty, setShowEmpty] = useState(false)

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  )

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  const discount = isPromoApplied ? 25 : 0
  const total = Math.max(0, subtotal - discount)

  const updateQuantity = (id: number, change: number) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.min(10, Math.max(1, item.quantity + change)),
            }
          : item
      )
    )
  }

  const removeItem = (id: number) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setItems([])
    }
  }

  const toggleSaved = (id: number) => {
    setSavedItems((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id]
    )
  }

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'ATELIER10') {
      setIsPromoApplied(true)
      setPromoMessage('Coupon applied successfully!')
    } else {
      setIsPromoApplied(false)
      setPromoMessage('Invalid or expired coupon code.')
    }
  }

  const removePromo = () => {
    setIsPromoApplied(false)
    setPromoCode('')
    setPromoMessage('')
  }

  return (
    <main className="min-h-screen pt-20 bg-[#F7F5F0] text-[#242424]">

      {/* Simulation Bar - Development Only */}
      {/* <div className="bg-[#E8E4DC] px-4 py-3 mt-22">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#74736E]">
            Demo Simulation View
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => setShowEmpty(false)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                !showEmpty
                  ? 'bg-[#242424] text-white'
                  : 'bg-white text-[#242424]'
              }`}
            >
              Active Cart ({items.length} products)
            </button>

            <button
              onClick={() => setShowEmpty(true)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                showEmpty
                  ? 'bg-[#242424] text-white'
                  : 'bg-white text-[#242424]'
              }`}
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div> */}

      {/* Reassurance Ribbon */}
      {/* <section className="bg-[#F2EFE9] px-4 py-4">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-[11px] font-semibold uppercase tracking-wider text-[#74736E]">
          <div className="flex items-center gap-2">
            <Truck size={16} className="text-[#8A725B]" />
            Complimentary Insured Delivery
          </div>

          <div className="hidden h-4 w-px bg-[#D6D0C6] md:block" />

          <div className="flex items-center gap-2">
            <RotateCcw size={16} className="text-[#8A725B]" />
            Effortless 30-Day Returns
          </div>

          <div className="hidden h-4 w-px bg-[#D6D0C6] md:block" />

          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#8A725B]" />
            Authenticity Certified
          </div>
        </div>
      </section> */}

      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-10 lg:py-10">

        {/* Breadcrumb */}
        {/* <div className="mb-8 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-[#74736E]">
          <Link to="/" className="transition hover:text-[#242424]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#242424]">Shopping Cart</span>
        </div> */}

        {/* Page Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h1 className="font-['Playfair_Display'] text-4xl text-[#242424] sm:text-5xl">
              Your Shopping Cart
            </h1>

            <p className="mt-3 text-sm text-[#74736E]">
              Review your curated selections before continuing to checkout.
            </p>
          </div>

          {!showEmpty && (
            <div className="flex items-center gap-4">
              <span className="rounded-full bg-[#EEEAE2] px-4 py-2 text-xs font-medium">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
              </span>

              <button
                onClick={clearCart}
                className="flex items-center gap-1 text-xs text-[#74736E] transition hover:text-red-600"
              >
                <Trash2 size={15} />
                Clear Cart
              </button>
            </div>
          )}
        </div>

        {/* Empty Cart */}
        {(showEmpty || items.length === 0) ? (
          <section className="mx-auto flex max-w-2xl flex-col items-center py-20 text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#EEEAE2] text-[#8A725B]">
              <ShoppingBag size={40} strokeWidth={1.3} />
            </div>

            <h2 className="font-['Playfair_Display'] text-4xl">
              Your Cart Is Empty
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-[#74736E]">
              Looks like you haven't added anything to your cart yet.
              Explore our collections and discover something special.
            </p>

            <Link
              to="/shop"
              className="mt-8 rounded-lg bg-[#242424] px-8 py-4 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#8A725B]"
            >
              Start Shopping
            </Link>

            <div className="mt-16 w-full max-w-md border-t border-[#E5E0D7] pt-8">
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-widest text-[#74736E]">
                Recommended Departments
              </p>

              <div className="flex justify-center gap-6 text-sm font-medium">
                <Link to="/categories" className="hover:text-[#8A725B]">
                  Shop Earrings
                </Link>
                <Link to="/categories" className="hover:text-[#8A725B]">
                  Shop Frames
                </Link>
              </div>
            </div>
          </section>
        ) : (
          /* Active Cart */
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">

            {/* Cart Items */}
            <section className="flex flex-col gap-5 lg:col-span-8">

              {items.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col gap-5 rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:p-6"
                >
                  {/* Product Image */}
                  <div className="relative h-52 w-full shrink-0 overflow-hidden rounded-lg bg-[#F2EFE9] sm:h-44 sm:w-36">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />

                    <span className="absolute left-2 top-2 rounded bg-white/90 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-[#74736E]">
                      {item.category}
                    </span>
                  </div>

                  {/* Product Information */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between">

                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-base font-semibold">
                            {item.name}
                          </h3>

                          <p className="mt-2 text-xs leading-6 text-[#74736E]">
                            {item.description}
                          </p>
                        </div>

                        <div className="shrink-0 text-right">
                          <span className="text-base font-semibold">
                            {formatPrice(item.price)}
                          </span>
                          <p className="mt-1 text-[10px] text-[#74736E]">
                            Each
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-2 text-xs text-[#8A725B]">
                        <span className="h-2 w-2 rounded-full bg-[#8A725B]" />
                        In Stock
                      </div>
                    </div>

                    {/* Quantity & Actions */}
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[#EEEAE2] pt-4">

                      <div className="flex items-center rounded-lg bg-[#F2EFE9] p-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                          className="flex h-9 w-9 items-center justify-center rounded transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={15} />
                        </button>

                        <span className="w-9 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          disabled={item.quantity >= 10}
                          className="flex h-9 w-9 items-center justify-center rounded transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                          aria-label="Increase quantity"
                        >
                          <Plus size={15} />
                        </button>
                      </div>

                      <div className="flex items-center gap-5">
                        <div className="text-right sm:text-left">
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#74736E]">
                            Subtotal
                          </p>

                          <p className="mt-1 text-sm font-semibold">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>

                        <button
                          onClick={() => toggleSaved(item.id)}
                          title="Save for Later"
                          className={`flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEEAE2] transition hover:text-[#8A725B] ${
                            savedItems.includes(item.id)
                              ? 'text-[#8A725B]'
                              : 'text-[#74736E]'
                          }`}
                        >
                          <Heart
                            size={17}
                            fill={
                              savedItems.includes(item.id)
                                ? 'currentColor'
                                : 'none'
                            }
                          />
                        </button>

                        <button
                          onClick={() => removeItem(item.id)}
                          title="Remove Item"
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEEAE2] text-[#74736E] transition hover:text-red-600"
                        >
                          <X size={17} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              {/* Cart Navigation */}
              <div className="flex flex-col items-center justify-between gap-5 pt-4 sm:flex-row">
                <Link
                  to="/shop"
                  className="group flex items-center gap-2 text-xs font-semibold text-[#74736E] transition hover:text-[#242424]"
                >
                  <ArrowLeft size={17} className="transition group-hover:-translate-x-1" />
                  Continue Shopping
                </Link>

                <span className="text-xs text-[#74736E]">
                  Quantity updates automatically
                </span>
              </div>
            </section>

            {/* Order Summary */}
            <aside className="flex flex-col gap-5 lg:col-span-4 lg:sticky lg:top-28">

              <div className="rounded-xl bg-white p-6 shadow-md">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="font-['Playfair_Display'] text-2xl">
                    Order Summary
                  </h2>

                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#8A725B]">
                    Pre-Tax
                  </span>
                </div>

                <div className="flex flex-col gap-4 text-sm text-[#74736E]">

                  <div className="flex justify-between">
                    <span>Cart Subtotal</span>
                    <span className="font-semibold text-[#242424]">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between gap-2">
                    <span className="flex items-center gap-1">
                      Estimated Shipping
                      <Info size={14} />
                    </span>

                    <span className="text-right font-medium text-[#8A725B]">
                      Complimentary
                    </span>
                  </div>

                  <div className="flex justify-between gap-2">
                    <span>Estimated Taxes</span>
                    <span className="text-right">Calculated at checkout</span>
                  </div>

                  {isPromoApplied && (
                    <div className="flex justify-between text-[#8A725B]">
                      <span className="flex items-center gap-2">
                        <Tag size={15} />
                        ATELIER10
                      </span>
                      <span className="font-semibold">
                        -{formatPrice(discount)}
                      </span>
                    </div>
                  )}

                  <div className="border-t border-[#EEEAE2]" />

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="font-semibold text-[#242424]">
                        Estimated Total
                      </p>
                      <p className="mt-1 text-[10px]">
                        USD including promotions
                      </p>
                    </div>

                    <span className="text-2xl font-semibold text-[#242424]">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mt-7 rounded-lg bg-[#F7F5F0] p-4">
                  <label
                    htmlFor="promoCode"
                    className="mb-3 block text-xs font-medium text-[#74736E]"
                  >
                    Have a promotional or gift voucher?
                  </label>

                  <div className="flex gap-2">
                    <input
                      id="promoCode"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="min-w-0 flex-1 rounded-lg border border-[#E5E0D7] bg-white px-3 py-2 text-xs uppercase outline-none focus:border-[#8A725B]"
                    />

                    <button
                      onClick={applyPromo}
                      className="rounded-lg bg-[#242424] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#8A725B]"
                    >
                      Apply
                    </button>
                  </div>

                  {isPromoApplied && (
                    <div className="mt-3 flex items-center justify-between rounded-md bg-white px-3 py-2 text-[11px] text-[#8A725B]">
                      <span className="flex items-center gap-2">
                        <Check size={14} />
                        ATELIER10 Applied
                      </span>

                      <button onClick={removePromo}>
                        <X size={14} />
                      </button>
                    </div>
                  )}

                  {promoMessage && (
                    <p className="mt-2 text-xs text-[#8A725B]">
                      {promoMessage}
                    </p>
                  )}
                </div>

                 {/* Checkout */}
                 <Link
                   to="/checkout"
                   className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#242424] text-xs font-semibold uppercase tracking-wider text-white shadow transition hover:bg-[#8A725B] disabled:opacity-50"
                   style={{ textDecoration: 'none' }}
                 >
                   <LockKeyhole size={16} />
                   Proceed to Checkout
                 </Link>

                <div className="mt-5 text-center text-[10px] text-[#74736E]">
                  Secure checkout · Protected payments
                </div>
              </div>

              {/* Trust Information */}
              <div className="flex flex-col gap-5 rounded-xl bg-[#EEEAE2] p-5">

                <div className="flex items-start gap-3">
                  <ShieldCheck size={19} className="shrink-0 text-[#8A725B]" />
                  <div>
                    <p className="text-xs font-semibold">
                      Secure Encrypted Checkout
                    </p>
                    <p className="mt-1 text-[11px] leading-5 text-[#74736E]">
                      Your transaction and payment data are protected.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <RotateCcw size={19} className="shrink-0 text-[#8A725B]" />
                  <div>
                    <p className="text-xs font-semibold">
                      30-Day Guarantee
                    </p>
                    <p className="mt-1 text-[11px] leading-5 text-[#74736E]">
                      Easy exchanges and returns on eligible orders.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Headphones size={19} className="shrink-0 text-[#8A725B]" />
                  <div>
                    <p className="text-xs font-semibold">
                      Customer Support
                    </p>
                    <p className="mt-1 text-[11px] leading-5 text-[#74736E]">
                      Our support team is here to help you.
                    </p>
                  </div>
                </div>

              </div>
            </aside>
          </div>
        )}

        {/* Recommendations */}
        <section className="mt-24 border-t border-[#E5E0D7] pt-14">
          <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#8A725B]">
                Curated Complement
              </span>

              <h2 className="mt-2 font-['Playfair_Display'] text-3xl">
                Complete the Look
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-[#74736E]">
              Objects thoughtfully matched to complement your current selection.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recommendations.map((product) => (
              <div
                key={product.name}
                className="group rounded-xl bg-white p-3 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-4 aspect-[3/4] overflow-hidden rounded-lg bg-[#F2EFE9]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <span className="text-[10px] uppercase tracking-wider text-[#74736E]">
                  {product.category}
                </span>

                <h3 className="mt-1 truncate text-sm font-semibold">
                  {product.name}
                </h3>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold">
                    {formatPrice(product.price)}
                  </span>

                  <Link
                    to="/shop"
                    className="flex items-center gap-1 rounded bg-[#EEEAE2] px-2 py-2 text-[10px] font-semibold transition hover:bg-[#242424] hover:text-white"
                  >
                    Explore
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}
