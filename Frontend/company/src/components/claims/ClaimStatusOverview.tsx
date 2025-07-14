
import { Clock, Check, FileText } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

interface ClaimStatusOverviewProps {
  pendingCount: number;
  completedCount: number;
  totalCount: number;
  recentActivity: number;
}

const ClaimStatusOverview = ({ pendingCount, completedCount, totalCount, recentActivity }: ClaimStatusOverviewProps) => {
  return (
    <FadeIn direction="left">
      <div className="glass-card p-8 rounded-xl">
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-insurance-orange-light/50 text-insurance-orange">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-insurance-neutral-dark">Claims Overview</h2>
            <p className="text-gray-500 text-sm">Track status and updates in real-time</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <p className="text-xs text-gray-500 mb-1">Completed</p>
            <p className="text-2xl font-bold text-green-600">{completedCount}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <p className="text-xs text-gray-500 mb-1">In Progress</p>
            <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-xs text-gray-500 mb-1">Total Claims</p>
            <p className="text-2xl font-bold text-blue-600">{totalCount}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <p className="text-xs text-gray-500 mb-1">Recent Activity</p>
            <p className="text-2xl font-bold text-purple-600">{recentActivity}</p>
          </div>
        </div>
        
        <div className="p-4 rounded-lg bg-insurance-green-light/30 mb-6">
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-insurance-green text-white mr-3">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-medium text-insurance-neutral-dark">Recent Approval</h3>
              <p className="text-sm text-gray-600">Your claim #CLM-2023-7251 for $1,200 has been approved.</p>
              <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
            </div>
          </div>
        </div>
        
        <button className="w-full btn-outline-primary flex items-center justify-center">
          <Clock className="mr-2 w-4 h-4" />
          View Claim History
        </button>
      </div>
    </FadeIn>
  );
};

export default ClaimStatusOverview;