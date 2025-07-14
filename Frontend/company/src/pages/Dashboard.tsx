import { Helmet } from "react-helmet-async";
import {
  Home,
  Car,
  Heart,
  Shield,
  FileText,
  CreditCard,
  Bell,
  Calendar,
  BarChart2,
  TrendingUp,
  TrendingDown,
  Clock,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/ui/Container";
import FadeIn from "../components/animations/FadeIn";
import Server from "@/components/server/Server";
import { useEffect, useState } from "react";
import PolicyCard from "@/components/services/PolicyCard";

const Dashboard = () => {
  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;
  const [userStats, setUserStats] = useState(null);
  const [policies, setPolicies] = useState([]);

  const getUserStats = () => {
    Server.getUserStats(user?.email)
      .then((response) => {
        console.log(response.data);
        setUserStats(response.data);
        setPolicies(response.data.policies);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserStats();
  }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard - InsureHub</title>
        <meta
          name="description"
          content="Manage all your insurance policies, view coverage details, and track claims from one central dashboard."
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
                    Welcome back, {user?.name}!
                  </h1>
                  <p className="text-gray-600">
                    Here's an overview of your insurance portfolio
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-3">
                  <button className="btn-outline-primary flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    View Reports
                  </button>
                  <button className="btn-primary flex items-center">
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
                    <span className="ml-2 bg-white text-insurance-orange text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      3
                    </span>
                  </button>
                </div>
              </div>
            </FadeIn>
          </Container>
        </div>

        <section className="py-8">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FadeIn direction="up" delay={100}>
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
                      <p className="text-3xl font-bold text-insurance-neutral-dark">
                        {userStats?.active_policies_count || 0}
                      </p>
                      <p className="text-sm text-gray-500">Policies</p>
                    </div>
                    <div className="flex items-center text-insurance-green-dark">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">+1 this year</span>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={200}>
                <div className="glass-card p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-insurance-neutral-dark">
                      Monthly Premium
                    </h2>
                    <div className="w-10 h-10 rounded-full bg-insurance-orange-light flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-insurance-orange" />
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-bold text-insurance-neutral-dark">
                        {userStats?.total_monthly_payments || 0}
                      </p>
                      <p className="text-sm text-gray-500">Total monthly</p>
                    </div>
                    <div className="flex items-center text-insurance-green-dark">
                      <TrendingDown className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">
                        -5% from last year
                      </span>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={300}>
                <div className="glass-card p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-insurance-neutral-dark">
                      Active Claims
                    </h2>
                    <div className="w-10 h-10 rounded-full bg-insurance-orange-light flex items-center justify-center">
                      <Shield className="w-5 h-5 text-insurance-orange" />
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-bold text-insurance-neutral-dark">
                        {userStats?.active_claims_count || 0}
                      </p>
                      <p className="text-sm text-gray-500">In progress</p>
                    </div>
                    <div className="flex items-center text-yellow-600">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Processing</span>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={400}>
                <div className="glass-card p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-insurance-neutral-dark">
                      Coverage Value
                    </h2>
                    <div className="w-10 h-10 rounded-full bg-insurance-orange-light flex items-center justify-center">
                      <BarChart2 className="w-5 h-5 text-insurance-orange" />
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-bold text-insurance-neutral-dark">
                        {userStats?.total_coverage_value || 0}
                      </p>
                      <p className="text-sm text-gray-500">Total coverage</p>
                    </div>
                    <div className="flex items-center text-insurance-green-dark">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Optimal</span>
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
              <FadeIn direction="up" className="lg:col-span-2">
                <div className="glass-card rounded-xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-insurance-neutral-dark">
                      Your Insurance Policies
                    </h2>
                  </div>
                  <PolicyCard policies={policies} />
                  <div className="p-4 bg-gray-50 text-center">
                    <button className="text-insurance-orange hover:text-insurance-orange-dark font-medium">
                      View All Policies
                    </button>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={100}>
                <div className="space-y-8">
                  <div className="glass-card rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                      <h2 className="text-xl font-semibold text-insurance-neutral-dark">
                        Upcoming Payments
                      </h2>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between p-3 bg-insurance-orange/5 rounded-lg">
                        <div className="flex items-center">
                          <Car className="w-5 h-5 text-insurance-orange mr-3" />
                          <div>
                            <p className="text-sm font-medium text-insurance-neutral-dark">
                              Auto Insurance
                            </p>
                            <p className="text-xs text-gray-500">
                              May 15, 2023
                            </p>
                          </div>
                        </div>
                        <p className="font-semibold text-insurance-neutral-dark">
                          $95.00
                        </p>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <Home className="w-5 h-5 text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-insurance-neutral-dark">
                              Home Insurance
                            </p>
                            <p className="text-xs text-gray-500">
                              June 01, 2023
                            </p>
                          </div>
                        </div>
                        <p className="font-semibold text-insurance-neutral-dark">
                          $145.00
                        </p>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <Heart className="w-5 h-5 text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-insurance-neutral-dark">
                              Health Insurance
                            </p>
                            <p className="text-xs text-gray-500">
                              June 15, 2023
                            </p>
                          </div>
                        </div>
                        <p className="font-semibold text-insurance-neutral-dark">
                          $89.00
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 text-center">
                      <button className="text-insurance-orange hover:text-insurance-orange-dark font-medium">
                        View Payment History
                      </button>
                    </div>
                  </div>

                  <div className="glass-card rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                      <h2 className="text-xl font-semibold text-insurance-neutral-dark">
                        Upcoming Renewals
                      </h2>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <Calendar className="w-5 h-5 text-insurance-orange mr-2" />
                        <h3 className="text-lg font-medium text-insurance-neutral-dark">
                          Policy Renewal Calendar
                        </h3>
                      </div>

                      <div className="space-y-4 mt-4">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-insurance-orange mr-3"></div>
                          <p className="text-sm text-gray-600 flex-grow">
                            Auto Insurance
                          </p>
                          <p className="text-sm font-medium text-insurance-neutral-dark">
                            May 15, 2023
                          </p>
                        </div>

                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-insurance-green mr-3"></div>
                          <p className="text-sm text-gray-600 flex-grow">
                            Home Insurance
                          </p>
                          <p className="text-sm font-medium text-insurance-neutral-dark">
                            Aug 28, 2023
                          </p>
                        </div>

                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                          <p className="text-sm text-gray-600 flex-grow">
                            Health Insurance
                          </p>
                          <p className="text-sm font-medium text-insurance-neutral-dark">
                            Nov 02, 2023
                          </p>
                        </div>

                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-purple-500 mr-3"></div>
                          <p className="text-sm text-gray-600 flex-grow">
                            Life Insurance
                          </p>
                          <p className="text-sm font-medium text-insurance-neutral-dark">
                            Mar 14, 2024
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </Container>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Dashboard;
