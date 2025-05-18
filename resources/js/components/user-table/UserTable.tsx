import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Loader } from 'lucide-react';
import { flexRender } from '@tanstack/react-table';

interface UserTableProps {
  table: any;
  loading: boolean;
  start: number;
  end: number;
  total: number;
}

export function UserTable({ table, loading, start, end, total }: UserTableProps) {
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center py-12 w-full">
          <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
        </div>
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
            {`Showing results ${start}-${end} of ${total}`}
          </div>
        </>
      )}
    </>
  );
} 