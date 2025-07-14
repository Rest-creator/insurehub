import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Container from '../components/ui/Container';
import { Dialog } from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';
import ClaimHeader from '@/components/claims/ClaimHeader';
import ClaimStatusOverview from '@/components/claims/ClaimStatusOverview';
import ClaimList from '@/components/claims/ClaimList';
import FileClaimForm from '@/components/claims/FileClaimForm';
import { NewClaimFormData } from '@/components/claims/types';
import ClaimDetails from '@/components/claims/ClaimDetails';
import ProcessOverview from '@/components/claims/ProcessOverview';
import ClaimStats from '@/components/claims/ClaimStats';
import { Claim, TimelineItem } from '@/components/claims/types';
import Server from '@/components/server/Server';

const ClaimsManagement = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isNewClaimOpen, setIsNewClaimOpen] = useState(false);
  const [claimStats, setClaimStats] = useState({})
  const { toast } = useToast();
  
  const [newClaimForm, setNewClaimForm] = useState<NewClaimFormData>({
    title: '',
    policyType: '',
    amount: '',
    description: '',
  });
  
  const [claims, setClaims] = useState<Claim[]>([
    {
      id: "CLM-2023-8764",
      title: "Auto Collision Damage",
      date: "Apr 15, 2023",
      status: "In Progress",
      statusColor: "text-yellow-600",
      statusBg: "bg-yellow-100",
      amount: "$4,350",
      policy: "Auto Insurance",
      policyNumber: "AU87126534",
      description: "Front bumper and hood damage from collision at intersection",
      documents: 3,
      messages: 2,
      progress: 40,
      nextStep: "Awaiting claims adjuster review",
      timeline: [
        { date: "Apr 15, 2023", event: "Claim submitted", complete: true },
        { date: "Apr 16, 2023", event: "Documents uploaded", complete: true },
        { date: "Apr 17, 2023", event: "Claims adjuster assigned", complete: true },
        { date: "Pending", event: "Damage assessment", complete: false },
        { date: "Pending", event: "Payment processing", complete: false }
      ]
    },
    {
      id: "CLM-2023-7251",
      title: "Laptop Theft Claim",
      date: "Mar 02, 2023",
      status: "Approved",
      statusColor: "text-green-600",
      statusBg: "bg-green-100",
      amount: "$1,200",
      policy: "Personal Property",
      policyNumber: "PP23487612",
      description: "Laptop stolen from vehicle in parking garage",
      documents: 4,
      messages: 0,
      progress: 100,
      nextStep: "Payment processed. Claim complete.",
      timeline: [
        { date: "Mar 02, 2023", event: "Claim submitted", complete: true },
        { date: "Mar 03, 2023", event: "Documents uploaded", complete: true },
        { date: "Mar 05, 2023", event: "Claims adjuster assigned", complete: true },
        { date: "Mar 10, 2023", event: "Claim approved", complete: true },
        { date: "Mar 15, 2023", event: "Payment processed", complete: true }
      ]
    },
    {
      id: "CLM-2023-6549",
      title: "Water Damage Repair",
      date: "Feb 18, 2023",
      status: "Completed",
      statusColor: "text-blue-600",
      statusBg: "bg-blue-100",
      amount: "$5,780",
      policy: "Home Insurance",
      policyNumber: "HD29578423",
      description: "Water damage from burst pipe in upstairs bathroom",
      documents: 6,
      messages: 3,
      progress: 100,
      nextStep: "Claim resolved. Survey sent.",
      timeline: [
        { date: "Feb 18, 2023", event: "Claim submitted", complete: true },
        { date: "Feb 19, 2023", event: "Documents uploaded", complete: true },
        { date: "Feb 21, 2023", event: "Claims adjuster assigned", complete: true },
        { date: "Feb 25, 2023", event: "Damage assessment", complete: true },
        { date: "Mar 05, 2023", event: "Payment processed", complete: true }
      ]
    },
    {
      id: "CLM-2022-9823",
      title: "Emergency Medical Visit",
      date: "Dec 12, 2022",
      status: "Under Review",
      statusColor: "text-purple-600",
      statusBg: "bg-purple-100",
      amount: "$875",
      policy: "Health Insurance",
      policyNumber: "HC65437891",
      description: "Emergency room visit for severe allergic reaction",
      documents: 2,
      messages: 1,
      progress: 60,
      nextStep: "Awaiting medical records review",
      timeline: [
        { date: "Dec 12, 2022", event: "Claim submitted", complete: true },
        { date: "Dec 14, 2022", event: "Medical bills uploaded", complete: true },
        { date: "Dec 16, 2022", event: "Claims adjuster assigned", complete: true },
        { date: "Pending", event: "Medical review", complete: false },
        { date: "Pending", event: "Payment processing", complete: false }
      ]
    },
    {
      id: "CLM-2022-8975",
      title: "Storm Roof Damage",
      date: "Nov 05, 2022",
      status: "Denied",
      statusColor: "text-red-600",
      statusBg: "bg-red-100",
      amount: "$3,200",
      policy: "Home Insurance",
      policyNumber: "HD29578423",
      description: "Shingle damage from hailstorm",
      documents: 5,
      messages: 4,
      progress: 100,
      nextStep: "Claim denied. Appeal option available.",
      timeline: [
        { date: "Nov 05, 2022", event: "Claim submitted", complete: true },
        { date: "Nov 06, 2022", event: "Documents uploaded", complete: true },
        { date: "Nov 09, 2022", event: "Claims adjuster assigned", complete: true },
        { date: "Nov 15, 2022", event: "Damage assessment", complete: true },
        { date: "Nov 30, 2022", event: "Claim denied", complete: true }
      ]
    }
  ]);

  const activeClaims = claims.filter(claim => 
    claim.status === "In Progress" || claim.status === "Under Review"
  );
  
  const completedClaims = claims.filter(claim => 
    claim.status === "Approved" || claim.status === "Completed" || claim.status === "Denied"
  );

  const handleViewDetails = (claim: Claim) => {
    setSelectedClaim(claim);
    setIsDetailsOpen(true);
  };



  const handleSubmitNewClaim = (formData: NewClaimFormData) => {
    if (!formData.title || !formData.policyType || !formData.amount || !formData.description) {
      toast({
        title: "Form Incomplete",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }

    const newClaimId = `CLM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const today = new Date().toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
    
    const timeline: TimelineItem[] = [
      { date: today, event: "Claim submitted", complete: true },
      { date: "Pending", event: "Documents uploaded", complete: false },
      { date: "Pending", event: "Claims adjuster assigned", complete: false },
      { date: "Pending", event: "Damage assessment", complete: false },
      { date: "Pending", event: "Payment processing", complete: false }
    ];
    
    const newClaim: Claim = {
      id: newClaimId,
      title: formData.title,
      date: today,
      status: "In Progress",
      statusColor: "text-yellow-600",
      statusBg: "bg-yellow-100",
      amount: `$${parseFloat(formData.amount).toLocaleString()}`,
      policy: formData.policyType,
      policyNumber: `${formData.policyType.substring(0, 2).toUpperCase()}${Math.floor(10000000 + Math.random() * 90000000)}`,
      description: formData.description,
      documents: 0,
      messages: 0,
      progress: 20,
      nextStep: "Awaiting document upload",
      timeline: timeline
    };
    
    setClaims([newClaim, ...claims]);
    
    setNewClaimForm({
      title: '',
      policyType: '',
      amount: '',
      description: '',
    });
    setIsNewClaimOpen(false);
    
    toast({
      title: "Claim Submitted",
      description: `Your claim ${newClaimId} has been successfully submitted.`,
    });

    setTimeout(() => {
      handleViewDetails(newClaim);
    }, 500);
  };

  const handleUploadDocuments = (claimId: string) => {
    toast({
      title: "Document Upload",
      description: "Document upload functionality would open here. This is a mock implementation.",
    });
    
    setClaims(claims.map(claim => {
      if (claim.id === claimId) {
        const updatedTimeline = claim.timeline.map(item => {
          if (item.event === "Documents uploaded" && !item.complete) {
            return {
              ...item,
              date: new Date().toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'}),
              complete: true
            };
          }
          return item;
        });
        
        return {
          ...claim,
          documents: claim.documents + 1,
          progress: Math.min(claim.progress + 20, 100),
          timeline: updatedTimeline,
          nextStep: claim.progress >= 80 ? "Finalizing claim approval" : "Under review by claims adjuster"
        };
      }
      return claim;
    }));

    if (selectedClaim && selectedClaim.id === claimId) {
      const updatedClaim = claims.find(c => c.id === claimId);
      if (updatedClaim) {
        setIsDetailsOpen(false);
        setTimeout(() => {
          setSelectedClaim(updatedClaim);
          setIsDetailsOpen(true);
        }, 300);
      }
    }
  };

  const handleContactAdjuster = (claimId: string) => {
    toast({
      title: "Contact Adjuster",
      description: "Message form would open here. This is a mock implementation.",
    });

    setClaims(claims.map(claim => {
      if (claim.id === claimId) {
        return {
          ...claim,
          messages: claim.messages + 1
        };
      }
      return claim;
    }));
    
    if (selectedClaim && selectedClaim.id === claimId) {
      const updatedClaim = claims.find(c => c.id === claimId);
      if (updatedClaim) {
        setSelectedClaim(updatedClaim);
      }
    }
  };

  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;

  const fetchClaimsStats = () => {
    Server.getUserClaimsStats(user.email)
      .then((response) => {
        const claimsData = response.data;
        setClaimStats(claimsData);
        console.log(claimsData);
      })
      .catch((error) => {
        console.log(error);
      }
    );
  }

  useEffect(() => {
    fetchClaimsStats();
  }, [])
  return (
    <>
      <Helmet>
        <title>Claims Management - InsureHub</title>
        <meta name="description" content="Manage and track your insurance claims easily with InsureHub's streamlined claims management system." />
      </Helmet>
      
      <main className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-to-br from-white to-insurance-neutral/50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <ClaimHeader 
                setIsNewClaimOpen={setIsNewClaimOpen}
                setActiveTab={setActiveTab}
                isNewClaimOpen={isNewClaimOpen}
              />
              
              <ClaimStatusOverview 
                pendingCount={claimStats.pendingClaims || 0}
                completedCount={claimStats.completed_claims || 0}
                totalCount={claimStats.total_claims || 0}
                recentActivity={claims.reduce((count, claim) => count + claim.messages, 0)}
              />
            </div>
          </Container>
        </div>
        
        <section className="py-12 bg-white">
          <Container>
            <ClaimList 
              claims={claims}
              activeClaims={activeClaims}
              completedClaims={completedClaims}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              handleViewDetails={handleViewDetails}
              handleUploadDocuments={handleUploadDocuments}
              handleContactAdjuster={handleContactAdjuster}
            />
          </Container>
        </section>
        
        <Dialog open={isNewClaimOpen} onOpenChange={setIsNewClaimOpen}>
          <FileClaimForm 
            onSubmit={handleSubmitNewClaim}
            onCancel={() => setIsNewClaimOpen(false)}
            initialValues={newClaimForm}
          />
        </Dialog>
        
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <ClaimDetails 
            claim={selectedClaim}
            onClose={() => setIsDetailsOpen(false)}
            onUploadDocuments={handleUploadDocuments}
            onContactAdjuster={handleContactAdjuster}
          />
        </Dialog>
        
        <ProcessOverview />
        
        <ClaimStats />
        
        <Footer />
      </main>
    </>
  );
};

export default ClaimsManagement;