import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

interface UserTableFilterProps {
  value: string;
  onChange: (value: string) => void;
  roles: string[];
}

export function UserTableFilter({ value, onChange, roles }: UserTableFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Filter by role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Roles</SelectItem>
        {roles.map((r) => (
          <SelectItem key={r} value={r}>{r}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
} 