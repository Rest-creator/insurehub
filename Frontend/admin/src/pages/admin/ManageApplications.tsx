import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { InsuranceApplication } from '@/components/admin/users/types';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Filter, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

const ManageApplications = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  const [applications, setApplications] = useState<InsuranceApplication[]>([
    {
      id: 'app-001',
      userId: '1',
      userName: 'John Doe',
      applicationType: 'Auto Insurance',
      status: 'pending',
      dateSubmitted: '2025-03-18',
      coverage: 50000
    },
    {
      id: 'app-002',
      userId: '2',
      userName: 'Jane Smith',
      applicationType: 'Home Insurance',
      status: 'approved',
      dateSubmitted: '2025-03-12',
      coverage: 250000
    },
    {
      id: 'app-003',
      userId: '3',
      userName: 'Acme Inc',
      applicationType: 'Business Insurance',
      status: 'in-review',
      dateSubmitted: '2025-03-08',
      coverage: 1000000
    },
    {
      id: 'app-004',
      userId: '4',
      userName: 'Bob Johnson',
      applicationType: 'Life Insurance',
      status: 'rejected',
      dateSubmitted: '2025-03-01',
      coverage: 500000
    }
  ]);

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.userName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      app.applicationType.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = !statusFilter || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (appId: string, newStatus: 'pending' | 'approved' | 'rejected' | 'in-review') => {
    setApplications(applications.map(app => 
      app.id === appId ? { ...app, status: newStatus } : app
    ));
    
    toast({
      title: "Status updated",
      description: `Application ${appId} status has been updated to ${newStatus}.`
    });
  };
  
  const handleDeleteApplication = (appId: string) => {
    setApplications(applications.filter(app => app.id !== appId));
    
    toast({
      title: "Application deleted",
      description: `Application ${appId} has been deleted.`
    });
  };

  const getStatusBadgeColor = (status: string) => {
    switch(status) {
      case 'approved': return "bg-green-500";
      case 'rejected': return "bg-red-500";
      case 'in-review': return "bg-blue-500";
      case 'pending': return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Insurance Applications</h2>
        <p className="text-muted-foreground">
          Review and process insurance applications submitted by users.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <FileText className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search applications by name or type..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="w-full sm:w-48">
          <Select
            value={statusFilter || "all"}
            onValueChange={(value) => setStatusFilter(value === "all" ? null : value)}
          >
            <SelectTrigger>
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <span>{statusFilter || "Filter by status"}</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="in-review">In Review</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Applicant</TableHead>
              <TableHead>Insurance Type</TableHead>
              <TableHead>Coverage</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplications.length > 0 ? (
              filteredApplications.map(app => (
                <TableRow key={app.id}>
                  <TableCell className="font-mono">{app.id}</TableCell>
                  <TableCell>{app.userName}</TableCell>
                  <TableCell>{app.applicationType}</TableCell>
                  <TableCell>${app.coverage.toLocaleString()}</TableCell>
                  <TableCell>{app.dateSubmitted}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(app.status)}>
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Select 
                        defaultValue={app.status}
                        onValueChange={(value) => handleStatusChange(
                          app.id, 
                          value as 'pending' | 'approved' | 'rejected' | 'in-review'
                        )}
                      >
                        <SelectTrigger className="h-8 w-24">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in-review">Review</SelectItem>
                          <SelectItem value="approved">Approve</SelectItem>
                          <SelectItem value="rejected">Reject</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteApplication(app.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                  No applications found matching your search criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageApplications;
