
import { Filter, Search, ArrowRight } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ClaimCard from './ClaimCard';
import CompletedClaimCard from './CompletedClaimCard';
import ClaimSummaryCard from './ClaimSummaryCard';
import { Claim } from './types';
import { useState } from 'react';

interface ClaimListProps {
  claims: Claim[];
  activeClaims: Claim[];
  completedClaims: Claim[];
  activeTab: string;
  setActiveTab: (value: string) => void;
  handleViewDetails: (claim: Claim) => void;
  handleUploadDocuments: (claimId: string) => void;
  handleContactAdjuster: (claimId: string) => void;
}

const ClaimList = ({ 
  claims, 
  activeClaims, 
  completedClaims, 
  activeTab, 
  setActiveTab, 
  handleViewDetails, 
  handleUploadDocuments, 
  handleContactAdjuster 
}: ClaimListProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClaims = claims.filter(claim => 
    claim.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredActiveClaims = activeClaims.filter(claim => 
    claim.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCompletedClaims = completedClaims.filter(claim => 
    claim.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <FadeIn direction="up">
      <div className="mb-8">
        <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value)}>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
            <TabsList>
              <TabsTrigger value="active" className="relative">
                Active Claims
                {activeClaims.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-insurance-orange text-white text-xs flex items-center justify-center">
                    {activeClaims.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="completed">Completed Claims</TabsTrigger>
              <TabsTrigger value="all">All Claims</TabsTrigger>
            </TabsList>
            
            <div className="flex space-x-3">
              <button className="flex items-center justify-center px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-700 hover:bg-insurance-orange/5 hover:border-insurance-orange/30">
                <Filter className="w-4 h-4 mr-2" />
                <span>Filter</span>
              </button>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search claims..."
                  className="w-full py-2 px-4 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-insurance-orange/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          <TabsContent value="active" className="space-y-6">
            {filteredActiveClaims.length > 0 ? (
              filteredActiveClaims.map((claim, index) => (
                <FadeIn key={claim.id} direction="up" delay={index * 100}>
                  <ClaimCard 
                    claim={claim} 
                    onViewDetails={handleViewDetails} 
                    onUploadDocuments={handleUploadDocuments}
                    onContactAdjuster={handleContactAdjuster}
                  />
                </FadeIn>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No active claims found</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-6">
            {filteredCompletedClaims.length > 0 ? (
              filteredCompletedClaims.map((claim, index) => (
                <FadeIn key={claim.id} direction="up" delay={index * 100}>
                  <CompletedClaimCard 
                    claim={claim} 
                    onViewDetails={handleViewDetails}
                  />
                </FadeIn>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No completed claims found</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="all" className="space-y-6">
            {filteredClaims.length > 0 ? (
              filteredClaims.map((claim, index) => (
                <FadeIn key={claim.id} direction="up" delay={index * 100}>
                  <ClaimSummaryCard 
                    claim={claim}
                    onViewDetails={() => handleViewDetails(claim)}
                    onTrackProgress={() => {
                      setActiveTab("active");
                      setTimeout(() => {
                        const element = document.getElementById(`claim-${claim.id}`);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 300);
                    }}
                  />
                </FadeIn>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No claims found</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </FadeIn>
  );
};

export default ClaimList;