import React from "react";
import { Helmet } from "react-helmet-async";
import { FileText, DownloadCloud, ChevronRight } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/ui/Container";
import FadeIn from "../components/animations/FadeIn";

const mockReports = [
  {
    id: 1,
    title: "Q1 2025 Financial Performance",
    date: "2025-04-10",
    summary: "Comprehensive overview of financial performance for the first quarter of 2025, including revenue, expenses, and profit margins. Key growth areas identified.",
    category: "Financial",
    status: "Finalized",
  },
  {
    id: 2,
    title: "Customer Satisfaction Survey Results H1 2025",
    date: "2025-06-25",
    summary: "Detailed analysis of customer feedback, satisfaction scores, and areas for service improvement based on surveys conducted in the first half of 2025.",
    category: "Customer Experience",
    status: "Pending Review",
  },
  {
    id: 3,
    title: "Annual Policy Growth Report 2024",
    date: "2025-01-20",
    summary: "Annual report detailing the growth in active policies across all insurance types for the year 2024, highlighting trends and market penetration.",
    category: "Policy & Growth",
    status: "Finalized",
  },
  {
    id: 4,
    title: "Claims Analysis Report May 2025",
    date: "2025-06-05",
    summary: "Monthly report analyzing claims data, including claim types, processing times, and settlement values for May 2025. Identifies common claim patterns.",
    category: "Claims Management",
    status: "Finalized",
  },
  {
    id: 5,
    title: "Employee Engagement & Productivity Study 2025",
    date: "2025-07-10",
    summary: "Insights into employee engagement levels, productivity metrics, and recommendations for fostering a more positive and efficient work environment.",
    category: "Human Resources",
    status: "Draft",
  },
  {
    id: 6,
    title: "Market Competitor Analysis Q2 2025",
    date: "2025-07-15",
    summary: "Strategic review of key competitors, their market share, product offerings, and pricing strategies in Q2 2025. Includes recommendations for competitive advantage.",
    category: "Market Research",
    status: "Pending Review",
  },
];

export default function CompanyReports() {
  return (
    <>
      <Helmet>
        <title>Company Reports - InsureHub</title>
        <meta
          name="description"
          content="Access detailed company reports and analytics for InsureHub, covering financial performance, customer insights, and operational metrics."
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
                    Company Reports
                  </h1>
                  <p className="text-gray-600">
                    Access and manage all official company reports and analytics.
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <button className="btn-primary flex items-center">
                    <DownloadCloud className="w-4 h-4 mr-2" />
                    Download All Reports
                  </button>
                </div>
              </div>
            </FadeIn>
          </Container>
        </div>

        <section className="py-8">
          <Container>
            <FadeIn direction="up">
              <div className="glass-card rounded-xl overflow-hidden p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-insurance-neutral-dark mb-4">
                    Available Reports ({mockReports.length})
                  </h2>
                  <p className="text-gray-600">
                    Browse through various reports covering financial, operational, and strategic aspects of InsureHub.
                  </p>
                </div>

                <div className="grid gap-6">
                  {mockReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
                    >
                      <div className="flex items-center mb-3 sm:mb-0">
                        <FileText className="w-6 h-6 text-insurance-orange mr-4 flex-shrink-0" />
                        <div>
                          <h3 className="text-lg font-medium text-insurance-neutral-dark">
                            {report.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {report.category} | {report.date}
                          </p>
                          <p className="text-sm text-gray-700 mt-1">{report.summary}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 sm:ml-4 flex-shrink-0">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          report.status === "Finalized" ? "bg-green-100 text-green-700" :
                          report.status === "Pending Review" ? "bg-yellow-100 text-yellow-700" :
                          "bg-blue-100 text-blue-700"
                        }`}>
                          {report.status}
                        </span>
                        <button className="text-insurance-orange hover:text-insurance-orange-dark flex items-center group">
                          View Details
                          <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </Container>
        </section>

        <Footer />
      </main>
    </>
  );
}