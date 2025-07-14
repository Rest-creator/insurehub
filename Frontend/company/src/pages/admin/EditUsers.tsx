
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { UserList } from '@/components/admin/users/UserList';
import { UserSearch } from '@/components/admin/users/UserSearch';
import { AddUserForm } from '@/components/admin/users/AddUserForm';
import { User, UserStatus, UserRole, NewUser } from '@/components/admin/users/types';

const EditUsers = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  // Mock user data - in a real app, this would come from an API
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      status: 'active'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user',
      status: 'active'
    },
    {
      id: '3',
      name: 'Acme Insurance',
      email: 'contact@acme.com',
      role: 'provider',
      status: 'active'
    },
    {
      id: '4',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'user',
      status: 'inactive'
    }
  ]);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddUser = (newUser: NewUser) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newUserWithId: User = {
      id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'active' as UserStatus
    };
    
    setUsers([...users, newUserWithId]);
    setIsAddUserOpen(false);
    
    toast({
      title: "User added",
      description: `${newUser.name} has been added successfully.`
    });
  };
  
  const handleDeleteUser = (id: string) => {
    const userToDelete = users.find(user => user.id === id);
    setUsers(users.filter(user => user.id !== id));
    
    toast({
      title: "User removed",
      description: `${userToDelete?.name} has been removed.`
    });
  };

  const handleChangeStatus = (id: string, newStatus: UserStatus) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: newStatus } : user
    ));
    
    toast({
      title: "Status changed",
      description: `User status has been updated to ${newStatus}.`
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">User Management</h2>
        <p className="text-muted-foreground">
          Manage users, insurance providers, and administrators.
        </p>
      </div>

      <UserSearch 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery}
        onAddUserClick={() => setIsAddUserOpen(true)}
      />

      <UserList 
        users={filteredUsers}
        onDeleteUser={handleDeleteUser}
        onChangeStatus={handleChangeStatus}
      />

      <AddUserForm 
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        onSave={handleAddUser}
      />
    </div>
  );
};

export default EditUsers;
