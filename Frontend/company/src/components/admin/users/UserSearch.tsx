
import { Search, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface UserSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddUserClick: () => void;
}

export const UserSearch = ({ searchQuery, onSearchChange, onAddUserClick }: UserSearchProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="relative w-64">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search users..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button onClick={onAddUserClick} className="bg-insurance-orange hover:bg-insurance-orange-dark">
        <UserPlus className="mr-2 h-4 w-4" />
        Add User
      </Button>
    </div>
  );
};
