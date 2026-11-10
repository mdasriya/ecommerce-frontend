import { Select as BaseSelect } from '@base-ui/react/select'
import { Check, ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'

export interface SelectOption<T extends string> {
  value: T
  label: string
}

interface SelectProps<T extends string> {
  value: T
  onValueChange: (value: T) => void
  options: SelectOption<T>[]
  /** Accessible name for the control, e.g. "Sort products" */
  ariaLabel: string
  /** Small uppercase prefix shown inside the trigger, e.g. "Sort:" */
  prefix?: string
  /** Optional heading shown at the top of the open menu */
  menuTitle?: string
  className?: string
}

/**
 * Styled dropdown built on Base UI's Select — keyboard navigation, type-ahead,
 * focus management and ARIA come from Base UI; the look matches the store.
 */
function Select<T extends string>({
  value,
  onValueChange,
  options,
  ariaLabel,
  prefix,
  menuTitle,
  className,
}: SelectProps<T>) {
  return (
    <BaseSelect.Root
      items={options}
      value={value}
      onValueChange={(next) => {
        if (next !== null) onValueChange(next as T)
      }}
    >
      <BaseSelect.Trigger
        aria-label={ariaLabel}
        className={cn(
          'group flex h-8 cursor-pointer items-center gap-1.5 rounded-lg bg-soft px-3 text-xs font-medium text-primary outline-none transition-colors',
          'hover:bg-border focus-visible:ring-2 focus-visible:ring-accent/40 data-[popup-open]:bg-border',
          className
        )}
      >
        {prefix && (
          <span className="hidden text-[10px] font-semibold uppercase tracking-wider text-secondary sm:inline">
            {prefix}
          </span>
        )}
        <BaseSelect.Value />
        <BaseSelect.Icon className="flex text-secondary transition-transform duration-200 group-data-[popup-open]:rotate-180">
          <ChevronDown size={14} />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>

      <BaseSelect.Portal>
        <BaseSelect.Positioner
          side="bottom"
          align="end"
          sideOffset={8}
          alignItemWithTrigger={false}
          className="z-50 outline-none"
        >
          <BaseSelect.Popup
            className={cn(
              'min-w-[max(var(--anchor-width),13rem)] origin-[var(--transform-origin)] rounded-xl border border-border bg-surface p-1.5 outline-none',
              'shadow-[0_16px_40px_-12px_rgba(36,36,36,0.22)]',
              'transition-[transform,opacity] duration-150 ease-out',
              'data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
              'data-[ending-style]:scale-95 data-[ending-style]:opacity-0'
            )}
          >
            {menuTitle && (
              <div className="px-3 pb-1.5 pt-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary">
                {menuTitle}
              </div>
            )}

            <BaseSelect.List className="flex flex-col gap-0.5">
              {options.map((option) => (
                <BaseSelect.Item
                  key={option.value}
                  value={option.value}
                  className={cn(
                    'flex cursor-pointer select-none items-center justify-between gap-6 rounded-lg px-3 py-2 text-[13px] text-secondary outline-none transition-colors',
                    'data-[highlighted]:bg-soft data-[highlighted]:text-primary',
                    'data-[selected]:font-semibold data-[selected]:text-primary'
                  )}
                >
                  <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
                  <BaseSelect.ItemIndicator className="flex text-accent">
                    <Check size={15} strokeWidth={2.2} />
                  </BaseSelect.ItemIndicator>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  )
}

export default Select
