
import { Upload, Clock, AlertTriangle, FileText } from 'lucide-react';
import { Claim } from './types';

interface ClaimSummaryCardProps {
  claim: Claim;
  onViewDetails: () => void;
  onTrackProgress: () => void;
}

const ClaimSummaryCard = ({ claim, onViewDetails, onTrackProgress }: ClaimSummaryCardProps) => {
  return (
    <div className="glass-card p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="lg:flex-grow">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center">
              <div className="mr-4">
                <FileText className="w-10 h-10 text-insurance-orange" />
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
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            <div>
              <p className="text-sm text-gray-500">Policy Type</p>
              <p className="text-gray-700">{claim.policy} • {claim.policyNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Description</p>
              <p className="text-gray-700">{claim.description}</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-4">
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
        </div>
        
        <div className="mt-6 lg:mt-0 lg:ml-6 flex flex-col lg:flex-row gap-3 lg:items-center">
          <button 
            className="btn-outline-primary text-sm flex-shrink-0"
            onClick={onViewDetails}
          >
            Claim Details
          </button>
          <button 
            className="btn-primary text-sm flex-shrink-0"
            onClick={onTrackProgress}
          >
            Track Progress
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClaimSummaryCard;