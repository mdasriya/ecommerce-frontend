import { Link } from 'react-router-dom'
import { ChevronDown, Globe, Mail, Share2 } from 'lucide-react'
import { SITE_FOUNDED, SITE_NAME } from '@/lib/site'

const footerSections = [
  {
    title: 'Shop',
    links: [
      { label: 'Shop All', to: '/products' },
      { label: 'Earrings', to: '/categories/earrings' },
      { label: 'Frames', to: '/categories/frames' },
    ],
  },
  {
    title: 'Customer Support',
    links: [
      { label: 'Contact Us', to: '/contact' },
      { label: 'FAQs', to: '/faqs' },
      { label: 'Shipping Information', to: '/shipping' },
      { label: 'Returns and Refunds', to: '/returns' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms and Conditions', to: '/terms' },
    ],
  },
]

const socials = [
  { label: 'Share', icon: Share2, href: '#' },
  { label: 'Website', icon: Globe, href: '#' },
  { label: 'Email', icon: Mail, href: '#' },
]

function SocialLinks() {
  return (
    <div className="flex items-center gap-2">
      {socials.map(({ label, icon: Icon, href }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className="flex size-9 items-center justify-center rounded-full bg-soft text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <Icon size={16} strokeWidth={1.8} />
        </a>
      ))}
    </div>
  )
}

type FooterLink = { label: string; to: string }

function LinkList({ links }: { links: FooterLink[] }) {
  return (
    <ul className="flex flex-col gap-3 md:gap-2.5">
      {links.map(({ label, to }) => (
        <li key={to}>
          <Link
            to={to}
            className="text-sm text-secondary transition-colors hover:text-primary"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface">
      {/* extra bottom padding on mobile keeps content clear of the bottom nav */}
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-10 md:px-8 md:py-16">
        <div className="md:grid md:grid-cols-5 md:gap-8">
          <div className="md:col-span-2 md:pr-8">
            <Link
              to="/"
              className="font-heading text-2xl font-semibold tracking-[0.12em] text-primary"
            >
              {SITE_NAME}
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-secondary">
              Understated, high-end lifestyle goods. Crafted with restraint,
              built for daily longevity.
            </p>
            <div className="mt-6 hidden md:block">
              <SocialLinks />
            </div>
          </div>

          {/* Mobile: collapsible sections */}
          <div className="mt-8 divide-y divide-border border-y border-border md:hidden">
            {footerSections.map(({ title, links }) => (
              <details key={title} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-medium text-primary [&::-webkit-details-marker]:hidden">
                  {title}
                  <ChevronDown
                    size={16}
                    className="text-secondary transition-transform group-open:rotate-180"
                  />
                </summary>
                <div className="pb-4">
                  <LinkList links={links} />
                </div>
              </details>
            ))}
          </div>

          {/* Desktop: columns */}
          {footerSections.map(({ title, links }) => (
            <div key={title} className="hidden md:block">
              <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                {title}
              </h4>
              <LinkList links={links} />
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between md:hidden">
          <SocialLinks />
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-secondary">
            Est. {SITE_FOUNDED}
          </span>
        </div>

        <div className="mt-6 flex flex-col gap-1 border-t border-border pt-6 text-[11px] text-secondary sm:flex-row sm:justify-between md:mt-12">
          <p>
            © {year} {SITE_NAME} Studio. All rights reserved.
          </p>
          <p>Handcrafted &amp; curated with care.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
