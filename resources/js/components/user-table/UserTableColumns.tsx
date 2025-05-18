import type { User } from '../../types';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '../ui/badge';
import { UserDetailsDialog } from './UserDetailsDialog';

const columns: ColumnDef<User, unknown>[] = [
  {
    accessorKey: 'name',
    header: 'User',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ cell }) => {
      const role = cell.getValue() as string;
      let variant: 'destructive' | 'info' | 'default' | 'outline' = 'outline';
      switch(role) {
        case 'admin':
          variant = 'destructive';
          break;
        case 'moderator':
          variant = 'info';
          break;
        default:
          variant = 'default';
          break;
      }
      return <Badge variant={variant}>{role}</Badge>;
    },
  },
  {
    id: 'action',
    header: 'Action',
    cell: ({ row }) => <UserDetailsDialog user={row.original} />,
  },
];

export default columns; 