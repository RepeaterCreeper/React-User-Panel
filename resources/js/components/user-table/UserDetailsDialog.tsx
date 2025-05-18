import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { UserWithRole } from '@/data/mock-users';
import React from 'react';

interface UserDetailsDialogProps {
  user: UserWithRole;
}

export function UserDetailsDialog({ user }: UserDetailsDialogProps) {
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
              {user.age !== undefined ? <div><strong>Age:</strong> {user.age}</div> : undefined}
              {user.gender ? <div><strong>Gender:</strong> {user.gender}</div> : undefined}
              {formattedBirthDate ? <div><strong>Birthdate:</strong> {formattedBirthDate}</div> : undefined}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
} 