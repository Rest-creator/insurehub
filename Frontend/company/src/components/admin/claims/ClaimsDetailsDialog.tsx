
import { InsuranceClaim } from '@/components/admin/users/types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText } from "lucide-react";

interface ClaimDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedClaim: InsuranceClaim | null;
  getStatusBadgeColor: (status: string) => string;
  onStatusChange: (claimId: string, newStatus: 'pending' | 'approved' | 'rejected' | 'in-review') => void;
}

const ClaimDetailsDialog = ({ 
  isOpen, 
  onOpenChange, 
  selectedClaim, 
  getStatusBadgeColor, 
  onStatusChange 
}: ClaimDetailsDialogProps) => {
  if (!selectedClaim) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5 text-blue-500" />
            <span>Claim Details</span>
            <Badge className={`ml-3 ${getStatusBadgeColor(selectedClaim.status)}`}>
              {selectedClaim.status}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Claim ID: {selectedClaim.id} • Submitted: {selectedClaim.dateSubmitted}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Customer</h4>
              <p className="text-lg font-semibold">{selectedClaim.userName}</p>
              <p className="text-sm text-gray-500">User ID: {selectedClaim.userId}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Claim Amount</h4>
              <p className="text-lg font-bold">${selectedClaim.amount.toLocaleString()}</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-1">Claim Type</h4>
            <p>{selectedClaim.claimType}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-1">Description</h4>
            <p className="text-gray-700">{selectedClaim.description}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-1">Claim Status History</h4>
            <div className="mt-2 space-y-2 border rounded-md p-3 bg-gray-50">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm">Submitted on {selectedClaim.dateSubmitted}</span>
              </div>
              {selectedClaim.status !== 'pending' && (
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm">Status changed to {selectedClaim.status}</span>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-1">Admin Notes</h4>
            <Textarea 
              placeholder="Add notes about this claim (for internal use only)"
              className="h-20"
            />
          </div>
        </div>
        
        <DialogFooter>
          <div className="flex gap-3 w-full justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
            <Select 
              defaultValue={selectedClaim.status}
              onValueChange={(value) => {
                onStatusChange(
                  selectedClaim.id, 
                  value as 'pending' | 'approved' | 'rejected' | 'in-review'
                );
              }}
            >
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Update Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Set Pending</SelectItem>
                <SelectItem value="in-review">Set In Review</SelectItem>
                <SelectItem value="approved">Approve Claim</SelectItem>
                <SelectItem value="rejected">Reject Claim</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClaimDetailsDialog;