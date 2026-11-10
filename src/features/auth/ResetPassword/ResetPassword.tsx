
import { useState, useEffect, type FormEvent } from 'react'
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Mail,
  ShieldCheck,
  LoaderCircle,
  CircleAlert,
  Flower2,
} from 'lucide-react'
import { Link } from 'react-router-dom'

type Scenario = 'default' | 'strong' | 'mismatch' | 'submitting' | 'success' | 'expired'

type FormData = {
  newPassword: string
  confirmPassword: string
}

const initialForm: FormData = {
  newPassword: '',
  confirmPassword: '',
}

const scenarios: { id: Scenario; label: string }[] = [
  { id: 'default', label: '1. Default' },
  { id: 'strong', label: '2. Strong Validated' },
  { id: 'mismatch', label: '3. Mismatch Error' },
  { id: 'submitting', label: '4. Submitting...' },
  { id: 'success', label: '5. Success View' },
  { id: 'expired', label: '6. Expired Link' },
]

const demoForm: FormData = {
  newPassword: 'MaisonAura#2024',
  confirmPassword: 'MaisonAura#2024',
}

export default function ResetPassword() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [scenario, setScenario] = useState<Scenario>('default')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = (field: keyof FormData, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }))
  }

  const validatePasswords = () => {
    const { newPassword, confirmPassword } = form
    if (!newPassword || !confirmPassword) {
      return 'Type both passwords to confirm match.'
    }
    if (newPassword !== confirmPassword) {
      return 'Passwords do not match yet.'
    }
    return null
  }

  const validateNewPassword = () => {
    const { newPassword } = form
    if (!newPassword) {
      return null
    }
    if (newPassword.length < 8) {
      return 'Too short. Minimum 8 characters required.'
    }
    if (!/[a-z]/.test(newPassword) || !/[A-Z]/.test(newPassword)) {
      return 'Must include uppercase and lowercase letters.'
    }
    if (!/[0-9]/.test(newPassword)) {
      return 'Must include at least one number.'
    }
    if (!/[^A-Za-z0-9]/.test(newPassword)) {
      return 'Must include a special symbol (!@#$ etc.).'
    }
    return null
  }

  const getStrengthScore = () => {
    const { newPassword } = form
    if (!newPassword) return 0
    const checks = [
      newPassword.length >= 8,
      /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword),
      /[0-9]/.test(newPassword),
      /[^A-Za-z0-9]/.test(newPassword),
    ]
    return checks.filter(Boolean).length
  }

  const getStrengthLabel = () => {
    const score = getStrengthScore()
    if (form.newPassword.length === 0) return 'No entry'
    if (score <= 1) return 'Weak'
    if (score <= 3) return 'Medium'
    return 'Strong'
  }

  const getStrengthColor = () => {
    const score = getStrengthScore()
    if (score === 0) return 'bg-surface-container-high'
    if (score === 1) return 'bg-error'
    if (score <= 3) return 'bg-secondary'
    return 'bg-primary'
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newPasswordError = validateNewPassword()
    const confirmPasswordError = validatePasswords()

    if (newPasswordError || confirmPasswordError) {
      return
    }

    setIsSubmitting(true)
    setScenario('submitting')

    // Demo only. Replace with your password reset API.
    window.setTimeout(() => {
      setIsSubmitting(false)
      setScenario('success')
    }, 1200)
  }

  const setDemoScenario = (nextScenario: Scenario) => {
    setScenario(nextScenario)
    setIsSubmitting(false)

    if (nextScenario === 'default') {
      setForm(initialForm)
      return
    }

    if (nextScenario === 'strong') {
      setForm(demoForm)
      return
    }

    if (nextScenario === 'mismatch') {
      setForm({
        newPassword: 'MaisonAura#2024',
        confirmPassword: 'MaisonAura#9999',
      })
      return
    }

    if (nextScenario === 'submitting') {
      setForm(demoForm)
      return
    }

    if (nextScenario === 'success') {
      setForm(demoForm)
      return
    }

    if (nextScenario === 'expired') {
      setForm(demoForm)
    }
  }

  const isSuccess = scenario === 'success'
  const isExpired = scenario === 'expired'
  const strengthScore = getStrengthScore()
  const strengthLabel = getStrengthLabel()

  const inputClass = (hasError: boolean) =>
    `w-full h-12 pl-11 pr-12 rounded-xl bg-surface-container-lowest text-primary font-body-md text-body-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-outline transition-all ${
      hasError
        ? 'ring-1 ring-error focus:ring-error bg-error-container/20'
        : 'hover:bg-surface-container-high'
    }`

  return (
    <div className="min-h-screen pt-20 bg-[#fbf9f4] text-[#1b1c19]">
      {/* Brand Header */}
      <header className="flex flex-col items-center justify-center gap-2 py-8">
        <Flower2 size={20} className="text-[#705a45]" />
        <span className="font-['Playfair_Display'] text-xl tracking-widest">
          BRAND NAME
        </span>
      </header>

      <main className="flex w-full flex-col items-center justify-center px-4 pb-8 md:px-8 lg:px-16">
        <div className="w-full max-w-5xl py-4 md:py-8">

          {/* Interactive Prototype State Switcher */}
          <div className="w-full max-w-2xl mb-space-lg flex flex-col items-center">
            <div className="bg-surface-container-high/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm flex flex-wrap items-center justify-center gap-1">
              <button
                className="px-3 py-1.5 rounded-full text-label-sm font-label-sm transition-all duration-200 bg-primary text-on-primary shadow-sm"
                id="btn-state-default"
                onClick={() => setDemoScenario('default')}
                type="button"
              >
                Default Form
              </button>
              <button
                className="px-3 py-1.5 rounded-full text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface hover:bg-surface transition-all duration-200"
                id="btn-state-strong"
                onClick={() => setDemoState('strong')}
                type="button"
              >
                Strong Validated
              </button>
              <button
                className="px-3 py-1.5 rounded-full text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface hover:bg-surface transition-all duration-200"
                id="btn-state-mismatch"
                onClick={() => setDemoState('mismatch')}
                type="button"
              >
                Mismatch Error
              </button>
              <button
                className="px-3 py-1.5 rounded-full text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface hover:bg-surface transition-all duration-200"
                id="btn-state-submitting"
                onClick={() => setDemoState('submitting')}
                type="button"
              >
                Submitting...
              </button>
              <button
                className="px-3 py-1.5 rounded-full text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface hover:bg-surface transition-all duration-200"
                id="btn-state-success"
                onClick={() => setDemoScenario('success')}
                type="button"
              >
                Success View
              </button>
              <button
                className="px-3 py-1.5 rounded-full text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface hover:bg-surface transition-all duration-200"
                id="btn-state-expired"
                onClick={() => setDemoScenario('expired')}
                type="button"
              >
                Expired Link
              </button>
            </div>
          </div>

          {/* Primary Interactive Card Container */}
          <div className="w-full max-w-[480px] relative transition-all duration-300">
            {/* Decorative Soft Glow Element */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-32 bg-secondary-container/30 blur-3xl pointer-events-none rounded-full"></div>
            {/* MAIN CARD */}
            <div className="relative bg-surface-container-lowest rounded-2xl p-8 sm:p-10 shadow-xl shadow-secondary/5">
              {/* View 1: FORM (DEFAULT / STRONG / MISMATCH / SUBMITTING) */}
              <div className="flex flex-col" id="view-form">
                {/* Top Shield Icon Badge */}
                <div className="flex items-center justify-between mb-space-md">
                  <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-secondary shadow-sm">
                    <span className="material-symbols-outlined text-[24px]">shield_person</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-secondary font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    <span>Link expires in 14m</span>
                  </div>
                </div>
                {/* Typography Block */}
                <div className="mb-space-lg">
                  <span className="font-label-sm text-label-sm tracking-widest uppercase text-secondary font-semibold block mb-2">
                    ACCOUNT RECOVERY & CREDENTIAL UPDATE
                  </span>
                  <h1 className="font-headline-md text-headline-md text-primary tracking-tight mb-2">
                    Create a New Password
                  </h1>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Choose a strong, resilient password for your private account. It must differ from past credentials.
                  </p>
                </div>
                {/* Error Banner (Conditional on Mismatch State) */}
                <div
                  className="hidden mb-space-md p-3.5 rounded-xl bg-error-container text-on-error-container items-start gap-2.5 transition-all"
                  id="form-error-banner"
                >
                  <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">error</span>
                  <div className="text-body-md font-body-md text-error leading-snug">
                    Passwords do not match. Please verify both entries are identical before proceeding.
                  </div>
                </div>
                {/* Interactive Form */}
                <form className="flex flex-col gap-space-md" id="reset-password-form" onSubmit={handleSubmit}>
                  {/* Field 1: New Password */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <label
                        className="font-label-lg text-label-lg text-primary flex items-center gap-1"
                        htmlFor="new-password"
                      >
                        New Password <span className="text-secondary">*</span>
                      </label>
                      <span
                        className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold"
                        id="strength-label"
                      >
                        No entry
                      </span>
                    </div>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px] pointer-events-none">
                        lock
                      </span>
                      <input
                        className="w-full h-12 pl-11 pr-12 rounded-xl bg-surface-container-lowest text-primary font-body-md text-body-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-outline transition-all"
                        id="new-password"
                        name="new-password"
                        onInput={() => {
                          setForm(f => ({ ...f, newPassword: f.newPassword }))
                          const error = validateNewPassword()
                          setForm(f => ({ ...f, newPassword: f.newPassword }))
                        }}
                        placeholder="Enter your new password"
                        required
                        type="password"
                        value={form.newPassword}
                        onChange={(e) => updateField('newPassword', e.target.value)}
                      />
                      <button
                        aria-label="Toggle password visibility"
                        className="absolute right-3.5 text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center p-1"
                        id="toggle-icon-1"
                        onClick={() => {
                          const input = document.getElementById('new-password') as HTMLInputElement
                          const icon = document.getElementById('toggle-icon-1') as HTMLElement
                          if (input.type === 'password') {
                            input.type = 'text'
                            icon.textContent = 'visibility_off'
                          } else {
                            input.type = 'password'
                            icon.textContent = 'visibility'
                          }
                        }}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                      </button>
                    </div>
                    {/* Dynamic Segmented Strength Meter */}
                    <div className="w-full flex items-center gap-1.5 pt-2">
                      <div
                        className="h-1.5 flex-1 rounded-full bg-surface-container-high transition-colors duration-300"
                        id="bar-segment-1"
                      ></div>
                      <div
                        className="h-1.5 flex-1 rounded-full bg-surface-container-high transition-colors duration-300"
                        id="bar-segment-2"
                      ></div>
                      <div
                        className="h-1.5 flex-1 rounded-full bg-surface-container-high transition-colors duration-300"
                        id="bar-segment-3"
                      ></div>
                    </div>
                    {/* Real-time Requirement Matrix (2x2) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 bg-surface-container-low/60 p-3 rounded-xl mt-1">
                      {/* Requirement 1 */}
                      <div
                        className="flex items-center gap-2 text-label-sm font-label-sm text-outline transition-colors"
                        id="req-length"
                      >
                        <span className="material-symbols-outlined text-[16px]">radio_button_unchecked</span>
                        <span>Minimum 8 characters</span>
                      </div>
                      {/* Requirement 2 */}
                      <div
                        className="flex items-center gap-2 text-label-sm font-label-sm text-outline transition-colors"
                        id="req-cases"
                      >
                        <span className="material-symbols-outlined text-[16px]">radio_button_unchecked</span>
                        <span>Upper & lowercase</span>
                      </div>
                      {/* Requirement 3 */}
                      <div
                        className="flex items-center gap-2 text-label-sm font-label-sm text-outline transition-colors"
                        id="req-number"
                      >
                        <span className="material-symbols-outlined text-[16px]">radio_button_unchecked</span>
                        <span>At least one number</span>
                      </div>
                      {/* Requirement 4 */}
                      <div
                        className="flex items-center gap-2 text-label-sm font-label-sm text-outline transition-colors"
                        id="req-symbol"
                      >
                        <span className="material-symbols-outlined text-[16px]">radio_button_unchecked</span>
                        <span>Special symbol (!@#$)</span>
                      </div>
                    </div>
                  </div>
                  {/* Field 2: Confirm New Password */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <label
                        className="font-label-lg text-label-lg text-primary flex items-center gap-1"
                        htmlFor="confirm-password"
                      >
                        Confirm New Password <span className="text-secondary">*</span>
                      </label>
                      <span
                        className="font-label-sm text-label-sm hidden font-semibold"
                        id="match-badge"
                      ></span>
                    </div>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px] pointer-events-none">
                        lock_reset
                      </span>
                      <input
                        className="w-full h-12 pl-11 pr-12 rounded-xl bg-surface-container-lowest text-primary font-body-md text-body-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-outline transition-all"
                        id="confirm-password"
                        name="confirm-password"
                        onInput={() => {
                          setForm(f => ({ ...f, confirmPassword: f.confirmPassword }))
                          const error = validatePasswords()
                          setForm(f => ({ ...f, confirmPassword: f.confirmPassword }))
                        }}
                        placeholder="Re-enter your new password"
                        required
                        type="password"
                        value={form.confirmPassword}
                        onChange={(e) => updateField('confirmPassword', e.target.value)}
                      />
                      <button
                        aria-label="Toggle confirm password visibility"
                        className="absolute right-3.5 text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center p-1"
                        id="toggle-icon-2"
                        onClick={() => {
                          const input = document.getElementById('confirm-password') as HTMLInputElement
                          const icon = document.getElementById('toggle-icon-2') as HTMLElement
                          if (input.type === 'password') {
                            input.type = 'text'
                            icon.textContent = 'visibility_off'
                          } else {
                            input.type = 'password'
                            icon.textContent = 'visibility'
                          }
                        }}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                      </button>
                    </div>
                    <p
                      className="font-label-sm text-label-sm text-on-surface-variant/80 pl-1"
                      id="confirm-hint"
                    >
                      Type both passwords to confirm match.
                    </p>
                  </div>
                  {/* Primary Submit Action */}
                  <div className="pt-2">
                    <button
                      className="w-full h-12 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg hover:bg-primary-container transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-75 disabled:cursor-wait"
                      id="submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      <span id="btn-text">Reset Password</span>
                      <span className="material-symbols-outlined text-[18px]" id="btn-arrow">
                        arrow_forward
                      </span>
                      <span
                        className="hidden material-symbols-outlined animate-spin text-[18px]"
                        id="btn-spinner"
                      >
                        progress_activity
                      </span>
                    </button>
                  </div>
                  {/* Secondary Back Link */}
                  <div className="text-center pt-2">
                    <a
                      className="inline-flex items-center gap-1.5 font-label-md text-label-md text-secondary hover:text-primary transition-colors"
                      href="#"
                    >
                      <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                      <span>Return to Sign In</span>
                    </a>
                  </div>
                </form>
              </div>
              {/* View 2: SUCCESS VIEW */}
              <div
                className="hidden flex-col items-center text-center py-2 animate-fadeIn"
                id="view-success"
              >
                <div className="w-16 h-16 rounded-full bg-secondary-container/40 text-secondary flex items-center justify-center mb-space-md shadow-inner">
                  <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                </div>
                <span className="font-label-sm text-label-sm tracking-widest uppercase text-secondary font-semibold block mb-2">
                  CREDENTIAL SECURED
                </span>
                <h2 className="font-headline-md text-headline-md text-primary mb-3">
                  Password Reset Successful
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg max-w-sm">
                  Your password has been securely updated. You can now access your private atelier profile using your new credentials.
                </p>
                <div className="w-full p-4 rounded-xl bg-surface-container-low mb-space-lg text-left flex items-start gap-3">
                  <span className="material-symbols-outlined text-[20px] text-secondary shrink-0 mt-0.5">devices</span>
                  <div className="font-label-sm text-label-sm text-on-surface-variant leading-relaxed">
                    All active sessions across other devices and browsers have been invalidated for your safety. Re-authentication is required.
                  </div>
                </div>
                <div className="w-full flex flex-col gap-3">
                  <a
                    className="w-full h-12 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg hover:bg-primary-container transition-all flex items-center justify-center gap-2 shadow-sm"
                    href="#"
                  >
                    <span>Go to Sign In</span>
                    <span className="material-symbols-outlined text-[18px]">login</span>
                  </a>
                </div>
              </div>
              {/* View 3: EXPIRED VIEW */}
              <div
                className="hidden flex-col items-center text-center py-2 animate-fadeIn"
                id="view-expired"
              >
                <div className="w-16 h-16 rounded-full bg-surface-container text-error flex items-center justify-center mb-space-md shadow-inner">
                  <span className="material-symbols-outlined text-[32px]">history_toggle_off</span>
                </div>
                <span className="font-label-sm text-label-sm tracking-widest uppercase text-error font-semibold block mb-2">
                  SESSION INVALIDATED
                </span>
                <h2 className="font-headline-md text-headline-md text-primary mb-3">
                  Reset Link Expired
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg max-w-sm">
                  This password reset authorization has reached its 15-minute validity limit or has already been consumed.
                </p>
                <div className="w-full p-4 rounded-xl bg-surface-container-low mb-space-lg text-left flex items-start gap-3">
                  <span className="material-symbols-outlined text-[20px] text-secondary shrink-0 mt-0.5">verified_user</span>
                  <div className="font-label-sm text-label-sm text-on-surface-variant leading-relaxed">
                    Single-use recovery tokens protect your account against unauthorized replay access. Please dispatch a fresh request.
                  </div>
                </div>
                <div className="w-full flex flex-col gap-3">
                  <a
                    className="w-full h-12 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg hover:bg-primary-container transition-all flex items-center justify-center gap-2 shadow-sm"
                    href="#"
                  >
                    <span>Request New Reset Link</span>
                    <span className="material-symbols-outlined text-[18px]">forward_to_inbox</span>
                  </a>
                  <a
                    className="inline-flex items-center justify-center gap-1.5 font-label-md text-label-md text-secondary hover:text-primary transition-colors py-2"
                    href="#"
                  >
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                    <span>Return to Sign In</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Security & Trust Micro-Footer Below Card */}
            <div className="mt-space-md flex flex-col items-center gap-2 text-center text-on-surface-variant">
              <div className="inline-flex items-center gap-2 font-label-sm text-label-sm text-outline">
                <span className="material-symbols-outlined text-[14px] text-secondary">encrypted</span>
                <span>256-Bit TLS Encryption</span>
                <span>•</span>
                <span>Zero-Knowledge Credential Hashing</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant text-[13px]">
                Experiencing difficulties? 
                <a
                  className="font-label-md text-label-md text-secondary underline hover:text-primary transition-colors inline-flex items-center gap-0.5"
                  href="#"
                >
                  Concierge Support <span className="material-symbols-outlined text-[13px]">north_east</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
