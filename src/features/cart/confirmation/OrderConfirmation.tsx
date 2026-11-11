import { useState } from 'react'
import {
  ArrowRight,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Copy,
  CreditCard,
  HandHeart,
  Headset,
  Home,
  Info,
  PackageCheck,
  Lock,
  Mail,
  Phone,
  QrCode,
  Receipt,
  User,
  Verified,
} from 'lucide-react'

const CN = (cls: string) => cls

const colors = {
  surface: '#fbf9f4',
  surfaceContainerLow: '#f5f3ee',
  surfaceContainerLowest: '#ffffff',
  surfaceContainer: '#f0eee9',
  surfaceContainerHigh: '#eae8e3',
  primary: '#0e0f0f',
  onPrimary: '#ffffff',
  secondary: '#705a45',
  secondaryContainer: '#fcddc1',
  onSecondary: '#ffffff',
  onSurface: '#1b1c19',
  onSurfaceVariant: '#444748',
  outline: '#747878',
  outlineVariant: '#c4c7c7',
  error: '#ba1a1a',
}

const orderItems = [
  {
    id: 1,
    name: 'Aura Sculpted Hoops',
    category: 'Apothecary & Adornment',
    finish: 'Finish: 18k Gold Vermeil • Size: Classic (24mm)',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDdQ3LzSJc-ewH-L8so8emUY4PF--EUfQ6VNtqU4rUJR9cKqk31f6eAEC3hthwh0kQOng-8xeKhtRfZ7l9tcskEFqeefpjfEhRxE0Td-bPns_ugE-TWbBrnBQjUaP2nguvF1IpK5SRulWuUU2HOlWhxFc1K3TAaKzkx3X4zvkY4GZAeXvPDezGP-y-LPrykx7cXpduZIA6jxGDnQXWF2Tpc8amNJHEDUryPcH4GXk72',
    price: 84,
    qty: 1,
  },
  {
    id: 2,
    name: 'Nordic Oak Gallery Frame',
    category: 'Living & Objects',
    finish: 'Size: 11x14 format • Material: Natural Solid Oak',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDgvIv5NdZTINYIrh09wbJoSyKWcgL-Uaw7_-O0FqtaXDXsmBPTzycb-F8Rm9W525P5IKo3BwYkPg_3SXRDxI22OSjduOJJmLlpOdZqgHrj0WsljW-fAEzbphlrzy9LESlD5hS1fc-3-ToySHdz6n7U9o6Et0icV1XubWk9JvEPefJYLW1BSqCgNbPlGuMZzPjbMWTQgwB1SyWlPGo2exGt8ikIGmFYbs5bq5fTRWzp',
    price: 62,
    qty: 1,
  },
  {
    id: 3,
    name: 'Solstice Pearl Drops',
    category: 'Apothecary & Adornment',
    finish: 'Material: 14k Solid Gold • Length: Regular',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDiv2ZgdcflshIipB8utSW4vBdx11If5MQqOh6-90JNu8OEO3YXdssTwDGlbgnHqfBVRumHeOixmQGDV7jxzDtab2DgVGfJsqLi8Q3enYPpSwy90-OAoVdy5Z5P7F7is0xQUEpzvuHIRpQ7Jyv0sz_B9ndRoXU7_kUNpulL5Ygc9TQO12dzEQrwvN-IfZucAekvyebLkmkTkdQPlx87Iods9SBGnOVMEkaggepRIPS-',
    price: 110,
    qty: 1,
  },
]

const recommendations = [
  {
    id: 1,
    name: 'Molten Brass Trinket Valet',
    category: 'Objects',
    finish: 'Heavy cast solid brass',
    price: 48,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBaw28TlEsbm_GcD7aePAZxA0RXnP9UTjF3h8ulpnJ7_s8-L9NtVtgqb3yEgeEHb062uG1UX8T8yHveadg5PFdOZgK2rqPlvTXgcw0XzklrRcV-s8ni-DvKgc4QOyY01feCvqnXpHdWOkMzZ4Ny7V0NhjrcKH2dcR1feZPlRAkZPW7Di2gAaeD4d2i0l4mzmKHhREBOGSYgksbZP-6pK0F9YYx4CC2W9L7tzxPiwXiR',
  },
  {
    id: 2,
    name: 'Precious Metal Cloth',
    category: 'Care & Polish',
    finish: 'Micro-chamois with jewelers rouge',
    price: 16,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAJbMq0snL98sNshQLp3PtkW_QY_fVFei-R0ziOx6_S9rlYuUck-rO3oR5QFaN1E4VK5Z2hmfqp1fq1ezVh0wozlEXPcFrzfcrPwVhWE13L0n0ygSfqUKiZG4hfN7FI0yxPrtga1VUNeJMOb0Va0ymBOSSth48ZiDjKfwfDgUsRXgn-dBTGb187XgwNmj98vK38-xQ4_tVPYAeRtx9Rkgx6kC-u_ZXWZDNf5HDVUMxz',
  },
  {
    id: 3,
    name: 'Ribbed Huggie Earrings',
    category: 'Adornment',
    finish: '14k Recycled gold coating',
    price: 48,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCNQuZLXUMmGX8eZnDENDl_65GoDG4RCVUEg757uQMi8HgJwmHd9xEQRMWDxIV6L2qVxTZ9sDYSzwWlOO4YYU1ZVZcdoXzQKPZrRNQ8N1yzumMZ3dzPTTn95e_b2HLFPqpiUM1yB2sOBM41EIb5MPakGW2ZMoodYjVd9IhXBsGWF1icc5jBsxzQ-u6r89cwuI22_utFdaojyRmA0Npi-cdWiBcP2mGsfv3MFuF5qgIf',
  },
]

const baseSubtotal = 256
const promoDiscount = 25
const shippingCost = 0
const total = baseSubtotal - promoDiscount + shippingCost

export default function OrderConfirmation() {
  const [wishlisted, setWishlisted] = useState<boolean[]>([false, false, false])

  const formatMoney = (v: number) => `$${v.toFixed(2)}`
  const inrAmount = Math.round(total * 83.33)

  const stepStatus: ('completed' | 'active' | 'pending')[] = [
    'completed',
    'active',
    'pending',
    'pending',
  ]

  return (
    <div className="min-h-screen bg-[#fbf9f4] text-[#1b1c19] flex flex-col">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#fbf9f4]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-20 w-full px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto flex items-center justify-between">
          <a
            href="#"
            className="flex items-center tracking-widest font-['Playfair_Display'] text-lg md:text-xl uppercase text-[#1b1c19] transition-opacity hover:opacity-80"
          >
            ATELIER
          </a>
          <div className="flex items-center gap-2">
            <div
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#f5f3ee] text-[#444748]"
            >
              <Verified size={16} className="text-[#444748]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#444748]">
                Order Confirmed
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#0e0f0f] flex items-center justify-center">
              <User size={18} className="text-white" />
            </div>
          </div>
        </div>
      </header>

      <main className="w-full pt-20 bg-[#fbf9f4] flex-grow flex flex-col">
        <div className="flex flex-col w-full">
          <div className="w-full max-w-[1040px] mx-auto px-4 md:px-8 lg:px-12 py-6 md:py-10">
            {/* Success Hero */}
            <section className="flex flex-col items-center text-center max-w-[680px] mx-auto mb-8">
              <div className="relative flex items-center justify-center mb-4">
                <div className="absolute w-20 h-20 rounded-full bg-[#fcddc1]/50 blur-xl"></div>
                <div className="relative w-16 h-16 rounded-full bg-[#f5f3ee] flex items-center justify-center shadow-sm">
                  <Check size={32} className="text-[#444748]" />
                </div>
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#444748] mb-2 block">
                Order Confirmed
              </span>
              <h1 className="text-3xl md:text-4xl font-['Playfair_Display'] text-[#1b1c19] mb-2 tracking-tight">
                Thank You for Your Order!
              </h1>
              <p className="text-sm text-[#444748] mb-4 max-w-lg leading-relaxed">
                Your acquisition has been placed successfully. We have commenced curation and will keep
                you informed across each milestone.
              </p>
              <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#f5f3ee] text-[#1b1c19] text-sm font-medium shadow-sm">
                <span className="font-semibold text-[#0e0f0f]">#ORD-2026-00125</span>
                <span className="w-1 h-1 rounded-full bg-[#c4c7c7]"></span>
                <span className="text-[#444748]">Placed October 24, 2026 at 4:32 PM</span>
              </div>
              <div className="flex items-center gap-2 mt-2 text-[#444748] text-xs">
                <Mail size={16} className="text-[#444748]" />
                <span>
                  A formal receipt and dossier have been dispatched to{' '}
                  <strong className="text-[#1b1c19] font-medium">
                    eleanor.vance@atelier-archive.com
                  </strong>
                </span>
              </div>
            </section>

            {/* Order Progression Timeline */}
            <section className="bg-[#ffffff] rounded-xl p-6 md:p-8 shadow-sm mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 gap-2">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#444748]">
                    Current Journey
                  </span>
                  <h2 className="text-lg font-['Playfair_Display'] text-[#1b1c19]">
                    Order Progression
                  </h2>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f3ee] text-xs font-medium text-[#444748]">
                  <span className="w-2 h-2 rounded-full bg-[#705a45] animate-pulse"></span>
                  Estimated Delivery: Oct 29 – 31, 2026
                </div>
              </div>

              <div className="relative w-full">
                <div className="hidden md:block absolute top-5 left-10 right-10 h-0.5 bg-[#eae8e3] -z-0"></div>
                <div className="hidden md:block absolute top-5 left-10 w-[35%] h-0.5 bg-[#0e0f0f] -z-0"></div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 relative z-10">
                  {[
                    {
                      title: 'Order Placed',
                      subtitle: 'Oct 24, 4:32 PM',
                      icon: Check,
                      status: stepStatus[0],
                    },
                    {
                      title: 'Preparing in Atelier',
                      subtitle: 'Under artisan inspection',
                      icon: Clock,
                      status: stepStatus[1],
                      activeDot: true,
                    },
                    {
                      title: 'Insured Transit',
                      subtitle: 'Pending dispatch scan',
                      icon: PackageCheck,
                      status: stepStatus[2],
                    },
                    {
                      title: 'Delivered',
                      subtitle: 'Signature required',
                      icon: Home,
                      status: stepStatus[3],
                    },
                  ].map((step, idx) => (
                    <div
                      key={idx}
                      className={`flex md:flex-col items-center gap-4 md:gap-3 text-left md:text-center ${step.status === 'completed' || step.status === 'active' ? '' : 'opacity-60'}`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm relative`}>
                        {step.status === 'completed' && (
                          <>
                            <div className="w-10 h-10 rounded-full bg-[#0e0f0f] text-[#ffffff] flex items-center justify-center">
                              <step.icon size={20} />
                            </div>
                          </>
                        )}
                        {step.status === 'active' && (
                          <>
                            <div className="w-10 h-10 rounded-full bg-[#242424] text-[#0e0f0f] flex items-center justify-center shadow-md">
                              <step.icon size={20} className="text-[#705a47]" />
                            </div>
                            {step.activeDot && (
                              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#705a45] rounded-full"></span>
                            )}
                          </>
                        )}
                        {step.status === 'pending' && (
                          <div className="w-10 h-10 rounded-full bg-[#e4e2dd] text-[#444748] flex items-center justify-center">
                            <step.icon size={20} />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${step.status === 'active' ? 'text-[#0e0f0f] font-semibold' : 'text-[#1b1c19]'}`}>
                          {step.title}
                        </p>
                        <p className={`text-xs ${step.status === 'active' ? 'text-[#705a45] font-medium' : 'text-[#444748]'}`}>
                          {step.subtitle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 bg-[#f5f3ee]/70 rounded-lg p-3 flex items-center gap-3 text-center md:text-left">
                <Info size={20} className="text-[#444748] shrink-0" />
                <p className="text-xs text-[#444748] leading-relaxed">
                  Live carrier tracking credentials via Blue Dart Luxury Express will be authenticated once
                  bespoke sealing is concluded.
                </p>
              </div>
            </section>

            {/* Two-Column Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start mb-10">
              {/* Left Column */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                {/* Items in Your Order */}
                <div className="bg-[#ffffff] rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between pb-4 mb-4">
                    <div className="flex items-baseline gap-2">
                      <h2 className="text-lg font-['Playfair_Display'] text-[#1b1c19]">
                        Items in Your Order
                      </h2>
                      <span className="text-sm font-medium text-[#444748]">(3)</span>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#444748]">
                      Curation Batch #01
                    </span>
                  </div>
                  <div className="flex flex-col gap-6">
                    {orderItems.map((item) => (
                      <div key={item.id} className="flex gap-4 items-center">
                        <div className="w-20 h-24 rounded-lg overflow-hidden bg-[#f5f3ee] shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow min-w-0">
                          <span className="text-xs font-semibold uppercase tracking-wider text-[#444748]">
                            {item.category}
                          </span>
                          <h3 className="text-sm font-medium text-[#1b1c19] truncate mt-0.5">
                            {item.name}
                          </h3>
                          <p className="text-sm text-[#444748] mt-0.5 leading-relaxed">
                            {item.finish}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-sm font-medium px-2 py-0.5 rounded bg-[#f5f3ee] text-[#1b1c19]">
                              Qty: {item.qty}
                            </span>
                            <span className="text-sm text-[#444748]">{formatMoney(item.price)} each</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-semibold text-[#0e0f0f]">
                            {formatMoney(item.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Details */}
                <div className="bg-[#ffffff] rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between pb-4 mb-4">
                    <h2 className="text-lg font-['Playfair_Display'] text-[#1b1c19]">
                      Delivery Details
                    </h2>
                    <span className="text-[#444748] text-[22px]">📍</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#444748] mb-1">
                        Destination
                      </span>
                      <p className="text-sm font-semibold text-[#1b1c19]">Eleanor Vance</p>
                      <p className="text-sm text-[#444748] mt-1 leading-relaxed">
                        Penthouse 4B, The Palmetto Residence<br />
                        Pali Hill Road, Bandra West<br />
                        Mumbai, Maharashtra 400050, India
                      </p>
                      <p className="text-sm text-[#444748] mt-2 flex items-center gap-1.5">
                        <Phone size={15} className="text-[#444748]" />
                        +91 98201 45892
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#444748] mb-1">
                        Fulfillment Tier
                      </span>
                      <div className="p-3 rounded-lg bg-[#f5f3ee] mb-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-[#0e0f0f]">
                            Insured Atelier Standard
                          </span>
                          <span className="text-sm font-medium text-[#444748]">Free</span>
                        </div>
                        <p className="text-xs text-[#444748] mt-0.5">
                          White-glove verification with tamper-evident packaging
                        </p>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <Calendar size={18} className="text-[#444748]" />
                          <span className="text-sm font-medium text-[#0e0f0f]">
                            Oct 29 – 31, 2026 (3–5 Business Days)
                          </span>
                        </div>
                        <p className="text-xs text-[#444748] pl-6">
                          Signature authorization mandatory upon arrival.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {/* Payment Summary */}
                <div className="bg-[#ffffff] rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between pb-4 mb-4">
                    <h2 className="text-lg font-['Playfair_Display'] text-[#1b1c19]">
                      Payment Summary
                    </h2>
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f5f3ee] text-[#444748] text-xs font-medium">
                      <Verified size={14} className="text-[#444748]" />
                      <span>Paid</span>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#f5f3ee] flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-[#ffffff] flex items-center justify-center text-[#0e0f0f] font-bold text-xs shadow-[0_0_0_1px_rgba(0,0,0,0.05)]">
                        UPI
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0e0f0f]">
                          UPI Instant Transfer
                        </p>
                        <p className="text-xs text-[#444748]">eleanor.vance@okaxis</p>
                      </div>
                    </div>
                    <CheckCircle2 size={20} className="text-[#444748]" />
                  </div>
                  <div className="space-y-3 font-body-md text-sm">
                    <div className="flex justify-between text-[#444748]">
                      <span>Merchandise Subtotal</span>
                      <span className="font-medium text-[#1b1c19]">{formatMoney(baseSubtotal)}</span>
                    </div>
                    <div className="flex justify-between text-secondary">
                      <span className="flex items-center gap-1.5">
                        <CreditCard size={16} className="text-[#444748]" />
                        Collector Privilege (ATELIER10)
                      </span>
                      <span className="font-medium">-$25.00</span>
                    </div>
                    <div className="flex justify-between text-[#444748]">
                      <span>Insured Standard Dispatch</span>
                      <span className="font-medium text-[#705a45]">Complimentary ($0.00)</span>
                    </div>
                    <div className="flex justify-between text-[#444748]">
                      <span className="flex items-center gap-1">
                        Estimated Taxes &amp; GST
                        <Info size={14} className="text-[#747878] cursor-help" />
                      </span>
                      <span className="font-medium text-[#1b1c19]">Included</span>
                    </div>
                    <div className="w-full h-[1px] bg-[#eae8e3] my-3"></div>
                    <div className="flex justify-between items-baseline pt-1">
                      <div>
                        <span className="text-lg font-['Playfair_Display'] text-[#0e0f0f]">
                          Total Paid
                        </span>
                        <p className="text-xs text-[#444748]">Authorized via Axis Gateway</p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-['Playfair_Display'] text-[#0e0f0f] font-medium">
                          {formatMoney(total)}
                        </span>
                        <p className="text-xs text-[#444748] font-medium">
                          ≈ ₹{inrAmount.toLocaleString()} INR
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col gap-3">
                  <button
                    className="w-full h-12 bg-[#0e0f0f] hover:bg-[#242424] text-white font-medium tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
                    type="button"
                  >
                    <span className="text-[#ffffff] font-bold text-xs tracking-wider uppercase">Track</span>
                    Track Order Status
                  </button>
                  <a
                    href="#"
                    className="w-full h-12 bg-[#f5f3ee] hover:bg-[#f0eee9] text-[#0e0f0f] font-medium tracking-wider flex items-center justify-center gap-2 transition-colors"
                  >
                    <Home size={18} className="text-[#444748]" />
                    Continue Shopping
                  </a>
                  <div className="flex justify-center pt-2">
                    <a
                      href="javascript:window.print()"
                      className="inline-flex items-center gap-1.5 text-[#444748] hover:underline text-xs transition-all py-1"
                    >
                      <Receipt size={18} className="text-[#444748]" />
                      Download Official PDF Receipt
                    </a>
                  </div>
                </div>

                {/* Concierge Assistance */}
                <div className="bg-[#f5f3ee] rounded-xl p-5 text-[#444748] text-sm leading-relaxed">
                  <div className="flex items-center gap-2.5 text-[#0e0f0f] font-medium mb-2">
                      <Headset size={20} className="text-[#444748]" />
                    Concierge Assistance
                  </div>
                  <p className="text-[#444748] mb-3">
                    Need to make an amendment to this order or coordinate custom delivery hours? Our
                    concierge remains at your disposal 7 days a week.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 text-[#0e0f0f] font-medium">
                    <a
                      href="mailto:concierge@brandname.com"
                      className="inline-flex items-center gap-1 hover:text-[#705a45] transition-colors"
                    >
                      <Mail size={15} className="text-[#444748]" />
                      concierge@brandname.com
                    </a>
                    <span className="hidden sm:inline text-[#c4c7c7]">•</span>
                    <a
                      href="tel:+18004567890"
                      className="inline-flex items-center gap-1 hover:text-[#705a45] transition-colors"
                    >
                      <Phone size={15} className="text-[#444748]" />
                      +1 (800) 456-7890
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* You May Also Like */}
            <section className="mb-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#444748]">
                    Refined Complements
                  </span>
                  <h2 className="text-lg font-['Playfair_Display'] text-[#1b1c19] mt-1">
                    You May Also Like
                  </h2>
                  <p className="text-sm text-[#444748] mt-1">
                    Carefully curated additions to complement your nascent collection.
                  </p>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-[#705a45] hover:underline font-medium text-xs"
                >
                  Explore Archive <ArrowRight size={16} />
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {recommendations.map((item, idx) => (
                  <div
                    key={item.id}
                    className="group bg-[#ffffff] rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-[#f5f3ee] mb-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <button
                          aria-label="Add to wishlist"
                          className={`absolute top-2 right-2 w-9 h-9 rounded-full bg-[#ffffff]/90 backdrop-blur-sm flex items-center justify-center text-[#0e0f0f] shadow-xs hover:bg-[#ffffff] transition-colors ${
                            wishlisted[idx] ? 'text-[#705a45]' : ''
                          }`}
                          onClick={() => {
                            const next = [...wishlisted]
                            next[idx] = !next[idx]
                            setWishlisted(next)
                          }}
                        >
                          <HandHeart size={18} />
                        </button>
                      </div>
                      <div className="px-1">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#444748]">
                          {item.category}
                        </span>
                        <h3 className="text-sm font-medium text-[#1b1c19] mt-1 truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm text-[#444748] mt-0.5">{item.finish}</p>
                      </div>
                    </div>
                    <div className="px-1 mt-4 pt-3 flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#0e0f0f]">
                        {formatMoney(item.price)}
                      </span>
                      <button
                        className="px-3 py-1.5 rounded-lg bg-[#f5f3ee] hover:bg-[#0e0f0f] hover:text-[#ffffff] text-[#0e0f0f] font-medium text-xs transition-colors"
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#f5f3ee] py-8 mt-10">
        <div className="w-full px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <nav className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
            <a href="#" className="text-[#444748] hover:text-[#1b1c19] transition-colors">
              Client Care
            </a>
            <a href="#" className="text-[#444748] hover:text-[#1b1c19] transition-colors">
              Shipping &amp; Returns
            </a>
            <a href="#" className="text-[#444748] hover:text-[#1b1c19] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-[#444748] hover:text-[#1b1c19] transition-colors">
              Terms of Service
            </a>
          </nav>
          <div className="text-xs text-[#444748] text-center md:text-right">
            © 2024 ATELIER. All rights reserved. Restrained Luxury &amp; Lifestyle.
          </div>
        </div>
      </footer>
    </div>
  )
}
