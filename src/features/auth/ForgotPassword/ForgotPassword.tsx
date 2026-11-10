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

type Scenario = 'default' | 'sending' | 'success' | 'error'

type FormData = {
  email: string
}

const initialForm: FormData = {
  email: '',
}

const scenarios: { id: Scenario; label: string }[] = [
  { id: 'default', label: '1. Default' },
  { id: 'sending', label: '2. Sending' },
  { id: 'success', label: '3. Success' },
  { id: 'error', label: '4. Error' },
]

const demoForm: FormData = {
  email: 'eleanor.vance@atelier-archive.com',
}

export default function ForgotPassword() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [scenario, setScenario] = useState<Scenario>('default')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = (field: keyof FormData, value: string) => {
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

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setScenario('sending')

    // Demo only. Replace with your password reset API.
    window.setTimeout(() => {
      setIsSubmitting(false)
      setScenario('success')
    }, 950)
  }

  const setDemoScenario = (nextScenario: Scenario) => {
    setScenario(nextScenario)
    setErrors({})
    setIsSubmitting(false)

    if (nextScenario === 'default') {
      setForm({ email: demoForm.email })
      return
    }

    if (nextScenario === 'sending') {
      setForm(demoForm)
      return
    }

    if (nextScenario === 'success') {
      setForm(demoForm)
      return
    }

    if (nextScenario === 'error') {
      setForm({ email: 'eleanor.vance@invalid-format' })
      setErrors({ email: 'Please enter a valid email address.' })
      return
    }
  }

  const isSuccess = scenario === 'success'

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

          {/* Main Card - Centered */}
          <div className="relative mx-auto w-full max-w-[460px] bg-white rounded-xl shadow-xl overflow-hidden p-6 sm:p-10">

            {/* Ambient Aura */}
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[#e4e2dd]/40 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-[#f5f3ee]/40 blur-2xl pointer-events-none" />

            {/* Default / Form State */}
            {!isSuccess ? (
              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Icon Badge */}
                <div className="w-14 h-14 rounded-full bg-[#f5f3ee] flex items-center justify-center mb-4 shadow-sm">
                  <Lock size={24} className="text-[#705a45]" />
                </div>

                <span className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#705a45]">
                  Account Recovery
                </span>
                <h1 className="mb-2 font-['Playfair_Display'] text-3xl tracking-tight">
                  Forgot Your Password?
                </h1>
                <p className="mb-6 max-w-sm text-sm leading-7 text-[#444748]">
                  Don't worry. Enter the email address associated with your account
                  and we will dispatch a secure reset link.
                </p>

                {/* Error Banner */}
                {scenario === 'error' && (
                  <div className="w-full mb-4 flex items-start gap-3 rounded-xl bg-[#ffdad6] p-4 text-[#93000a]">
                    <CircleAlert size={20} className="mt-0.5 shrink-0" />
                    <div className="text-sm">
                      <p className="font-semibold">Invalid email address</p>
                      <p className="mt-1 leading-6">
                        Please enter a valid email address to continue.
                      </p>
                    </div>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} noValidate className="w-full space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-semibold"
                    >
                      Email Address <span className="text-[#747878]">*</span>
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

                  {/* Submit */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#0e0f0f] text-sm font-semibold text-white shadow-md transition hover:bg-[#383838] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          Transmitting Link...
                          <LoaderCircle size={19} className="animate-spin" />
                        </>
                      ) : (
                        <>
                          Send Reset Link
                          <ArrowRight size={17} />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Return Link */}
                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm text-[#444748]">
                    <ArrowLeft size={14} className="text-[#705a45]" />
                    <Link
                      to="/login"
                      className="font-semibold text-[#0e0f0f] underline underline-offset-4 hover:text-[#705a45]"
                    >
                      Return to Sign In
                    </Link>
                  </div>
                </form>

                {/* Trust Information */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-xl bg-[#f5f3ee]/70 p-3 text-xs text-[#747878]">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck size={15} className="text-[#705a45]" />
                    256-Bit TLS
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Lock size={15} className="text-[#705a45]" />
                    Zero-Knowledge Recovery
                  </span>
                </div>
              </div>
            ) : (
              /* Success State */
              <div className="flex flex-col items-center justify-center py-12 text-center">
                {/* Confirmation Icon Badge */}
                <div className="relative w-16 h-16 rounded-full bg-[#e4e2dd]/40 flex items-center justify-center mb-4 shadow-sm">
                  <Mail size={28} className="text-[#705a45]" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#0e0f0f] flex items-center justify-center shadow-sm">
                    <CheckCircle2 size={14} className="text-white" />
                  </div>
                </div>

                <span className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#705a45]">
                  Transmission Dispatched
                </span>
                <h2 className="mb-2 font-['Playfair_Display'] text-3xl">
                  Check Your Email
                </h2>
                <p className="mb-4 max-w-sm text-sm leading-7 text-[#444748]">
                  If an account corresponds to the email provided, an encrypted
                  recovery link has been dispatched with further steps.
                </p>

                {/* Masked Email Card */}
                <div className="w-full bg-[#f5f3ee] rounded-xl p-4 mb-4 shadow-sm flex flex-col items-center justify-center gap-1.5">
                  <div className="flex items-center gap-1.5 text-[#747878] text-xs uppercase tracking-wider font-semibold">
                    <CheckCircle2 size={14} className="text-[#705a45]" />
                    Instructions Dispatched To
                  </div>
                  <div className="font-['Playfair_Display'] text-xl text-[#1b1c19] font-medium tracking-tight break-all">
                    {maskEmail(form.email)}
                  </div>
                  <span className="text-[#747878] text-xs">Link active for 30 minutes</span>
                </div>

                {/* Resend */}
                <div className="w-full mb-4 text-center">
                  <p className="font-body-md text-body-md text-[#444748] mb-1">
                    Didn't receive the email? Check your spam filter or
                  </p>
                  <button
                    type="button"
                    className="text-sm text-[#705a45] underline underline-offset-2 hover:text-[#383838]"
                  >
                    Resend Email
                  </button>
                </div>

                <div className="flex w-full max-w-sm flex-col gap-3 sm:flex-row">
                  <Link
                    to="/login"
                    className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-[#0e0f0f] text-sm font-semibold text-white transition hover:bg-[#383838]"
                  >
                    <Lock size={17} />
                    Return to Sign In
                  </Link>

                  <button
                    type="button"
                    onClick={() => setDemoScenario('default')}
                    className="h-12 flex-1 rounded-lg bg-[#f0eee9] text-sm font-semibold hover:bg-[#e4e2dd]"
                  >
                    Use Another Email
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

function maskEmail(email: string): string {
  if (!email || !email.includes('@')) {
    return 'el•••••••••@atelier-archive.com'
  }
  const [user, domain] = email.split('@')
  if (!user || user.length <= 2) {
    return `${user?.charAt(0) || 'e'}•••••@${domain || 'atelier-archive.com'}`
  }
  const visiblePrefix = user.slice(0, 2)
  return `${visiblePrefix}${'•'.repeat(Math.min(user.length - 2, 7))}@${domain}`
}
