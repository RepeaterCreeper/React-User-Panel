import type { User } from '../types';
import { useEffect, useState } from 'react';

export type UserWithRole = User & { role: string };

export const roles = ['admin', 'moderator', 'user'];

// Type for the user object returned by dummyjson.com
interface DummyJsonUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
}

interface UserResponse {
  users: UserWithRole[];
  loading: boolean;
  error: Error | null;
  total: number;
}

export function useRemoteUsers(page: number, pageSize: number): UserResponse {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    const skip = (page - 1) * pageSize;
    fetch(`https://dummyjson.com/users?limit=${pageSize}&skip=${skip}`)
      .then(res => res.json())
      .then(data => {
        const mapped = (data.users || []).map((u: DummyJsonUser) => ({
          id: u.id,
          name: u.firstName + ' ' + u.lastName,
          email: u.email,
          role: u.role || 'user',
        }));

        setUsers(mapped);
        setTotal(data.total || 0);
        setLoading(false);
      })
      .catch(e => {
        setError(e);
        setLoading(false);
      });
  }, [page, pageSize]);

  return { users, loading, error, total };
} 