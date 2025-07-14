
import { Upload, Clock, AlertTriangle, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Check } from 'lucide-react';
import { Claim, TimelineItem } from './types';

interface ClaimCardProps {
  claim: Claim;
  onViewDetails: (claim: Claim) => void;
  onUploadDocuments: (claimId: string) => void;
  onContactAdjuster: (claimId: string) => void;
}

const ClaimCard = ({ claim, onViewDetails, onUploadDocuments, onContactAdjuster }: ClaimCardProps) => {
  return (
    <Card className="overflow-hidden" id={`claim-${claim.id}`}>
      <CardHeader className="border-b bg-gray-50">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center">
            <div className="mr-4">
              <FileText className="w-10 h-10 text-insurance-orange" />
            </div>
            <div>
              <div className="flex items-center flex-wrap gap-2">
                <h3 className="font-semibold text-lg text-insurance-neutral-dark">{claim.title}</h3>
                <Badge className={`${claim.statusBg} ${claim.statusColor}`}>
                  {claim.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">Claim ID: {claim.id} • Filed: {claim.date}</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-gray-500">Claim Amount</p>
            <p className="text-xl font-bold text-insurance-neutral-dark">{claim.amount}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div>
            <h4 className="text-sm font-semibold mb-2">Claim Progress</h4>
            <Progress value={claim.progress} className="h-2 mb-3" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Submitted</span>
              <span>Processing</span>
              <span>Complete</span>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Next Step</h4>
              <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-700">
                {claim.nextStep}
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-2">Claim Timeline</h4>
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
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 border-t pt-4">
          <div>
            <p className="text-sm text-gray-500">Policy Type</p>
            <p className="text-gray-700">{claim.policy} • {claim.policyNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Description</p>
            <p className="text-gray-700">{claim.description}</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t bg-gray-50 flex flex-wrap justify-between">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <Upload className="w-4 h-4 text-insurance-orange mr-2" />
            <span className="text-sm text-gray-600">{claim.documents} Documents</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-insurance-orange mr-2" />
            <span className="text-sm text-gray-600">Last update: 2 days ago</span>
          </div>
          {claim.messages > 0 && (
            <div className="flex items-center">
              <AlertTriangle className="w-4 h-4 text-insurance-orange mr-2" />
              <span className="text-sm text-insurance-orange">{claim.messages} new message{claim.messages > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
          <Button variant="outline" className="text-sm flex items-center" onClick={() => onViewDetails(claim)}>
            <FileText className="mr-2 h-4 w-4" />
            View Details
          </Button>
          <Button variant="outline" className="text-sm flex items-center" onClick={() => onUploadDocuments(claim.id)}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Documents
          </Button>
          <Button variant="default" className="text-sm flex items-center" onClick={() => onContactAdjuster(claim.id)}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact Adjuster
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ClaimCard;