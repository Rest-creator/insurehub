
import { Helmet } from 'react-helmet-async';
import { Building, FileText, Shield, Users, Briefcase, TrendingUp, BarChart } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Container from '../components/ui/Container';
import FadeIn from '../components/animations/FadeIn';

const programs = [
  {
    id: 1,
    title: "Small Business Complete",
    description: "Comprehensive insurance package designed specifically for small businesses with up to 50 employees.",
    icon: Building,
    features: [
      "General liability coverage up to $2M",
      "Property insurance for business assets",
      "Business interruption protection",
      "Workers' compensation",
      "Cyber liability protection"
    ],
    industries: ["Retail", "Professional Services", "Food Service", "Healthcare"]
  },
  {
    id: 2,
    title: "Enterprise Risk Management",
    description: "Customized risk management solutions for large corporations with complex insurance needs.",
    icon: BarChart,
    features: [
      "Directors & Officers liability",
      "Commercial property portfolio coverage",
      "Global liability protection",
      "Supply chain interruption insurance",
      "Crisis management response"
    ],
    industries: ["Manufacturing", "Technology", "Transportation", "Energy"]
  },
  {
    id: 3,
    title: "Startup Shield",
    description: "Specialized coverage package for early-stage companies and growing startups with unique risks.",
    icon: TrendingUp,
    features: [
      "Errors & Omissions coverage",
      "Intellectual property protection",
      "Key person insurance",
      "Seed-round to IPO coverage scaling",
      "Investor lawsuit protection"
    ],
    industries: ["Technology", "Biotech", "Fintech", "E-commerce"]
  },
  {
    id: 4,
    title: "Professional Practice Protection",
    description: "Tailored insurance solutions for professional service providers and licensed practitioners.",
    icon: Briefcase,
    features: [
      "Professional liability/malpractice",
      "License defense coverage",
      "Client data breach protection",
      "Business premises coverage",
      "Employee dishonesty protection"
    ],
    industries: ["Legal", "Medical", "Accounting", "Consulting"]
  }
];

const CommercialPrograms = () => {
  return (
    <>
      <Helmet>
        <title>Commercial Insurance Programs - InsureHub</title>
        <meta name="description" content="Explore InsureHub's comprehensive commercial insurance programs designed for businesses of all sizes and industries." />
      </Helmet>
      
      <main className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-br from-white to-insurance-neutral/50">
          <Container>
            <FadeIn direction="up">
              <div className="text-center max-w-3xl mx-auto">
                <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-insurance-orange-light text-insurance-orange rounded-full mb-6">
                  Commercial Programs
                </span>
                <h1 className="heading-1 text-insurance-neutral-dark mb-6">
                  Business Insurance Solutions
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Comprehensive coverage programs designed to protect businesses of all sizes and industries.
                </p>
              </div>
            </FadeIn>
          </Container>
        </div>
        
        <section className="py-16">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {programs.map((program, index) => (
                <FadeIn key={program.id} direction="up" delay={index * 100}>
                  <div className="glass-card rounded-xl overflow-hidden hover:shadow-lg transition-shadow h-full">
                    <div className="p-8">
                      <div className="flex items-center mb-6">
                        <div className="w-14 h-14 rounded-full bg-insurance-orange-light flex items-center justify-center mr-4">
                          <program.icon className="w-7 h-7 text-insurance-orange" />
                        </div>
                        <h3 className="text-2xl font-semibold text-insurance-neutral-dark">{program.title}</h3>
                      </div>
                      
                      <p className="text-gray-600 mb-6 text-lg">{program.description}</p>
                      
                      <div className="mb-6">
                        <h4 className="text-lg font-medium text-insurance-neutral-dark mb-3 flex items-center">
                          <Shield className="w-5 h-5 mr-2 text-insurance-green-dark" />
                          Key Features
                        </h4>
                        <ul className="space-y-2">
                          {program.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <svg className="w-5 h-5 text-insurance-orange mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-medium text-insurance-neutral-dark mb-3 flex items-center">
                          <Building className="w-5 h-5 mr-2 text-insurance-green-dark" />
                          Ideal For
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {program.industries.map((industry, idx) => (
                            <span key={idx} className="inline-block px-3 py-1 bg-insurance-green-light/50 text-insurance-green-dark text-sm rounded-full">
                              {industry}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-8 flex justify-between items-center pt-6 border-t border-gray-100">
                        <button className="btn-outline-primary">Learn More</button>
                        <button className="btn-primary">Request Quote</button>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>
        
        <section className="py-16 bg-insurance-neutral/50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <FadeIn direction="right">
                <div>
                  <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-insurance-green-light text-insurance-green-dark rounded-full mb-4">
                    Custom Solutions
                  </span>
                  <h2 className="heading-2 text-insurance-neutral-dark mb-6">
                    Tailored Commercial Insurance
                  </h2>
                  <p className="body-text mb-8">
                    We understand that every business is unique. Our dedicated commercial insurance specialists work closely with you to create customized protection strategies.
                  </p>
                  
                  <div className="space-y-6 mb-8">
                    <div className="glass-card p-4">
                      <h3 className="font-semibold text-insurance-neutral-dark flex items-center mb-2">
                        <FileText className="w-5 h-5 mr-2 text-insurance-orange" />
                        Risk Assessment
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Comprehensive analysis of your business operations to identify potential risks and coverage needs.
                      </p>
                    </div>
                    
                    <div className="glass-card p-4">
                      <h3 className="font-semibold text-insurance-neutral-dark flex items-center mb-2">
                        <Users className="w-5 h-5 mr-2 text-insurance-orange" />
                        Industry Expertise
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Industry-specific knowledge to ensure your coverage addresses unique sector challenges.
                      </p>
                    </div>
                    
                    <div className="glass-card p-4">
                      <h3 className="font-semibold text-insurance-neutral-dark flex items-center mb-2">
                        <TrendingUp className="w-5 h-5 mr-2 text-insurance-orange" />
                        Growth Planning
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Scalable insurance solutions that evolve with your business as it grows and changes.
                      </p>
                    </div>
                  </div>
                  
                  <button className="btn-primary inline-block">
                    Schedule a Consultation
                  </button>
                </div>
              </FadeIn>
              
              <FadeIn direction="left">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Business consultation" 
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              </FadeIn>
            </div>
          </Container>
        </section>
        
        <section className="py-16">
          <Container>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <FadeIn direction="up">
                <h2 className="heading-2 text-insurance-neutral-dark mb-6">
                  Why Choose InsureHub for Business Insurance
                </h2>
                <p className="text-lg text-gray-600">
                  We deliver exceptional value through our comprehensive approach to commercial insurance.
                </p>
              </FadeIn>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FadeIn direction="up" delay={100}>
                <div className="glass-card p-6 text-center rounded-xl h-full">
                  <div className="w-16 h-16 mx-auto rounded-full bg-insurance-orange-light flex items-center justify-center mb-4">
                    <Shield className="w-8 h-8 text-insurance-orange" />
                  </div>
                  <h3 className="text-xl font-semibold text-insurance-neutral-dark mb-3">Superior Coverage</h3>
                  <p className="text-gray-600">
                    Comprehensive protection options designed to address all aspects of business risk.
                  </p>
                </div>
              </FadeIn>
              
              <FadeIn direction="up" delay={200}>
                <div className="glass-card p-6 text-center rounded-xl h-full">
                  <div className="w-16 h-16 mx-auto rounded-full bg-insurance-orange-light flex items-center justify-center mb-4">
                    <BarChart className="w-8 h-8 text-insurance-orange" />
                  </div>
                  <h3 className="text-xl font-semibold text-insurance-neutral-dark mb-3">Competitive Pricing</h3>
                  <p className="text-gray-600">
                    Access to multiple carriers allows us to secure the best rates for your specific needs.
                  </p>
                </div>
              </FadeIn>
              
              <FadeIn direction="up" delay={300}>
                <div className="glass-card p-6 text-center rounded-xl h-full">
                  <div className="w-16 h-16 mx-auto rounded-full bg-insurance-orange-light flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-insurance-orange" />
                  </div>
                  <h3 className="text-xl font-semibold text-insurance-neutral-dark mb-3">Dedicated Support</h3>
                  <p className="text-gray-600">
                    Experienced commercial insurance specialists available to assist with questions and claims.
                  </p>
                </div>
              </FadeIn>
            </div>
            
            <div className="mt-12 text-center">
              <FadeIn direction="up">
                <a href="/contact" className="btn-primary inline-block">
                  Get Started
                </a>
              </FadeIn>
            </div>
          </Container>
        </section>
        
        <Footer />
      </main>
    </>
  );
};

export default CommercialPrograms;
