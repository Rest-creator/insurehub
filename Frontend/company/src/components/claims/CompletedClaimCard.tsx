
import { Upload, Calendar } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Claim } from './types';

interface CompletedClaimCardProps {
  claim: Claim;
  onViewDetails?: (claim: Claim) => void;
}

const CompletedClaimCard = ({ claim, onViewDetails }: CompletedClaimCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center">
            <div className="mr-4">
              <FileText className="w-10 h-10 text-insurance-neutral" />
            </div>
            <div>
              <div className="flex items-center">
                <h3 className="font-semibold text-lg text-insurance-neutral-dark mr-3">{claim.title}</h3>
                <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${claim.statusBg} ${claim.statusColor}`}>
                  {claim.status}
                </span>
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
      
      <CardContent>
        <p className="text-sm text-gray-700 mb-4">{claim.description}</p>
        
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <Upload className="w-4 h-4 text-insurance-neutral mr-2" />
            <span className="text-sm text-gray-600">{claim.documents} Documents</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 text-insurance-neutral mr-2" />
            <span className="text-sm text-gray-600">
              Completed: {
                claim.status === "Approved" ? 
                  claim.timeline.find(item => item.event === "Payment processed")?.date || "Mar 15, 2023" : 
                  (claim.status === "Completed" ? 
                    claim.timeline.find(item => item.event === "Payment processed")?.date || "Mar 05, 2023" : 
                    claim.timeline.find(item => item.event === "Claim denied")?.date || "Nov 30, 2022"
                  )
              }
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-4 flex justify-end">
        <Button 
          variant="outline" 
          className="text-sm"
          onClick={() => onViewDetails && onViewDetails(claim)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CompletedClaimCard;