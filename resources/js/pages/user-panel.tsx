import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Head } from '@inertiajs/react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { useState, useEffect, useMemo } from 'react';
import { columns } from '@/components/user-table-columns';
import { roles, useRemoteUsers, UserWithRole } from '@/utils/mock-users';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  PaginationState,
  flexRender,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

const PAGE_SIZE_OPTIONS = [5, 10, 20, 30, 50];

export default function UserPanel() {
  const [role, setRole] = useState<string>('all');
  const [data, setData] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // Fetch all users once for client-side pagination
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://dummyjson.com/users?limit=1000&skip=0`)
      .then(res => res.json())
      .then(data => {
        const users: UserWithRole[] = (data.users || []).map((u: {
          id: number;
          firstName: string;
          lastName: string;
          email: string;
          role?: string;
          age?: number;
          gender?: string;
          birthDate?: string;
        }) => ({
          id: u.id,
          name: u.firstName + ' ' + u.lastName,
          email: u.email,
          role: u.role || 'user',
          age: u.age,
          gender: u.gender,
          birthDate: u.birthDate,
        }));
        setData(users);
        setLoading(false);
      })
      .catch(e => {
        setError(e);
        setLoading(false);
      });
  }, []);

  // Filter by role (client-side)
  const filteredData = useMemo(() => {
    return role === 'all' ? data : data.filter((user: UserWithRole) => user.role === role);
  }, [role, data]);

  const table = useReactTable({
    data: filteredData,
    columns: columns as ColumnDef<UserWithRole, unknown>[],
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Calculate current page offset for display
  const start = filteredData.length === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1;
  const end = Math.min(filteredData.length, (pagination.pageIndex * pagination.pageSize) + table.getRowModel().rows.length);
  const pageCount = Math.ceil(filteredData.length / pagination.pageSize);
  const currentPage = pagination.pageIndex;

  // Helper to get visible page numbers (at least 5)
  function getVisiblePages(current: number, total: number, max = 5) {
    const half = Math.floor(max / 2);
    let start = Math.max(0, current - half);
    let end = Math.min(total - 1, current + half);
    if (end - start < max - 1) {
      if (start === 0) {
        end = Math.min(total - 1, start + max - 1);
      }
      else if (end === total - 1) {
        start = Math.max(0, end - max + 1);
      }
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
  const visiblePages = getVisiblePages(currentPage, pageCount, 5);

  return (
    <>
      <Head title="User Panel">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
      </Head>
      <div className="flex min-h-screen flex-col items-center p-6 text-white lg:justify-center lg:p-8">
        <div className="mb-4 flex w-full justify-between">
          <div>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {roles.map((r: string) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={String(pagination.pageSize)} onValueChange={v => setPagination(p => ({ ...p, pageSize: Number(v), pageIndex: 0 }))}>
              <SelectTrigger>
                <SelectValue placeholder="Rows per page" />
              </SelectTrigger>
              <SelectContent>
                {PAGE_SIZE_OPTIONS.map(size => (
                  <SelectItem key={size} value={String(size)}>{size} per page</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center py-12 w-full">
            <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
          </div>
        ) : error ? (
          <div className="py-8 text-red-500">Failed to load users.</div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  {table.getHeaderGroups().map(headerGroup =>
                    headerGroup.headers.map(header => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map(row => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="text-sm text-muted-foreground py-2 text-right w-full">
              {`Showing results ${start}-${end} of ${filteredData.length}`}
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              {visiblePages.map(page => (
                <Button
                  key={page}
                  variant={page === currentPage ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => table.setPageIndex(page)}
                  aria-current={page === currentPage ? 'page' : undefined}
                >
                  {page + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
