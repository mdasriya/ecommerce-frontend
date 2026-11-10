import { Fragment } from 'react'
import { Link } from 'react-router-dom'

interface CategoryBreadcrumbProps {
  categoryName?: string
}

function CategoryBreadcrumb({ categoryName }: CategoryBreadcrumbProps) {
  const items = [
    { label: 'Home', to: '/' },
    { label: 'Categories', to: '/categories' },
    { label: categoryName ?? 'All Products' },
  ]

  return (
    <nav aria-label="Breadcrumb" className="pb-2 pt-5 md:pt-6">
      <ol className="flex flex-wrap items-center gap-2 text-xs text-secondary">
        {items.map((item, index) => (
          <Fragment key={item.label}>
            {index > 0 && (
              <li aria-hidden="true" className="opacity-40">
                /
              </li>
            )}
            <li>
              {item.to ? (
                <Link to={item.to} className="transition-colors hover:text-primary">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-semibold text-primary">
                  {item.label}
                </span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  )
}

export default CategoryBreadcrumb
