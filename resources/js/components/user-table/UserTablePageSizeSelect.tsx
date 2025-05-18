import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

interface UserTablePageSizeSelectProps {
  value: number;
  onChange: (value: number) => void;
  options: number[];
}

export function UserTablePageSizeSelect({ value, onChange, options }: UserTablePageSizeSelectProps) {
  return (
    <Select value={String(value)} onValueChange={v => onChange(Number(v))}>
      <SelectTrigger>
        <SelectValue placeholder="Rows per page" />
      </SelectTrigger>
      <SelectContent>
        {options.map(size => (
          <SelectItem key={size} value={String(size)}>{size} per page</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
} 