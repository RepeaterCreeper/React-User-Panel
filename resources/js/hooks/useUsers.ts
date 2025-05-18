import { useState, useEffect, useMemo } from 'react';
import { UserWithRole } from '@/data/mock-users';

export function useUsers() {
  const [role, setRole] = useState<string>('all');
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://dummyjson.com/users?limit=1000&skip=0`)
      .then(res => res.json())
      .then(data => {
        const users: UserWithRole[] = (data.users || []).map((u: UserWithRole) => ({
          id: u.id,
          name: u.firstName + ' ' + u.lastName,
          email: u.email,
          role: u.role || 'user',
          age: u.age,
          gender: u.gender,
          birthDate: u.birthDate,
        }));
        setUsers(users);
        setLoading(false);
      })
      .catch(e => {
        setError(e);
        setLoading(false);
      });
  }, []);

  const filteredUsers = useMemo(() => {
    return role === 'all' ? users : users.filter((user: UserWithRole) => user.role === role);
  }, [role, users]);

  return { users, filteredUsers, loading, error, setRole, role };
} 