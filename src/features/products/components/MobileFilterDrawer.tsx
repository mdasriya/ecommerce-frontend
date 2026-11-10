import { useEffect, type ComponentProps } from 'react'
import { X } from 'lucide-react'

import ProductFilterSidebar from './ProductFilterSidebar'

type SidebarProps = ComponentProps<typeof ProductFilterSidebar>

interface MobileFilterDrawerProps extends Omit<SidebarProps, 'showHeading'> {
  isOpen: boolean
  onClose: () => void
  resultCount: number
}

function MobileFilterDrawer({
  isOpen,
  onClose,
  resultCount,
  ...sidebarProps
}: MobileFilterDrawerProps) {
  // Close with Escape and lock background scrolling while open.
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className="absolute inset-0 bg-primary/40 backdrop-blur-[2px] animate-in fade-in"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-filter-title"
        className="absolute inset-y-0 right-0 flex w-full max-w-xs flex-col bg-background shadow-2xl animate-in slide-in-from-right duration-300"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 id="mobile-filter-title" className="text-lg font-semibold text-primary">
            Filters
          </h2>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={sidebarProps.onReset}
              className="text-[11px] font-semibold uppercase tracking-wider text-accent hover:underline"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close filters"
              className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-soft"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <ProductFilterSidebar {...sidebarProps} showHeading={false} />
        </div>

        <div className="border-t border-border p-5">
          <button
            type="button"
            onClick={onClose}
            className="h-12 w-full rounded-lg bg-primary text-xs font-semibold uppercase tracking-[0.15em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            Show {resultCount} {resultCount === 1 ? 'piece' : 'pieces'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default MobileFilterDrawer
