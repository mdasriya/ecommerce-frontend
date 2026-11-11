import { useState } from 'react'
import { AlertTriangle, Check, ChevronRight, Home, UserRound } from 'lucide-react'
import Header from '@/components/common/Header'

const CN = (cls: string) => cls



const avatarUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDxEqHoypKFDV0taWrFbd3HLbxd7Wntyzum-QK_kV827BfnsClfPldjZUx3jFfSIxi4q_e7lY6NePBDYkapkk0W7gapRM2Gxjlu1bY9q8_1vjgY_SNknahxixY0X_Tng6PLeW_zy0gplEz5k3n6CJrMmJHuRCZPgYF4NxJ7RoMVvpWzQKLBPEuULXsueUIWh0X3nwjdVYulkqme-apCrlrezSycH4owglJNipStTmBx'

export default function MyProfile() {
  const [viewMode, setViewMode] = useState<'view' | 'edit'>('view')
  const [prototypeState, setPrototypeState] = useState<'default' | 'edit' | 'success' | 'empty-addresses' | 'skeleton'>('default')
  const [deleteAddressTarget, setDeleteAddressTarget] = useState<string | null>(null)

  const switchState = (state: typeof prototypeState) => {
    setPrototypeState(state)
  }

  const switchToEditMode = () => {
    setViewMode('edit')
  }

  const switchToViewMode = () => {
    setViewMode('view')
  }

  const handleFormSave = (e: React.FormEvent) => {
    e.preventDefault()
    setViewMode('view')
    setPrototypeState('success')
  }

  const dismissSuccessAlert = () => {
    setPrototypeState('default')
  }

  const confirmDeleteAddress = () => {
    if (deleteAddressTarget) {
      // In a real app, remove from state
      setDeleteAddressTarget(null)
    }
  }

  const closeDeleteModal = () => {
    setDeleteAddressTarget(null)
  }

  const isSkeleton = prototypeState === 'skeleton'
  const isEmpty = prototypeState === 'empty-addresses'
  const showSuccess = prototypeState === 'success'

  return (
    <div className="min-h-screen bg-[#fbf9f4] text-[#1b1c19] antialiased flex flex-col">
      <Header cartCount={2} />

  

      <main className="w-full pt-18 bg-[#fbf9f4] flex-grow">
        <div className="w-full max-w-[1120px] mx-auto px-4 md:px-8 py-10">
          {/* Success Banner */}
          <div
            className={`hidden mb-6 p-3 bg-[#f5f3ee] rounded-lg shadow-sm flex items-center justify-between transition-all duration-300 ${
              showSuccess ? 'flex' : 'hidden'
            }`}
            id="success-notification"
          >
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#705a45]/15 text-[#705a45] flex items-center justify-center">
                <Check size={18} />
              </span>
              <div>
                <p className="text-sm font-medium text-[#1b1c19]">
                  Profile details updated successfully
                </p>
                <p className="text-xs text-[#444748]">
                  Your account information and preferences have been securely saved to our vault.
                </p>
              </div>
            </div>
            <button
              aria-label="Dismiss alert"
              onClick={dismissSuccessAlert}
              className="p-1 text-[#444748] hover:text-[#1b1c19] transition-colors"
            >
              <span className="text-[18px]">✕</span>
            </button>
          </div>

          {/* Skeleton State */}
          <div
            className={`hidden w-full grid-cols-1 lg:grid-cols-12 gap-6 animate-pulse ${
              isSkeleton ? 'grid' : 'hidden'
            }`}
            id="skeleton-container"
          >
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="h-44 bg-[#eae8e3] rounded-xl" />
              <div className="h-80 bg-[#eae8e3] rounded-xl" />
              <div className="h-64 bg-[#eae8e3] rounded-xl" />
            </div>
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="h-56 bg-[#eae8e3] rounded-xl" />
              <div className="h-64 bg-[#eae8e3] rounded-xl" />
              <div className="h-40 bg-[#eae8e3] rounded-xl" />
            </div>f
          </div>

          {/* Breadcrumb & Header */}
          {!isSkeleton && (
            <>
              <div className="mb-8">
                <nav  className="flex items-center gap-2 mb-2 text-sm text-[#444748]">
                  <a href="#" className="hover:text-[#1b1c19] transition-colors">
                    Home
                  </a>
                  <span className="text-[#c4c7c7]">/</span>
                  <a href="#" className="hover:text-[#1b1c19] transition-colors">
                    My Account
                  </a>
                  <span className="text-[#c4c7c7]">/</span>
                  <span className="text-[#1b1c19] font-medium">Profile</span>
                </nav>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-['Playfair_Display'] text-[#1b1c19] tracking-tight">
                      My Profile
                    </h1>
                    <p className="text-lg text-[#444748] max-w-xl mt-1">
                      Manage your personal credentials, high-touch delivery destinations, and bespoke
                      atelier appointments.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[#444748] text-sm bg-[#f5f3ee] px-3 py-1.5 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-[#705a45]"></span>
                    <span>Security Protocol 2.4 Active</span>
                  </div>
                </div>
              </div>

              {/* Main Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column */}
                <section className="lg:col-span-8 flex flex-col gap-6">
                  {/* Customer Summary Hero Card */}
                  <article className="bg-[#ffffff] rounded-xl p-6 md:p-8 shadow-sm relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="relative group cursor-pointer flex-shrink-0">
                        <input
                          accept="image/*"
                          className="hidden"
                          id="avatar-input"
                          type="file"
                        />
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-[#eae8e3] shadow-inner relative">
                          <img
                            id="avatar-preview"
                            src={avatarUrl}
                            alt="Profile portrait of Eleanor Vance"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-[#0e0f0f]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white">
                            <span className="text-[20px]">📷</span>
                            <span className="font-medium text-[10px] mt-0.5">Change</span>
                          </div>
                        </div>
                        <button
                          aria-label="Change photo"
                          className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#0e0f0f] text-white flex items-center justify-center shadow-md hover:bg-[#705a45] transition-colors"
                          type="button"
                        >
                          <span className="text-[16px]">✎</span>
                        </button>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#fcddc1] text-[#281807] font-medium text-[10px] uppercase tracking-wider">
                            Atelier Private Collector
                          </span>
                          <span className="text-sm text-[#444748]">Member since Mar 2024</span>
                        </div>
                        <h2 className="text-lg font-['Playfair_Display'] text-[#1b1c19] font-medium truncate mb-2">
                          Eleanor Vance
                        </h2>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-y-1 gap-x-4 text-sm text-[#444748]">
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="text-[16px] text-[#444748]">✉</span>
                            <span className="truncate">eleanor.vance@atelier-archive.com</span>
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#e4e2dd] text-[#1b1c19] font-medium text-[10px]">
                              <span className="text-[12px] text-[#705a45]">✓</span> Verified
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[16px] text-[#444748]">📱</span>
                            <span>+91 98201 45892</span>
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#e4e2dd] text-[#1b1c19] font-medium text-[10px]">
                              <span className="text-[12px] text-[#705a45]">✓</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={switchToEditMode}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#f5f3ee] hover:bg-[#eae8e3] text-[#1b1c19] font-medium flex items-center justify-center gap-2 transition-all"
                        type="button"
                      >
                        <span className="text-[18px]">📝</span>
                        <span>Edit Details</span>
                      </button>
                    </div>
                  </article>

                  {/* Personal Information Card */}
                  <article className="bg-[#ffffff] rounded-xl p-6 md:p-8 shadow-sm">
                    <div className="flex items-center justify-between pb-4 mb-6">
                      <div>
                        <h3 className="text-lg font-['Playfair_Display'] text-[#1b1c19]">
                          Personal Information
                        </h3>
                        <p className="text-sm text-[#444748]">
                          Confidential identity details curated for priority delivery and order tracking.
                        </p>
                      </div>
                      <button
                        onClick={switchToEditMode}
                        className="px-3.5 py-1.5 rounded-lg bg-[#f5f3ee] hover:bg-[#eae8e3] text-[#1b1c19] font-medium flex items-center gap-1.5 transition-colors"
                        type="button"
                      >
                        <span className="text-[16px]">✎</span>
                        <span>Edit Information</span>
                      </button>
                    </div>

                    {/* View State */}
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${viewMode === 'edit' ? 'hidden' : ''}`} id="personal-info-view-state">
                      <div className="p-3.5 rounded-lg bg-[#f5f3ee]">
                        <span className="text-xs font-medium uppercase tracking-wider text-[#444748] block mb-1">
                          First Name
                        </span>
                        <p className="text-sm font-medium text-[#1b1c19]" id="view-firstname">
                          Eleanor
                        </p>
                      </div>
                      <div className="p-3.5 rounded-lg bg-[#f5f3ee]">
                        <span className="text-xs font-medium uppercase tracking-wider text-[#444748] block mb-1">
                          Last Name
                        </span>
                        <p className="text-sm font-medium text-[#1b1c19]" id="view-lastname">
                          Vance
                        </p>
                      </div>
                      <div className="p-3.5 rounded-lg bg-[#f5f3ee] relative group">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium uppercase tracking-wider text-[#444748]">
                            Email Address
                          </span>
                          <span className="text-[16px] text-[#444748]">🔒</span>
                        </div>
                        <p className="text-sm font-medium text-[#1b1c19] truncate" id="view-email">
                          eleanor.vance@atelier-archive.com
                        </p>
                      </div>
                      <div className="p-3.5 rounded-lg bg-[#f5f3ee]">
                        <span className="text-xs font-medium uppercase tracking-wider text-[#444748] block mb-1">
                          Phone Number
                        </span>
                        <p className="text-sm font-medium text-[#1b1c19]" id="view-phone">
                          +91 98201 45892
                        </p>
                      </div>
                      <div className="p-3.5 rounded-lg bg-[#f5f3ee]">
                        <span className="text-xs font-medium uppercase tracking-wider text-[#444748] block mb-1">
                          Date of Birth (Optional)
                        </span>
                        <p className="text-sm font-medium text-[#1b1c19]" id="view-dob">
                          14 October 1992
                        </p>
                      </div>
                      <div className="p-3.5 rounded-lg bg-[#f5f3ee]">
                        <span className="text-xs font-medium uppercase tracking-wider text-[#444748] block mb-1">
                          Gender Identification (Optional)
                        </span>
                        <p className="text-sm font-medium text-[#1b1c19]" id="view-gender">
                          Female
                        </p>
                      </div>
                    </div>

                    {/* Edit State */}
                    <form
                      onSubmit={handleFormSave}
                      className={`hidden flex-col gap-6 ${viewMode === 'edit' ? 'flex' : 'hidden'}`}
                      id="personal-info-edit-state"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="input-firstname"
                            className="block text-sm font-medium text-[#1b1c19] mb-1.5"
                          >
                            First Name
                          </label>
                          <input
                            id="input-firstname"
                            type="text"
                            required
                            className="w-full h-10 px-3.5 rounded-lg bg-[#ffffff] text-[#1b1c19] text-sm focus:outline-none focus:bg-[#eae8e3] focus:ring-1 focus:ring-[#0e0f0f] shadow-sm"
                            value="Eleanor"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="input-lastname"
                            className="block text-sm font-medium text-[#1b1c19] mb-1.5"
                          >
                            Last Name
                          </label>
                          <input
                            id="input-lastname"
                            type="text"
                            required
                            className="w-full h-10 px-3.5 rounded-lg bg-[#ffffff] text-[#1b1c19] text-sm focus:outline-none focus:bg-[#eae8e3] focus:ring-1 focus:ring-[#0e0f0f] shadow-sm"
                            value="Vance"
                          />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label
                              htmlFor="input-email"
                              className="block text-sm font-medium text-[#1b1c19]"
                            >
                              Email Address
                            </label>
                            <span className="text-xs text-[#444748] flex items-center gap-1">
                              <span className="text-[13px]">🔒</span> Protected
                            </span>
                          </div>
                          <input
                            id="input-email"
                            type="email"
                            disabled
                            className="w-full h-10 px-3.5 rounded-lg bg-[#eae8e3] text-[#444748] text-sm cursor-not-allowed"
                            value="eleanor.vance@atelier-archive.com"
                          />
                          <p className="mt-1 text-xs text-[#444748]">
                            Contact the Atelier Concierge to re-verify or migrate your email credentials.
                          </p>
                        </div>
                        <div>
                          <label
                            htmlFor="input-phone"
                            className="block text-sm font-medium text-[#1b1c19] mb-1.5"
                          >
                            Phone Number
                          </label>
                          <input
                            id="input-phone"
                            type="tel"
                            required
                            className="w-full h-10 px-3.5 rounded-lg bg-[#ffffff] text-[#1b1c19] text-sm focus:outline-none focus:bg-[#eae8e3] focus:ring-1 focus:ring-[#0e0f0f] shadow-sm"
                            value="+91 98201 45892"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="input-dob"
                            className="block text-sm font-medium text-[#1b1c19] mb-1.5"
                          >
                            Date of Birth <span className="text-[#444748] font-normal">(Optional)</span>
                          </label>
                          <input
                            id="input-dob"
                            type="text"
                            placeholder="DD Month YYYY"
                            className="w-full h-10 px-3.5 rounded-lg bg-[#ffffff] text-[#1b1c19] text-sm focus:outline-none focus:bg-[#eae8e3] focus:ring-1 focus:ring-[#0e0f0f] shadow-sm"
                            value="14 October 1992"
                          />
                          <p className="mt-1 text-xs text-[#444748]">
                            Used solely to grant complimentary annual collector privileges.
                          </p>
                        </div>
                        <div>
                          <label
                            htmlFor="input-gender"
                            className="block text-sm font-medium text-[#1b1c19] mb-1.5"
                          >
                            Gender <span className="text-[#444748] font-normal">(Optional)</span>
                          </label>
                          <select
                            id="input-gender"
                            className="w-full h-10 px-3.5 rounded-lg bg-[#ffffff] text-[#1b1c19] text-sm focus:outline-none focus:bg-[#eae8e3] focus:ring-1 focus:ring-[#0e0f0f] shadow-sm"
                          >
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                            <option value="Non-binary">Non-binary</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={switchToViewMode}
                          className="px-5 py-2.5 rounded-lg bg-[#f5f3ee] hover:bg-[#eae8e3] text-[#1b1c19] font-medium transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-lg bg-[#0e0f0f] text-white hover:bg-[#242424] font-medium shadow-sm transition-all flex items-center gap-2"
                        >
                          <Check size={18} />
                          <span>Save Changes</span>
                        </button>
                      </div>
                    </form>
                  </article>

                  {/* Saved Addresses Section */}
                  <article className="bg-[#ffffff] rounded-xl p-6 md:p-8 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6">
                      <div>
                        <h3 className="text-lg font-['Playfair_Display'] text-[#1b1c19]">
                          Saved Addresses
                        </h3>
                        <p className="text-sm text-[#444748]">
                          Select addresses for dispatch, white-glove delivery, and insured parcel consignments.
                        </p>
                      </div>
                      <button
                        onClick={() => alert('Add New Address modal: enter dispatch address, recipient name, pin code, and delivery directives.')}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#0e0f0f] text-white hover:bg-[#242424] font-medium flex items-center justify-center gap-2 shadow-sm transition-colors"
                        type="button"
                      >
                        <span className="text-[18px]">+</span>
                        <span>Add New Address</span>
                      </button>
                    </div>

                    {/* Empty Addresses State */}
                    <div
                      className={`hidden flex-col items-center justify-center text-center py-10 px-4 bg-[#f5f3ee] rounded-xl ${
                        isEmpty ? 'flex' : 'hidden'
                      }`}
                      id="addresses-empty-state"
                    >
                      <div className="w-14 h-14 rounded-full bg-[#eae8e3] flex items-center justify-center text-[#444748] mb-4">
                        <span className="text-[28px]">📍</span>
                      </div>
                      <h4 className="text-sm font-medium text-[#1b1c19] mb-1">
                        No saved addresses on file
                      </h4>
                      <p className="text-sm text-[#444748] max-w-sm mb-4">
                        Add your primary residence or private studio to facilitate single-click checkout.
                      </p>
                      <button
                        className="px-5 py-2.5 rounded-lg bg-[#0e0f0f] text-white font-medium"
                        onClick={() => alert('Add Your First Address modal')}
                        type="button"
                      >
                        Add Your First Address
                      </button>
                    </div>

                    {/* Address Cards Grid */}
                    <div
                      className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${isEmpty ? 'hidden' : ''}`}
                      id="addresses-grid"
                    >
                      {/* Address 1 (Primary) */}
                      <div
                        className="p-4 rounded-xl bg-[#f5f3ee] flex flex-col justify-between shadow-sm relative"
                        id="address-card-1"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-0.5 rounded bg-[#0e0f0f] text-white font-medium text-[10px] uppercase tracking-wider">
                                Home (Primary)
                              </span>
                              <span className="w-2 h-2 rounded-full bg-[#705a45]"></span>
                            </div>
                            <span className="text-xs font-medium text-[#74736E]">Default</span>
                          </div>
                          <h4 className="text-sm font-medium text-[#1b1c19] mb-1">Eleanor Vance</h4>
                          <p className="text-sm text-[#444748] mb-2 flex items-center gap-1.5">
                            <span className="text-[16px] text-[#444748]">📱</span>
                            +91 98201 45892
                          </p>
                          <p className="text-sm text-[#1b1c19] leading-relaxed mb-4">
                            Penthouse 4B, The Palmetto Residence<br />
                            Pali Hill Road, Bandra West<br />
                            Mumbai, Maharashtra 400050<br />
                            India
                          </p>
                        </div>
                        <div className="pt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              className="text-sm font-medium text-[#1b1c19] hover:text-[#705a45] underline transition-colors"
                              onClick={() => alert('Opening address editor for Pali Hill...')}
                              type="button"
                            >
                              Edit
                            </button>
                            <span className="text-[#c4c7c7] text-xs">•</span>
                            <button
                              className="text-sm font-medium text-[#ba1a1a] hover:opacity-80 transition-opacity"
                              onClick={() => {
                                setDeleteAddressTarget('address-card-1')
                                document.getElementById('delete-address-modal')?.classList.remove('hidden')
                                document.getElementById('delete-address-modal')?.classList.add('flex')
                              }}
                              type="button"
                            >
                              Delete
                            </button>
                          </div>
                          <span className="text-xs font-medium text-[#444748] flex items-center gap-1">
                            <span className="text-[14px] text-[#705a45]">✓</span> In Use
                          </span>
                        </div>
                      </div>

                      {/* Address 2 (Studio) */}
                      <div
                        className="p-4 rounded-xl bg-[#f5f3ee] flex flex-col justify-between shadow-sm relative"
                        id="address-card-2"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="px-2.5 py-0.5 rounded bg-[#e4e2dd] text-[#1b1c19] font-medium text-[10px] uppercase tracking-wider">
                              Studio / Office
                            </span>
                            <button
                              className="text-sm text-[#444748] hover:text-[#1b1c19] underline"
                              onClick={() => alert('Selected address assigned as Primary Atelier delivery location.')}
                              type="button"
                            >
                              Make Default
                            </button>
                          </div>
                          <h4 className="text-sm font-medium text-[#1b1c19] mb-1">Eleanor Vance</h4>
                          <p className="text-sm text-[#444748] mb-2 flex items-center gap-1.5">
                            <span className="text-[16px] text-[#444748]">📱</span>
                            +91 98201 45892
                          </p>
                          <p className="text-sm text-[#1b1c19] leading-relaxed mb-4">
                            702 Atelier Design Loft<br />
                            Khar Danda Road, Khar West<br />
                            Mumbai, Maharashtra 400052<br />
                            India
                          </p>
                        </div>
                        <div className="pt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              className="text-sm font-medium text-[#1b1c19] hover:text-[#705a45] underline transition-colors"
                              onClick={() => alert('Opening address editor for Studio...')}
                              type="button"
                            >
                              Edit
                            </button>
                            <span className="text-[#c4c7c7] text-xs">•</span>
                            <button
                              className="text-sm font-medium text-[#ba1a1a] hover:opacity-80 transition-opacity"
                              onClick={() => {
                                setDeleteAddressTarget('address-card-2')
                                document.getElementById('delete-address-modal')?.classList.remove('hidden')
                                document.getElementById('delete-address-modal')?.classList.add('flex')
                              }}
                              type="button"
                            >
                              Delete
                            </button>
                          </div>
                          <button
                            className="text-sm text-[#444748] hover:text-[#1b1c19] flex items-center gap-1"
                            onClick={() => alert('Selected address assigned as Primary Atelier delivery location.')}
                            type="button"
                          >
                            <span className="text-[14px] text-[#444748]">🏁</span>
                            <span>Set as Primary</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                </section>

                {/* Right Column */}
                <aside className="lg:col-span-4 flex flex-col gap-6">
                  {/* Account Portals */}
                  <article className="bg-[#ffffff] rounded-xl p-6 shadow-sm">
                    <h3 className="text-sm font-medium text-[#1b1c19] mb-4">Account Portals</h3>
                    <p className="text-sm text-[#444748] mb-4">
                      Immediate access to your bespoke collector archives.
                    </p>
                    <nav className="flex flex-col gap-1.5">
                      <a
                        href="#"
                        className="p-3 rounded-lg hover:bg-[#f5f3ee] flex items-center justify-between transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-9 h-9 rounded-full bg-[#f5f3ee] flex items-center justify-center text-[#1b1c19] group-hover:bg-[#0e0f0f] group-hover:text-white transition-colors">
                            <ShoppingBagIcon size={18} />
                          </span>
                          <span className="text-sm font-medium text-[#1b1c19]">My Orders</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-[#fcddc1] text-[#281807] font-medium text-[10px]">
                            3 active
                          </span>
                          <ChevronRight size={16} className="text-[#444748]" />
                        </div>
                      </a>
                      <a
                        href="#"
                        className="p-3 rounded-lg hover:bg-[#f5f3ee] flex items-center justify-between transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-9 h-9 rounded-full bg-[#f5f3ee] flex items-center justify-center text-[#1b1c19] group-hover:bg-[#0e0f0f] group-hover:text-white transition-colors">
                            <HeartIcon size={18} />
                          </span>
                          <span className="text-sm font-medium text-[#1b1c19]">Curated Wishlist</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-[#e4e2dd] text-[#444748] font-medium text-[10px]">
                            4 saved
                          </span>
                          <ChevronRight size={16} className="text-[#444748]" />
                        </div>
                      </a>
                      <a
                        href="#"
                        className="p-3 rounded-lg hover:bg-[#f5f3ee] flex items-center justify-between transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-9 h-9 rounded-full bg-[#f5f3ee] flex items-center justify-center text-[#1b1c19] group-hover:bg-[#0e0f0f] group-hover:text-white transition-colors">
                            <Home size={18} />
                          </span>
                          <span className="text-sm font-medium text-[#1b1c19]">Saved Addresses</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-[#e4e2dd] text-[#444748] font-medium text-[10px]">
                            2 active
                          </span>
                          <ChevronRight size={16} className="text-[#444748]" />
                        </div>
                      </a>
                      <a
                        href="#"
                        className="p-3 rounded-lg hover:bg-[#f5f3ee] flex items-center justify-between transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-9 h-9 rounded-full bg-[#f5f3ee] flex items-center justify-center text-[#1b1c19] group-hover:bg-[#0e0f0f] group-hover:text-white transition-colors">
                            <BellIcon size={18} />
                          </span>
                          <span className="text-sm font-medium text-[#1b1c19]">Notification Preferences</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#444748]">SMS &amp; Email</span>
                          <ChevronRight size={16} className="text-[#444748]" />
                        </div>
                      </a>
                    </nav>
                  </article>

                  {/* Security & Vault */}
                  <article className="bg-[#ffffff] rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-[#1b1c19]">Security &amp; Vault</h3>
                      <UserRound size={18} className="text-[#444748]" />
                    </div>
                    <p className="text-sm text-[#444748] mb-4">
                      Safeguard your authentication credentials and multi-factor authorizations.
                    </p>
                    <div className="flex flex-col gap-3 mb-4">
                      <div className="p-3 rounded-lg bg-[#f5f3ee] flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium text-[#1b1c19] block">Account Password</span>
                          <span className="text-xs text-[#444748]">Last modified 4 months ago</span>
                        </div>
                        <button
                          className="px-3 py-1.5 rounded bg-[#ffffff] text-[#1b1c19] text-sm hover:bg-[#eae8e3] transition-colors shadow-sm"
                          onClick={() => alert('Password reset link sent to your registered mail.')}
                          type="button"
                        >
                          Change
                        </button>
                      </div>
                      <div className="p-3 rounded-lg bg-[#f5f3ee] flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium text-[#1b1c19] block">Two-Factor Authentication</span>
                          <span className="text-xs text-[#705a45] flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#705a45]"></span> Enabled (Authenticator)
                          </span>
                        </div>
                        <button
                          className="px-3 py-1.5 rounded bg-[#ffffff] text-[#1b1c19] text-sm hover:bg-[#eae8e3] transition-colors shadow-sm"
                          onClick={() => alert('Two factor credentials settings opened.')}
                          type="button"
                        >
                          Manage
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 pt-2">
                      <button
                        className="w-full py-2.5 rounded-lg bg-[#f5f3ee] hover:bg-[#eae8e3] text-[#1b1c19] font-medium flex items-center justify-center gap-2 transition-colors"
                        onClick={() => {
                          if (confirm('Are you sure you want to sign out from this device?')) {
                            window.location.reload()
                          }
                        }}
                        type="button"
                      >
                        <span className="text-[18px]">🚪</span>
                        <span>Sign Out from All Devices</span>
                      </button>
                      <div className="text-center pt-2">
                        <button
                          className="text-xs text-[#ba1a1a]/80 hover:text-[#ba1a1a] underline transition-colors"
                          onClick={() => {
                            document.getElementById('delete-account-modal')?.classList.remove('hidden')
                            document.getElementById('delete-account-modal')?.classList.add('flex')
                          }}
                          type="button"
                        >
                          Request Account Deletion &amp; Data Wipe
                        </button>
                      </div>
                    </div>
                  </article>

                  {/* Atelier Concierge Care */}
                  <article className="bg-[#f5f3ee] rounded-xl p-6 shadow-sm relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[20px] text-[#444748]">🎧</span>
                      <h3 className="text-sm font-medium text-[#1b1c19]">Atelier Concierge Care</h3>
                    </div>
                    <p className="text-sm text-[#444748] mb-4 leading-relaxed">
                      Need bespoke advice regarding custom monogram orders, private viewings, or address
                      reassignment during transit?
                    </p>
                    <div className="flex flex-col gap-2 text-sm font-medium">
                      <a
                        href="tel:+918002008900"
                        className="p-2.5 rounded-lg bg-[#ffffff] text-[#1b1c19] hover:bg-[#eae8e3] transition-colors flex items-center gap-2.5"
                      >
                        <span className="text-[18px] text-[#444748]">📞</span>
                        <span>Direct: +91 800 200 8900</span>
                      </a>
                      <a
                        href="mailto:concierge@atelier-archive.com"
                        className="p-2.5 rounded-lg bg-[#ffffff] text-[#1b1c19] hover:bg-[#eae8e3] transition-colors flex items-center gap-2.5"
                      >
                        <span className="text-[18px] text-[#444748]">✉</span>
                        <span className="truncate">concierge@atelier-archive.com</span>
                      </a>
                    </div>
                  </article>
                </aside>
              </div>
            </>
          )}
        </div>
      </main>

   

      {/* Delete Address Modal */}
      <div
        className={`fixed inset-0 z-50 bg-[#0e0f0f]/40 backdrop-blur-sm ${deleteAddressTarget ? 'flex items-center justify-center p-4' : 'hidden'}`}
        id="delete-address-modal"
      >
        <div className="bg-[#ffffff] rounded-xl max-w-md w-full p-6 shadow-xl relative">
          <div className="w-12 h-12 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center mb-4">
            <span className="text-[24px]">🗑</span>
          </div>
          <h3 className="text-lg font-['Playfair_Display'] text-[#1b1c19] mb-1">
            Remove Address
          </h3>
          <p className="text-sm text-[#444748] mb-4">
            Are you certain you wish to remove{' '}
            <span className="font-semibold text-[#1b1c19]">this address</span> from your saved profile? Active
            dispatch consignments will not be affected.
          </p>
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={closeDeleteModal}
              className="px-4 py-2.5 rounded-lg bg-[#f5f3ee] text-[#1b1c19] font-medium hover:bg-[#eae8e3] transition-colors"
              type="button"
            >
              Cancel
            </button>
            <button
              onClick={confirmDeleteAddress}
              className="px-5 py-2.5 rounded-lg bg-[#ba1a1a] text-white font-medium hover:opacity-90 shadow-sm transition-opacity"
              type="button"
            >
              Remove Address
            </button>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      <div
        className={`fixed inset-0 z-50 bg-[#0e0f0f]/50 backdrop-blur-sm hidden items-center justify-center p-4`}
        id="delete-account-modal"
      >
        <div className="bg-[#ffffff] rounded-xl max-w-lg w-full p-6 shadow-xl relative">
          <div className="w-12 h-12 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center mb-4">
            <AlertTriangle size={24} />
          </div>
          <h3 className="text-lg font-['Playfair_Display'] text-[#1b1c19] mb-1">
            Request Account Deletion
          </h3>
          <p className="text-sm text-[#444748] mb-4 leading-relaxed">
            Deleting your Atelier Profile will irrevocably purge your private collection order history, custom
            tailored size profiles, and accumulated archival collector privileges. An email confirmation token
            will be dispatched.
          </p>
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => {
                document.getElementById('delete-account-modal')?.classList.add('hidden')
              }}
              className="px-4 py-2.5 rounded-lg bg-[#f5f3ee] text-[#1b1c19] font-medium hover:bg-[#eae8e3] transition-colors"
              type="button"
            >
              Retain Account
            </button>
            <button
              onClick={() => {
                alert('A formal verification link has been dispatched to eleanor.vance@atelier-archive.com.')
                document.getElementById('delete-account-modal')?.classList.add('hidden')
              }}
              className="px-5 py-2.5 rounded-lg bg-[#ba1a1a] text-white font-medium hover:opacity-90 transition-opacity"
              type="button"
            >
              Confirm Deletion Request
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function HeartIcon({ className, size = 18 }: { className?: string; size?: number }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}

function BagIcon({ className, size = 20 }: { className?: string; size?: number }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

function ShoppingBagIcon({ className, size = 18 }: { className?: string; size?: number }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

function BellIcon({ className, size = 18 }: { className?: string; size?: number }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}
