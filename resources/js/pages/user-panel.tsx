import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { useUsers } from '@/hooks/useUsers';
import columns from '@/components/user-table/UserTableColumns';
import { useReactTable, getCoreRowModel, getPaginationRowModel, PaginationState } from '@tanstack/react-table';
import { UserTable } from '@/components/user-table/UserTable';
import { UserTableFilter } from '@/components/user-table/UserTableFilter';
import { UserTablePagination } from '@/components/user-table/UserTablePagination';
import { UserTablePageSizeSelect } from '@/components/user-table/UserTablePageSizeSelect';
import { roles } from '@/utils/mock-users';

const PAGE_SIZE_OPTIONS = [5, 10, 20, 30, 50];

export default function UserPanel() {
  const { filteredUsers, loading, error, setRole, role } = useUsers();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: filteredUsers,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const start = filteredUsers.length === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1;
  const end = Math.min(filteredUsers.length, (pagination.pageIndex * pagination.pageSize) + table.getRowModel().rows.length);
  const pageCount = Math.ceil(filteredUsers.length / pagination.pageSize);
  const currentPage = pagination.pageIndex;

  return (
    <>
      <Head title="User Panel">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
      </Head>
      <div className="flex min-h-screen flex-col items-center p-6 text-white lg:justify-center lg:p-8">
        <div className="flex justify-between w-full">
          <div className="mb-4 w-full max-w-xs flex">
            <UserTableFilter value={role} onChange={setRole} roles={roles} />
          </div>
          <div className="mb-4 w-full max-w-xs">
            <UserTablePageSizeSelect
              value={pagination.pageSize}
              onChange={(size: number) => setPagination(p => ({ ...p, pageSize: size, pageIndex: 0 }))}
              options={PAGE_SIZE_OPTIONS}
            />
          </div>
        </div>
        {error ? (
          <div className="py-8 text-red-500">Failed to load users.</div>
        ) : (
          <>
            <UserTable table={table} loading={loading} start={start} end={end} total={filteredUsers.length} />
            <UserTablePagination
              pageCount={pageCount}
              currentPage={currentPage}
              onPageChange={page => setPagination(p => ({ ...p, pageIndex: page }))}
              canPreviousPage={table.getCanPreviousPage()}
              canNextPage={table.getCanNextPage()}
              onPreviousPage={() => table.previousPage()}
              onNextPage={() => table.nextPage()}
            />
          </>
        )}
      </div>
    </>
  );
}
