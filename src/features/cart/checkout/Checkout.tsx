
import { useState } from 'react'
import {
  Flower2,
  ShieldCheck,
  Lock,
  Check,
  CreditCard,
  Smartphone,
  TrendingUp,
  MapPin,
  Phone,
  User,
  Mail,
  LockKeyhole,
  Truck,
  Headset,
  Receipt,
  X,
} from 'lucide-react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  category: string
}

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedShipping, setSelectedShipping] = useState('standard')
  const [selectedPayment, setSelectedPayment] = useState('upi')
  const [formData, setFormData] = useState({
    email: 'eleanor.vance@atelier-archive.com',
    phone: '9820145892',
    fullName: 'Eleanor Vance',
    country: 'IN',
    recipientPhone: '+91 98201 45892',
    pincode: '400050',
    city: 'Mumbai',
    addressLine1: 'Penthouse 4B, The Palmetto Residence',
    addressLine2: 'Pali Hill Road, Bandra West',
    landmark: 'Near Candies Cafe / Nargis Dutt Road',
    state: 'MH',
    saveToProfile: true,
    sameBilling: true,
    upiId: 'eleanor.vance@okaxis',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: '',
    netBankingBank: 'HDFC',
    addConciergeSupport: false,
  })

  const cartItems: CartItem[] = [
    {
      id: '1',
      name: 'Aura Sculpted Hoops',
      price: 84,
      quantity: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDayMukQ1JNPV82XpKbLsjU5aLAZTMwktIw6x1syh9ZnRNC9AHB35tud5QncUs_pi1LQPj3Fzo3ZLhhd7xHzibYhzWiupov_QU2S4q6MXIN1fuXoCaTr0F78P0wAPO7qMDD-6eEZtFuNB3RQNEdHMUN4ccq3-vEIyUTkFUZUow3bejpf_1R3WWsqkiTOVfYHdAbCIyRiI1D79MHmZDFQq0jlcpDDsEop0yh3P43NoUy',
      category: 'Gold Jewelry',
    },
    {
      id: '2',
      name: 'Nordic Oak Gallery Frame',
      price: 62,
      quantity: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6vHVrU-MeM_2wNfpGs_QkYv9twknx4udhM9iogJ2TdZ4P6T0K2gaLGpF70LOAUX-9UnTnOBcJtow5SpRNtNWcyE_DYfbq9_fi2j7YQugU3dzFpMdpP-VSrQdObzai9ZzIZvgkWsrEtVxFdc5ikasuww41FIGgorm8z5qymSzEcnMvJy8yH4hsTrrnj-A_gC9TByRsLvy78V02MXtF1ZSGE0rs1wnqtN8xDo4vtSgy',
      category: 'Home Decor',
    },
    {
      id: '3',
      name: 'Solstice Pearl Drops',
      price: 110,
      quantity: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsZQuX5soCsQIaZTOA9go8jRQ-JSc-GepaD5IH5vITld9vZ6ptnGd4jDlpSO-_gqi18-a9sdkcWzR5H-iv3vC6FO52TnMavRDgD8C4riUQ1nyWCNIqxgyl136krKAvEjxTQlMcFhvMiCSq31Om8bB52Juwax_6bPDquVD251H95AthjnS23MjeBC0ZHfLgl6tMGO-OENQP77gWmA3x7zbMPRXVQtEUjfHmDTQnXRwy',
      category: 'Pearl Jewelry',
    },
  ]

  const calculateSubtotal = () => cartItems.reduce((sum, item) => sum + item.price, 0)
  const calculateDiscount = () => 25
  const calculateShippingCost = () => (selectedShipping === 'standard' ? 0 : 18)
  const calculateTotal = () => calculateSubtotal() - calculateDiscount() + calculateShippingCost()

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePlaceOrder = () => {
    console.log('Order placed with data:', formData)
    // Simulate order submission
    const btn = document.getElementById('placeOrderBtn')
    if (btn) {
      btn.innerHTML = `
        <span class="material-symbols-outlined text-[20px]">lock</span>
        <span>Securing Atelier Reservation...</span>
      `
      btn.disabled = true
    }
  }

  const getPaymentMethodIcon = () => {
    switch (selectedPayment) {
      case 'upi':
        return <Smartphone className="inline-block h-5 w-5 mr-2" />
      case 'card':
        return <CreditCard className="inline-block h-5 w-5 mr-2" />
      case 'netbank':
        return <TrendingUp className="inline-block h-5 w-5 mr-2" />
      case 'cod':
        return <Headset className="inline-block h-5 w-5 mr-2" />
      default:
        return <Lock className="inline-block h-5 w-5 mr-2" />
    }
  }

  const getStepIcon = (step: number) => {
    if (step < currentStep) {
      return <Check className="w-4 h-4" />
    } else if (step === currentStep) {
      return (
        <div className="w-4 h-4 rounded-full bg-primary text-on-primary font-semibold text-xs flex items-center justify-center">
          {step}
        </div>
      )
    } else {
      return (
        <div className="w-4 h-4 rounded-full bg-surface-container-low text-on-surface-variant font-semibold text-xs flex items-center justify-center">
          {step}
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface">
      {/* Brand Header */}
      <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-20 w-full px-gutter-mobile md:px-margin-tablet lg:px-margin max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <a className="font-headline-md text-headline-md text-primary tracking-tight font-medium hover:text-on-surface-variant transition-colors" href="#">
              BRAND NAME
            </a>
          </div>
          <div className="flex items-center gap-space-xs text-on-surface-variant bg-surface-container-low px-space-sm py-1.5 rounded-full">
            <span className="material-symbols-outlined text-[18px] text-secondary">lock</span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface">Secure 256-Bit SSL Checkout</span>
          </div>
          <div className="flex items-center gap-space-md">
            <a
              className="inline-flex items-center gap-1 font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Return to Cart</span>
            </a>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-140px)]">
        <div className="flex flex-col w-full">
          {/* Top Stepper Progress Bar */}
          <section className="w-full bg-surface-container-low/70 py-space-md">
            <div className="max-w-[1440px] mx-auto px-gutter-mobile md:px-margin-tablet lg:px-margin">
              <nav aria-label="Checkout Steps" className="flex items-center justify-between max-w-2xl mx-auto">
                {/* Step 1: Cart (Completed) */}
                <div className="flex items-center gap-space-xs group cursor-pointer">
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-on-primary">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary">Cart</span>
                </div>
                <div className="flex-1 mx-3 h-[2px] bg-primary"></div>
                {/* Step 2: Information (Active) */}
                <div className="flex items-center gap-space-xs">
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-on-primary font-label-sm text-label-sm font-semibold">
                    2
                  </div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold text-primary">
                    Information
                  </span>
                </div>
                <div className="flex-1 mx-3 h-[2px] bg-surface-container-highest"></div>
                {/* Step 3: Payment (Upcoming) */}
                <div className="flex items-center gap-space-xs text-on-surface-variant">
                  <div className="w-7 h-7 rounded-full bg-surface-container-highest flex items-center justify-center font-label-sm text-label-sm text-on-surface-variant font-medium">
                    3
                  </div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider hidden sm:inline">
                    Payment
                  </span>
                </div>
                <div className="flex-1 mx-3 h-[2px] bg-surface-container-highest"></div>
                {/* Step 4: Confirmation (Upcoming) */}
                <div className="flex items-center gap-space-xs text-outline">
                  <div className="w-7 h-7 rounded-full bg-surface-container-highest flex items-center justify-center font-label-sm text-label-sm text-outline">
                    4
                  </div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider hidden sm:inline">
                    Review
                  </span>
                </div>
              </nav>
            </div>
          </section>

          {/* Main Checkout Grid Body */}
          <main className="w-full py-space-lg lg:py-space-2xl">
            <div className="max-w-[1440px] mx-auto px-gutter-mobile md:px-margin-tablet lg:px-margin">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
                {/* Left Column: Form Flow (65% on Desktop => col-span-7 or 8) */}
                <div className="lg:col-span-8 flex flex-col gap-space-xl">
                  {/* Express Accelerated Checkout Banner */}
                  <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
                    <div className="flex items-center justify-between mb-space-md">
                      <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">
                        Express Checkout
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px] text-secondary">flash_on</span>
                        Instant Authentication
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-xs">
                      {/* Apple Pay Pill */}
                      <button
                        className="h-12 bg-primary hover:bg-primary-container text-on-primary rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-sm active:scale-[0.99]"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[20px]">phone_iphone</span>
                        <span className="font-label-lg text-label-lg font-semibold tracking-wider">
                          Apple Pay
                        </span>
                      </button>
                      {/* Google Pay Pill */}
                      <button
                        className="h-12 bg-surface-container-lowest hover:bg-surface-container text-primary rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-sm active:scale-[0.99]"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[20px] text-secondary">
                          account_balance_wallet
                        </span>
                        <span className="font-label-lg text-label-lg font-semibold tracking-wider">
                          Google Pay
                        </span>
                      </button>
                      {/* UPI Instant Quick-Checkout */}
                      <button
                        className="h-12 bg-surface-container-low hover:bg-surface-container text-primary rounded-lg flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.99]"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[20px] text-secondary">
                          qr_code_2
                        </span>
                        <span className="font-label-lg text-label-lg font-semibold tracking-wider">
                          UPI Instant
                        </span>
                      </button>
                    </div>
                    <div className="relative flex py-space-sm items-center mt-space-xs">
                      <div className="flex-grow h-[1px] bg-surface-container-highest"></div>
                      <span className="flex-shrink mx-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest bg-surface-container-lowest px-2">
                        Or Continue With Standard Checkout
                      </span>
                      <div className="flex-grow h-[1px] bg-surface-container-highest"></div>
                    </div>
                  </div>
                  {/* Checkout Form Container */}
                  <form className="flex flex-col gap-space-xl" id="checkoutForm" onSubmit={(e) => e.preventDefault()}>
                    {/* SECTION 1: Contact Information */}
                    <section className="bg-surface-container-lowest rounded-xl p-space-md sm:p-space-lg shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-space-md">
                        <div className="flex items-center gap-space-xs">
                          <span className="w-6 h-6 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-label-sm text-label-sm font-semibold">
                            1
                          </span>
                          <h2 className="font-headline-sm text-headline-sm text-primary">
                            Contact Information
                          </h2>
                        </div>
                        <div className="mt-2 sm:mt-0 font-label-md text-label-md text-on-surface-variant">
                          Already have an atelier account?{' '}
                          <a className="text-secondary font-medium hover:underline ml-1" href="#">
                            Sign in
                          </a>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                        {/* Email Address */}
                        <div className="flex flex-col gap-1.5 md:col-span-2">
                          <label
                            className="font-label-md text-label-md text-on-surface font-semibold flex items-center justify-between"
                            htmlFor="contactEmail"
                          >
                            <span>Email Address</span>
                            <span className="text-secondary text-[11px] font-normal">
                              Order tracking & invoices
                            </span>
                          </label>
                          <div className="relative">
                            <input
                              className="w-full h-12 px-4 rounded-[10px] bg-surface-container-lowest text-primary font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                              id="contactEmail"
                              placeholder="name@domain.com"
                              required
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                            />
                            <span className="material-symbols-outlined absolute right-3 top-3 text-[18px] text-secondary">
                              mail
                            </span>
                          </div>
                          <p className="font-label-sm text-label-sm text-on-surface-variant">
                            We prioritize your inbox: strict zero-spam editorial updates only.
                          </p>
                        </div>
                        {/* Phone Number with Country Code */}
                        <div className="flex flex-col gap-1.5 md:col-span-2">
                          <label
                            className="font-label-md text-label-md text-on-surface font-semibold"
                            htmlFor="contactPhone"
                          >
                            Phone Number for Courier Dispatch
                          </label>
                          <div className="grid grid-cols-12 gap-2">
                            <div className="col-span-4 sm:col-span-3 flex items-center px-3 h-12 rounded-[10px] bg-surface-container-low text-primary text-label-md font-label-md gap-2">
                              <span className="text-base select-none">🇮🇳</span>
                              <span className="font-semibold">+91</span>
                              <span className="material-symbols-outlined text-[16px] text-on-surface-variant ml-auto">
                                expand_more
                              </span>
                            </div>
                            <div className="col-span-8 sm:col-span-9 relative">
                              <input
                                className="w-full h-12 px-4 rounded-[10px] bg-surface-container-lowest text-primary font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                                id="contactPhone"
                                pattern="[0-9]{10}"
                                placeholder="10-digit mobile number"
                                required
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                              />
                              <span className="material-symbols-outlined absolute right-3 top-3 text-[18px] text-secondary">
                                call
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* Opt-in Notifications Checkbox */}
                        <div className="md:col-span-2 pt-1">
                          <label className="flex items-start gap-3 cursor-pointer select-none">
                            <input
                              checked={true}
                              className="mt-1 w-[18px] h-[18px] rounded accent-primary text-on-primary cursor-pointer"
                              id="smsOptIn"
                              type="checkbox"
                            />
                            <span className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                              Send me real-time dispatch updates, insured courier live tracking, and digital certificates via SMS and WhatsApp.
                            </span>
                          </label>
                        </div>
                      </div>
                    </section>
                    {/* SECTION 2: Delivery Address */}
                    <section className="bg-surface-container-lowest rounded-xl p-space-md sm:p-space-lg shadow-sm">
                      <div className="flex items-center justify-between mb-space-md">
                        <div className="flex items-center gap-space-xs">
                          <span className="w-6 h-6 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-label-sm text-label-sm font-semibold">
                            2
                          </span>
                          <h2 className="font-headline-sm text-headline-sm text-primary">
                            Delivery Address
                          </h2>
                        </div>
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-secondary">
                            verified
                          </span>
                          Doorstep White-Glove
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                        {/* Country Selection */}
                        <div className="flex flex-col gap-1.5 md:col-span-2">
                          <label
                            className="font-label-md text-label-md text-on-surface font-semibold"
                            htmlFor="countryName"
                          >
                            Country / Territory
                          </label>
                          <div className="relative">
                            <select
                              className="w-full h-12 px-4 pr-10 rounded-[10px] bg-surface-container-lowest text-primary font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary appearance-none shadow-sm cursor-pointer"
                              id="countryName"
                              value={formData.country}
                              onChange={(e) => handleInputChange('country', e.target.value)}
                            >
                              <option value="IN">India (Domestic Insured Dispatch)</option>
                              <option value="US">United States (Atelier International)</option>
                              <option value="UK">United Kingdom</option>
                              <option value="AE">United Arab Emirates</option>
                              <option value="SG">Singapore</option>
                              <option value="FR">France</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-3 text-[20px] text-on-surface-variant pointer-events-none">
                              expand_more
                            </span>
                          </div>
                        </div>
                        {/* Recipient Full Name */}
                        <div className="flex flex-col gap-1.5">
                          <label
                            className="font-label-md text-label-md text-on-surface font-semibold"
                            htmlFor="fullName"
                          >
                            Recipient Full Name
                          </label>
                          <input
                            className="w-full h-12 px-4 rounded-[10px] bg-surface-container-lowest text-primary font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                            id="fullName"
                            placeholder="First and last name"
                            required
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                          />
                        </div>
                        {/* Recipient Contact Number */}
                        <div className="flex flex-col gap-1.5">
                          <label
                            className="font-label-md text-label-md text-on-surface font-semibold"
                            htmlFor="recipientPhone"
                          >
                            Courier Contact Number
                          </label>
                          <input
                            className="w-full h-12 px-4 rounded-[10px] bg-surface-container-lowest text-primary font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                            id="recipientPhone"
                            placeholder="For gate security or signature"
                            required
                            type="tel"
                            value={formData.recipientPhone}
                            onChange={(e) => handleInputChange('recipientPhone', e.target.value)}
                          />
                        </div>
                        {/* PIN Code with Instant Auto-Lookup */}
                        <div className="flex flex-col gap-1.5">
                          <label
                            className="font-label-md text-label-md text-on-surface font-semibold flex items-center justify-between"
                            htmlFor="pincode"
                          >
                            <span>Postal PIN Code</span>
                            <span className="text-secondary text-[11px] font-semibold flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-[14px]">bolt</span>
                              Serviced Area
                            </span>
                          </label>
                          <div className="relative">
                            <input
                              className="w-full h-12 px-4 rounded-[10px] bg-surface-container-lowest text-primary font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                              id="pincode"
                              maxLength={6}
                              placeholder="6-digit PIN code"
                              required
                              type="text"
                              value={formData.pincode}
                              onChange={(e) => handleInputChange('pincode', e.target.value)}
                            />
                            <span className="material-symbols-outlined absolute right-3 top-3 text-[18px] text-primary">
                              check_circle
                            </span>
                          </div>
                        </div>
                        {/* City / Town */}
                        <div className="flex flex-col gap-1.5">
                          <label
                            className="font-label-md text-label-md text-on-surface font-semibold"
                            htmlFor="cityName"
                          >
                            City
                          </label>
                          <input
                            className="w-full h-12 px-4 rounded-[10px] bg-surface-container-lowest text-primary font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                            id="cityName"
                            placeholder="City / Metropolitan"
                            required
                            type="text"
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                          />
                        </div>
                        {/* House / Suite / Building Name */}
                        <div className="flex flex-col gap-1.5 md:col-span-2">
                          <label
                            className="font-label-md text-label-md text-on-surface font-semibold"
                            htmlFor="addressLine1"
                          >
                            Flat, Villa, Residence, or Suite
                          </label>
                          <input
                            className="w-full h-12 px-4 rounded-[10px] bg-surface-container-lowest text-primary font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                            id="addressLine1"
                            placeholder="Building name, Floor, Unit number"
                            required
                            type="text"
                            value={formData.addressLine1}
                            onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                          />
                        </div>
                        {/* Street Address / Locality */}
                        <div className="flex flex-col gap-1.5 md:col-span-2">
                          <label
                            className="font-label-md text-label-md text-on-surface font-semibold"
                            htmlFor="addressLine2"
                          >
                            Street Address / Locality
                          </label>
                          <input
                            className="w-full h-12 px-4 rounded-[10px] bg-surface-container-lowest text-primary font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                            id="addressLine2"
                            placeholder="Colony, Street, Neighborhood"
                            required
                            type="text"
                            value={formData.addressLine2}
                            onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                          />
                        </div>
                        {/* Landmark (Optional) */}
                        <div className="flex flex-col gap-1.5">
                          <label
                            className="font-label-md text-label-md text-on-surface font-semibold"
                            htmlFor="landmark"
                          >
                            Landmark <span className="font-normal text-on-surface-variant">(Optional)</span>
                          </label>
                          <input
                            className="w-full h-12 px-4 rounded-[10px] bg-surface-container-lowest text-primary font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                            id="landmark"
                            placeholder="Recognizable point for delivery concierge"
                            type="text"
                            value={formData.landmark}
                            onChange={(e) => handleInputChange('landmark', e.target.value)}
                          />
                        </div>
                        {/* State */}
                        <div className="flex flex-col gap-1.5">
                          <label
                            className="font-label-md text-label-md text-on-surface font-semibold"
                            htmlFor="stateName"
                          >
                            State / Region
                          </label>
                          <div className="relative">
                            <select
                              className="w-full h-12 px-4 pr-10 rounded-[10px] bg-surface-container-lowest text-primary font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
                              id="stateName"
                              value={formData.state}
                              onChange={(e) => handleInputChange('state', e.target.value)}
                            >
                              <option value="MH">Maharashtra</option>
                              <option value="DL">Delhi NCR</option>
                              <option value="KA">Karnataka</option>
                              <option value="TN">Tamil Nadu</option>
                              <option value="TS">Telangana</option>
                              <option value="WB">West Bengal</option>
                              <option value="GJ">Gujarat</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-3 text-[20px] text-on-surface-variant pointer-events-none">
                              expand_more
                            </span>
                          </div>
                        </div>
                        {/* Save to Profile & Billing Toggle */}
                        <div className="md:col-span-2 flex flex-col gap-space-xs pt-space-xs">
                          <label className="flex items-center gap-3 cursor-pointer select-none">
                            <input
                              checked={formData.saveToProfile}
                              className="w-[18px] h-[18px] rounded accent-primary text-on-primary cursor-pointer"
                              type="checkbox"
                              onChange={(e) => handleInputChange('saveToProfile', e.target.checked)}
                            />
                            <span className="font-body-md text-body-md text-on-surface">
                              Save this address to my curated Atelier Profile for fast re-ordering
                            </span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer select-none">
                            <input
                              checked={formData.sameBilling}
                              className="w-[18px] h-[18px] rounded accent-primary text-on-primary cursor-pointer"
                              id="sameBilling"
                              onChange={(e) => handleInputChange('sameBilling', e.target.checked)}
                              type="checkbox"
                            />
                            <span className="font-body-md text-body-md text-on-surface">
                              Billing address is identical to delivery destination
                            </span>
                          </label>
                          {/* Secondary Hidden Billing Container */}
                          <div
                            className="hidden mt-space-sm p-space-md rounded-xl bg-surface-container-low transition-all"
                            id="secondaryBillingContainer"
                          >
                            <p className="font-label-sm text-label-sm uppercase tracking-wider text-secondary mb-space-sm font-semibold">
                              Separate Tax & Billing Entity
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
                              <input
                                className="h-11 px-3.5 rounded-[8px] bg-surface-container-lowest text-body-md shadow-sm"
                                placeholder="Registered Legal Name or Company"
                                type="text"
                              />
                              <input
                                className="h-11 px-3.5 rounded-[8px] bg-surface-container-lowest text-body-md shadow-sm"
                                placeholder="GSTIN / VAT Identification (Optional)"
                                type="text"
                              />
                              <input
                                className="md:col-span-2 h-11 px-3.5 rounded-[8px] bg-surface-container-lowest text-body-md shadow-sm"
                                placeholder="Billing Street Address"
                                type="text"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    {/* SECTION 3: Delivery Method Selection */}
                    <section className="bg-surface-container-lowest rounded-xl p-space-md sm:p-space-lg shadow-sm">
                      <div className="flex items-center gap-space-xs mb-space-md">
                        <span className="w-6 h-6 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-label-sm text-label-sm font-semibold">
                          3
                        </span>
                        <h2 className="font-headline-sm text-headline-sm text-primary">
                          Delivery Method
                        </h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                        {/* Option 1: Complimentary Standard (Selected) */}
                        <label
                          className="relative flex flex-col justify-between p-space-md rounded-xl cursor-pointer bg-surface-container-low transition-all duration-200 shadow-sm"
                          id="deliveryCardStandard"
                          onClick={() => setSelectedShipping('standard')}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2.5">
                              <input
                                checked={selectedShipping === 'standard'}
                                className="w-[18px] h-[18px] accent-primary"
                                name="shippingTier"
                                type="radio"
                                value="standard"
                                onChange={() => setSelectedShipping('standard')}
                              />
                              <div>
                                <div className="font-label-lg text-label-lg font-semibold text-primary">
                                  Insured Atelier Standard
                                </div>
                                <div className="font-label-sm text-label-sm text-on-surface-variant">
                                  Estimated arrival: 3–5 Business Days
                                </div>
                              </div>
                            </div>
                            <span className="font-label-md text-label-md font-semibold text-secondary uppercase tracking-wider">
                              Free
                            </span>
                          </div>
                          <div className="mt-space-md pt-space-xs text-[12px] font-label-md text-on-surface-variant flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px] text-secondary">
                              eco
                            </span>
                            Carbon-neutral packaging with recycled linen buffers
                          </div>
                        </label>
                        {/* Option 2: Priority White-Glove */}
                        <label
                          className="relative flex flex-col justify-between p-space-md rounded-xl cursor-pointer bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-200 shadow-sm"
                          id="deliveryCardExpress"
                          onClick={() => setSelectedShipping('express')}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2.5">
                              <input
                                checked={selectedShipping === 'express'}
                                className="w-[18px] h-[18px] accent-primary"
                                name="shippingTier"
                                type="radio"
                                value="express"
                                onChange={() => setSelectedShipping('express')}
                              />
                              <div>
                                <div className="font-label-lg text-label-lg font-semibold text-primary">
                                  Priority Express White-Glove
                                </div>
                                <div className="font-label-sm text-label-sm text-on-surface-variant">
                                  Guaranteed delivery: 1–2 Business Days
                                </div>
                              </div>
                            </div>
                            <span className="font-label-md text-label-md font-semibold text-primary">
                              $18.00
                            </span>
                          </div>
                          <div className="mt-space-md pt-space-xs text-[12px] font-label-md text-on-surface-variant flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px] text-secondary">
                              verified_user
                            </span>
                            Signature upon handover & tamper-proof seal
                          </div>
                        </label>
                      </div>
                    </section>
                    {/* SECTION 4: Payment Gateway & Methods */}
                    <section className="bg-surface-container-lowest rounded-xl p-space-md sm:p-space-lg shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-space-md">
                        <div className="flex items-center gap-space-xs">
                          <span className="w-6 h-6 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-label-sm text-label-sm font-semibold">
                            4
                          </span>
                          <h2 className="font-headline-sm text-headline-sm text-primary">
                            Payment Method
                          </h2>
                        </div>
                        <div className="mt-1 sm:mt-0 font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-secondary">
                            lock
                          </span>
                          256-Bit Bank Grade SSL Encrypted
                        </div>
                      </div>
                      {/* Payment Method Tabs / Accordions */}
                      <div className="flex flex-col gap-space-sm">
                        {/* Accordion 1: UPI (Default Open for India) */}
                        <div className="rounded-xl overflow-hidden shadow-sm bg-surface-container-lowest">
                          <button
                            className="w-full p-space-md flex items-center justify-between text-left transition-colors bg-surface-container-low hover:bg-surface-container-low"
                            onClick={() => setSelectedPayment('upi')}
                            type="button"
                          >
                            <div className="flex items-center gap-3">
                              <input
                                checked={selectedPayment === 'upi'}
                                className="w-[18px] h-[18px] accent-primary"
                                id="payRadioUpi"
                                name="paymentOption"
                                type="radio"
                                value="upi"
                                onChange={() => setSelectedPayment('upi')}
                              />
                              <div>
                                <span className="font-label-lg text-label-lg font-semibold text-primary block">
                                  UPI (Instant QR / VPA ID)
                                </span>
                                <span className="font-label-sm text-label-sm text-on-surface-variant">
                                  Google Pay, PhonePe, Paytm, BHIM, Cred UPI
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
                              <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-semibold">
                                0% Fee
                              </span>
                            </div>
                          </button>
                          <div
                            className="p-space-md bg-surface-container-lowest flex flex-col gap-space-md"
                            id="paymentContentUpi"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md items-center">
                              {/* VPA Input Form */}
                              <div className="flex flex-col gap-space-xs">
                                <label
                                  className="font-label-md text-label-md text-on-surface font-semibold"
                                  htmlFor="upiId"
                                >
                                  Virtual Payment Address (UPI ID)
                                </label>
                                <div className="relative">
                                  <input
                                    className="w-full h-12 px-4 rounded-[10px] bg-surface-container-low text-primary font-body-md focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                                    id="upiId"
                                    placeholder="username@bank"
                                    type="text"
                                    value={formData.upiId}
                                    onChange={(e) => handleInputChange('upiId', e.target.value)}
                                  />
                                  <button
                                    className="absolute right-2 top-2 h-8 px-3 rounded-md bg-primary text-on-primary font-label-sm text-label-sm hover:bg-primary-container transition-colors"
                                    type="button"
                                  >
                                    Verify
                                  </button>
                                </div>
                                <span className="font-label-sm text-label-sm text-secondary flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[14px]">
                                    check_circle
                                  </span>
                                  ID verified with National Payments Corporation (NPCI)
                                </span>
                              </div>
                              {/* QR Code Verification Card */}
                              <div className="p-space-md rounded-xl bg-surface-container-low flex items-center gap-space-md">
                                <div className="w-20 h-20 bg-surface-container-lowest rounded-lg p-2 flex items-center justify-center shadow-sm">
                                  {/* Minimalist inline SVG QR representation */}
                                  <svg
                                    className="w-full h-full text-primary"
                                    fill="currentColor"
                                    viewBox="0 0 100 100"
                                  >
                                    <path d="M10 10h30v30H10zm6 6v18h18V16zm4 4h10v10H20zM60 10h30v30H60zm6 6v18h18V16zm4 4h10v10H70zM10 60h30v30H10zm6 6v18h18V66zm4 4h10v10H20zM60 60h10v10H60zm20 0h10v10H80zm-10 10h10v10H70zm20 0h10v10H90zm-20 10h10v10H70zm10 10h10v10H80z" />
                                  </svg>
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-label-md text-label-md font-semibold text-primary">
                                    Scan to Pay Instantly
                                  </span>
                                  <span className="font-label-sm text-label-sm text-on-surface-variant leading-relaxed">
                                    Open any camera or UPI app on your phone to scan and authorize.
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Accordion 2: Credit / Debit Card */}
                        <div className="rounded-xl overflow-hidden shadow-sm bg-surface-container-lowest">
                          <button
                            className="w-full p-space-md flex items-center justify-between text-left transition-colors hover:bg-surface-container-low"
                            onClick={() => setSelectedPayment('card')}
                            type="button"
                          >
                            <div className="flex items-center gap-3">
                              <input
                                checked={selectedPayment === 'card'}
                                className="w-[18px] h-[18px] accent-primary"
                                id="payRadioCard"
                                name="paymentOption"
                                type="radio"
                                value="card"
                                onChange={() => setSelectedPayment('card')}
                              />
                              <div>
                                <span className="font-label-lg text-label-lg font-semibold text-primary block">
                                  Credit or Debit Card
                                </span>
                                <span className="font-label-sm text-label-sm text-on-surface-variant">
                                  Visa, Mastercard, RuPay, American Express
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[11px] font-mono tracking-wider font-semibold text-secondary uppercase px-2 py-0.5 bg-surface-container rounded">
                                3D Secure
                              </span>
                            </div>
                          </button>
                          <div
                            className="hidden p-space-md bg-surface-container-lowest flex flex-col gap-space-md"
                            id="paymentContentCard"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                              <div className="md:col-span-2 flex flex-col gap-1">
                                <label
                                  className="font-label-md text-label-md font-semibold text-on-surface"
                                  htmlFor="cardNumber"
                                >
                                  Card Number
                                </label>
                                <div className="relative">
                                  <input
                                    className="w-full h-12 px-4 rounded-[10px] bg-surface-container-low text-primary font-body-md focus:outline-none focus:ring-1 focus:ring-primary shadow-sm tracking-widest"
                                    id="cardNumber"
                                    maxLength={19}
                                    placeholder="4111 •••• •••• 4242"
                                    type="text"
                                    value={formData.cardNumber}
                                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                                  />
                                  <span className="material-symbols-outlined absolute right-3 top-3 text-[20px] text-secondary">
                                    credit_card
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-col gap-1">
                                <label
                                  className="font-label-md text-label-md font-semibold text-on-surface"
                                  htmlFor="cardExpiry"
                                >
                                  Expiration
                                </label>
                                <input
                                  className="w-full h-12 px-4 rounded-[10px] bg-surface-container-low text-primary font-body-md focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                                  id="cardExpiry"
                                  maxLength={5}
                                  placeholder="MM / YY"
                                  type="text"
                                  value={formData.cardExpiry}
                                  onChange={(e) => handleInputChange('cardExpiry', e.target.value)}
                                />
                              </div>
                              <div className="flex flex-col gap-1">
                                <label
                                  className="font-label-md text-label-md font-semibold text-on-surface flex items-center justify-between"
                                  htmlFor="cardCvv"
                                >
                                  Security Code (CVV)
                                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant cursor-help" title="3 or 4 digit code on the back">
                                    help
                                  </span>
                                </label>
                                <input
                                  className="w-full h-12 px-4 rounded-[10px] bg-surface-container-low text-primary font-body-md focus:outline-none focus:ring-1 focus:ring-primary shadow-sm tracking-widest"
                                  id="cardCvv"
                                  maxLength={4}
                                  placeholder="•••"
                                  type="password"
                                  value={formData.cardCvv}
                                  onChange={(e) => handleInputChange('cardCvv', e.target.value)}
                                />
                              </div>
                              <div className="md:col-span-2 flex flex-col gap-1">
                                <label
                                  className="font-label-md text-label-md font-semibold text-on-surface"
                                  htmlFor="cardName"
                                >
                                  Name Printed on Card
                                </label>
                                <input
                                  className="w-full h-12 px-4 rounded-[10px] bg-surface-container-low text-primary font-body-md focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                                  id="cardName"
                                  placeholder="Eleanor Vance"
                                  type="text"
                                  value={formData.cardName}
                                  onChange={(e) => handleInputChange('cardName', e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Accordion 3: Net Banking */}
                        <div className="rounded-xl overflow-hidden shadow-sm bg-surface-container-lowest">
                          <button
                            className="w-full p-space-md flex items-center justify-between text-left transition-colors hover:bg-surface-container-low"
                            onClick={() => setSelectedPayment('netbank')}
                            type="button"
                          >
                            <div className="flex items-center gap-3">
                              <input
                                checked={selectedPayment === 'netbank'}
                                className="w-[18px] h-[18px] accent-primary"
                                id="payRadioNetbank"
                                name="paymentOption"
                                type="radio"
                                value="netbank"
                                onChange={() => setSelectedPayment('netbank')}
                              />
                              <div>
                                <span className="font-label-lg text-label-lg font-semibold text-primary block">
                                  Net Banking
                                </span>
                                <span className="font-label-sm text-label-sm text-on-surface-variant">
                                  Direct transfer via 50+ Domestic Financial Institutions
                                </span>
                              </div>
                            </div>
                            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
                              account_balance
                            </span>
                          </button>
                          <div
                            className="hidden p-space-md bg-surface-container-lowest flex flex-col gap-space-md"
                            id="paymentContentNetbank"
                          >
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-xs">
                              <button
                                className="h-11 rounded-lg bg-surface-container-low hover:bg-surface-container font-label-sm text-label-sm font-semibold text-primary transition-colors"
                                type="button"
                              >
                                HDFC Bank
                              </button>
                              <button
                                className="h-11 rounded-lg bg-surface-container-low hover:bg-surface-container font-label-sm text-label-sm font-semibold text-primary transition-colors"
                                type="button"
                              >
                                ICICI Bank
                              </button>
                              <button
                                className="h-11 rounded-lg bg-surface-container-low hover:bg-surface-container font-label-sm text-label-sm font-semibold text-primary transition-colors"
                                type="button"
                              >
                                State Bank
                              </button>
                              <button
                                className="h-11 rounded-lg bg-surface-container-low hover:bg-surface-container font-label-sm text-label-sm font-semibold text-primary transition-colors"
                                type="button"
                              >
                                Axis Bank
                              </button>
                            </div>
                            <div className="relative">
                              <select
                                className="w-full h-12 px-4 pr-10 rounded-[10px] bg-surface-container-low text-primary font-body-md focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
                                value={formData.netBankingBank}
                                onChange={(e) => handleInputChange('netBankingBank', e.target.value)}
                              >
                                <option value="">Select Other Domestic Bank...</option>
                                <option value="kotak">Kotak Mahindra Bank</option>
                                <option value="yes">Yes Bank</option>
                                <option value="indusind">IndusInd Bank</option>
                                <option value="hsbc">HSBC India</option>
                              </select>
                              <span className="material-symbols-outlined absolute right-3 top-3 text-[20px] text-on-surface-variant pointer-events-none">
                                expand_more
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* Accordion 4: Cash on Delivery (COD) */}
                        <div className="rounded-xl overflow-hidden shadow-sm bg-surface-container-lowest">
                          <button
                            className="w-full p-space-md flex items-center justify-between text-left transition-colors hover:bg-surface-container-low"
                            onClick={() => setSelectedPayment('cod')}
                            type="button"
                          >
                            <div className="flex items-center gap-3">
                              <input
                                checked={selectedPayment === 'cod'}
                                className="w-[18px] h-[18px] accent-primary"
                                id="payRadioCod"
                                name="paymentOption"
                                type="radio"
                                value="cod"
                                onChange={() => setSelectedPayment('cod')}
                              />
                              <div>
                                <span className="font-label-lg text-label-lg font-semibold text-primary block">
                                  Cash on Delivery (COD)
                                </span>
                                <span className="font-label-sm text-label-sm text-on-surface-variant">
                                  Pay via cash or UPI QR upon courier arrival
                                </span>
                              </div>
                            </div>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">
                              OTP required
                            </span>
                          </button>
                          <div
                            className="hidden p-space-md bg-surface-container-lowest flex flex-col gap-space-xs"
                            id="paymentContentCod"
                          >
                            <p className="font-body-md text-body-md text-on-surface-variant">
                              A confirmation code will be dispatched to{' '}
                              <strong className="text-primary">+91 98201 45892</strong>{' '}
                              prior to final white-glove dispatch. Exact change or digital scan is appreciated upon arrival.
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>
                    {/* Final Place Order Button Action */}
                    <div className="flex flex-col gap-space-md">
                      <button
                        className="w-full h-[54px] rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg font-semibold tracking-wider flex items-center justify-center gap-space-xs transition-all duration-200 shadow-md active:scale-[0.99]"
                        id="placeOrderBtn"
                        onClick={handlePlaceOrder}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[20px]">lock</span>
                        <span id="submitBtnText">Place Order & Authorize — ${calculateTotal().toFixed(2)}</span>
                      </button>
                      {/* Security Guarantees / Badges */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-space-xs text-center">
                        <div className="flex items-center justify-center gap-2 text-on-surface-variant">
                          <span className="material-symbols-outlined text-[18px] text-secondary">
                            encrypted
                          </span>
                          <span className="font-label-sm text-label-sm">
                            256-Bit SSL Encrypted
                          </span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-on-surface-variant">
                          <span className="material-symbols-outlined text-[18px] text-secondary">
                            verified
                          </span>
                          <span className="font-label-sm text-label-sm">
                            PCI-DSS Level 1 Compliant
                          </span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-on-surface-variant">
                          <span className="material-symbols-outlined text-[18px] text-secondary">
                            history
                          </span>
                          <span className="font-label-sm text-label-sm">
                            30-Day Atelier Guarantee
                          </span>
                        </div>
                      </div>
                      {/* Legal Disclaimer */}
                      <p className="font-label-sm text-label-sm text-on-surface-variant text-center max-w-xl mx-auto leading-relaxed">
                        By placing this reservation order, you acknowledge and accept the BRAND NAME{' '}
                        <a className="underline hover:text-primary" href="#">
                          Terms of Service
                        </a>{' '}
                        <a className="underline hover:text-primary" href="#">
                          Returns Policy
                        </a>{' '}
                        and{' '}
                        <a className="underline hover:text-primary" href="#">
                          Privacy Policy
                        </a>
                        .
                      </p>
                    </div>
                  </form>
                </div>
                {/* Right Column: Sticky Order Summary (35% Desktop => col-span-4) */}
                <aside className="lg:col-span-4 lg:sticky lg:top-24 flex flex-col gap-space-md">
                  <div className="bg-surface-container-lowest rounded-xl p-space-md sm:p-space-lg shadow-sm">
                    <div className="flex items-center justify-between pb-space-sm">
                      <h3 className="font-headline-sm text-headline-sm text-primary">
                        Order Summary
                      </h3>
                      <span className="font-label-md text-label-md font-semibold text-secondary">
                        3 Atelier Items
                      </span>
                    </div>
                    {/* Cart Items Scroll/List */}
                    <div className="flex flex-col gap-space-md py-space-md">
                      {/* Item 1: Aura Sculpted Hoops */}
                      <div className="flex gap-space-sm items-start">
                        <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-surface-container flex-shrink-0 shadow-sm">
                          <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDayMukQ1JNPV82XpKbLsjU5aLAZTMwktIw6x1syh9ZnRNC9AHB35tud5QncUs_pi1LQPj3Fzo3ZLhhd7xHzibYhzWiupov_QU2S4q6MXIN1fuXoCaTr0F78P0wAPO7qMDD-6eEZtFuNB3RQNEdHMUN4ccq3-vEIyUTkFUZUow3bejpf_1R3WWsqkiTOVfYHdAbCIyRiI1D79MHmZDFQq0jlcpDDsEop0yh3P43NoUy"
                            alt="Minimalist warm-toned photograph of gold sculpted hoop earrings resting on an organic plaster pedestal in soft natural studio sunlight with warm linen backdrop"
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-1 right-1 bg-primary/90 text-on-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full font-mono">
                            1
                          </span>
                        </div>
                        <div className="flex-grow min-w-0">
                          <h4 className="font-title-md text-title-md text-primary truncate">
                            Aura Sculpted Hoops
                          </h4>
                          <p className="font-label-sm text-label-sm text-on-surface-variant truncate">
                            Finish: 18k Gold Vermeil
                          </p>
                          <p className="font-label-sm text-label-sm text-on-surface-variant">
                            Qty: 1
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="font-label-lg text-label-lg font-semibold text-primary">
                            $84.00
                          </span>
                        </div>
                      </div>
                      {/* Item 2: Nordic Oak Gallery Frame */}
                      <div className="flex gap-space-sm items-start">
                        <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-surface-container flex-shrink-0 shadow-sm">
                          <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6vHVrU-MeM_2wNfpGs_QkYv9twknx4udhM9iogJ2TdZ4P6T0K2gaLGpF70LOAUX-9UnTnOBcJtow5SpRNtNWcyE_DYfbq9_fi2j7YQugU3dzFpMdpP-VSrQdObzai9ZzIZvgkWsrEtVxFdc5ikasuww41FIGgorm8z5qymSzEcnMvJy8yH4hsTrrnj-A_gC9TByRsLvy78V02MXtF1ZSGE0rs1wnqtN8xDo4vtSgy"
                            alt="Artisanal solid Nordic oak minimalist gallery picture frame angled against a warm sand plaster wall showcasing clean natural joinery and warm textured matte surface"
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-1 right-1 bg-primary/90 text-on-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full font-mono">
                            1
                          </span>
                        </div>
                        <div className="flex-grow min-w-0">
                          <h4 className="font-title-md text-title-md text-primary truncate">
                            Nordic Oak Gallery Frame
                          </h4>
                          <p className="font-label-sm text-label-sm text-on-surface-variant truncate">
                            Format: 11x14 Archival Glass
                          </p>
                          <p className="font-label-sm text-label-sm text-on-surface-variant">
                            Qty: 1
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="font-label-lg text-label-lg font-semibold text-primary">
                            $62.00
                          </span>
                        </div>
                      </div>
                      {/* Item 3: Solstice Pearl Drops */}
                      <div className="flex gap-space-sm items-start">
                        <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-surface-container flex-shrink-0 shadow-sm">
                          <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsZQuX5soCsQIaZTOA9go8jRQ-JSc-GepaD5IH5vITld9vZ6ptnGd4jDlpSO-_gqi18-a9sdkcWzR5H-iv3vC6FO52TnMavRDgD8C4riUQ1nyWCNIqxgyl136krKAvEjxTQlMcFhvMiCSq31Om8bB52Juwax_6bPDquVD251H95AthjnS23MjeBC0ZHfLgl6tMGO-OENQP77gWmA3x7zbMPRXVQtEUjfHmDTQnXRwy"
                            alt="Editorial still life of baroque pearl drop earrings mounted on handcrafted 14k solid gold posts lying gracefully on raw raw ivory silk fabric"
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-1 right-1 bg-primary/90 text-on-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full font-mono">
                            1
                          </span>
                        </div>
                        <div className="flex-grow min-w-0">
                          <h4 className="font-title-md text-title-md text-primary truncate">
                            Solstice Pearl Drops
                          </h4>
                          <p className="font-label-sm text-label-sm text-on-surface-variant truncate">
                            Material: 14k Solid Gold
                          </p>
                          <p className="font-label-sm text-label-sm text-on-surface-variant">
                            Qty: 1
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="font-label-lg text-label-lg font-semibold text-primary">
                            $110.00
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Promo Code Module */}
                    <div className="pt-space-sm pb-space-md">
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px] text-secondary">
                            sell
                          </span>
                          <div className="flex flex-col">
                            <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary">
                              ATELIER10
                            </span>
                            <span className="text-[11px] text-on-surface-variant font-label-sm">
                              Private Collector ㄵ applied
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-label-sm text-label-sm font-semibold text-secondary">
                            -$25.00
                          </span>
                          <button
                            className="text-on-surface-variant hover:text-error transition-colors p-1"
                            title="Remove promo voucher"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              close
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Price Breakdown Rows */}
                    <div className="flex flex-col gap-2.5 pt-space-sm">
                      <div className="flex items-center justify-between font-body-md text-body-md text-on-surface-variant">
                        <span>Merchandise Subtotal</span>
                        <span className="font-semibold text-primary">
                          ${calculateSubtotal()}.00
                        </span>
                      </div>
                      <div className="flex items-center justify-between font-body-md text-body-md text-secondary">
                        <span className="flex items-center gap-1">
                          Collector Privilege (ATELIER10)
                        </span>
                        <span className="font-semibold">-$25.00</span>
                      </div>
                      <div className="flex items-center justify-between font-body-md text-body-md text-on-surface-variant">
                        <span className="flex items-center gap-1">
                          Insured Delivery
                          <span className="material-symbols-outlined text-[14px] text-secondary cursor-help" title="Complimentary on all orders over $150">
                            info
                          </span>
                        </span>
                        <span className="font-semibold text-secondary uppercase tracking-wider text-[12px]" id="shippingDisplay">
                          Complimentary
                        </span>
                      </div>
                      <div className="flex items-center justify-between font-body-md text-body-md text-on-surface-variant">
                        <span>Estimated Taxes & GST</span>
                        <span className="font-semibold text-primary">Included</span>
                      </div>
                      {/* Grand Total */}
                      <div className="pt-space-sm mt-space-xs flex items-baseline justify-between">
                        <div>
                          <span className="font-headline-sm text-headline-sm text-primary block">
                            Total Payable
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            Including all statutory duties & delivery
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="font-headline-sm text-headline-sm text-primary font-medium" id="totalDisplayPrice">
                            ${calculateTotal().toFixed(2)}
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant block font-mono">
                            ≈ ₹19,250 INR
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Concierge Support Card */}
                  <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-space-xs">
                    <div className="flex items-center gap-2 text-primary">
                      <span className="material-symbols-outlined text-[20px] text-secondary">
                        support_agent
                      </span>
                      <span className="font-label-lg text-label-lg font-semibold">
                        Atelier Personal Concierge
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Require custom sizing, gift wrapping, or specialized art courier scheduling?
                    </p>
                    <div className="flex flex-col gap-1 pt-1 font-label-sm text-label-sm text-secondary font-medium">
                      <a
                        className="hover:underline flex items-center gap-1.5"
                        href="mailto:concierge@brandname.com"
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          mail
                        </span>{' '}
                        concierge@brandname.com
                      </a>
                      <a
                        className="hover:underline flex items-center gap-1.5"
                        href="tel:+18004567890"
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          call
                        </span>{' '}
                        +1 (800) 456-7890 / +91 22 6901 0000
                      </a>
                    </div>
                  </div>
                </aside>
              </div>
              <div className="hidden lg:col-span-4 lg:sticky lg:top-24 flex flex-col gap-space-md">
                {/* Commented out version for parity with previous response */}
              </div>
            </div>
          </main>
        </div>
      </main>
    </div>
  )
}
