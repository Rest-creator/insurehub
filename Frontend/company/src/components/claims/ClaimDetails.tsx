
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText, Check, Upload, MessageSquare, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TimelineItem } from './types';

interface ClaimDetailsProps {
  claim: any;
  onClose: () => void;
  onUploadDocuments?: (claimId: string) => void;
  onContactAdjuster?: (claimId: string) => void;
}

const ClaimDetails = ({ claim, onClose, onUploadDocuments, onContactAdjuster }: ClaimDetailsProps) => {
  if (!claim) return null;
  
  return (
    <DialogContent className="sm:max-w-[700px]">
      <DialogHeader>
        <DialogTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5 text-insurance-orange" />
          <span>{claim.title}</span>
          <Badge className={`ml-3 ${claim.statusBg} ${claim.statusColor}`}>
            {claim.status}
          </Badge>
        </DialogTitle>
        <DialogDescription>
          Claim ID: {claim.id} • Filed: {claim.date}
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid gap-6 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium mb-1">Policy Type</h4>
            <p>{claim.policy} • {claim.policyNumber}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-1">Claim Amount</h4>
            <p className="text-lg font-bold">{claim.amount}</p>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-1">Description</h4>
          <p className="text-gray-700">{claim.description}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Claim Progress</h4>
          <Progress value={claim.progress} className="h-2 mb-3" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Submitted</span>
            <span>Processing</span>
            <span>Complete</span>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Claim Timeline</h4>
          <div className="space-y-3">
            {claim.timeline.map((step: TimelineItem, i: number) => (
              <div key={i} className="flex items-start">
                <div className={`mt-1 flex-shrink-0 w-4 h-4 rounded-full mr-2 ${step.complete ? 'bg-green-500' : 'bg-gray-300'}`}>
                  {step.complete && <Check className="w-3 h-3 text-white" />}
                </div>
                <div>
                  <p className="text-sm font-medium">{step.event}</p>
                  <p className="text-xs text-gray-500">{step.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex gap-3 items-center">
          <Check className="h-4 w-4 text-green-500" />
          <span className="text-sm font-medium">Next Step: {claim.nextStep}</span>
        </div>
      </div>
      
      <DialogFooter>
        <div className="flex flex-col sm:flex-row w-full justify-between gap-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 text-insurance-orange mr-2" />
              <span className="text-sm text-gray-600">Last updated: {new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <Upload className="w-4 h-4 text-insurance-orange mr-2" />
              <span className="text-sm text-gray-600">{claim.documents} Documents</span>
            </div>
            {claim.messages > 0 && (
              <div className="flex items-center">
                <MessageSquare className="w-4 h-4 text-insurance-orange mr-2" />
                <span className="text-sm text-insurance-orange">{claim.messages} message{claim.messages > 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            {onUploadDocuments && claim.status !== "Completed" && claim.status !== "Approved" && claim.status !== "Denied" && (
              <Button variant="outline" onClick={() => onUploadDocuments(claim.id)}>
                <Upload className="mr-2 h-4 w-4" />
                Upload Documents
              </Button>
            )}
            {onContactAdjuster && (
              <Button variant="outline" onClick={() => onContactAdjuster(claim.id)}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact Adjuster
              </Button>
            )}
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

export default ClaimDetails;