function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-accent">
            {eyebrow}
          </p>
        )}

        <h2 className="font-heading text-3xl text-primary md:text-4xl">
          {title}
        </h2>

        {description && (
          <p className="mt-2 text-sm text-secondary">
            {description}
          </p>
        )}
      </div>

      {action}
    </div>
  )
}

export default SectionHeading