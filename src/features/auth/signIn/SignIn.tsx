
import { useMemo, useState, type FormEvent } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  LockKeyhole,
  LoaderCircle,
  CircleAlert,
  Headset,
  Flower2,
} from 'lucide-react'
import { Link } from 'react-router-dom'

type Scenario =
  | 'default'
  | 'filled'
  | 'validation-error'
  | 'auth-error'
  | 'submitting'
  | 'success'

type FormData = {
  email: string
  password: string
  remember: boolean
}

const initialForm: FormData = {
  email: '',
  password: '',
  remember: false,
}

const scenarios: { id: Scenario; label: string }[] = [
  { id: 'default', label: '1. Default' },
  { id: 'filled', label: '2. Filled & Valid' },
  { id: 'validation-error', label: '3. Validation Errors' },
  { id: 'auth-error', label: '4. Invalid Credentials' },
  { id: 'submitting', label: '5. Submitting' },
  { id: 'success', label: '6. Success' },
]

const demoForm: FormData = {
  email: 'eleanor.vance@atelier.com',
  password: 'SandstonePlinth2024!',
  remember: true,
}

export default function SignIn() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [scenario, setScenario] = useState<Scenario>('default')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

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

    if (!form.password) {
      newErrors.password = 'Please enter your password.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setScenario('submitting')

    // Demo only. Replace with your sign-in API.
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

    if (nextScenario === 'validation-error') {
      setForm({
        email: 'invalid-email-format',
        password: 'short',
        remember: false,
      })
      setErrors({
        email: 'Please enter a valid email address.',
        password: 'Password must be at least 8 characters.',
      })
      return
    }

    if (nextScenario === 'auth-error') {
      setForm({
        email: 'eleanor.vance@atelier.com',
        password: 'WrongPassword456!',
        remember: false,
      })
      return
    }

    if (nextScenario === 'submitting') {
      setForm(demoForm)
      return
    }

    if (nextScenario === 'success') {
      setForm(demoForm)
    }
  }

  const isSuccess = scenario === 'success'
  const isAuthError = scenario === 'auth-error'

  const inputClass = (hasError: boolean) =>
    `w-full h-12 rounded-lg bg-[#f5f3ee]/40 px-4 text-sm text-[#1b1c19] placeholder:text-[#747878] outline-none transition-all focus:bg-white focus:ring-2 ${
      hasError
        ? 'ring-1 ring-red-500 focus:ring-red-500 bg-[#ffdad6]/30'
        : 'focus:ring-[#705a45]/30'
    }`

  const fieldError = (field: string) =>
    errors[field] ? (
      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
        <CircleAlert size={12} /> {errors[field]}
      </p>
    ) : null

  const icon = showPassword ? <EyeOff size={19} /> : <Eye size={19} />

  return (
    <div className="min-h-screen pt-20 bg-[#fbf9f4] text-[#1b1c19]">
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

            {/* Left: Editorial Image */}
            <div className="relative hidden flex-col justify-end overflow-hidden bg-[#eae8e3] p-10 lg:col-span-5 lg:flex">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDX_rYl5flUSe7w0cN2KVjHZEJ3vqWBDz7BdvIE6VZ7rLfd9YTWrIXGpZ7-KHLpbJ_Gu4uswNOBNXCoxXVu-Se8NjMmk2WfFAEW2IgGxas1xACqQRIq4HdXILqZXrZWvlr92xhqliM7hPgWUc8i0lusZLzbxrdnBlHj5RxmXLnQqfWpg-dm4lIumWEqmz-_gyZnPPgF4vKjJXrb9O7rYrkXNk-yuMT3c0LWVZpC2UZ4"
                alt="Minimal luxury lifestyle editorial"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="relative z-10 space-y-4 text-white">
                <div className="flex items-center gap-2">
                  <Flower2 size={20} className="text-[#fcddc1]" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#fcddc1]">
                    Flagship Identity
                  </span>
                </div>

                <blockquote className="font-['Playfair_Display'] text-3xl italic leading-tight">
                  “A little something, just for you.”
                </blockquote>

                <div className="flex justify-between border-t border-white/20 pt-4 text-xs text-white/80">
                  <span>Handcrafted Objects & Fine Adornments</span>
                  <span>ED. 018</span>
                </div>
              </div>
            </div>

            {/* Right: Sign In Form */}
            <div className="flex flex-col justify-between p-6 sm:p-10 md:p-12 lg:col-span-7">

              {isSuccess ? (
                /* Success Screen */
                <div className="flex flex-1 flex-col items-center justify-center px-2 py-12 text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#fcddc1] text-[#705a45]">
                    <CheckCircle2 size={30} />
                  </div>

                  <span className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#705a45]">
                    Welcome Back
                  </span>

                  <h2 className="mb-3 font-['Playfair_Display'] text-3xl">
                    Welcome Back, Eleanor
                  </h2>

                  <p className="mb-6 max-w-md text-sm leading-7 text-[#444748]">
                    Redirecting to your private orders, saved wishlist, and curated collections.
                  </p>

                  <div className="mb-8 w-full max-w-md rounded-xl bg-[#f5f3ee] p-5 text-left">
                    <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
                      <CheckCircle2 size={18} className="text-[#705a45]" />
                      Access restored:
                    </p>

                    <ul className="list-disc space-y-2 pl-6 text-sm text-[#444748]">
                      <li>Saved favourites & wishlist</li>
                      <li>Order history & tracking</li>
                      <li>Curated collections</li>
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
                      Welcome Back
                    </h1>
                    <p className="text-sm leading-7 text-[#444748]">
                      Sign in to continue exploring your saved favourites, orders, and
                      curated collections.
                    </p>
                  </div>

                  {/* Invalid Credentials Banner */}
                  {isAuthError && (
                    <div className="mb-6 flex items-start gap-3 rounded-xl bg-[#ffdad6] p-4 text-[#93000a]">
                      <CircleAlert size={20} className="mt-0.5 shrink-0" />

                      <div className="text-sm">
                        <p className="font-semibold">Invalid email or password</p>
                        <p className="mt-1 leading-6">
                          Please verify your credentials or use the reset option below.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Sign In Form */}
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">

                    {/* Social Authentication */}
                    <div className="grid grid-cols-2 gap-3 mb-2">
                      <button
                        type="button"
                        className="h-12 rounded-lg bg-[#f5f3ee] flex items-center justify-center gap-2 transition hover:bg-[#eae8e3]"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                          />
                        </svg>
                        <span className="text-sm font-semibold text-[#1b1c19]">Google</span>
                      </button>

                      <button
                        type="button"
                        className="h-12 rounded-lg bg-[#f5f3ee] flex items-center justify-center gap-2 transition hover:bg-[#eae8e3]"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-4 h-4 text-[#1b1c19]"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.77 1.06-1.85.94-2.93-.93.04-2.02.63-2.66 1.38-.56.64-1.07 1.74-.93 2.8 1.03.08 2.05-.53 2.65-1.25z"
                          />
                        </svg>
                        <span className="text-sm font-semibold text-[#1b1c19]">Apple</span>
                      </button>
                    </div>

                    {/* Divider */}
                    <div className="relative flex items-center justify-center my-4">
                      <div className="w-full h-px bg-[#eae8e3]" />
                      <span className="absolute bg-[#fbf9f4] px-3 text-[11px] font-semibold uppercase tracking-widest text-[#747878]">
                        or continue with email
                      </span>
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-sm font-semibold flex items-center justify-between"
                      >
                        <span>
                          Email Address <span className="text-[#747878]">*</span>
                        </span>
                        {form.email.includes('@') && !errors.email && (
                          <span className="text-[#747878] flex items-center gap-0.5 text-[11px]">
                            <CheckCircle2 size={12} className="text-green-700" /> Valid
                          </span>
                        )}
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
                      </div>
                      {fieldError('email')}
                    </div>

                    {/* Password */}
                    <div>
                      <label
                        htmlFor="password"
                        className="mb-1.5 block text-sm font-semibold"
                      >
                        Password <span className="text-[#747878]">*</span>
                      </label>

                      <div className="relative">
                        <Lock
                          size={19}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#747878]"
                        />

                        <input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          autoComplete="current-password"
                          placeholder="Enter your password"
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
                          {icon}
                        </button>
                      </div>

                      {fieldError('password')}
                    </div>

                    {/* Remember Me & Forgot */}
                    <div className="flex items-center justify-between pt-1 pb-1">
                      <label className="flex cursor-pointer items-center gap-2">
                        <input
                          type="checkbox"
                          checked={form.remember}
                          onChange={(e) => updateField('remember', e.target.checked)}
                          className="mt-1 h-4 w-4 accent-[#0e0f0f]"
                        />
                        <span className="text-sm leading-5 text-[#444748]">Remember me</span>
                      </label>

                      <Link
                        to="/forgot-password"
                        className="text-xs text-[#705a45] underline underline-offset-2 hover:text-[#383838]"
                      >
                        Forgot password?
                      </Link>
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
                            Authenticating...
                            <LoaderCircle size={19} className="animate-spin" />
                          </>
                        ) : (
                          <>
                            Sign →
                            <ArrowRight size={17} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>

                  {/* Create Account Link */}
                  <div className="mt-6 text-center text-sm text-[#444748]">
                    Don’t have an account?{' '}
                    <Link
                      to="/register"
                      className="font-semibold text-[#0e0f0f] underline underline-offset-4 hover:text-[#705a45]"
                    >
                      Create Account
                    </Link>
                  </div>

                  {/* Trust Information */}
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-xl bg-[#f5f3ee]/70 p-3 text-xs text-[#747878]">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck size={15} className="text-[#705a45]" />
                      256-Bit TLS
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <LockKeyhole size={15} className="text-[#705a45]" />
                      Zero-Knowledge
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Headset size={15} className="text-[#705a45]" />
                      Concierge
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
