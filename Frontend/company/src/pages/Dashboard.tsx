import { Helmet } from "react-helmet-async";
import {
  Shield,
  FileText,
  CreditCard,
  Bell,
  Calendar,
  BarChart2,
  TrendingUp,
  TrendingDown,
  Clock,
  Users,
  PlusCircle, // Added for the new policy button icon
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/ui/Container";
import FadeIn from "../components/animations/FadeIn";
import EditablePolicyCard from "./EditablePolicyCard";
import NotificationsModal from "../constants/NotificationsModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // Static mock data
  const companyStats = {
    total_clients: 1240,
    active_policies_count: 892,
    total_monthly_payments: "$74,230",
    active_claims_count: 32,
    total_coverage_value: "$12.5M",
    policy_growth: "+5.4%",
    premium_change: "-2.1%",
  };

  const [mockPolicies, setMockPolicies] = useState([
    {
      id: 1,
      type: "Auto Insurance",
      description: "Comprehensive coverage for vehicles, including collision, liability, and uninsured motorist protection.",
      amount: "$95.00",
      coverage: "$50,000",
      status: "Active",
      due_date: "2025-05-15",
      clients: 450,
    },
    {
      id: 2,
      type: "Home Insurance",
      description: "Protection for your home and personal belongings against perils like fire, theft, and natural disasters.",
      amount: "$145.00",
      coverage: "$250,000",
      status: "Active",
      due_date: "2025-06-01",
      clients: 320,
    },
    {
      id: 3,
      type: "Health Insurance",
      description: "Medical coverage for individuals and families, including doctor visits, hospital stays, and prescription drugs.",
      amount: "$89.00",
      coverage: "$1,000,000",
      status: "Active",
      due_date: "2025-06-15",
      clients: 780,
    },
    {
      id: 4,
      type: "Life Insurance",
      description: "Financial protection for your loved ones in the event of your passing, offering peace of mind.",
      amount: "$50.00",
      coverage: "$500,000",
      status: "Active",
      due_date: "2025-07-01",
      clients: 210,
    },
    {
      id: 5,
      type: "Business Liability",
      description: "Protects businesses from claims of bodily injury, property damage, and advertising injury.",
      amount: "$299.00",
      coverage: "$1,000,000",
      status: "Active",
      due_date: "2025-08-01",
      clients: 85,
    },
    {
      id: 6,
      type: "Travel Insurance",
      description: "Coverage for unexpected events during travel, such as trip cancellations, medical emergencies, and lost luggage.",
      amount: "$35.00",
      coverage: "$10,000",
      status: "Active",
      due_date: "2025-09-01",
      clients: 150,
    },
  ]);

  const renewals = [
    {
      type: "Auto Insurance",
      date: "May 15, 2025",
      color: "bg-insurance-orange",
    },
    {
      type: "Home Insurance",
      date: "Aug 28, 2025",
      color: "bg-insurance-green",
    },
    { type: "Health Insurance", date: "Nov 02, 2025", color: "bg-blue-500" },
    { type: "Life Insurance", date: "Mar 14, 2026", color: "bg-purple-500" },
  ];

  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: "info", message: "New policy 'Cyber Security' added to offerings.", time: "5 minutes ago", read: false },
    { id: 2, type: "warning", message: "Client 'John Doe' policy #98765 due for renewal in 7 days.", time: "1 hour ago", read: false },
    { id: 3, type: "alert", message: "High-value claim initiated by 'Acme Corp' (ID: C-12345).", time: "3 hours ago", read: false },
    { id: 4, type: "info", message: "System update scheduled for July 20, 2025 at 02:00 AM CAT.", time: "Yesterday", read: true },
    { id: 5, type: "success", message: "Q2 Financial Report successfully generated.", time: "2 days ago", read: true },
  ]);

  // New state for the "Add New Policy" card that stays at the top
  const [newPolicyDraft, setNewPolicyDraft] = useState(null);

  const navigate = useNavigate();

  const handleUpdatePolicy = (updatedPolicy) => {
    // If the updated policy is the new policy draft, update it.
    // Otherwise, update existing mock policies.
    if (newPolicyDraft && updatedPolicy.id === newPolicyDraft.id) {
      setNewPolicyDraft(updatedPolicy);
    } else {
      setMockPolicies((prevPolicies) =>
        prevPolicies.map((policy) =>
          policy.id === updatedPolicy.id ? updatedPolicy : policy
        )
      );
    }
  };

  const handleDeletePolicy = (policyId) => {
    // If the deleted policy is the new policy draft, clear it.
    // Otherwise, delete from mock policies.
    if (newPolicyDraft && policyId === newPolicyDraft.id) {
      setNewPolicyDraft(null);
    } else {
      setMockPolicies((prevPolicies) =>
        prevPolicies.filter((policy) => policy.id !== policyId)
      );
    }
  };

  const handleAddNewPolicyClick = () => {
    if (!newPolicyDraft) { // Only create a new draft if one isn't already active
      setNewPolicyDraft({
        id: "new-draft-" + Date.now(), // Unique ID for the draft
        type: "New Policy",
        description: "Click to edit and add details for this new policy.",
        amount: "$0.00",
        coverage: "$0",
        status: "Draft",
        due_date: "", // No due date initially
        clients: 0,
        isNewDraft: true, // Flag to identify this as the special draft card
      });
    }
    // Optionally scroll to the policies section or highlight it if it's not visible
  };

  // Function to mark a notification as read
  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  // Function to clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(notif => !notif.read).length;

  // Combine new policy draft with existing policies for display
  const policiesToDisplay = newPolicyDraft ? [newPolicyDraft, ...mockPolicies] : mockPolicies;


  return (
    <>
      <Helmet>
        <title>Company Dashboard - InsureHub</title>
        <meta
          name="description"
          content="InsureHub admin dashboard. Monitor company-wide insurance performance, manage users, and access analytics in one place."
        />
      </Helmet>

      <main className="min-h-screen flex flex-col">
        <Navbar />

        <div className="pt-24 pb-8 md:pt-32 md:pb-12 bg-gradient-to-br from-white to-insurance-neutral/50">
          <Container>
            <FadeIn direction="up">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="heading-2 text-insurance-neutral-dark mb-2">
                    InsureHub Company Dashboard
                  </h1>
                  <p className="text-gray-600">
                    Company-wide insurance overview and operational metrics
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-3">
                  <button
                    className="btn-outline-primary flex items-center"
                    onClick={() => navigate("/company/reports")}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Company Reports
                  </button>
                  <button
                    className="btn-primary flex items-center relative"
                    onClick={() => setShowNotificationsModal(true)}
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
                    {unreadCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </FadeIn>
          </Container>
        </div>

        <section className="py-8">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Active Policies */}
              <FadeIn direction="up">
                <div className="glass-card p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-insurance-neutral-dark">
                      Active Policies
                    </h2>
                    <div className="w-10 h-10 rounded-full bg-insurance-orange-light flex items-center justify-center">
                      <FileText className="w-5 h-5 text-insurance-orange" />
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-bold">
                        {companyStats.active_policies_count}
                      </p>
                      <p className="text-sm text-gray-500">Total Policies</p>
                    </div>
                    <div className="flex items-center text-insurance-green-dark">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">
                        {companyStats.policy_growth}
                      </span>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Total Premium */}
              <FadeIn direction="up" delay={100}>
                <div className="glass-card p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Monthly Premium</h2>
                    <div className="w-10 h-10 rounded-full bg-insurance-orange-light flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-insurance-orange" />
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-bold">
                        {companyStats.total_monthly_payments}
                      </p>
                      <p className="text-sm text-gray-500">All Clients</p>
                    </div>
                    <div className="flex items-center text-red-500">
                      <TrendingDown className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">
                        {companyStats.premium_change}
                      </span>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Active Claims */}
              <FadeIn direction="up" delay={200}>
                <div className="glass-card p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Active Claims</h2>
                    <div className="w-10 h-10 rounded-full bg-insurance-orange-light flex items-center justify-center">
                      <Shield className="w-5 h-5 text-insurance-orange" />
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-bold">
                        {companyStats.active_claims_count}
                      </p>
                      <p className="text-sm text-gray-500">Ongoing</p>
                    </div>
                    <div className="flex items-center text-yellow-600">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">In Progress</span>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Total Coverage */}
              <FadeIn direction="up" delay={300}>
                <div className="glass-card p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Coverage Value</h2>
                    <div className="w-10 h-10 rounded-full bg-insurance-orange-light flex items-center justify-center">
                      <BarChart2 className="w-5 h-5 text-insurance-orange" />
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-bold">
                        {companyStats.total_coverage_value}
                      </p>
                      <p className="text-sm text-gray-500">
                        Across all Policies
                      </p>
                    </div>
                    <div className="flex items-center text-insurance-green-dark">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Healthy</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </Container>
        </section>

        <section className="py-8">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Policies List */}
              <FadeIn direction="up" className="lg:col-span-2">
                <div className="glass-card rounded-xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Company Policies</h2>
                    <button
                      className="btn-primary-lg flex items-center gap-2 transform transition-transform duration-200 hover:scale-105 active:scale-95" // Larger, more prominent button
                      onClick={handleAddNewPolicyClick}
                    >
                      <PlusCircle className="w-5 h-5" /> {/* New icon */}
                      Add New Policy
                    </button>
                  </div>
                  <EditablePolicyCard
                    policies={policiesToDisplay} // Pass combined policies
                    onUpdate={handleUpdatePolicy}
                    onDelete={handleDeletePolicy}
                  />
                  <div className="p-4 bg-gray-50 text-center">
                    <button className="text-insurance-orange hover:text-insurance-orange-dark font-medium">
                      View All Policies
                    </button>
                  </div>
                </div>
              </FadeIn>

              {/* Side Widgets */}
              <FadeIn direction="up" delay={100}>
                <div className="space-y-8">
                  {/* Manage Users */}
                  <div className="glass-card rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                      <h2 className="text-xl font-semibold">Manage Users</h2>
                    </div>
                    <div className="p-6 text-sm text-gray-600">
                      Total Clients:{" "}
                      <span className="font-semibold text-insurance-neutral-dark">
                        {companyStats.total_clients}
                      </span>
                    </div>
                    <div className="p-4 bg-gray-50 text-center">
                      <button className="text-insurance-orange hover:text-insurance-orange-dark font-medium">
                        Open User Manager
                      </button>
                    </div>
                  </div>

                  {/* Renewals */}
                  <div className="glass-card rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                      <h2 className="text-xl font-semibold">
                        Upcoming Renewals
                      </h2>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <Calendar className="w-5 h-5 text-insurance-orange mr-2" />
                        <h3 className="text-lg font-medium">
                          Renewal Timeline
                        </h3>
                      </div>
                      <div className="space-y-4 mt-4">
                        {renewals.map((r, idx) => (
                          <div key={idx} className="flex items-center">
                            <div
                              className={`w-2 h-2 rounded-full ${r.color} mr-3`}
                            ></div>
                            <p className="text-sm text-gray-600 flex-grow">
                              {r.type}
                            </p>
                            <p className="text-sm font-medium">{r.date}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </Container>
        </section>

        <Footer />

        {/* Notifications Modal */}
        {showNotificationsModal && (
          <NotificationsModal
            notifications={notifications}
            onClose={() => setShowNotificationsModal(false)}
            onMarkAsRead={markNotificationAsRead}
            onClearAll={clearAllNotifications}
          />
        )}
      </main>
    </>
  );
};

export default Dashboard;