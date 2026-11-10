import { Link } from 'react-router-dom'

interface ConsultationBannerProps {
  title?: string
  description?: string
  buttonText?: string
  buttonLink?: string
}

function ConsultationBanner({
  title = 'Looking for something personal?',
  description = 'Our stylists are available for 1-on-1 personalised curation consultations.',
  buttonText = 'Book Virtual Consultation',
  buttonLink = '/contact',
}: ConsultationBannerProps) {
  return (
    <section className="mt-16 flex flex-col items-center justify-between gap-6 rounded-2xl bg-soft/70 p-6 md:mt-20 md:flex-row md:p-8">
      <div className="space-y-1 text-center md:text-left">
        <h3 className="font-heading text-xl text-primary md:text-[22px]">{title}</h3>
        <p className="text-sm text-secondary">{description}</p>
      </div>

      <Link
        to={buttonLink}
        className="shrink-0 whitespace-nowrap rounded-lg bg-surface px-6 py-2.5 text-xs font-semibold text-primary shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        {buttonText}
      </Link>
    </section>
  )
}

export default ConsultationBanner
