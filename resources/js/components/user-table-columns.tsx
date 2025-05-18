import type { User } from '../types';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from './ui/badge';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';

export const columns: ColumnDef<User, unknown>[] = [
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
    cell: ({ row }) => {
      const user = row.original;
      let formattedBirthDate: string | undefined = undefined;
      if (typeof user.birthDate === 'string' && user.birthDate) {
        const date = new Date(user.birthDate);
        if (!isNaN(date.getTime())) {
          formattedBirthDate = date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
        }
      }
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">View</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>
                <div className="space-y-2 mt-4">
                  <div><strong>Name:</strong> {user.name}</div>
                  <div><strong>Email:</strong> {user.email}</div>
                  <div><strong>Role:</strong> {user.role}</div>
                  <div><strong>Age:</strong> {user.age}</div>
                  <div><strong>Gender:</strong> {user.gender}</div>
                  <div><strong>Birthdate:</strong> {formattedBirthDate}</div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    },
  },
]; 