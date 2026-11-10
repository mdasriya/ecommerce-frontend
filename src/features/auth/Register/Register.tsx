
import { useMemo, useState, type FormEvent } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Eye,
  EyeOff,
  Lock,
  LockKeyhole,
  Mail,
  Phone,
  ShieldCheck,
  Flower2,
  LoaderCircle,
  CircleAlert,
  Headset,
  Check,
} from 'lucide-react'
import { Link } from 'react-router-dom'

type Scenario =
  | 'default'
  | 'filled'
  | 'errors'
  | 'duplicate'
  | 'submitting'
  | 'success'

type FormData = {
  email: string
  password: string
  confirmPassword: string
  terms: boolean
}

const initialForm: FormData = {
  email: '',
  password: '',
  confirmPassword: '',
  terms: false,
}

const scenarios: { id: Scenario; label: string }[] = [
  { id: 'default', label: '1. Default' },
  { id: 'filled', label: '2. Filled & Valid' },
  { id: 'errors', label: '3. Validation Errors' },
  { id: 'duplicate', label: '4. Duplicate Email' },
  { id: 'submitting', label: '5. Submitting' },
  { id: 'success', label: '6. Success' },
]

const passwordRequirements = [
  { label: 'Min. 8 characters', test: (value: string) => value.length >= 8 },
  {
    label: 'Uppercase & lowercase',
    test: (value: string) => /[a-z]/.test(value) && /[A-Z]/.test(value),
  },
  { label: 'At least one number (0-9)', test: (value: string) => /[0-9]/.test(value) },
  {
    label: 'Special symbol (!@#$%^&*)',
    test: (value: string) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
  },
]

const demoForm: FormData = {
  email: 'eleanor.vance@atelier.com',
  password: 'LinenCraft#2024',
  confirmPassword: 'LinenCraft#2024',
  terms: true,
}

export default function Register() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [scenario, setScenario] = useState<Scenario>('default')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const requirements = useMemo(
    () => passwordRequirements.map((item) => item.test(form.password)),
    [form.password]
  )

  const strengthScore = requirements.filter(Boolean).length

  const strengthLabel =
    form.password.length === 0
      ? 'None'
      : strengthScore <= 1
        ? 'Weak'
        : strengthScore <= 3
          ? 'Medium'
          : 'Strong'

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setForm((previous) => ({ ...previous, [field]: value }))
    setErrors((previous) => ({ ...previous, [field]: '' }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!form.email.trim()) {
      newErrors.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (strengthScore !== 4) {
      newErrors.password = 'Password does not satisfy all requirements.'
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.'
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.'
    }

    if (!form.terms) {
      newErrors.terms = 'You must agree before registering.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setScenario('submitting')

    // Demo only. Replace with your registration API.
    window.setTimeout(() => {
      setIsSubmitting(false)
      setScenario('success')
    }, 1200)
  }

  const setDemoScenario = (nextScenario: Scenario) => {
    setScenario(nextScenario)
    setErrors({})
    setIsSubmitting(false)

    if (nextScenario === 'default') {
      setForm(initialForm)
      return
    }

    if (nextScenario === 'filled') {
      setForm(demoForm)
      return
    }

    if (nextScenario === 'errors') {
      setForm({
        ...initialForm,
        email: 'eleanor.invalid-email',
        password: 'abc',
        confirmPassword: 'xyz',
      })
      setErrors({
        email: 'Please enter a valid email address.',
        password: 'Password does not satisfy all requirements.',
        confirmPassword: 'Passwords do not match.',
        terms: 'You must agree before registering.',
      })
      return
    }

    if (nextScenario === 'duplicate' || nextScenario === 'submitting') {
      setForm(demoForm)
      return
    }

    if (nextScenario === 'success') {
      setForm(demoForm)
    }
  }

  const isSuccess = scenario === 'success'
  const isDuplicate = scenario === 'duplicate'

  const inputClass = (hasError: boolean) =>
    `w-full h-12 rounded-lg bg-[#f5f3ee] px-4 text-sm text-[#1b1c19] placeholder:text-[#747878] outline-none transition-all focus:bg-white focus:ring-2 ${
      hasError
        ? 'ring-1 ring-red-500 focus:ring-red-500'
        : 'focus:ring-[#705a45]/30'
    }`

  const fieldError = (field: string) =>
    errors[field] ? (
      <p className="mt-1 text-xs text-red-600">{errors[field]}</p>
    ) : null

  return (
    <div className="min-h-screen bg-[#fbf9f4] text-[#1b1c19]">
      {/* Brand Header */}
      {/* <header className="flex flex-col items-center justify-center gap-2 py-8">
        <Flower2 size={20} className="text-[#705a45]" />
        <span className="font-['Playfair_Display'] text-xl tracking-widest">
          BRAND NAME
        </span>
      </header> */}

      <main className="flex w-full flex-col items-center justify-center px-4 pb-8 md:px-8 lg:px-16">
        <div className="w-full max-w-5xl py-4 md:py-8">

          {/* Demo Scenarios */}
          {/* <div className="mb-6 rounded-xl bg-[#f5f3ee] p-3 shadow-sm">
            <div className="mb-3 flex items-center gap-2 px-2">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#705a45]">
                Demo Scenarios:
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {scenarios.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setDemoScenario(item.id)}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                    scenario === item.id
                      ? 'bg-[#0e0f0f] text-white'
                      : 'bg-white text-[#444748] hover:bg-[#eae8e3]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div> */}

          {/* Main Card */}
          <div className="grid min-h-[720px] grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-xl lg:grid-cols-12">

            {/* Left: Registration Form */}
            <div className="flex flex-col justify-between p-6 sm:p-10 md:p-12 lg:col-span-7">

              {isSuccess ? (
                /* Success Screen */
                <div className="flex flex-1 flex-col items-center justify-center px-2 py-12 text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#fcddc1] text-[#705a45]">
                    <Mail size={30} />
                  </div>

                  <span className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#705a45]">
                    Verification Sent
                  </span>

                  <h2 className="mb-3 font-['Playfair_Display'] text-3xl">
                    Welcome to BRAND NAME
                  </h2>

                  <p className="mb-6 max-w-md text-sm leading-7 text-[#444748]">
                    Your account has been successfully created. We have
                    dispatched a verification email to{' '}
                    <strong className="text-[#1b1c19]">{form.email}</strong>.
                  </p>

                  <div className="mb-8 w-full max-w-md rounded-xl bg-[#f5f3ee] p-5 text-left">
                    <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
                      <CheckCircle2 size={18} className="text-[#705a45]" />
                      Member privileges unlocked:
                    </p>

                    <ul className="list-disc space-y-2 pl-6 text-sm text-[#444748]">
                      <li>Complimentary standard delivery</li>
                      <li>Early access to seasonal collections</li>
                      <li>Dedicated customer support</li>
                    </ul>
                  </div>

                  <div className="flex w-full max-w-sm flex-col gap-3 sm:flex-row">
                    <Link
                      to="/"
                      className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-[#0e0f0f] text-sm font-semibold text-white transition hover:bg-[#383838]"
                    >
                      Continue Shopping <ArrowRight size={17} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => setDemoScenario('default')}
                      className="h-12 flex-1 rounded-lg bg-[#f0eee9] text-sm font-semibold hover:bg-[#e4e2dd]"
                    >
                      Back to Form
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Form Heading */}
                  <div className="mb-6">
                    <h1 className="mb-2 font-['Playfair_Display'] text-3xl tracking-tight sm:text-4xl">
                      Create Your Account
                    </h1>
                  </div>

                  {/* Duplicate Email Banner */}
                  {isDuplicate && (
                    <div className="mb-6 flex items-start gap-3 rounded-xl bg-[#ffdad6] p-4 text-[#93000a]">
                      <CircleAlert size={20} className="mt-0.5 shrink-0" />

                      <div className="text-sm">
                        <p className="font-semibold">Account already exists</p>
                        <p className="mt-1 leading-6">
                          An account with <strong>{form.email}</strong> is
                          already registered. Would you like to{' '}
                          <Link to="/login" className="font-semibold underline">
                            Sign In
                          </Link>{' '}
                          instead?
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Registration Form */}
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">

                  {/* Email */}
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">
                        Email Address *
                      </label>

                      <div className="relative">
                        <Mail
                          size={19}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#747878]"
                        />
                        <input
                          id="email"
                          type="email"
                          autoComplete="email"
                          placeholder="name@domain.com"
                          value={form.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          className={`${inputClass(!!errors.email)} pl-11`}
                        />

                        {form.email.includes('@') && !errors.email && (
                          <CheckCircle2
                            size={18}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-green-700"
                          />
                        )}
                      </div>
                      {fieldError('email')}
                    </div>

                    {/* Password */}
                    <div>
                      <label htmlFor="password" className="mb-1.5 block text-sm font-semibold">
                        Password *
                      </label>

                      <div className="relative">
                        <Lock
                          size={19}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#747878]"
                        />

                        <input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          autoComplete="new-password"
                          placeholder="Create a secure password"
                          value={form.password}
                          onChange={(e) => updateField('password', e.target.value)}
                          className={`${inputClass(!!errors.password)} pl-11 pr-12`}
                        />

                        <button
                          type="button"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          onClick={() => setShowPassword((value) => !value)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#747878] hover:text-[#1b1c19]"
                        >
                          {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                        </button>
                      </div>

                      {/* Password Strength */}
                      <div className="mt-2.5 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-[#747878]">Password Strength:</span>
                          <span
                            className={`font-semibold ${
                              strengthScore <= 1
                                ? 'text-red-600'
                                : strengthScore <= 3
                                  ? 'text-amber-600'
                                  : 'text-green-700'
                            }`}
                          >
                            {strengthLabel}
                          </span>
                        </div>

                        <div className="grid h-1.5 grid-cols-3 gap-1.5">
                          {[0, 1, 2].map((index) => (
                            <div
                              key={index}
                              className={`rounded-full transition-colors ${
                                strengthScore === 4 && index < 3
                                  ? 'bg-green-700'
                                  : strengthScore >= 2 && index < 2
                                    ? 'bg-amber-500'
                                    : strengthScore >= 1 && index === 0
                                      ? 'bg-red-500'
                                      : 'bg-[#eae8e3]'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Password Checklist */}
                      <div className="mt-2.5 grid grid-cols-1 gap-2 rounded-lg bg-[#f5f3ee] p-3 sm:grid-cols-2">
                        {passwordRequirements.map((item, index) => (
                          <div
                            key={item.label}
                            className={`flex items-center gap-1.5 text-xs ${
                              requirements[index] ? 'font-medium text-green-700' : 'text-[#747878]'
                            }`}
                          >
                            {requirements[index] ? (
                              <CheckCircle2 size={15} />
                            ) : (
                              <Circle size={15} />
                            )}
                            {item.label}
                          </div>
                        ))}
                      </div>

                      {fieldError('password')}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="mb-1.5 block text-sm font-semibold"
                      >
                        Confirm Password *
                      </label>

                      <div className="relative">
                        <LockKeyhole
                          size={19}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#747878]"
                        />

                        <input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          autoComplete="new-password"
                          placeholder="Re-enter your password"
                          value={form.confirmPassword}
                          onChange={(e) => updateField('confirmPassword', e.target.value)}
                          className={`${inputClass(!!errors.confirmPassword)} pl-11 pr-12`}
                        />

                        <button
                          type="button"
                          aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                          onClick={() => setShowConfirmPassword((value) => !value)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#747878] hover:text-[#1b1c19]"
                        >
                          {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                        </button>
                      </div>

                      {form.confirmPassword && (
                        <p
                          className={`mt-1 text-xs ${
                            form.password === form.confirmPassword
                              ? 'text-green-700'
                              : 'text-red-600'
                          }`}
                        >
                          {form.password === form.confirmPassword
                            ? '✓ Passwords match perfectly'
                            : '✕ Passwords do not match'}
                        </p>
                      )}

                      {fieldError('confirmPassword')}
                    </div>

                    {/* Terms */}
                    <div className="space-y-3 pt-2">
                      <label className="flex cursor-pointer items-start gap-3">
                        <input
                          type="checkbox"
                          checked={form.terms}
                          onChange={(e) => updateField('terms', e.target.checked)}
                          className="mt-1 h-4 w-4 accent-[#0e0f0f]"
                        />
                        <span className="text-sm leading-5">
                          I agree to the{' '}
                          <Link to="/terms" className="underline underline-offset-2">
                            Terms and Conditions
                          </Link>{' '}
                          and{' '}
                          <Link to="/privacy-policy" className="underline underline-offset-2">
                            Privacy Policy
                          </Link>
                          . *
                        </span>
                      </label>

                      {fieldError('terms')}
                    </div>

                    {/* Submit */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#0e0f0f] text-sm font-semibold text-white shadow-md transition hover:bg-[#383838] disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <>
                            Creating Account...
                            <LoaderCircle size={19} className="animate-spin" />
                          </>
                        ) : (
                          'Create Account →'
                        )}
                      </button>
                    </div>
                  </form>

                  {/* Login Link */}
                  <div className="mt-6 text-center text-sm text-[#444748]">
                    Already have an account?{' '}
                    <Link
                      to="/login"
                      className="font-semibold text-[#0e0f0f] underline underline-offset-4 hover:text-[#705a45]"
                    >
                      Sign In
                    </Link>
                  </div>

                  {/* Trust Information */}
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-xl bg-[#f5f3ee]/70 p-3 text-xs text-[#747878]">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck size={15} className="text-[#705a45]" />
                      Secure Encryption
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Lock size={15} className="text-[#705a45]" />
                      Data Protection
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Headset size={15} className="text-[#705a45]" />
                      Customer Support
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Editorial Image */}
            <div className="relative hidden flex-col justify-end overflow-hidden bg-[#eae8e3] p-10 lg:col-span-5 lg:flex">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCA7Q8KIETfYaiFkD8I8xcyj2PlcSS7dK4HY4om96Om4ODf8ptWMAD-HD3aoaHrxTgd2T0Eq_RXKovQ_JX1ubRJpcmtA0M5rykwUACNgCVNAjQjjiBjFBJDMIqfxHaIJSKxMDGdtqHQBsjVfTxJsRaTp_ptDQZUbLxdrR8oMocNZlY01z5pCYC_8knnp_AHWC5P_-lTuZfYp4O1X79CSb1jUp_P1MRg94r29YGOIcuN"
                alt="Minimal luxury lifestyle editorial"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="relative z-10 space-y-4 text-white">
                <div className="flex items-center gap-2">
                  <Flower2 size={20} className="text-[#fcddc1]" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#fcddc1]">
                    Considered Living
                  </span>
                </div>

                <blockquote className="font-['Playfair_Display'] text-3xl italic leading-tight">
                  “Curated essentials for considered living. Join our private circle.”
                </blockquote>

                <div className="flex justify-between border-t border-white/20 pt-4 text-xs text-white/80">
                  <span>Seasonal Curation</span>
                  <span>Est. 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    
    </div>
  )
}
