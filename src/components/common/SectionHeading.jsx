import { cn } from '@/lib/utils'

function SectionHeading({ eyebrow, title, description, action, className }) {
  return (
    <div
      className={cn(
        'mb-5 flex items-end justify-between gap-4 md:mb-8',
        className
      )}
    >
      <div className="min-w-0">
        {eyebrow && (
          <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
            {eyebrow}
          </p>
        )}

        <h2 className="font-heading text-2xl leading-tight tracking-tight text-primary md:text-4xl">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-secondary md:mt-2">{description}</p>
        )}
      </div>

      {action}
    </div>
  )
}

export default SectionHeading
