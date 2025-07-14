import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { InsuranceClaim } from "@/components/admin/users/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, AlertCircle, FileSearch, CheckCircle } from "lucide-react";
import ClaimStatusCard from "@/components/admin/claims/ClaimStatusCard";
import ClaimsList from "@/components/admin/claims/ClaimsList";
import RecentActivity from "@/components/admin/claims/RecentActivity";
import FlaggedIssues from "@/components/admin/claims/FlaggedIssues";
import ClaimDetailsDialog from "@/components/admin/claims/ClaimsDetailsDialog";
import Server from "@/components/server/Server";

const ManageClaims = () => {
  const { toast } = useToast();
  const [selectedClaim, setSelectedClaim] = useState<InsuranceClaim | null>(
    null
  );
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [claims, setClaims] = useState<InsuranceClaim[]>([]);

  const pendingCount = claims.filter(
    (claim) => claim.status === "pending"
  ).length;
  const inReviewCount = claims.filter(
    (claim) => claim.status === "in-review"
  ).length;
  const approvedCount = claims.filter(
    (claim) => claim.status === "approved"
  ).length;
  const rejectedCount = claims.filter(
    (claim) => claim.status === "rejected"
  ).length;
  const totalClaims = claims.length;

  const recentActivity = [
    {
      id: "act-001",
      message: "New document uploaded for claim CL-003",
      time: "10 minutes ago",
    },
    {
      id: "act-002",
      message: "Claim CL-005 submitted and pending review",
      time: "1 hour ago",
    },
    {
      id: "act-003",
      message: "Claim CL-002 approved and payment processed",
      time: "3 hours ago",
    },
    {
      id: "act-004",
      message: "Additional information requested for claim CL-001",
      time: "5 hours ago",
    },
  ];

  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;

  const flaggedIssues = [
    {
      id: "flag-001",
      message: "Claim CL-003 missing police report",
      priority: "high",
    },
    {
      id: "flag-002",
      message: "Claim CL-006 amount exceeds standard threshold",
      priority: "medium",
    },
  ];

  const getClaims = () => {
    Server.getCompanyClaims(user.companyId)
      .then((response) => {
        const claimsData = response.data;
        setClaims(claimsData);
        console.log(claimsData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleStatusChange = (
    claimId: string,
    newStatus: "pending" | "approved" | "rejected" | "in-review"
  ) => {
    setClaims(
      claims.map((claim) =>
        claim.id === claimId ? { ...claim, status: newStatus } : claim
      )
    );

    toast({
      title: "Status updated",
      description: `Claim ${claimId} status has been updated to ${newStatus}.`,
    });

    // Update the selected claim if it's the one that was modified
    if (selectedClaim && selectedClaim.id === claimId) {
      setSelectedClaim({ ...selectedClaim, status: newStatus });
    }
  };

  const viewClaimDetails = (claim: InsuranceClaim) => {
    setSelectedClaim(claim);
    setIsDetailsOpen(true);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      case "in-review":
        return "bg-blue-500";
      case "pending":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  useEffect(() => {
    getClaims();
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Claims Management Dashboard</h2>
        <p className="text-muted-foreground">
          Review, approve, or reject insurance claims submitted by users.
          Monitor claim status and activity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ClaimStatusCard
          title="Pending Claims"
          count={pendingCount}
          totalClaims={totalClaims}
          icon={Clock}
          color="text-yellow-500"
        />

        <ClaimStatusCard
          title="In Review"
          count={inReviewCount}
          totalClaims={totalClaims}
          icon={FileSearch}
          color="text-blue-500"
        />

        <ClaimStatusCard
          title="Approved"
          count={approvedCount}
          totalClaims={totalClaims}
          icon={CheckCircle}
          color="text-green-500"
        />

        <ClaimStatusCard
          title="Rejected"
          count={rejectedCount}
          totalClaims={totalClaims}
          icon={AlertCircle}
          color="text-red-500"
        />
      </div>

      <Tabs defaultValue="claims" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="claims">Claims List</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="flagged">Flagged Issues</TabsTrigger>
        </TabsList>

        <TabsContent value="claims">
          <ClaimsList
            claims={claims}
            onStatusChange={handleStatusChange}
            onViewDetails={viewClaimDetails}
            getStatusBadgeColor={getStatusBadgeColor}
          />
        </TabsContent>

        <TabsContent value="activity">
          <RecentActivity activities={recentActivity} />
        </TabsContent>

        <TabsContent value="flagged">
          <FlaggedIssues issues={flaggedIssues} />
        </TabsContent>
      </Tabs>

      <ClaimDetailsDialog
        isOpen={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        selectedClaim={selectedClaim}
        getStatusBadgeColor={getStatusBadgeColor}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default ManageClaims;
