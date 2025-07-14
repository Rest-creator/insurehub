
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { UserRole } from './types';
import { useState } from 'react';

interface NewUser {
  name: string;
  email: string;
  role: UserRole;
  password: string;
}

interface AddUserFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: NewUser) => void;
}

export const AddUserForm = ({ isOpen, onClose, onSave }: AddUserFormProps) => {
  const [newUser, setNewUser] = useState<NewUser>({
    name: '',
    email: '',
    role: 'user' as UserRole,
    password: ''
  });

  const handleSubmit = () => {
    onSave(newUser);
    setNewUser({
      name: '',
      email: '',
      role: 'user' as UserRole,
      password: ''
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Name
            </label>
            <Input
              id="name"
              value={newUser.name}
              onChange={(e) => setNewUser({...newUser, name: e.target.value})}
              className="col-span-3"
              placeholder="Full Name"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="email" className="text-right">
              Email
            </label>
            <Input
              id="email"
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              className="col-span-3"
              type="email"
              placeholder="email@example.com"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="password" className="text-right">
              Password
            </label>
            <Input
              id="password"
              value={newUser.password}
              onChange={(e) => setNewUser({...newUser, password: e.target.value})}
              className="col-span-3"
              type="password"
              placeholder="••••••••"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="role" className="text-right">
              Role
            </label>
            <select
              id="role"
              value={newUser.role}
              onChange={(e) => setNewUser({...newUser, role: e.target.value as UserRole})}
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="user">User</option>
              <option value="provider">Insurance Provider</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save User</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
