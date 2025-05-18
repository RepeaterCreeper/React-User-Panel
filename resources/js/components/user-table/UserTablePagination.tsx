import { Button } from '@/components/ui/button';

interface UserTablePaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

function getVisiblePages(current: number, total: number, max = 5) {
  const half = Math.floor(max / 2);
  let start = Math.max(0, current - half);
  let end = Math.min(total - 1, current + half);
  if (end - start < max - 1) {
    if (start === 0) end = Math.min(total - 1, start + max - 1);
    else if (end === total - 1) start = Math.max(0, end - max + 1);
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function UserTablePagination({
  pageCount,
  currentPage,
  onPageChange,
  canPreviousPage,
  canNextPage,
  onPreviousPage,
  onNextPage,
}: UserTablePaginationProps) {
  const visiblePages = getVisiblePages(currentPage, pageCount, 5);
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={onPreviousPage}
        disabled={!canPreviousPage}
      >
        Previous
      </Button>
      {visiblePages.map(page => (
        <Button
          key={page}
          variant={page === currentPage ? 'default' : 'outline'}
          size="sm"
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page + 1}
        </Button>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={onNextPage}
        disabled={!canNextPage}
      >
        Next
      </Button>
    </div>
  );
} 