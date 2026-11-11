import { useState, useMemo } from 'react'
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Copy,
  CreditCard,
  HelpCircle,
  History,
  Headset,
  Leaf,
  Lock,
  Mail,
  Phone,
  QrCode,
  Smartphone,
  User,
  Wallet,
  X,
  Zap,
} from 'lucide-react'

const CN = (cls: string) => cls

const colors = {
  surface: '#fbf9f4',
  surfaceContainerLow: '#f5f3ee',
  surfaceContainerLowest: '#ffffff',
  surfaceContainer: '#f0eee9',
  surfaceContainerHigh: '#eae8e3',
  surfaceContainerHighest: '#e4e2dd',
  primary: '#0e0f0f',
  primaryContainer: '#242424',
  onPrimary: '#ffffff',
  onPrimaryContainer: '#8c8b8b',
  secondary: '#705a45',
  secondaryContainer: '#fcddc1',
  onSecondary: '#ffffff',
  onSecondaryFixed: '#281807',
  onSurface: '#1b1c19',
  onSurfaceVariant: '#444748',
  outline: '#747878',
  error: '#ba1a1a',
  errorContainer: '#ffdad6',
}

const baseSubtotal = 256
const promoDiscount = 25

type ShippingTier = 'standard' | 'express'
type PaymentMethod = 'upi' | 'card' | 'netbank' | 'cod'

interface CheckoutForm {
  email: string
  phone: string
  country: string
  fullName: string
  recipientPhone: string
  pincode: string
  city: string
  addressLine1: string
  addressLine2: string
  landmark: string
  state: string
  saveAddress: boolean
  sameBilling: boolean
  upiId: string
  cardNumber: string
  expiry: string
  cvv: string
  cardName: string
}

const initialForm: CheckoutForm = {
  email: 'eleanor.vance@atelier-archive.com',
  phone: '9820145892',
  country: 'IN',
  fullName: 'Eleanor Vance',
  recipientPhone: '+91 98201 45892',
  pincode: '400050',
  city: 'Mumbai',
  addressLine1: 'Penthouse 4B, The Palmetto Residence',
  addressLine2: 'Pali Hill Road, Bandra West',
  landmark: 'Near Candies Cafe / Nargis Dutt Road',
  state: 'MH',
  saveAddress: true,
  sameBilling: true,
  upiId: 'eleanor.vance@okaxis',
  cardNumber: '',
  expiry: '',
  cvv: '',
  cardName: '',
}

const countryOptions = [
  { value: 'IN', label: 'India (Domestic ', flag: '🇮🇳', code: '+91' },
  // { value: 'US', label: 'United States (Atelier International)', flag: '🇺🇸', code: '+1' },
  // { value: 'UK', label: 'United Kingdom', flag: '🇬🇧', code: '+44' },
  // { value: 'AE', label: 'United Arab Emirates', flag: '🇦🇪', code: '+971' },
  // { value: 'SG', label: 'Singapore', flag: '🇸🇬', code: '+65' },
  // { value: 'FR', label: 'France', flag: '🇫🇷', code: '+33' },
]

const stateOptions = [
  { value: 'MH', label: 'Maharashtra' },
  { value: 'DL', label: 'Delhi NCR' },
  { value: 'KA', label: 'Karnataka' },
  { value: 'TN', label: 'Tamil Nadu' },
  { value: 'TS', label: 'Telangana' },
  { value: 'WB', label: 'West Bengal' },
  { value: 'GJ', label: 'Gujarat' },
]

const cartItems = [
  {
    id: 1,
    name: 'Aura Sculpted Hoops',
    finish: '18k Gold Vermeil',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDayMukQ1JNPV82XpKbLsjU5aLAZTMwktIw6x1syh9ZnRNC9AHB35tud5QncUs_pi1LQPj3Fzo3ZLhhd7xHzibYhzWiupov_QU2S4q6MXIN1fuXoCaTr0F78P0wAPO7qMDD-6eEZtFuNB3RQNEdHMUN4ccq3-vEIyUTkFUZUow3bejpf_1R3WWsqkiTOVfYHdAbCIyRiI1D79MHmZDFQq0jlcpDDsEop0yh3P43NoUy',
    price: 84,
    qty: 1,
  },
  {
    id: 2,
    name: 'Nordic Oak Gallery Frame',
    finish: '11x14 Archival Glass',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA6vHVrU-MeM_2wNfpGs_QkYv9twknx4udhM9iogJ2TdZ4P6T0K2gaLGpF70LOAUX-9UnTnOBcJtow5SpRNtNWcyE_DYfbq9_fi2j7YQugU3dzFpMdpP-VSrQdObzai9ZzIZvgkWsrEtVxFdc5ikasuww41FIGgorm8z5qymSzEcnMvJy8yH4hsTrrnj-A_gC9TByRsLvy78V02MXtF1ZSGE0rs1wnqtN8xDo4vtSgy',
    price: 62,
    qty: 1,
  },
  {
    id: 3,
    name: 'Solstice Pearl Drops',
    finish: '14k Solid Gold',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCsZQuX5soCsQIaZTOA9go8jRQ-JSc-GepaD5IH5vITld9vZ6ptnGd4jDlpSO-_gqi18-a9sdkcWzR5H-iv3vC6FO52TnMavRDgD8C4riUQ1nyWCNIqxgyl136krKAvEjxTQlMcFhvMiCSq31Om8bB52Juwax_6bPDquVD251H95AthjnS23MjeBC0ZHfLgl6tMGO-OENQP77gWmA3x7zbMPRXVQtEUjfHmDTQnXRwy',
    price: 110,
    qty: 1,
  },
]

export default function Checkout() {
  const [shipping, setShipping] = useState<ShippingTier>('standard')
  const [payment, setPayment] = useState<PaymentMethod>('upi')
  const [form, setForm] = useState<CheckoutForm>(initialForm)
  const [promoApplied, setPromoApplied] = useState(true)
  const [promoCode, setPromoCode] = useState('ATELIER10')
  const [isPlacing, setIsPlacing] = useState(false)
  const [billingVisible, setBillingVisible] = useState(!form.sameBilling)

  const shippingCost = shipping === 'express' ? 18 : 0
  const total = useMemo(() => baseSubtotal - promoDiscount + shippingCost, [shipping])

  const field = (k: keyof CheckoutForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [k]: e.target.value }))

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPlacing(true)
    await new Promise((r) => setTimeout(r, 1400))
    setIsPlacing(false)
  }

  const formatMoney = (v: number) => `$${v.toFixed(2)}`

  return (
    <div className="min-h-screen bg-[#fbf9f4] text-[#1b1c19]">
      {/* Header */}
      {/* <header className="fixed top-0 w-full z-50 bg-[#fbf9f4]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-20 w-full px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a
              href="#"
              className="font-['Playfair_Display'] text-xl text-[#1b1c19] tracking-tight font-medium hover:text-on-surface-variant transition-colors"
            >
              ATELIER
            </a>
          </div>
          <div className="flex items-center gap-1 bg-[#f5f3ee] px-2.5 py-1.5 rounded-full">
            <Lock size={18} className="text-[#444748]" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1b1c19]">
              Secure 256-Bit SSL Checkout
            </span>
          </div>
          <div className="flex items-center gap-3 text-[#444748]">
            <a
              href="#"
              className="inline-flex items-center gap-1 text-sm font-medium text-[#444748] hover:text-[#0e0f0f] transition-colors"
            >
              <ArrowLeft size={16} /> <span>Return to Cart</span>
            </a>
            <div className="w-8 h-8 rounded-full bg-[#0e0f0f] flex items-center justify-center">
              <User size={18} className="text-white" />
            </div>
          </div>
        </div>
      </header> */}

      <main className="w-full pt-28 bg-[#fbf9f4] min-h-[calc(100vh-140px)]">
        {/* Stepper */}
        <section className="w-full bg-[#f5f3ee]/70 py-3">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
            <nav aria-label="Checkout Steps" className="flex items-center justify-between max-w-2xl mx-auto">
              <div className="flex items-center gap-1 group cursor-pointer">
                <div className="w-7 h-7 rounded-full bg-[#0e0f0f] flex items-center justify-center">
                  <Check size={16} className="text-white" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0e0f0f]">
                  Cart
                </span>
              </div>
              <div className="flex-1 mx-3 h-[2px] bg-[#0e0f0f]"></div>
              <div className="flex items-center gap-1">
                <div className="w-7 h-7 rounded-full bg-[#0e0f0f] flex items-center justify-center text-xs font-semibold text-white">
                  2
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider font-semibold text-[#0e0f0f]">
                  Information
                </span>
              </div>
              <div className="flex-1 mx-3 h-[2px] bg-[#e4e2dd]"></div>
              <div className="flex items-center gap-1 text-[#747878]">
                <div className="w-7 h-7 rounded-full bg-[#e4e2dd] flex items-center justify-center text-xs font-medium text-[#747878]">
                  3
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider hidden sm:inline text-[#747878]">
                  Payment
                </span>
              </div>
              <div className="flex-1 mx-3 h-[2px] bg-[#e4e2dd]"></div>
              <div className="flex items-center gap-1 text-[#747878]">
                <div className="w-7 h-7 rounded-full bg-[#e4e2dd] flex items-center justify-center text-xs font-medium text-[#747878]">
                  4
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider hidden sm:inline text-[#747878]">
                  Review
                </span>
              </div>
            </nav>
          </div>
        </section>

        <main className="w-full py-6 lg:py-10">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {/* Express Checkout Banner */}
                <div className="bg-[#ffffff] rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#444748]">
                      Express Checkout
                    </span>
                    {/* <span className="text-xs text-[#444748] flex items-center gap-1">
                      <Zap size={15} className="text-[#444748]" />
                      Instant Authentication
                    </span> */}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
                    <button
                      type="button"
                      className="h-10 bg-[#0e0f0f] hover:bg-[#242424] text-white rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-sm active:scale-[0.99]"
                    >
                      <Smartphone size={20} />
                      <span className="text-sm font-semibold tracking-wide">Apple Pay</span>
                    </button>
                    <button
                      type="button"
                      className="h-10 bg-[#ffffff] hover:bg-[#f5f3ee] text-[#0e0f0f] rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-sm active:scale-[0.99]"
                    >
                      <Wallet size={20} className="text-[#444748]" />
                      <span className="text-sm font-semibold tracking-wide">Google Pay</span>
                    </button>
                    <button
                      type="button"
                      className="h-10 bg-[#f5f3ee] hover:bg-[#f0eee9] text-[#0e0f0f] rounded-lg flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.99]"
                    >
                      <QrCode size={20} className="text-[#444748]" />
                      <span className="text-sm font-semibold tracking-wide">UPI Instant</span>
                    </button>
                  </div>
                  <div className="relative flex py-3 items-center mt-1">
                    <div className="flex-grow h-[1px] bg-[#e4e2dd]"></div>
                    <span className="flex-shrink mx-4 text-xs font-semibold uppercase tracking-wider text-[#444748] bg-[#ffffff] px-2">
                      Or Continue With Standard Checkout
                    </span>
                    <div className="flex-grow h-[1px] bg-[#e4e2dd]"></div>
                  </div>
                </div>

                {/* Checkout Form */}
                <form onSubmit={handlePlaceOrder} className="flex flex-col gap-6" id="checkoutForm">
                  {/* Section 1: Contact Information */}
                  <section className="bg-[#ffffff] rounded-xl p-4 sm:p-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <span className="w-6 h-6 rounded-full bg-[#fcddc1] text-[#281807] flex items-center justify-center text-xs font-semibold">
                          1
                        </span>
                        <h2 className="text-lg font-['Playfair_Display'] text-[#1b1c19]">
                          Contact Information
                        </h2>
                      </div>
                      <div className="mt-2 sm:mt-0 text-sm text-[#444748]">
                        Already have an atelier account?{' '}
                        <a href="#" className="text-[#705a45] font-medium hover:underline ml-1">
                          Sign in
                        </a>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5 md:col-span-2">
                        <label
                          htmlFor="contactEmail"
                          className="text-sm font-medium text-[#1b1c19] flex items-center justify-between"
                        >
                          <span>Email Address</span>
                          <span className="text-[#444748] text-[11px] font-normal">
                            Order tracking &amp; invoices
                          </span>
                        </label>
                        <div className="relative">
                          <input
                            id="contactEmail"
                            type="email"
                            className="w-full h-10 px-3.5 rounded-[10px] bg-[#ffffff] text-[#1b1c19] text-sm focus:outline-none focus:ring-1 focus:ring-[#0e0f0f] shadow-sm"
                            placeholder="name@domain.com"
                            required
                            value={form.email}
                            onChange={field('email')}
                          />
                          <Mail size={18} className="absolute right-3 top-3 text-[#444748]" />
                        </div>
                        {/* <p className="text-xs text-[#444748]">
                          We prioritize your inbox: strict zero-spam editorial updates only.
                        </p> */}
                      </div>

                      <div className="flex flex-col gap-1.5 md:col-span-2">
                        <label
                          htmlFor="contactPhone"
                          className="text-sm font-medium text-[#1b1c19]"
                        >
                          Phone Number for Courier Dispatch
                        </label>
                        <div className="grid grid-cols-12 gap-2">
                          <div className="col-span-4 sm:col-span-3 flex items-center px-3 h-10 rounded-[10px] bg-[#f5f3ee] text-[#1b1c19] text-sm font-medium gap-2">
                            <span className="text-base select-none">🇮🇳</span>
                            <span className="font-semibold">+91</span>
                            <span className="ml-auto">
                              <ChevronDown size={16} className="text-[#444748]" />
                            </span>
                          </div>
                          <div className="col-span-8 sm:col-span-9 relative">
                            <input
                              id="contactPhone"
                              type="tel"
                              pattern="[0-9]{10}"
                              placeholder="10-digit mobile number"
                              required
                              className="w-full h-10 px-3.5 rounded-[10px] bg-[#ffffff] text-[#1b1c19] text-sm focus:outline-none focus:ring-1 focus:ring-[#0e0f0f] shadow-sm"
                              value={form.phone}
                              onChange={field('phone')}
                            />
                            <Phone size={18} className="absolute right-3 top-3 text-[#444748]" />
                          </div>
                        </div>
                      </div>

                      {/* <div className="md:col-span-2 pt-1">
                        <label className="flex items-start gap-3 cursor-pointer select-none">
                          <input
                            id="smsOptIn"
                            type="checkbox"
                            className="mt-1 w-5 h-5 rounded accent-[#0e0f0f] text-[#0e0f0f] cursor-pointer"
                          />
                          <span className="text-sm text-[#444748] leading-relaxed">
                            Send me real-time dispatch updates, insured courier live tracking, and digital
                            certificates via SMS and WhatsApp.
                          </span>
                        </label>
                      </div> */}
                    </div>
                  </section>

                  {/* Section 2: Delivery Address */}
                  <section className="bg-[#ffffff] rounded-xl p-4 sm:p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <span className="w-6 h-6 rounded-full bg-[#fcddc1] text-[#281807] flex items-center justify-center text-xs font-semibold">
                          2
                        </span>
                        <h2 className="text-lg font-['Playfair_Display'] text-[#1b1c19]">
                          Delivery Address
                        </h2>
                      </div>
                      {/* <span className="text-xs font-semibold uppercase tracking-wider text-[#444748] flex items-center gap-1">
                        <CheckCircle2 size={16} className="text-[#705a45]" />
                        Doorstep White-Glove
                      </span> */}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5 md:col-span-2">
                        <label className="text-sm font-medium text-[#1b1c19]">
                          Country / Territory
                        </label>
                        <div className="relative">
                          <select
                            className="w-full h-10 px-3.5 pr-10 rounded-[10px] bg-[#ffffff] text-[#1b1c19] text-sm focus:outline-none focus:ring-1 focus:ring-[#0e0f0f] shadow-sm appearance-none cursor-pointer"
                            value={form.country}
                            onChange={field('country')}
                          >
                            {countryOptions.map((c) => (
                              <option key={c.value} value={c.value}>
                                {c.label}
                              </option>
                            ))}
                          </select>
                          <ChevronDown size={20} className="absolute right-3 top-3 text-[#1b1c19] pointer-events-none" />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="fullName" className="text-sm font-medium text-[#1b1c19]">
                          Recipient Full Name
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          placeholder="First and last name"
                          required
                          className="w-full h-10 px-3.5 rounded-[10px] bg-[#ffffff] text-[#1b1c19] text-sm focus:outline-none focus:ring-1 focus:ring-[#0e0f0f] shadow-sm"
                          value={form.fullName}
                          onChange={field('fullName')}
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="recipientPhone" className="text-sm font-medium text-[#1b1c19]">
                          Courier Contact Number
                        </label>
                        <input
                          id="recipientPhone"
                          type="tel"
                          placeholder="For gate security or signature"
                          required
                          className="w-full h-10 px-3.5 rounded-[10px] bg-[#ffffff] text-[#1b1c19] text-sm focus:outline-none focus:ring-1 focus:ring-[#0e0f0f] shadow-sm"
                          value={form.recipientPhone}
                          onChange={field('recipientPhone')}
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="pincode"
                          className="text-sm font-medium text-[#1b1c19] flex items-center justify-between"
                        >
                          <span>Postal PIN Code</span>
                          <span className="text-[#444748] text-[11px] font-semibold flex items-center gap-0.5">
                            <Clock size={14} className="text-[#705a45]" /> Serviced Area
                          </span>
                        </label>
                        <div className="relative">
                          <input
                            id="pincode"
                            type="text"
                            // maxlength="6"
                            placeholder="6-digit PIN code"
                            required
                            className="w-full h-10 px-3.5 rounded-[10px] bg-[#ffffff] text-[#1b1c19] text-sm focus:outline-none focus:ring-1 focus:ring-[#0e0f0f] shadow-sm"
                            value={form.pincode}
                            onChange={field('pincode')}
                          />
                          <CheckCircle2 size={18} className="absolute right-3 top-3 text-[#705a45]" />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="cityName" className="text-sm font-medium text-[#1b1c19]">
                          City
                        </label>
                        <input
                          id="cityName"
                          type="text"
                          placeholder="City / Metropolitan"
                          required
                          className="w-full h-10 px-3.5 rounded-[10px] bg-[#ffffff] text-[#1b1c19] text-sm focus:outline-none focus:ring-1 focus:ring-[#0e0f0f] shadow-sm"
                          value={form.city}
                          onChange={field('city')}
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 md:col-span-2">
                        <label htmlFor="addressLine1" className="text-sm font-medium text-[#1b1c19]">
                          Flat, Villa, Residence, or Suite
                        </label>
                        <input
                          id="addressLine1"
                          type="text"
                          placeholder="Building name, Floor, Unit number"
                          required
                          className="w-full h-10 px-3.5 rounded-[10px] bg-[#ffffff] text-[#1b1c19] text-sm focus:outline-none focus:ring-1 focus:ring-[#0e0f0f] shadow-sm"
                          value={form.addressLine1}
                          onChange={field('addressLine1')}
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 md:col-span-2">
                        <label htmlFor="addressLine2" className="text-sm font-medium text-[#1b1c19]">
                          Street Address / Locality
                        </label>
                        <input
                          id="addressLine2"
                          type="text"
                          placeholder="Colony, Street, Neighborhood"
                          required
                          className="w-full h-10 px-3.5 rounded-[10px] bg-[#ffffff] text-[#1b1c19] text-sm focus:outline-none focus:ring-1 focus:ring-[#0e0f0f] shadow-sm"
                          value={form.addressLine2}
                          onChange={field('addressLine2')}
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="landmark" className="text-sm font-medium text-[#1b1c19]">
                          Landmark <span className="font-normal text-[#444748]">(Optional)</span>
                        </label>
                        <input
                          id="landmark"
                          type="text"
                          placeholder="Recognizable point for delivery concierge"
                          className="w-full h-10 px-3.5 rounded-[10px] bg-[#ffffff] text-[#1b1c19] text-sm focus:outline-none focus:ring-1 focus:ring-[#0e0f0f] shadow-sm"
                          value={form.landmark}
                          onChange={field('landmark')}
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="stateName" className="text-sm font-medium text-[#1b1c19]">
                          State / Region
                        </label>
                        <div className="relative">
                          <select
                            id="stateName"
                            className="w-full h-10 px-3.5 pr-10 rounded-[10px] bg-[#ffffff] text-[#1b1c19] text-sm focus:outline-none focus:ring-1 focus:ring-[#0e0f0f] shadow-sm appearance-none cursor-pointer"
                            value={form.state}
                            onChange={field('state')}
                          >
                            {stateOptions.map((s) => (
                              <option key={s.value} value={s.value}>
                                {s.label}
                              </option>
                            ))}
                          </select>
                          <ChevronDown size={20} className="absolute right-3 top-3 text-[#1b1c19] pointer-events-none" />
                        </div>
                      </div>

                      <div className="md:col-span-2 flex flex-col gap-2 pt-1">
                        <label className="flex items-center gap-3 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={form.saveAddress}
                            onChange={(e) =>
                              setForm((prev) => ({ ...prev, saveAddress: e.target.checked }))
                            }
                            className="w-5 h-5 rounded accent-[#0e0f0f] text-[#0e0f0f] cursor-pointer"
                          />
                          <span className="text-sm text-[#1b1c19]">
                            Save this address to my curated Atelier Profile for fast re-ordering
                          </span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer select-none">
                          <input
                            id="sameBilling"
                            type="checkbox"
                            checked={form.sameBilling}
                            onChange={(e) => {
                              setForm((prev) => ({ ...prev, sameBilling: e.target.checked }))
                              setBillingVisible(!e.target.checked)
                            }}
                            className="w-5 h-5 rounded accent-[#0e0f0f] text-[#0e0f0f] cursor-pointer"
                          />
                          <span className="text-sm text-[#1b1c19]">
                            Billing address is identical to delivery destination
                          </span>
                        </label>
                        {billingVisible && (
                          <div className="mt-2 p-3 rounded-xl bg-[#f5f3ee] transition-all">
                            <p className="text-xs font-semibold uppercase tracking-wider text-[#444748] mb-2">
                              Separate Tax &amp; Billing Entity
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              <input
                                type="text"
                                placeholder="Registered Legal Name or Company"
                                className="h-9 px-3 rounded-[8px] bg-[#ffffff] text-sm shadow-sm"
                              />
                              <input
                                type="text"
                                placeholder="GSTIN / VAT Identification (Optional)"
                                className="h-9 px-3 rounded-[8px] bg-[#ffffff] text-sm shadow-sm"
                              />
                              <input
                                type="text"
                                placeholder="Billing Street Address"
                                className="md:col-span-2 h-9 px-3 rounded-[8px] bg-[#ffffff] text-sm shadow-sm"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </section>

                  {/* Section 3: Delivery Method */}
                  <section className="bg-[#ffffff] rounded-xl p-4 sm:p-6 shadow-sm">
                    <div className="flex items-center gap-1 mb-4">
                      <span className="w-6 h-6 rounded-full bg-[#fcddc1] text-[#281807] flex items-center justify-center text-xs font-semibold">
                        3
                      </span>
                      <h2 className="text-lg font-['Playfair_Display'] text-[#1b1c19]">
                        Delivery Method
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label
                        onClick={() => setShipping('standard')}
                        className={`relative flex flex-col justify-between p-4 rounded-xl cursor-pointer transition-all duration-200 shadow-sm ${
                          shipping === 'standard'
                            ? 'bg-[#f5f3ee]'
                            : 'bg-[#ffffff]'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2.5">
                            <input
                              name="shippingTier"
                              type="radio"
                              checked={shipping === 'standard'}
                              onChange={() => setShipping('standard')}
                              className="accent-[#0e0f0f]"
                            />
                            <div>
                              <div className="text-sm font-semibold text-[#1b1c19]">
                                Insured Atelier Standard
                              </div>
                              <div className="text-xs text-[#444748]">
                                Estimated arrival: 3–5 Business Days
                              </div>
                            </div>
                          </div>
                          <span className="text-sm font-semibold text-secondary uppercase tracking-wider">
                            Free
                          </span>
                        </div>
                        <div className="mt-3 pt-1 text-[12px] text-[#444748] flex items-center gap-1.5">
                          <Leaf size={16} className="text-[#444748]" />
                          Carbon-neutral packaging with recycled linen buffers
                        </div>
                      </label>

                      <label
                        onClick={() => setShipping('express')}
                        className={`relative flex flex-col justify-between p-4 rounded-xl cursor-pointer transition-all duration-200 shadow-sm ${
                          shipping === 'express'
                            ? 'bg-[#f5f3ee]'
                            : 'bg-[#ffffff]'
                        } hover:bg-[#f5f3ee]`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2.5">
                            <input
                              name="shippingTier"
                              type="radio"
                              checked={shipping === 'express'}
                              onChange={() => setShipping('express')}
                              className="accent-[#0e0f0f]"
                            />
                            <div>
                              <div className="text-sm font-semibold text-[#1b1c19]">
                                Priority Express White-Glove
                              </div>
                              <div className="text-xs text-[#444748]">
                                Guaranteed delivery: 1–2 Business Days
                              </div>
                            </div>
                          </div>
                          <span className="text-sm font-semibold text-[#0e0f0f]">$18.00</span>
                        </div>
                        <div className="mt-3 pt-1 text-[12px] text-[#444748] flex items-center gap-1.5">
                          <User className="size-16 text-[#444748]" />
                          Signature upon handover &amp; tamper-proof seal
                        </div>
                      </label>
                    </div>
                  </section>

                  {/* Section 4: Payment Method */}
                  <section className="bg-[#ffffff] rounded-xl p-4 sm:p-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <span className="w-6 h-6 rounded-full bg-[#fcddc1] text-[#281807] flex items-center justify-center text-xs font-semibold">
                          4
                        </span>
                        <h2 className="text-lg font-['Playfair_Display'] text-[#1b1c19]">
                          Payment Method
                        </h2>
                      </div>
                      {/* <div className="mt-1 sm:mt-0 text-xs text-[#444748] flex items-center gap-1">
                        <Lock size={16} className="text-[#444748]" />
                        256-Bit Bank Grade SSL Encrypted
                      </div> */}
                    </div>

                    <div className="flex flex-col gap-2">
                      {/* UPI */}
                      <div className="rounded-xl overflow-hidden shadow-sm bg-[#ffffff]">
                        <button
                          onClick={() => setPayment('upi')}
                          type="button"
                          className="w-full p-4 flex items-center justify-between text-left transition-colors bg-[#f5f3ee]/60 hover:bg-[#f5f3ee]"
                        >
                          <div className="flex items-center gap-3">
                            <input
                              id="payRadioUpi"
                              name="paymentOption"
                              type="radio"
                              checked={payment === 'upi'}
                              onChange={() => setPayment('upi')}
                              className="accent-[#0e0f0f]"
                            />
                            <div>
                              <span className="text-sm font-semibold text-[#1b1c19] block">
                                UPI (Instant QR / VPA ID)
                              </span>
                              <span className="text-xs text-[#444748]">
                                Google Pay, PhonePe, Paytm, BHIM, Cred UPI
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 text-[#444748] text-xs">
                            <span className="px-2 py-0.5 rounded bg-[#e4e2dd] text-[#0e0f0f] font-semibold">
                              0% Fee
                            </span>
                          </div>
                        </button>
                        <div
                          id="paymentContentUpi"
                          className={`p-4 bg-[#ffffff] flex flex-col gap-4 ${
                            payment !== 'upi' ? 'hidden' : ''
                          }`}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                            <div className="flex flex-col gap-1">
                              <label
                                htmlFor="upiId"
                                className="text-sm font-medium text-[#1b1c19]"
                              >
                                Virtual Payment Address (UPI ID)
                              </label>
                              <div className="relative">
                                <input
                                  id="upiId"
                                  type="text"
                                  placeholder="username@bank"
                                  className="w-full h-10 px-3.5 rounded-[10px] bg-[#f5f3ee] text-[#1b1c19] text-sm focus:outline-none focus:ring-1 focus:ring-[#0e0f0f] shadow-sm"
                                  value={form.upiId}
                                  onChange={field('upiId')}
                                />
                                <button type="button" className="absolute right-2 top-2 h-8 px-3 rounded-md bg-[#0e0f0f] text-white text-xs font-semibold hover:bg-[#242424] transition-colors">
                                  Verify
                                </button>
                              </div>
                              <span className="text-xs text-[#444748] flex items-center gap-1">
                                <CheckCircle2 size={14} className="text-[#705a45]" />
                                ID verified with National Payments Corporation (NPCI)
                              </span>
                            </div>
                            <div className="p-3 rounded-xl bg-[#f5f3ee] flex items-center gap-3">
                              <div className="w-20 h-20 bg-[#ffffff] rounded-lg p-2 flex items-center justify-center shadow-sm">
                                <svg
                                  className="w-full h-full text-[#1b1c19]"
                                  fill="currentColor"
                                  viewBox="0 0 100 100"
                                >
                                  <path d="M10 10h30v30H10zm6 6v18h18V16zm4 4h10v10H20zM60 10h30v30H60zm6 6v18h18V16zm4 4h10v10H70zM10 60h30v30H10zm6 6v18h18V66zm4 4h10v10H20zM60 60h10v10H60zm20 0h10v10H80zm-10 10h10v10H70zm20 0h10v10H90zm-20 10h10v10H70zm10 10h10v10H80z"></path>
                                </svg>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-semibold text-[#1b1c19]">
                                  Scan to Pay Instantly
                                </span>
                                <span className="text-xs text-[#444748] leading-relaxed">
                                  Open any camera or UPI app on your phone to scan and authorize.
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card */}
                      <div className="rounded-xl overflow-hidden shadow-sm bg-[#ffffff]">
                        <button
                          onClick={() => setPayment('card')}
                          type="button"
                          className="w-full p-4 flex items-center justify-between text-left transition-colors hover:bg-[#f5f3ee]"
                        >
                          <div className="flex items-center gap-3">
                            <input
                              id="payRadioCard"
                              name="paymentOption"
                              type="radio"
                              checked={payment === 'card'}
                              onChange={() => setPayment('card')}
                              className="accent-[#0e0f0f]"
                            />
                            <div>
                              <span className="text-sm font-semibold text-[#1b1c19] block">
                                Credit or Debit Card
                              </span>
                              <span className="text-xs text-[#444748]">
                                Visa, Mastercard, RuPay, American Express
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-mono tracking-wider font-semibold text-[#747878] uppercase px-2 py-0.5 bg-[#e4e2dd] rounded">
                              3D Secure
                            </span>
                          </div>
                        </button>
                        <div
                          id="paymentContentCard"
                          className={`hidden p-4 bg-[#ffffff] flex flex-col gap-4`}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2 flex flex-col gap-1">
                              <label className="text-sm font-medium text-[#1b1c19]">
                                Card Number
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  // maxlength="19"
                                  placeholder="4111 •••• •••• 4242"
                                  className="w-full h-10 px-3.5 rounded-[10px] bg-[#f5f3ee] text-[#1b1c19] text-sm tracking-widest focus:outline-none focus:ring-1 focus:ring-[#0e0f0f] shadow-sm"
                                  value={form.cardNumber}
                                  onChange={field('cardNumber')}
                                />
                                <CreditCard size={20} className="absolute right-3 top-3 text-[#444748]" />
                              </div>
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-sm font-medium text-[#1b1c19]">
                                Expiration
                              </label>
                              <input
                                type="text"
                                // maxlength="5"
                                placeholder="MM / YY"
                                className="w-full h-10 px-3.5 rounded-[10px] bg-[#f5f3ee] text-[#1b1c19] text-sm focus:outline-none focus:ring-1 focus:ring-[#0e0f0f] shadow-sm"
                                value={form.expiry}
                                onChange={field('expiry')}
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label
                                className="text-sm font-medium text-[#1b1c19] flex items-center justify-between"
                              >
                                <span>Security Code (CVV)</span>
                                <HelpCircle size={16} className="text-[#444748] cursor-help" />
                              </label>
                              <input
                                type="password"
                                // maxlength="4"
                                placeholder="•••"
                                className="w-full h-10 px-3.5 rounded-[10px] bg-[#f5f3ee] text-[#1b1c19] text-sm tracking-widest focus:outline-none focus:ring-1 focus:ring-[#0e0f0f] shadow-sm"
                                value={form.cvv}
                                onChange={field('cvv')}
                              />
                            </div>
                            <div className="md:col-span-2 flex flex-col gap-1">
                              <label className="text-sm font-medium text-[#1b1c19]">
                                Name Printed on Card
                              </label>
                              <input
                                type="text"
                                placeholder="Eleanor Vance"
                                className="w-full h-10 px-3.5 rounded-[10px] bg-[#f5f3ee] text-[#1b1c19] text-sm focus:outline-none focus:ring-1 focus:ring-[#0e0f0f] shadow-sm"
                                value={form.cardName}
                                onChange={field('cardName')}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Net Banking */}
                      <div className="rounded-xl overflow-hidden shadow-sm bg-[#ffffff]">
                        <button
                          onClick={() => setPayment('netbank')}
                          type="button"
                          className="w-full p-4 flex items-center justify-between text-left transition-colors hover:bg-[#f5f3ee]"
                        >
                          <div className="flex items-center gap-3">
                            <input
                              id="payRadioNetbank"
                              name="paymentOption"
                              type="radio"
                              checked={payment === 'netbank'}
                              onChange={() => setPayment('netbank')}
                              className="accent-[#0e0f0f]"
                            />
                            <div>
                              <span className="text-sm font-semibold text-[#1b1c19] block">
                                Net Banking
                              </span>
                              <span className="text-xs text-[#444748]">
                                Direct transfer via 50+ Domestic Financial Institutions
                              </span>
                            </div>
                          </div>
                          <AccountBalance className="text-[#444748]" />
                        </button>
                        <div
                          id="paymentContentNetbank"
                          className={`hidden p-4 bg-[#ffffff] flex flex-col gap-4`}
                        >
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
                            {['HDFC Bank', 'ICICI Bank', 'State Bank', 'Axis Bank'].map((bank) => (
                              <button
                                key={bank}
                                type="button"
                                className="h-9 rounded-lg bg-[#f5f3ee] hover:bg-[#f0eee9] text-xs font-medium text-[#1b1c19] transition-colors"
                              >
                                {bank}
                              </button>
                            ))}
                          </div>
                          <div className="relative mt-2">
                            <select
                              className="w-full h-10 px-3.5 pr-10 rounded-[10px] bg-[#f5f3ee] text-[#1b1c19] text-sm focus:outline-none focus:ring-1 focus:ring-[#0e0f0f] appearance-none"
                            >
                              <option value="">Select Other Domestic Bank...</option>
                              <option value="kotak">Kotak Mahindra Bank</option>
                              <option value="yes">Yes Bank</option>
                              <option value="indusind">IndusInd Bank</option>
                              <option value="hsbc">HSBC India</option>
                            </select>
                            <ChevronDown size={20} className="absolute right-3 top-3 text-[#1b1c19] pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      {/* COD */}
                      <div className="rounded-xl overflow-hidden shadow-sm bg-[#ffffff]">
                        <button
                          onClick={() => setPayment('cod')}
                          type="button"
                          className="w-full p-4 flex items-center justify-between text-left transition-colors hover:bg-[#f5f3ee]"
                        >
                          <div className="flex items-center gap-3">
                            <input
                              id="payRadioCod"
                              name="paymentOption"
                              type="radio"
                              checked={payment === 'cod'}
                              onChange={() => setPayment('cod')}
                              className="accent-[#0e0f0f]"
                            />
                            <div>
                              <span className="text-sm font-semibold text-[#1b1c19] block">
                                Cash on Delivery (COD)
                              </span>
                              <span className="text-xs text-[#444748]">
                                Pay via cash or UPI QR upon courier arrival
                              </span>
                            </div>
                          </div>
                          <span className="text-xs text-[#444748]">OTP required</span>
                        </button>
                        <div
                          id="paymentContentCod"
                          className={`hidden p-4 bg-[#ffffff] flex flex-col gap-1`}
                        >
                          <p className="text-sm text-[#444748] leading-relaxed">
                            A confirmation code will be dispatched to{' '}
                            <strong className="text-[#1b1c19]">+91 98201 45892</strong> prior to final white-glove
                            dispatch. Exact change or digital scan is appreciated upon arrival.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Place Order Action */}
                  <div className="flex flex-col gap-3">
                    <button
                      type="submit"
                      disabled={isPlacing}
                      className="w-full h-[54px] rounded-lg bg-[#0e0f0f] hover:bg-[#242424] text-white text-sm font-semibold tracking-wider flex items-center justify-center gap-2 transition-all duration-200 shadow-md active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isPlacing ? (
                        <>
                          <LoaderCircle size={20} className="animate-spin" />
                          <span>Securing Atelier Reservation...</span>
                        </>
                      ) : (
                        <>
                          <Lock size={20} />
                          <span>Place Order &amp; Authorize — {formatMoney(total)}</span>
                        </>
                      )}
                    </button>

                    {/* Security Badges */}
                    {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-center">
                      <div className="flex items-center justify-center gap-1 text-[#444748]">
                        <EncryptedIcon size={18} className="text-[#444748]" />
                        <span className="text-xs">256-Bit SSL Encrypted</span>
                      </div>
                      <div className="flex items-center justify-center gap-1 text-[#444748]">
                        <VerifiedIcon size={18} className="text-[#444748]" />
                        <span className="text-xs">PCI-DSS Level 1 Compliant</span>
                      </div>
                      <div className="flex items-center justify-center gap-1 text-[#444748]">
                        <HistoryIcon size={18} className="text-[#444748]" />
                        <span className="text-xs">30-Day Atelier Guarantee</span>
                      </div>
                    </div> */}

                    {/* Legal */}
                    <p className="text-xs text-[#444748] text-center max-w-xl mx-auto leading-relaxed">
                      By placing this reservation order, you acknowledge and accept the ATELIER{' '}
                      <a href="#" className="underline hover:text-[#0e0f0f]">
                        Terms of Service
                      </a>{' '}
                      ,{' '}
                      <a href="#" className="underline hover:text-[#0e0f0f]">
                        Returns Policy
                      </a>{' '}
                      , and{' '}
                      <a href="#" className="underline hover:text-[#0e0f0f]">
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </div>
                </form>
              </div>

              {/* Right Column: Order Summary */}
              <aside className="lg:col-span-4 lg:sticky lg:top-24 flex flex-col gap-4">
                <div className="bg-[#ffffff] rounded-xl p-4 sm:p-6 shadow-sm">
                  <div className="flex items-center justify-between pb-3">
                    <h3 className="text-lg font-['Playfair_Display'] text-[#1b1c19]">
                      Order Summary
                    </h3>
                    <span className="text-sm font-semibold text-[#444748]">
                      {cartItems.length} Atelier Items
                    </span>
                  </div>

                  <div className="flex flex-col gap-4 py-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-3 items-start">
                        <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-[#f5f3ee] flex-shrink-0 shadow-sm">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-1 right-1 bg-[#0e0f0f]/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full font-mono">
                            {item.qty}
                          </span>
                        </div>
                        <div className="flex-grow min-w-0">
                          <h4 className="text-sm font-medium text-[#1b1c19] truncate">
                            {item.name}
                          </h4>
                          <p className="text-xs text-[#444748] truncate">
                            Finish: {item.finish}
                          </p>
                          <p className="text-xs text-[#444748]">Qty: {item.qty}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="text-sm font-semibold text-[#1b1c19]">
                            {formatMoney(item.price)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Promo */}
                  {promoApplied && (
                    <div className="pt-1 pb-4">
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f5f3ee]">
                        <div className="flex items-center gap-2">
                          <Copy size={18} className="text-[#444748]" />
                          <div className="flex flex-col">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#0e0f0f]">
                              ATELIER10
                            </span>
                            <span className="text-[10px] text-[#444748] font-medium">
                              Private Collector 10% applied
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-[#444748]">-$25.00</span>
                          <button type="button" className="text-[#444748] hover:text-[#ba1a1a] transition-colors p-1" title="Remove promo voucher">
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Price Breakdown */}
                  <div className="flex flex-col gap-2.5 pt-1">
                    <div className="flex items-center justify-between text-sm text-[#444748]">
                      <span>Merchandise Subtotal</span>
                      <span className="font-semibold text-[#1b1c19]">{formatMoney(baseSubtotal)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-[#444748]">
                      <span className="flex items-center gap-1">
                        Collector Privilege (ATELIER10)
                      </span>
                      <span className="font-semibold">-$25.00</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-[#444748]">
                      <span className="flex items-center gap-1">
                        Insured Delivery
                        <HelpCircle size={14} className="text-[#444748] cursor-help" />
                      </span>
                      <span className={`font-semibold text-xs uppercase tracking-wider ${shipping === 'standard' ? 'text-[#705a45]' : 'text-[#0e0f0f]'}`}>
                        {shipping === 'standard' ? 'Complimentary' : formatMoney(shippingCost)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-[#444748]">
                      <span>Estimated Taxes &amp; GST</span>
                      <span className="font-semibold text-[#1b1c19]">Included</span>
                    </div>

                    {/* Grand Total */}
                    <div className="pt-3 mt-1 flex items-baseline justify-between">
                      <div>
                        <span className="text-lg font-['Playfair_Display'] text-[#1b1c19] block">
                          Total Payable
                        </span>
                        {/* <span className="text-xs text-[#444748]">
                          Including all statutory duties &amp; delivery
                        </span> */}
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-['Playfair_Display'] text-[#1b1c19] font-medium">
                          {formatMoney(total)}
                        </span>
                        {/* <span className="text-xs text-[#444748] block font-mono">
                          ≈ ₹{Math.round(total * 83.33).toLocaleString()} INR
                        </span> */}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Concierge Card */}
                {/* <div className="p-4 rounded-xl bg-[#f5f3ee] shadow-sm flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-[#0e0f0f]">
                    <Headset size={20} className="text-[#444748]" />
                    <span className="text-sm font-semibold">Atelier Personal Concierge</span>
                  </div>
                  <p className="text-sm text-[#444748] leading-relaxed">
                    Require custom sizing, gift wrapping, or specialized art courier scheduling?
                  </p>
                  <div className="flex flex-col gap-0.5 pt-1 text-xs text-[#444748] font-medium">
                    <a
                      href="mailto:concierge@atelier.com"
                      className="hover:underline flex items-center gap-1.5"
                    >
                      <Mail size={15} className="text-[#444748]" />
                      concierge@atelier.com
                    </a>
                    <a
                      href="tel:+18004567890"
                      className="hover:underline flex items-center gap-1.5"
                    >
                      <Phone size={15} className="text-[#444748]" />
                      +1 (800) 456-7890 / +91 22 6901 0000
                    </a>
                  </div>
                </div> */}
              </aside>
            </div>
          </div>
        </main>

        {/* Footer */}
        {/* <footer className="w-full bg-[#f5f3ee] py-8">
          <div className="w-full px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs text-[#444748]">
              <VerifiedIcon size={16} className="text-[#444748]" />
              <span>Payment Encrypted &amp; Guaranteed</span>
              <span className="text-[#747878]">•</span>
              <span>care@atelier.com</span>
              <span className="text-[#747878]">•</span>
              <span>+91 Concierge Support</span>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-4">
              <nav className="flex items-center gap-4">
                <a href="#" className="text-xs text-[#444748] hover:text-[#1b1c19] transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-xs text-[#444748] hover:text-[#1b1c19] transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-xs text-[#444748] hover:text-[#1b1c19] transition-colors">
                  Shipping &amp; Returns
                </a>
              </nav>
              <span className="text-xs text-[#444748]">
                © 2025 ATELIER. All rights reserved.
              </span>
            </div>
          </div>
        </footer> */}
      </main>
    </div>
  )
}

function LoaderCircle({ className, size = 20 }: { className?: string; size?: number }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function EncryptedIcon({ className, size = 18 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 9V3a6 6 0 0 1 6 6v4a6 6 0 0 1-6 6H3a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6z" />
      <path d="M12 12h1" />
    </svg>
  )
}

function VerifiedIcon({ className, size = 18 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function HistoryIcon({ className, size = 18 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  )
}

function AccountBalance({ className }: { className?: string }) {
  return (
    <svg className={className} width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 0 9 9c3.75 0 6.84-2.25 7.93-5.25l2.12-1.5a1.5 1.5 0 0 0 1.8-2.1l-1-2.5a1.5 1.5 0 0 0-2.4-1.8l-1.88 1.33A9 9 0 1 1 3 12Z" />
      <path d="M3 3v18h18" />
    </svg>
  )
}
