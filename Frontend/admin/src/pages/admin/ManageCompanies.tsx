// src/pages/admin/ManageCompanies.jsx
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Container from "../../components/ui/Container";
import FadeIn from "../../components/animations/FadeIn";
import {
  Search,
  PlusCircle,
  Building,
  CheckCircle,
  XCircle,
  Clock,
  Info,
  ExternalLink,
  FileText,
  User, // For contact person
  Mail, // For email
  Tag,  // For status badge
  Package, // For products count
  FileCheck // For active policies
} from "lucide-react";
import CompanyDetailsModal from "../../components/modals/CompanyDetailsModal";
import { useToast } from "../../hooks/use-toast"; // Assuming you have this hook

const ManageCompanies = () => {
  const { toast } = useToast(); // Initialize useToast

  const [companies, setCompanies] = useState([
    {
      id: "COMP-001",
      name: "ZimSure Holdings",
      contactPerson: "Tapiwa Mhere",
      email: "tapiwa.mhere@zimsure.co.zw",
      phone: "+263 772 123 456",
      status: "Active",
      productsCount: 15,
      activePolicies: 5200,
      joinedDate: "2024-01-15",
      lastActivity: "2025-07-17",
      website: "https://www.zimsure.co.zw",
      description: "Leading insurance provider in Zimbabwe, offering a wide range of personal and commercial insurance products.",
    },
    {
      id: "COMP-002",
      name: "Nyasha Insurance Group",
      contactPerson: "Chenai Banda",
      email: "chenai.b@nyashainsure.com",
      phone: "+263 712 987 654",
      status: "Active",
      productsCount: 8,
      activePolicies: 2100,
      joinedDate: "2024-03-01",
      lastActivity: "2025-07-16",
      website: "https://www.nyashainsure.com",
      description: "Specializes in tailor-made insurance solutions for SMEs and individual clients.",
    },
    {
      id: "COMP-003",
      name: "Harare Protect Assurance",
      contactPerson: "Takudzwa Dube",
      email: "takudzwa.d@harareprotect.co.zw",
      phone: "+263 783 555 111",
      status: "Pending Review", // Status for verification
      productsCount: 0,
      activePolicies: 0,
      joinedDate: "2025-06-20",
      lastActivity: "2025-07-10",
      website: "https://www.harareprotect.co.zw",
      description: "New applicant to the InsureHub platform, currently undergoing verification process.",
    },
    {
      id: "COMP-004",
      name: "Safeguard Zim",
      contactPerson: "Rutendo Moyo",
      email: "rutendo.m@safeguardzim.org",
      phone: "+263 777 222 333",
      status: "Inactive",
      productsCount: 10,
      activePolicies: 300,
      joinedDate: "2023-09-01",
      lastActivity: "2024-12-05",
      website: "https://www.safeguardzim.org",
      description: "Previously active, currently inactive due to regulatory compliance issues. Awaiting resolution.",
    },
    {
      id: "COMP-005",
      name: "EcoSure Solutions",
      contactPerson: "Sipho Ncube",
      email: "sipho.n@ecosure.co.zw",
      phone: "+263 774 000 999",
      status: "Active",
      productsCount: 7,
      activePolicies: 1800,
      joinedDate: "2024-02-10",
      lastActivity: "2025-07-15",
      website: "https://www.ecosure.co.zw",
      description: "Focuses on eco-friendly and sustainable insurance products, popular among younger demographics.",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showCompanyDetailsModal, setShowCompanyDetailsModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="w-4 h-4 text-green-500 mr-1" />;
      case "Inactive":
        return <XCircle className="w-4 h-4 text-red-500 mr-1" />;
      case "Pending Review":
        return <Clock className="w-4 h-4 text-yellow-500 mr-1" />;
      case "Rejected": // New status
        return <XCircle className="w-4 h-4 text-gray-500 mr-1" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      case "Pending Review":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected": // New status class
        return "bg-gray-100 text-gray-800";
      default:
        return "";
    }
  };

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || company.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleViewCompany = (company) => {
    setSelectedCompany(company);
    setShowCompanyDetailsModal(true);
  };

  const handleCloseCompanyDetailsModal = () => {
    setShowCompanyDetailsModal(false);
    setSelectedCompany(null);
  };

  const handleUpdateCompanyStatus = (companyId, newStatus) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.id === companyId ? { ...company, status: newStatus } : company
      )
    );
    toast({
      title: "Company Status Updated!",
      description: `Company ID ${companyId} is now ${newStatus}.`,
      variant: newStatus === "Active" ? "success" : "default", // Assuming success variant
    });
  };

  return (
    <>
      <Helmet>
        <title>Manage Companies - InsureHub Admin</title>
        <meta
          name="description"
          content="Manage and onboard insurance companies on the InsureHub platform."
        />
      </Helmet>

      <div className="pt-4 pb-8 md:pt-6 md:pb-12">
        <Container>
          <FadeIn direction="up">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="heading-2 text-insurance-neutral-dark mb-2">
                  Manage Companies
                </h1>
                <p className="text-gray-600">
                  Oversee all insurance providers on InsureHub.
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <button className="btn-primary flex items-center">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add New Company
                </button>
                <button className="btn-outline-primary flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Export Data
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
                    placeholder="Search by company name, ID, contact, or email..."
                    className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-insurance-orange focus:border-insurance-orange outline-none transition-all duration-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 font-medium whitespace-nowrap">
                    Filter by Status:
                  </span>
                  <select
                    className="py-2 px-4 rounded-lg border border-gray-300 focus:ring-insurance-orange focus:border-insurance-orange outline-none transition-all duration-200"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending Review">Pending Review</option>
                    <option value="Rejected">Rejected</option> {/* New filter option */}
                  </select>
                </div>
              </div>

              {filteredCompanies.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                  <p className="text-lg font-medium mb-2">
                    No companies found matching your criteria.
                  </p>
                  <p className="text-sm">
                    Try adjusting your search or filters.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCompanies.map((company) => (
                    <div
                      key={company.id}
                      className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-bold text-insurance-neutral-dark">
                            {company.name}
                          </h3>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(
                              company.status
                            )}`}
                          >
                            {getStatusIcon(company.status)} {company.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">
                          Company ID:{" "}
                          <span className="font-medium text-gray-700">
                            {company.id}
                          </span>
                        </p>

                        <div className="space-y-2 text-sm text-gray-700 mb-4">
                          <p className="flex items-center">
                            <User className="w-4 h-4 mr-2 text-gray-400" />
                            {company.contactPerson}
                          </p>
                          <p className="flex items-center">
                            <Mail className="w-4 h-4 mr-2 text-gray-400" />
                            {company.email}
                          </p>
                          <p className="flex items-center">
                            <Package className="w-4 h-4 mr-2 text-gray-400" />
                            {company.productsCount} Products
                          </p>
                          <p className="flex items-center">
                            <FileCheck className="w-4 h-4 mr-2 text-gray-400" />
                            {company.activePolicies.toLocaleString()}{" "}
                            Active Policies
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-gray-100 pt-4 flex flex-wrap gap-2 justify-end">
                        <button
                          onClick={() => handleViewCompany(company)}
                          className="text-insurance-orange hover:text-insurance-orange-dark font-medium py-1 px-3 rounded-md"
                        >
                          View Details
                        </button>

                        {company.status === "Pending Review" && (
                          <>
                            <button
                              onClick={() => handleUpdateCompanyStatus(company.id, "Active")}
                              className="btn-success-outline flex items-center px-3 py-1 text-sm rounded-md"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" /> Accept
                            </button>
                            <button
                              onClick={() => handleUpdateCompanyStatus(company.id, "Rejected")}
                              className="btn-destructive-outline flex items-center px-3 py-1 text-sm rounded-md"
                            >
                              <XCircle className="w-4 h-4 mr-1" /> Reject
                            </button>
                          </>
                        )}

                        {company.status !== "Pending Review" && company.status !== "Rejected" && (
                          <button
                            onClick={() => handleUpdateCompanyStatus(
                                company.id,
                                company.status === "Active" ? "Inactive" : "Active"
                            )}
                            className={
                              company.status === "Active"
                                ? "btn-destructive-outline flex items-center px-3 py-1 text-sm rounded-md"
                                : "btn-success-outline flex items-center px-3 py-1 text-sm rounded-md"
                            }
                          >
                            {company.status === "Active" ? "Deactivate" : "Activate"}
                          </button>
                        )}
                        {/* Optionally add an Edit button here if not pending review or rejected */}
                        {company.status !== "Pending Review" && company.status !== "Rejected" && (
                             <button className="text-blue-600 hover:text-blue-800 font-medium py-1 px-3 rounded-md">
                                Edit
                            </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Company Details Modal */}
      {showCompanyDetailsModal && (
        <CompanyDetailsModal
          company={selectedCompany}
          onClose={handleCloseCompanyDetailsModal}
        />
      )}
    </>
  );
};

export default ManageCompanies;