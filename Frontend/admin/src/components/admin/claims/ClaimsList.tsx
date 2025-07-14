
import { useState } from 'react';
import { InsuranceClaim } from '@/components/admin/users/types';
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
import { FileSearch, Filter, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ClaimsListProps {
  claims: InsuranceClaim[];
  onStatusChange: (claimId: string, newStatus: 'pending' | 'approved' | 'rejected' | 'in-review') => void;
  onViewDetails: (claim: InsuranceClaim) => void;
  getStatusBadgeColor: (status: string) => string;
}

const ClaimsList = ({ claims, onStatusChange, onViewDetails, getStatusBadgeColor }: ClaimsListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = 
      claim.userName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      claim.claimType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = !statusFilter || claim.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
        <div className="relative flex-1">
          <FileSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search claims by name, type or description..."
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
              <TableHead>Customer</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClaims.length > 0 ? (
              filteredClaims.map(claim => (
                <TableRow key={claim.id}>
                  <TableCell className="font-mono">{claim.id}</TableCell>
                  <TableCell>{claim.userName}</TableCell>
                  <TableCell>{claim.claimType}</TableCell>
                  <TableCell>${claim.amount.toLocaleString()}</TableCell>
                  <TableCell>{claim.dateSubmitted}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(claim.status)}>
                      {claim.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Select 
                        defaultValue={claim.status}
                        onValueChange={(value) => onStatusChange(
                          claim.id, 
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
                        variant="outline"
                        size="icon"
                        onClick={() => onViewDetails(claim)}
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                  No claims found matching your search criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ClaimsList;