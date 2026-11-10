import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/Button'

function EmptyState({
  title = 'Nothing here yet',
  description = 'Explore our collection and find something you love.',
  actionLabel = 'Explore Products',
  actionLink = '/products',
}) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center px-4 text-center">
      <div className="mb-5 rounded-full bg-soft p-5">
        <ShoppingBag size={30} className="text-accent" />
      </div>

      <h2 className="font-heading text-2xl text-primary">
        {title}
      </h2>

      <p className="mt-2 max-w-sm text-sm text-secondary">
        {description}
      </p>

      <Button className="rounded-full">
        <Link to={actionLink}>{actionLabel}</Link>
      </Button>
    </div>
  )
}

export default EmptyState