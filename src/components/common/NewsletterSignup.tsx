import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

interface NewsletterSignupProps {
  eyebrow?: string
  title?: string
  description?: string
}

function NewsletterSignup({
  eyebrow = 'Join the Journal',
  title = 'A Little Inspiration in Your Inbox',
  description = 'Subscribe for early access to curated studio releases, styling notes, and private archive sales.',
}: NewsletterSignupProps) {
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.currentTarget.reset()
    setSubscribed(true)
  }

  return (
    <section className="mx-auto mt-16 max-w-3xl rounded-2xl bg-soft/70 px-6 py-12 text-center md:mt-24 md:px-12">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-heading text-2xl tracking-tight text-primary md:text-3xl">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-secondary">
        {description}
      </p>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
      >
        <label htmlFor="newsletter-signup-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-signup-email"
          type="email"
          required
          autoComplete="email"
          placeholder="Enter your email address"
          className="h-11 w-full min-w-0 rounded-lg border border-border bg-surface px-4 text-sm text-primary placeholder:text-secondary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 sm:flex-1"
        />
        <button
          type="submit"
          className="h-11 shrink-0 rounded-lg bg-primary px-6 text-xs font-semibold uppercase tracking-[0.15em] text-primary-foreground transition-colors hover:bg-primary/85"
        >
          Subscribe
        </button>
      </form>

      <p role="status" className="mt-4 text-[11px] text-secondary">
        {subscribed ? (
          'Thank you for subscribing!'
        ) : (
          <>
            By signing up, you agree to our{' '}
            <Link to="/privacy" className="underline hover:text-primary">
              Privacy Policy
            </Link>
            . You may unsubscribe anytime.
          </>
        )}
      </p>
    </section>
  )
}

export default NewsletterSignup
