import { useState, useMemo } from 'react'
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock as ClockIcon,
  Clock as ClockOutline,
  CreditCard,
  HandHeart,
  PackageCheck,
  Receipt,
} from 'lucide-react'

const CN = (cls: string) => cls



const orderItems = [
  {
    id: 1,
    name: 'Aura Sculpted Hoops',
    category: 'Fine Jewelry',
    finish: '18k Gold Vermeil • Classic 24mm',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC_YZxJuoS9qdQCuCNZJcXdhq6kCBZ6TsCQq95c6D2eO0LFurtHdJSmvOodBZK1K30CVdbx3sDOT0KU8jc3aRltlOJjyH0Q82a-ORINDLkMgNsxQu8t9mvBg-IrE-ixgJ_F5wpP0RoEd-nVpQEaCo9d5Uk9vY0D7sL7oKStPlH6QnS4k8k77g17EE0xQDPgg_urw4jW6tbT9UWKl5wm_MSaPjRgct6a1nqnXjMovsuh',
    price: 84,
    qty: 1,
  },
  {
    id: 2,
    name: 'Nordic Oak Gallery Frame',
    category: 'Objects & Living',
    finish: '11x14 format • Solid Oak • Archival Mat',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA2xrYq_4AxT5tyUk3mlVeDLzJN-8hp9jF_868AXUSm-VN4qK41nEoPT95r1xb2SIzlwrRmV_9j8tvcfLCeNrlNiF88Ey1UCUeN3QTow0DO955Fq3p9r9yXjsUifymjr2A3iprVju1-SGnRTkS02WoOgwO5cVPGrmp2iHdXscoZx7X3p6aH9p6xIvsHhecuaeyjHOV7G2rIKF8dfFlme1JPNRcPpJ_igGkIYKIqKUC3',
    price: 62,
    qty: 1,
  },
  {
    id: 3,
    name: 'Solstice Pearl Drops',
    category: 'Fine Jewelry',
    finish: '14k Solid Gold • Regular Luster',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAt6SLpszfs5eqXfjewEEw1Wvqexjvj0iljNwjoxaNJo3sH4_M8HqpIy-MiVbgNvDJEjIQcInRM5mKMW1ZXWhnq2KkiszEZrM9gbBkwnedU8yKM2AHXaRIItQrBFnzPWffVhihHOw-8Evk00PfQzXOOvA5Jo_8pg7i07q94j8h9NZS-iZJrYzrGMxts6F1DQ0GCEUf50LoIqSHsi0Hd250lCukERxorCve8lnuIQAyJ',
    price: 110,
    qty: 1,
  },
]

const orders = [
  {
    id: 'ORD-2026-00125',
    status: 'processing',
    statusLabel: 'Preparing in Atelier',
    date: 'October 24, 2026',
    total: 231,
    recipient: 'Eleanor Vance',
    items: orderItems,
    carrierTracking: null,
    deliveredTo: null,
    deliveredOn: null,
    estimatedDispatch: 'Tomorrow, Oct 25',
  },
  {
    id: 'ORD-2026-00098',
    status: 'shipped',
    statusLabel: 'In Transit • Expected Oct 26',
    date: 'October 18, 2026',
    total: 144,
    recipient: 'Eleanor Vance',
    items: [
      {
        id: 4,
        name: 'Sienna Drop Earrings',
        category: 'Fine Jewelry',
        finish: 'Earth-cast resin • Warm Caramel tint',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBWhFhkKZepMsLtDBkftI6Lg-qhK1e8K6v8GHJwTjYHD2JZJ8jSZCBk2OO-_jXNdlv-_oGl1efzGbcr9htsNTfgitxU7axVgwzpV1bWJys9EekwzTHat5QiUbAIvXgkTokypZMWuKKtCZjO-bbmUO1wGv1BbOneW0RCsbfqn714jbkezrZC4Weo483UwfQB2V8hW6RV9E8SoBQIUvtsMSV9nInPWAYy9NSJNefZ1TTz',
        price: 96,
        qty: 1,
      },
      {
        id: 5,
        name: 'Molten Brass Trinket Valet',
        category: 'Objects & Living',
        finish: 'Solid brushed brass • Organic form',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAz8UTYYOfQYVQoX_ooKu7uxtzlMKG8QKfGwslJkfi5StMQf81Bk1dng2LSO801HNN6AS35W4wlECftBK9_FGy3Kmf3TH4TDW3N1DLaA6o4vAFjohWCwRAgs6xRd3hPoJMYn01GNgwfCl5oCo3snRUjku85NGhj7CXjvDTEEm6zalWgjTkUteN9ydtY-eiPgVEBJraN8s_TiCT5O43huZyuoh7_XBmNghT-rE4P0liV',
        price: 48,
        qty: 1,
      },
    ],
    carrierTracking: 'Blue Dart: #BD-98214-X',
    deliveredTo: null,
    deliveredOn: null,
    estimatedDispatch: null,
  },
  {
    id: 'ORD-2026-00042',
    status: 'delivered',
    statusLabel: 'Delivered on Oct 12, 2026',
    date: 'September 28, 2026',
    total: 104,
    recipient: 'Penthouse 4B, Bandra West',
    items: [
      {
        id: 6,
        name: 'Walnut Deep-Set Frame',
        category: 'Frames & Living',
        finish: '1.5" depth • Weighted archival bevel',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBQRmX4bsqqFFz6mMqtZDbe4GSuP9xk7uqTSaQp5AXNbfC9FIQpq_n-aTcqYDsK_1GHa0lyn-Mw7WEvaWsct1n3Lm6YW_T6fdl53G9WzVyMoFGYwvuuV1rvDJomjqPJ6PvvMAPa0a_7NRV-2rMKwp_Wp4vYhvLwOQShT_0_mcOtRur7QdN_QjGPDGzf83S4SD1GSHwECGM7vsTW01tT1lD5M5uC8fxjI8tIxqB2Lxma',
        price: 72,
        qty: 1,
      },
      {
        id: 7,
        name: 'Precious Metal Cloth',
        category: 'Care Collection',
        finish: 'Micro-chamois • Non-abrasive',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBfRmY1QsM7jLPkjkf9tegJXvZdY9hyyU6PNl-M__VQuPEzFZU2OqIzYV2Q1GZOemGxvZ2Wd57kuCyr3PHsQZpm986adJ4fJsPSYdQrHb924Snep5zw6d3_CgcYrgNrm21ZV-8d7ZlrWhJvCi5_zd8thSZoMwI4YAA9p0rZoOsQGnkREoRkjlNUKAytySM1x_dLajT2kkhIvl_Qyxq4TAZTwPRh_PpWKkDaGbJ15Uid',
        price: 16,
        qty: 2,
      },
    ],
    carrierTracking: null,
    deliveredTo: 'Penthouse 4B, Bandra West',
    deliveredOn: 'October 12, 2026',
    estimatedDispatch: null,
  },
]

export default function MyOrders() {
  const [viewState, setViewState] = useState<'populated' | 'no-results' | 'empty' | 'loading'>('populated')
  const [currentFilter, setCurrentFilter] = useState<'all' | 'processing' | 'shipped' | 'delivered' | 'cancelled'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerOrderId, setDrawerOrderId] = useState<string>('')
  const [toastVisible, setToastVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const filteredOrders = useMemo(() => {
    const query = searchQuery.toLowerCase().trim()
    return orders.filter((order) => {
      const matchesStatus = currentFilter === 'all' || order.status === currentFilter
      const orderQueryData = `${order.id} ${order.items.map((i) => i.name).join(' ')}`.toLowerCase()
      const matchesSearch = query === '' || orderQueryData.includes(query)
      return matchesStatus && matchesSearch
    })
  }, [currentFilter, searchQuery])

  const formatMoney = (v: number) => `$${v.toFixed(2)}`

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setCurrentFilter('all')
  }

  const filterByStatus = (status: 'all' | 'processing' | 'shipped' | 'delivered' | 'cancelled') => {
    setCurrentFilter(status)
  }

  const switchState = (state: 'populated' | 'no-results' | 'empty' | 'loading') => {
    setViewState(state)
  }

  const openOrderDrawer = (orderId: string) => {
    setDrawerOrderId(orderId)
    setDrawerOpen(true)
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
  }

  const simulateInvoiceDownload = (orderId: string) => {
    setToastMessage(`Generating PDF for ${orderId}...`)
    setToastVisible(true)
    setTimeout(() => {
      setToastMessage('Invoice downloaded successfully.')
    }, 1000)
    setTimeout(() => {
      setToastVisible(false)
    }, 3500)
  }

  const order = orders.find((o) => o.id === drawerOrderId)

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#242424] antialiased flex flex-col">
      <main className="w-full pt-20 bg-[#F7F5F0] flex-grow">
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-10">
          {/* Breadcrumb & State Switcher */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-8">
            <nav aria-label="Breadcrumbs" className="flex items-center gap-2">
              <a href="#" className="text-sm text-[#74736E] hover:text-[#242424] transition-colors">
                Home
              </a>
              <span className="text-[#E5E0D7] text-sm">/</span>
              <a href="#" className="text-sm text-[#74736E] hover:text-[#242424] transition-colors">
                My Account
              </a>
              <span className="text-[#E5E0D7] text-sm">/</span>
              <span aria-current="page" className="text-sm font-medium text-[#242424]">
                My Orders
              </span>
            </nav>
            <div className="inline-flex items-center gap-1 p-1 bg-[#F2EFE9] rounded-lg self-start md:self-auto">
              <span className="text-xs font-medium uppercase tracking-wider text-[#74736E] px-2 hidden sm:inline-block">
                View State:
              </span>
              <button
                onClick={() => switchState('populated')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                  viewState === 'populated'
                    ? 'bg-[#ffffff] text-[#242424] shadow-sm'
                    : 'text-[#74736E] hover:text-[#242424]'
                }`}
              >
                Populated (3)
              </button>
              <button
                onClick={() => switchState('no-results')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                  viewState === 'no-results'
                    ? 'bg-[#ffffff] text-[#242424] shadow-sm'
                    : 'text-[#74736E] hover:text-[#242424]'
                }`}
              >
                No Match
              </button>
              <button
                onClick={() => switchState('empty')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                  viewState === 'empty'
                    ? 'bg-[#ffffff] text-[#242424] shadow-sm'
                    : 'text-[#74736E] hover:text-[#242424]'
                }`}
              >
                Empty Account
              </button>
              <button
                onClick={() => switchState('loading')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                  viewState === 'loading'
                    ? 'bg-[#ffffff] text-[#242424] shadow-sm'
                    : 'text-[#74736E] hover:text-[#242424]'
                }`}
              >
                Skeleton
              </button>
            </div>
          </div>

          {/* Editorial Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-8 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-['Playfair_Display'] text-[#242424]">
                  My Orders
                </h1>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#F2EFE9] text-[#705a45] font-medium text-xs tracking-wide uppercase">
                  3 orders placed in 2026
                </span>
              </div>
              <p className="text-lg text-[#74736E] max-w-xl">
                View your archival purchases, download bespoke invoices, and inspect real-time artisan
                handling.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#F2EFE9] hover:bg-[#E8E4DC] text-[#242424] font-medium transition-colors"
              >
                <Receipt size={18} />
                <span>Annual Statement</span>
              </a>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10">
            <div
              aria-label="Order status filter"
              className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none"
              role="tablist"
            >
              {[
                { id: 'all', label: 'All Orders', count: 3 },
                { id: 'processing', label: 'Processing', count: 1 },
                { id: 'shipped', label: 'Shipped', count: 1 },
                { id: 'delivered', label: 'Delivered', count: 1 },
                { id: 'cancelled', label: 'Cancelled', count: 0 },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => filterByStatus(tab.id)}
                  role="tab"
                  aria-selected={currentFilter === tab.id}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    currentFilter === tab.id
                      ? 'bg-[#242424] text-white'
                      : 'bg-[#F2EFE9] text-[#74736E] hover:text-[#242424]'
                  }`}
                >
                  {tab.label} <span className="ml-1 opacity-80">({tab.count})</span>
                </button>
              ))}
            </div>
            <div className="relative w-full lg:w-96">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#74736E]">
                <span className="text-[20px]">🔍</span>
              </span>
              <input
                id="order-search-input"
                onChange={handleSearch}
                placeholder="Search by order # or product name..."
                className="w-full h-11 pl-10 pr-9 rounded-lg bg-[#ffffff] text-[#242424] placeholder:text-[#74736E] font-body-md focus:outline-none focus:bg-[#F2EFE9] transition-all shadow-sm"
                value={searchQuery}
              />
              <button
                aria-label="Clear search input"
                className={`
                  absolute inset-y-0 right-0 pr-3 flex items-center text-[#74736E] hover:text-[#242424]
                  ${searchQuery.trim().length > 0 ? '' : 'hidden'}
                `}
                onClick={clearSearch}
              >
                <span className="text-[18px]">✕</span>
              </button>
            </div>
          </div>

          {/* Populated Orders View */}
          <div className={`flex flex-col gap-8 ${viewState !== 'populated' ? 'hidden' : ''}`} id="state-populated">
            {filteredOrders.map((order) => (
              <article
                key={order.id}
                className="bg-[#ffffff] rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md"
              >
                <div className="bg-[#F2EFE9] px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-[#74736E]">
                        Order Placed
                      </p>
                      <p className="text-sm font-medium text-[#242424] mt-0.5">
                        {order.date}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-[#74736E]">
                        Order Number
                      </p>
                      <p className="text-sm font-medium text-[#242424] mt-0.5">
                        #{order.id}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-[#74736E]">
                        Total Amount
                      </p>
                      <p className="text-sm font-medium text-[#242424] mt-0.5">
                        {formatMoney(order.total)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-[#74736E]">
                        Recipient
                      </p>
                      <p className="text-sm text-[#242424] mt-0.5">{order.recipient}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-start md:self-auto">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium text-xs ${
                      order.status === 'processing'
                        ? 'bg-[#F2EFE9] text-[#242424]'
                        : order.status === 'shipped'
                        ? 'bg-[#E8E4DC] text-[#242424]'
                        : 'bg-[#E8E4DC] text-[#242424]'
                    }`}>
                      {order.status === 'processing' ? (
                        <span className="w-2 h-2 rounded-full bg-[#705a45] animate-pulse"></span>
                      ) : order.status === 'shipped' ? (
                        <PackageCheck size={15} className="text-[#74736E]" />
                      ) : (
                        <CheckCircle2 size={16} className="text-[#74736E]" />
                      )}
                      {order.statusLabel}
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col gap-6">
                  {order.items.map((item, idx) => {
                    const isLast = idx === order.items.length - 1
                    return (
                      <div key={item.id} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${!isLast ? 'border-b border-[#E5E0D7] pb-4' : ''}`}>
                      <div className="flex items-start gap-4">
                        <div className="w-20 h-24 rounded-lg bg-[#F2EFE9] overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <span className="text-xs font-medium uppercase tracking-wider text-[#74736E]">
                            {item.category}
                          </span>
                          <h4 className="text-sm font-medium text-[#242424] mt-0.5">
                            {item.name}
                          </h4>
                          <p className="text-sm text-[#74736E] mt-1">{item.finish}</p>
                          <p className="text-sm font-medium text-[#242424] mt-1">
                            Qty: {item.qty}
                          </p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-sm font-semibold text-[#242424]">
                          {formatMoney(item.price)}
                        </p>
                        <a href="#" className="inline-block mt-2 text-xs text-[#74736E] hover:underline">
                          View Product
                        </a>
                      </div>
                    </div>
                  )
                })}
                </div>
                <div className="bg-[#F2EFE9] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  {order.estimatedDispatch && (
                    <div className="flex items-center gap-2 text-sm text-[#74736E]">
                      <span className="text-[18px]">✓</span>
                      <span>
                        Estimated courier dispatch: <strong className="text-[#242424]">{order.estimatedDispatch}</strong>
                      </span>
                    </div>
                  )}
                  {order.carrierTracking && (
                    <div className="flex items-center gap-2 text-sm text-[#74736E]">
                      <span className="text-[18px]">✈</span>
                      <span>
                        Current Station: <strong className="text-[#242424]">{order.carrierTracking}</strong>
                      </span>
                    </div>
                  )}
                  {order.deliveredOn && (
                    <div className="flex items-center gap-2 text-sm text-[#74736E]">
                      <span className="text-[16px] text-[#705a45]">✓</span>
                      <span>
                        Package securely handed to {order.deliveredTo}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => openOrderDrawer(order.id)}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#242424] text-white hover:bg-[#333333] font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <span>View Order Details</span>
                      <ArrowRight size={16} />
                    </button>
                    <button
                      onClick={() => openOrderDrawer(order.id)}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#F2EFE9] hover:bg-[#E8E4DC] text-[#242424] font-medium transition-colors"
                    >
                      {order.status === 'shipped' ? 'Track Shipment' : order.status === 'delivered' ? 'Order Details' : 'Order Details'}
                    </button>
                    {order.status === 'delivered' && (
                      <button
                        onClick={() => simulateInvoiceDownload(order.id)}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#F2EFE9] hover:bg-[#E8E4DC] text-[#242424] font-medium transition-colors flex items-center justify-center gap-1.5"
                        title="Download Tax Invoice"
                      >
                        <span className="text-[16px]">↓</span>
                        <span>Invoice</span>
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* No Results View */}
          <div
            className={`hidden flex-col items-center justify-center text-center py-20 px-4 bg-[#ffffff] rounded-xl shadow-sm ${viewState === 'no-results' ? 'flex' : 'hidden'}`}
            id="state-no-results"
          >
            <div className="w-16 h-16 rounded-full bg-[#F2EFE9] flex items-center justify-center text-[#74736E] mb-4">
              <span className="text-[32px]">🔍</span>
            </div>
            <h3 className="text-lg font-['Playfair_Display'] text-[#242424] mb-2">
              No Matching Orders
            </h3>
            <p className="text-lg text-[#74736E] max-w-md mb-6">
              We couldn't locate any orders matching your search query. Check for typos or reset your filters.
            </p>
            <button
              onClick={clearSearch}
              className="px-6 py-3 rounded-lg bg-[#242424] text-white hover:bg-[#333333] font-medium transition-colors"
            >
              Clear All Filters
            </button>
          </div>

          {/* Empty Account View */}
          <div
            className={`hidden flex-col items-center justify-center text-center py-20 px-4 bg-[#ffffff] rounded-xl shadow-sm ${viewState === 'empty' ? 'flex' : 'hidden'}`}
            id="state-empty"
          >
            <div className="w-20 h-20 rounded-full bg-[#F2EFE9] flex items-center justify-center text-[#705a45] mb-4">
              <HandHeart size={40} />
            </div>
            <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] text-[#242424] mb-3">
              You Haven't Placed Any Orders Yet
            </h2>
            <p className="text-lg text-[#74736E] max-w-lg mb-8">
              Explore our curated collection of sculptural jewelry, handcrafted hardwood frames, and artisan
              home objects.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href="#"
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#242424] text-white hover:bg-[#333333] font-medium transition-colors"
              >
                Explore The Atelier
              </a>
              <a
                href="#"
                className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-[#F2EFE9] hover:bg-[#E8E4DC] text-[#242424] font-medium transition-colors"
              >
                View Saved Wishlist
              </a>
            </div>
          </div>

          {/* Loading Skeleton View */}
          <div
            className={`hidden flex-col gap-8 ${viewState !== 'loading' ? 'hidden' : ''}`}
            id="state-loading"
          >
            {[1, 2].map((i) => (
              <div key={i} className="bg-[#ffffff] rounded-xl shadow-sm overflow-hidden animate-pulse">
                <div className="bg-[#F2EFE9] px-6 py-5 flex justify-between items-center">
                  <div className="flex gap-8">
                    {i === 1 ? (
                      <>
                        <div className="h-8 w-28 bg-[#E8E4DC] rounded" />
                        <div className="h-8 w-32 bg-[#E8E4DC] rounded" />
                        <div className="h-8 w-24 bg-[#E8E4DC] rounded" />
                      </>
                    ) : (
                      <>
                        <div className="h-8 w-28 bg-[#E8E4DC] rounded" />
                        <div className="h-8 w-32 bg-[#E8E4DC] rounded" />
                      </>
                    )}
                    <div className="h-7 w-36 bg-[#E8E4DC] rounded-full" />
                  </div>
                </div>
                <div className="p-8 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-24 bg-[#F2EFE9] rounded-lg" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 w-24 bg-[#E8E4DC] rounded" />
                      <div className="h-6 w-48 bg-[#E8E4DC] rounded" />
                      <div className="h-4 w-32 bg-[#E8E4DC] rounded" />
                    </div>
                    <div className="h-6 w-20 bg-[#F2EFE9] rounded" />
                  </div>
                  <div className="h-[1px] bg-[#E5E0D7]" />
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-24 bg-[#F2EFE9] rounded-lg" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 w-24 bg-[#E8E4DC] rounded" />
                      <div className="h-6 w-56 bg-[#E8E4DC] rounded" />
                      <div className="h-4 w-36 bg-[#E8E4DC] rounded" />
                    </div>
                    <div className="h-6 w-20 bg-[#F2EFE9] rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Concierge Banner */}
          <div className="mt-12 p-8 rounded-xl bg-[#F2EFE9] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h3 className="text-lg font-['Playfair_Display'] text-[#242424] mb-1">
                Concierge & Order Guidance
              </h3>
              <p className="text-sm text-[#74736E]">
                Need custom sizing adjustments, bespoke gift inscription notes, or expedited overseas
                forwarding? Our private client atelier concierge is ready to assist.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="px-5 py-2.5 rounded-lg bg-[#ffffff] hover:bg-[#E8E4DC] text-[#242424] font-medium shadow-sm transition-all"
              >
                Contact Concierge
              </a>
              <a
                href="#"
                className="px-5 py-2.5 rounded-lg bg-[#242424] text-white hover:bg-[#333333] font-medium transition-all"
              >
                Shipping & Returns Policy
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Order Details Drawer */}
      <div
        className={`fixed inset-0 z-50 bg-[#242424]/40 backdrop-blur-sm transition-opacity duration-300 ${drawerOpen ? 'opacity-100' : 'opacity-0'} ${!drawerOpen ? 'hidden pointer-events-none' : ''}`}
        id="order-drawer-backdrop"
        onClick={closeDrawer}
      ></div>
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-[#ffffff] shadow-2xl transform transition-transform duration-300 ease-out overflow-hidden flex flex-col ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
        id="order-drawer"
      >
        <div className="p-6 md:p-8 bg-[#F2EFE9] flex items-center justify-between">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-[#74736E]">
              Atelier Fulfillment
            </span>
            <h3 className="text-lg font-['Playfair_Display'] text-[#242424] mt-1">
              Order #{drawerOrderId}
            </h3>
            <p className="text-sm text-[#74736E] mt-0.5">
              Purchased on Oct 24, 2026 • Paid via UPI
            </p>
          </div>
          <button
            aria-label="Close modal"
            onClick={closeDrawer}
            className="w-10 h-10 rounded-full bg-[#ffffff] flex items-center justify-center text-[#74736E] hover:text-[#242424] shadow-sm transition-colors"
          >
            <span className="text-[20px]">✕</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          {order && (
            <>
              <div>
                <h4 className="text-sm font-medium uppercase tracking-wider text-[#74736E] mb-4">
                  Fulfillment Status
                </h4>
                <div className="grid grid-cols-4 gap-2 relative">
                  {[
                    { title: 'Confirmed', subtitle: 'Oct 24, 10:14 AM', status: 'completed' },
                    { title: 'Atelier Craft', subtitle: 'In Progress', status: order.status === 'processing' ? 'active' : 'completed' },
                    { title: 'Transit', subtitle: 'Pending', status: order.status === 'shipped' || order.status === 'delivered' ? 'active' : 'pending' },
                    { title: 'Delivered', subtitle: 'Est. Oct 27', status: order.status === 'delivered' ? 'active' : 'pending' },
                  ].map((step, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-xs mb-2 ${step.status === 'completed' ? 'bg-[#242424] text-white' : step.status === 'active' ? 'bg-[#705a45] text-[#281807]' : 'bg-[#E5E0D7] text-[#74736E]'}`}>
                        {step.status === 'completed' || step.status === 'active' ? (
                          <Check size={16} />
                        ) : (
                          <span className="text-[16px]">📦</span>
                        )}
                      </div>
                      <span className={`text-xs font-medium ${step.status === 'active' ? 'text-[#242424]' : 'text-[#74736E]'}`}>
                        {step.title}
                      </span>
                      <span className={`text-[10px] mt-0.5 ${step.status === 'active' ? 'text-[#705a45]' : 'text-[#74736E]'}`}>
                        {step.subtitle}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium uppercase tracking-wider text-[#74736E] mb-4">
                  Packaged Items ({order.items.length})
                </h4>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3.5 rounded-lg bg-[#F2EFE9]">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-16 rounded bg-[#ffffff] overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#242424]">{item.name}</p>
                          <p className="text-sm text-[#74736E]">
                            Qty: {item.qty} • {item.finish.split(' • ')[0]}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-[#242424]">
                        {formatMoney(item.price)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#F2EFE9]">
                  <p className="text-xs font-medium uppercase tracking-wider text-[#74736E] mb-1">
                    Destination Address
                  </p>
                  <p className="text-sm font-medium text-[#242424]">{order.recipient}</p>
                  <p className="text-sm text-[#74736E] mt-1 leading-relaxed">
                    Penthouse 4B, Pali Hill Road<br />
                    Bandra West, Mumbai 400050<br />
                    Maharashtra, India<br />
                    +91 98201 44521
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#F2EFE9]">
                  <p className="text-xs font-medium uppercase tracking-wider text-[#74736E] mb-1">
                    Payment Method
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <CreditCard size={20} className="text-[#74736E]" />
                    <p className="text-sm font-medium text-[#242424]">UPI Instant Transfer</p>
                  </div>
                  <p className="text-sm text-[#74736E] mt-1">
                    VPA: eleanor.vance@okaxis<br />
                    Auth Code: #UPI-9843-2026<br />
                    Verified Oct 24, 2026
                  </p>
                </div>
              </div>
              <div className="p-5 rounded-lg bg-[#F2EFE9] space-y-2.5">
                <div className="flex justify-between text-sm text-[#74736E]">
                  <span>Items Subtotal</span>
                  <span className="font-medium text-[#242424]">{formatMoney(order.items.reduce((a, i) => a + i.price * i.qty, 0))}</span>
                </div>
                <div className="flex justify-between text-sm text-[#705a45]">
                  <span>Atelier Seasonal Privileges (ATELIER10)</span>
                  <span className="font-medium">-$25.00</span>
                </div>
                <div className="flex justify-between text-sm text-[#74736E]">
                  <span>White Glove Insured Delivery</span>
                  <span className="font-medium text-[#242424]">Complimentary ($0.00)</span>
                </div>
                <div className="pt-3 flex justify-between items-baseline">
                  <span className="text-lg font-['Playfair_Display'] text-[#242424]">Total Charged</span>
                  <span className="text-lg font-['Playfair_Display'] text-[#242424] font-medium">
                    {formatMoney(order.total)}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="p-6 bg-[#F2EFE9] flex flex-col sm:flex-row items-center gap-3 justify-between">
          <button
            onClick={() => simulateInvoiceDownload(drawerOrderId)}
            className="w-full sm:w-auto px-5 py-3 rounded-lg bg-[#ffffff] hover:bg-[#E8E4DC] text-[#242424] font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <span className="text-[18px]">↓</span>
            <span>Download Official Invoice (PDF)</span>
          </button>
          <button
            onClick={closeDrawer}
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#242424] text-white hover:bg-[#333333] font-medium transition-colors text-center"
          >
            Done
          </button>
        </div>
      </div>

      {/* Toast */}
      <div
        className={`fixed bottom-6 right-6 z-50 transform transition-all duration-300 flex items-center gap-3 px-5 py-3.5 rounded-lg bg-[#242424] text-white shadow-xl ${toastVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-20 opacity-0 pointer-events-none'}`}
        id="toast"
      >
        <span className="text-[20px] text-[#fcddc1]">✓</span>
        <span className="text-sm font-medium" id="toast-message">
          {toastMessage}
        </span>
      </div>
    </div>
  )
}
