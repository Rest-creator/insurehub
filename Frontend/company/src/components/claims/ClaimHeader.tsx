
import { Plus, Search } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface ClaimHeaderProps {
  setIsNewClaimOpen: (value: boolean) => void;
  setActiveTab: (value: string) => void;
  isNewClaimOpen: boolean;
}

const ClaimHeader = ({ setIsNewClaimOpen, setActiveTab, isNewClaimOpen }: ClaimHeaderProps) => {
  return (
    <FadeIn direction="right">
      <div>
        <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-insurance-orange-light text-insurance-orange rounded-full mb-6">
          Claims Management
        </span>
        <h1 className="heading-1 text-insurance-neutral-dark mb-6">
          Simple Claims Tracking & Management
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Submit, track, and manage all your insurance claims in one place with our streamlined claims management system.
        </p>
        
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
          <Dialog open={isNewClaimOpen} onOpenChange={setIsNewClaimOpen}>
            <DialogTrigger asChild>
              <button className="btn-primary inline-flex items-center justify-center">
                <Plus className="mr-2 w-5 h-5" />
                File New Claim
              </button>
            </DialogTrigger>
          </Dialog>
          
          <button onClick={() => setActiveTab("all")} className="btn-outline-primary inline-flex items-center justify-center">
            <Search className="mr-2 w-5 h-5" />
            Search Claims
          </button>
        </div>
      </div>
    </FadeIn>
  );
};

export default ClaimHeader;