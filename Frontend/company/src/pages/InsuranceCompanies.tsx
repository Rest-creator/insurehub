import { Helmet } from "react-helmet-async";
import { Star, Users, Shield, Clock, Check, Filter } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/ui/Container";
import FadeIn from "../components/animations/FadeIn";
import { useEffect, useState } from "react";
import Server from "@/components/server/Server";

const companies = [];

const InsuranceCompanies = () => {
  const [companies, setCompanies] = useState([]);

  const fetchCompanies = async () => {
    // Fetch data from the API
    Server.getCompanies()
      .then((response) => {
        setCompanies(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCompanies();
  }, []);
  return (
    <>
      <Helmet>
        <title>Insurance Companies - InsureHub</title>
        <meta
          name="description"
          content="Research and compare top insurance companies, their offerings, financial strength, and customer satisfaction ratings."
        />
      </Helmet>

      <main className="min-h-screen flex flex-col">
        <Navbar />

        <div className="pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-br from-white to-insurance-neutral/50">
          <Container>
            <FadeIn direction="up">
              <div className="text-center max-w-3xl mx-auto">
                <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-insurance-orange-light text-insurance-orange rounded-full mb-6">
                  Insurance Companies
                </span>
                <h1 className="heading-1 text-insurance-neutral-dark mb-6">
                  Research Reliable Insurance Providers
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Compare ratings, financial strength, and customer satisfaction
                  to find trusted insurance partners.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={100}>
              <div className="mt-10 max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search insurance companies..."
                    className="w-full py-3 px-5 pr-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-insurance-orange/20 focus:border-insurance-orange/20"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-insurance-orange">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
                <button className="flex items-center justify-center px-4 py-3 bg-white rounded-xl shadow-sm border border-gray-200 text-gray-700 hover:bg-insurance-orange/5 hover:border-insurance-orange/30">
                  <Filter className="h-5 w-5 mr-2" />
                  <span>Filter Companies</span>
                </button>
              </div>
            </FadeIn>
          </Container>
        </div>

        <section className="py-16">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {companies.length > 0 && companies.map((company, index) => (
                <FadeIn key={company.id} direction="up" delay={index * 100}>
                  <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      <div className="flex-shrink-0 w-24 h-24 mx-auto md:mx-0">
                        <img
                          src={company.logo}
                          alt={`${company.name} logo`}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>

                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                          <h3 className="text-xl font-semibold text-insurance-neutral-dark">
                            {company.name}
                          </h3>
                          <div className="flex items-center mt-2 md:mt-0">
                            <div className="flex items-center bg-insurance-green-light/50 text-insurance-green-dark px-2 py-1 rounded-md text-sm mr-3">
                              <span className="mr-1">{company.rating}</span>
                              <Star className="w-4 h-4" />
                            </div>
                            <span className="text-sm text-gray-500">
                              Est. {company.founded}
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-4">
                          {company.description}
                        </p>

                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            Specialties:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {company.coverage_areas?.map((specialty, idx) => (
                              <span
                                key={idx}
                                className="inline-block px-2 py-1 text-xs bg-insurance-orange/10 text-insurance-orange rounded-full"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                          <div>
                            <p className="text-sm text-gray-500 flex items-center">
                              <Check className="w-4 h-4 mr-1 text-insurance-green-dark" />
                              Claims Satisfaction
                            </p>
                            <p className="text-insurance-neutral-dark font-bold">
                              {company.claimsSatisfaction}%
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 flex items-center">
                              <Users className="w-4 h-4 mr-1 text-insurance-green-dark" />
                              Customer Retention
                            </p>
                            <p className="text-insurance-neutral-dark font-bold">
                              {company.customerRetention}%
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 flex items-center">
                              <Shield className="w-4 h-4 mr-1 text-insurance-green-dark" />
                              Financial Strength
                            </p>
                            <p className="text-insurance-neutral-dark font-bold">
                              {company.financialStrength}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 text-right">
                          <button className="btn-outline-primary text-sm">
                            View Full Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button className="btn-outline-primary inline-flex items-center">
                Load More Companies
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </Container>
        </section>

        <section className="py-16 bg-insurance-neutral/50">
          <Container>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <FadeIn direction="up">
                <h2 className="heading-2 text-insurance-neutral-dark mb-6">
                  How We Rate Insurance Companies
                </h2>
                <p className="text-lg text-gray-600">
                  Our comprehensive evaluation process considers multiple
                  factors to help you make informed decisions about insurance
                  providers.
                </p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FadeIn direction="up" delay={100}>
                <div className="glass-card p-6 rounded-xl text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-insurance-orange-light flex items-center justify-center mb-4">
                    <Star className="w-8 h-8 text-insurance-orange" />
                  </div>
                  <h3 className="text-lg font-semibold text-insurance-neutral-dark mb-2">
                    Customer Reviews
                  </h3>
                  <p className="text-gray-600">
                    Aggregate feedback from verified customers to assess overall
                    satisfaction and service quality.
                  </p>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={200}>
                <div className="glass-card p-6 rounded-xl text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-insurance-orange-light flex items-center justify-center mb-4">
                    <Shield className="w-8 h-8 text-insurance-orange" />
                  </div>
                  <h3 className="text-lg font-semibold text-insurance-neutral-dark mb-2">
                    Financial Stability
                  </h3>
                  <p className="text-gray-600">
                    Analysis of financial strength ratings from major
                    independent rating agencies.
                  </p>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={300}>
                <div className="glass-card p-6 rounded-xl text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-insurance-orange-light flex items-center justify-center mb-4">
                    <Clock className="w-8 h-8 text-insurance-orange" />
                  </div>
                  <h3 className="text-lg font-semibold text-insurance-neutral-dark mb-2">
                    Claims Process
                  </h3>
                  <p className="text-gray-600">
                    Evaluation of claims handling speed, fairness, and overall
                    customer experience.
                  </p>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={400}>
                <div className="glass-card p-6 rounded-xl text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-insurance-orange-light flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-insurance-orange" />
                  </div>
                  <h3 className="text-lg font-semibold text-insurance-neutral-dark mb-2">
                    Coverage Options
                  </h3>
                  <p className="text-gray-600">
                    Assessment of policy options, customization, and specialized
                    coverage availability.
                  </p>
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

export default InsuranceCompanies;
