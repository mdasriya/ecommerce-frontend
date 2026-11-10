interface ProductPaginationProps {
  visibleCount: number
  totalCount: number
  onLoadMore: () => void
}

function ProductPagination({
  visibleCount,
  totalCount,
  onLoadMore,
}: ProductPaginationProps) {
  if (totalCount === 0) return null

  const hasMore = visibleCount < totalCount
  const progress = Math.min((visibleCount / totalCount) * 100, 100)

  return (
    <div className="mx-auto mt-12 flex max-w-sm flex-col items-center text-center md:mt-16">
      <p className="mb-2.5 text-xs text-secondary">
        You've viewed{' '}
        <span className="font-semibold text-primary">{visibleCount}</span> of{' '}
        <span className="font-semibold text-primary">{totalCount}</span> pieces
      </p>

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={totalCount}
        aria-valuenow={visibleCount}
        aria-label="Products viewed"
        className="mb-6 h-1 w-full overflow-hidden rounded-full bg-border"
      >
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {hasMore && (
        <button
          type="button"
          onClick={onLoadMore}
          className="w-full rounded-lg bg-soft px-8 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:w-auto"
        >
          Load More Products
        </button>
      )}
    </div>
  )
}

export default ProductPagination
