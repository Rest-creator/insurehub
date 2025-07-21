// src/pages/admin/ManageUsers.jsx
import { useState } from 'react';
import { Helmet } from 'react-helmet-async'; // Assuming you want Helmet here too
import Container from '../../components/ui/Container'; // Assuming consistent container
import FadeIn from '../../components/animations/FadeIn'; // Assuming consistent animation
import { useToast } from '../../hooks/use-toast'; // Ensure this path is correct
import { User as UserType } from '../../components/admin/users/types'; // Import the new User type
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '../../components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Search, Filter, Trash2, UserPlus, Mail, Phone, CalendarDays, KeyRound, CheckCircle, XCircle } from 'lucide-react'; // Updated icons for users
import { Input } from '../../components/ui/input';

const ManageUsers = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string | null>(null); // Filter by user role
  const [statusFilter, setStatusFilter] = useState<string | null>(null); // Filter by user status

  const [users, setUsers] = useState<UserType[]>([
    {
      id: 'usr-001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'client',
      status: 'active',
      joinedDate: '2024-01-05',
      lastLogin: '2025-07-17',
    },
    {
      id: 'usr-002',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'agent',
      status: 'active',
      joinedDate: '2024-02-10',
      lastLogin: '2025-07-16',
    },
    {
      id: 'usr-003',
      name: 'Admin User',
      email: 'admin@insurehub.com',
      role: 'admin',
      status: 'active',
      joinedDate: '2023-11-20',
      lastLogin: '2025-07-18',
    },
    {
      id: 'usr-004',
      name: 'Bob Johnson',
      email: 'bob.j@example.com',
      role: 'client',
      status: 'inactive', // Example inactive user
      joinedDate: '2024-03-01',
      lastLogin: '2024-06-01',
    },
    {
      id: 'usr-005',
      name: 'Alice Williams',
      email: 'alice.w@example.com',
      role: 'client',
      status: 'pending', // Example pending user (e.g., awaiting email verification)
      joinedDate: '2025-07-10',
      lastLogin: '', // No login yet
    },
  ]);

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = !roleFilter || user.role === roleFilter;
    const matchesStatus = !statusFilter || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleRoleChange = (userId: string, newRole: 'client' | 'agent' | 'admin') => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, role: newRole } : user
    ));

    toast({
      title: "User Role Updated",
      description: `User ${userId} role has been updated to ${newRole}.`,
      variant: "success",
    });
  };

  const handleStatusToggle = (userId: string, currentStatus: 'active' | 'inactive' | 'pending') => {
    let newStatus: 'active' | 'inactive' | 'pending';
    if (currentStatus === 'active') {
      newStatus = 'inactive';
    } else {
      newStatus = 'active'; // Inactive or pending goes to active
    }

    setUsers(users.map(user =>
      user.id === userId ? { ...user, status: newStatus } : user
    ));

    toast({
      title: "User Status Updated",
      description: `User ${userId} is now ${newStatus}.`,
      variant: "success",
    });
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));

    toast({
      title: "User Deleted",
      description: `User ${userId} has been deleted.`,
      variant: "destructive", // Use a destructive variant for deletion
    });
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return "bg-green-500 text-white";
      case 'inactive': return "bg-red-500 text-white";
      case 'pending': return "bg-yellow-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return "bg-purple-600 text-white";
      case 'agent': return "bg-blue-500 text-white";
      case 'client': return "bg-gray-700 text-white";
      default: return "bg-gray-400 text-white";
    }
  };

  return (
    <>
      <Helmet>
        <title>Manage System Users - InsureHub Admin</title>
        <meta
          name="description"
          content="Manage system users, their roles, and statuses on the InsureHub platform."
        />
      </Helmet>

      <div className="pt-4 pb-8 md:pt-6 md:pb-12">
        <Container>
          <FadeIn direction="up">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="heading-2 text-insurance-neutral-dark mb-2">
                  Manage System Users
                </h1>
                <p className="text-gray-600">
                  Oversee all users registered on InsureHub, manage their roles and access.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button className="btn-primary flex items-center">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add New User
                </Button>
              </div>
            </div>
          </FadeIn>
        </Container>
      </div>

      <section className="py-8">
        <Container>
          <FadeIn direction="up" delay={200}>
            <div className="glass-card rounded-xl p-6">
              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users by name, email, or ID..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Select
                    value={roleFilter || "all"}
                    onValueChange={(value) => setRoleFilter(value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full sm:w-48">
                      <div className="flex items-center">
                        <Filter className="mr-2 h-4 w-4" />
                        <span>{roleFilter ? `${roleFilter.charAt(0).toUpperCase() + roleFilter.slice(1)} Role` : "Filter by Role"}</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="agent">Agent</SelectItem>
                      <SelectItem value="client">Client</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={statusFilter || "all"}
                    onValueChange={(value) => setStatusFilter(value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-full sm:w-48">
                      <div className="flex items-center">
                        <Filter className="mr-2 h-4 w-4" />
                        <span>{statusFilter ? `${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)} Status` : "Filter by Status"}</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border rounded-md overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map(user => (
                        <TableRow key={user.id}>
                          <TableCell className="font-mono text-xs">{user.id}</TableCell>
                          <TableCell className="font-medium text-insurance-neutral-dark">{user.name}</TableCell>
                          <TableCell className="text-sm text-gray-600">{user.email}</TableCell>
                          <TableCell>
                            <Badge className={getRoleBadgeColor(user.role)}>
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusBadgeColor(user.status)}>
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-gray-500">{user.joinedDate}</TableCell>
                          <TableCell className="text-sm text-gray-500">{user.lastLogin || 'N/A'}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2 items-center">
                              {/* Role Change Select */}
                              <Select
                                defaultValue={user.role}
                                onValueChange={(value) => handleRoleChange(
                                  user.id,
                                  value as 'client' | 'agent' | 'admin'
                                )}
                              >
                                <SelectTrigger className="h-8 w-28">
                                  <SelectValue placeholder="Change Role" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="client">Client</SelectItem>
                                  <SelectItem value="agent">Agent</SelectItem>
                                  <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                              </Select>

                              {/* Status Toggle Button */}
                              <Button
                                variant={user.status === 'active' ? "outline" : "secondary"}
                                size="icon"
                                onClick={() => handleStatusToggle(user.id, user.status)}
                                title={user.status === 'active' ? 'Deactivate User' : 'Activate User'}
                                className={user.status === 'active' ? "text-red-500 border-red-500 hover:bg-red-50" : "text-green-500 border-green-500 hover:bg-green-50"}
                              >
                                {user.status === 'active' ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                              </Button>

                              {/* Delete Button */}
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => handleDeleteUser(user.id)}
                                title="Delete User"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                          No users found matching your search criteria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
};

export default ManageUsers;