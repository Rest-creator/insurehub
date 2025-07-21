// src/pages/Claims.jsx
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/ui/Container";
import FadeIn from "../components/animations/FadeIn";
import { Search, PlusCircle, CheckCircle, Clock, XCircle, FileText, User } from "lucide-react";
import ClaimDetailsModal from "../components/services/ClaimDetailsModal";

const Claims = () => {
  // State for managing claim details modal
  const [showClaimDetailsModal, setShowClaimDetailsModal] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);

  const [claims, setClaims] = useState([
    {
      id: "C-001",
      clientName: "Rudo Moyo", // Zimbabwean Name
      policyType: "Auto Insurance",
      description: "Minor fender bender, rear-ended at a stop sign. Client provided photos and police report.",
      dateFiled: "2025-07-10",
      status: "Pending Review",
      assignedAgent: "Jane Smith",
      amountClaimed: "$1,500.00",
      lastUpdated: "2025-07-15",
      notes: "Initial review complete. Awaiting assessor's report.",
      images: [ // Added images for Auto Insurance claim
        "https://plus.unsplash.com/premium_photo-1751945121604-16d609f19099?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGFtYWdlZCUyMGNhciUyMGFjY2lkZW50fGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1673187139211-1e7ec3dd60ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRhbWFnZWQlMjBjYXIlMjBhY2NpZGVudHxlbnwwfHwwfHx8MA%3D%3D",
      ],
    },
    {
      id: "C-002",
      clientName: "Tendai Ncube", // Zimbabwean Name
      policyType: "Home Insurance",
      description: "Water damage in kitchen due to burst pipe. Plumber's report submitted.",
      dateFiled: "2025-07-08",
      status: "In Progress",
      assignedAgent: "John Doe",
      amountClaimed: "$8,000.00",
      lastUpdated: "2025-07-16",
      notes: "Assessor assigned. Waiting for site visit scheduling.",
      images: [ // Added images for Home Insurance claim
        "https://images.unsplash.com/photo-1657213077302-79e89564a042?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0ZXIlMjBkYW1hZ2VkJTIwa2l0Y2hlbnxlbnwwfHwwfHx8MA%3D%3D",
        
      ],
    },
    {
      id: "C-003",
      clientName: "Anesu Dube", // Zimbabwean Name
      policyType: "Health Insurance",
      description: "Emergency room visit for severe flu. Medical bills attached.",
      dateFiled: "2025-07-05",
      status: "Approved",
      assignedAgent: "Jane Smith",
      amountClaimed: "$1,200.00",
      lastUpdated: "2025-07-07",
      notes: "Claim approved, payment processed to client's bank account.",
      images: [], // No images for health claim typically
    },
    {
      id: "C-004",
      clientName: "Farai Zhou", // Zimbabwean Name
      policyType: "Life Insurance",
      description: "Beneficiary claim due to policyholder's passing. Death certificate provided.",
      dateFiled: "2025-06-20",
      status: "Rejected",
      assignedAgent: "Peter Jones",
      amountClaimed: "$100,000.00",
      lastUpdated: "2025-07-01",
      notes: "Claim rejected due to policy lapse. Notification sent to beneficiary.",
      images: [], // No images for life claim typically
    },
    {
      id: "C-005",
      clientName: "Nomusa Sibanda", // Zimbabwean Name
      policyType: "Business Liability",
      description: "Slip and fall incident at business premises. CCTV footage available.",
      dateFiled: "2025-06-15",
      status: "Pending Review",
      assignedAgent: "John Doe",
      amountClaimed: "$5,000.00",
      lastUpdated: "2025-07-14",
      notes: "Legal team reviewing liability. Client interview scheduled.",
      images: [ // Added images for Business Liability claim
        "https://via.placeholder.com/300/5733FF/FFFFFF?text=Slip+Fall+1",
        "https://via.placeholder.com/300/3900C7/FFFFFF?text=Slip+Fall+2",
      ],
    },
    {
        id: "C-006",
        clientName: "Tatenda Mhere", // Zimbabwean Name
        policyType: "Auto Insurance",
        description: "Hit and run incident, significant damage to front. Police report filed.",
        dateFiled: "2025-07-12",
        status: "In Progress",
        assignedAgent: "Jane Smith",
        amountClaimed: "$7,500.00",
        lastUpdated: "2025-07-17",
        notes: "Vehicle inspection pending. Tracking police investigation.",
        images: [ // Added images for Auto Insurance claim
            "https://via.placeholder.com/300/FFA07A/FFFFFF?text=Car+Front+Damage",
            "https://via.placeholder.com/300/DC143C/FFFFFF?text=Impact+Point",
        ],
      },
      {
        id: "C-007",
        clientName: "Tanaka Banda", // Zimbabwean Name
        policyType: "Health Insurance",
        description: "Routine check-up and lab tests. All documentation in order.",
        dateFiled: "2025-07-11",
        status: "Approved",
        assignedAgent: "Peter Jones",
        amountClaimed: "$300.00",
        lastUpdated: "2025-07-13",
        notes: "Approved and reimbursed. No issues.",
        images: [],
      },
      {
        id: "C-008",
        clientName: "Chengetai Gumbo", // Zimbabwean Name
        policyType: "Home Insurance",
        description: "Theft of electronics from home. Police case opened.",
        dateFiled: "2025-07-09",
        status: "Pending Review",
        assignedAgent: "John Doe",
        amountClaimed: "$4,000.00",
        lastUpdated: "2025-07-16",
        notes: "Require further documentation on proof of ownership for stolen items.",
        images: [ // Added images for Home Insurance claim
            "https://via.placeholder.com/300/8B4513/FFFFFF?text=Home+Entry+Point",
            "https://via.placeholder.com/300/A0522D/FFFFFF?text=Missing+Items",
        ],
      },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="w-4 h-4 text-green-500 mr-1" />;
      case "Pending Review":
        return <Clock className="w-4 h-4 text-yellow-500 mr-1" />;
      case "In Progress":
        return <Clock className="w-4 h-4 text-blue-500 mr-1" />;
      case "Rejected":
        return <XCircle className="w-4 h-4 text-red-500 mr-1" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending Review":
        return "bg-yellow-100 text-yellow-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

  const filteredClaims = claims.filter((claim) => {
    const matchesSearch = claim.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          claim.policyType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          claim.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          claim.assignedAgent.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || claim.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Function to open the claim details modal
  const handleViewClaim = (claim) => {
    setSelectedClaim(claim);
    setShowClaimDetailsModal(true);
  };

  // Function to close the claim details modal
  const handleCloseClaimDetailsModal = () => {
    setShowClaimDetailsModal(false);
    setSelectedClaim(null); // Clear selected claim when closing
  };

  return (
    <>
      <Helmet>
        <title>Process Claims - InsureHub</title>
        <meta name="description" content="Manage and process all user insurance claims at InsureHub." />
      </Helmet>

      <main className="min-h-screen flex flex-col">
        <Navbar />

        <div className="pt-24 pb-8 md:pt-32 md:pb-12 bg-gradient-to-br from-white to-insurance-neutral/50">
          <Container>
            <FadeIn direction="up">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="heading-2 text-insurance-neutral-dark mb-2">
                    Process User Claims
                  </h1>
                  <p className="text-gray-600">
                    Efficiently manage and track all insurance claims.
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-3">
                  <button className="btn-primary flex items-center">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    New Claim
                  </button>
                  <button className="btn-outline-primary flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Export Claims
                  </button>
                </div>
              </div>
            </FadeIn>
          </Container>
        </div>

        <section className="py-8">
          <Container>
            <FadeIn direction="up" delay={200}>
              <div className="glass-card rounded-xl p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search claims by client, ID, policy type, description, or agent..."
                      className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-insurance-orange focus:border-insurance-orange outline-none transition-all duration-200"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 font-medium whitespace-nowrap">Filter by Status:</span>
                    <select
                      className="py-2 px-4 rounded-lg border border-gray-300 focus:ring-insurance-orange focus:border-insurance-orange outline-none transition-all duration-200"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="All">All Statuses</option>
                      <option value="Pending Review">Pending Review</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                {filteredClaims.length === 0 ? (
                  <div className="text-center text-gray-500 py-10">
                    <p className="text-lg font-medium mb-2">No claims found matching your criteria.</p>
                    <p className="text-sm">Try adjusting your search or filters.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claim ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Filed</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Agent</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Claimed</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredClaims.map((claim) => (
                          <tr key={claim.id} className="hover:bg-gray-50 transition-colors duration-150">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-insurance-neutral-dark">
                              {claim.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center">
                                <User className="w-4 h-4 mr-2 text-gray-500" /> {claim.clientName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {claim.policyType}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                                {claim.description}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {claim.dateFiled}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(claim.status)}`}>
                                {getStatusIcon(claim.status)} {claim.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {claim.assignedAgent}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                                {claim.amountClaimed}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                    onClick={() => handleViewClaim(claim)} // Call view function
                                    className="text-insurance-orange hover:text-insurance-orange-dark mr-3"
                                >
                                    View
                                </button>
                                <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                                <button className="text-red-600 hover:text-red-800">Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </FadeIn>
          </Container>
        </section>

        <Footer />

        {/* Claim Details Modal */}
        {showClaimDetailsModal && (
          <ClaimDetailsModal
            claim={selectedClaim}
            onClose={handleCloseClaimDetailsModal}
          />
        )}
      </main>
    </>
  );
};

export default Claims;