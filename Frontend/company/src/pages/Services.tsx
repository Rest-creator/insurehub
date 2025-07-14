
import { Helmet } from 'react-helmet-async';
import { 
  Search, 
  Book, 
  Users, 
  Shield, 
  Clock, 
  CreditCard, 
  Laptop, 
  Image, 
  FileText,
  PieChart 
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Container from '../components/ui/Container';
import ServiceCard from '../components/services/ServiceCard';
import FadeIn from '../components/animations/FadeIn';

const services = [
  {
    title: 'Insurance Marketplace',
    description: 'Shop and compare quotes from multiple insurance providers for the best rates and coverage options.',
    icon: Search,
    href: '/marketplace',
    color: 'text-insurance-orange',
    bgColor: 'bg-insurance-orange-light',
    features: [
      'Compare quotes from 50+ providers',
      'Filter by coverage type and price',
      'AI-powered recommendations',
      'Instant quotes and coverage'
    ]
  },
  {
    title: 'Educational Resources',
    description: 'Access our library of articles, videos, and guides to better understand insurance products and terminology.',
    icon: Book,
    href: '/learning-hub',
    color: 'text-insurance-green-dark',
    bgColor: 'bg-insurance-green-light',
    features: [
      'Beginner-friendly guides',
      'In-depth product comparisons',
      'Video tutorials and webinars',
      'Insurance glossary'
    ]
  },
  {
    title: 'Company Profiles',
    description: 'Research detailed profiles and reviews of insurance companies to make informed decisions.',
    icon: Users,
    href: '/companies',
    color: 'text-insurance-orange',
    bgColor: 'bg-insurance-orange-light',
    features: [
      'Financial stability ratings',
      'Customer satisfaction scores',
      'Product specializations',
      'Claims process details'
    ]
  },
  {
    title: 'Claims Management',
    description: 'Streamline and track your insurance claims process with our easy-to-use management tools.',
    icon: Shield,
    href: '/claims-management',
    color: 'text-insurance-green-dark',
    bgColor: 'bg-insurance-green-light',
    features: [
      'Simplified claim submission',
      'Real-time status tracking',
      'Document upload and storage',
      'Direct communication with adjusters'
    ]
  },
  {
    title: 'Rapid Coverage',
    description: 'Get instant coverage for your assets with our expedited application and approval process.',
    icon: Clock,
    href: '/insure-it',
    color: 'text-insurance-orange',
    bgColor: 'bg-insurance-orange-light',
    features: [
      'Image-based assessment',
      'Same-day coverage options',
      'Minimal documentation required',
      'Mobile-friendly process'
    ]
  },
  {
    title: 'Payment Processing',
    description: 'Manage your premiums and make secure payments through our integrated payment system.',
    icon: CreditCard,
    href: '/dashboard',
    color: 'text-insurance-green-dark',
    bgColor: 'bg-insurance-green-light',
    features: [
      'Multiple payment options',
      'Automated billing reminders',
      'Payment history tracking',
      'Secure transactions'
    ]
  },
  {
    title: 'Digital Dashboard',
    description: 'Monitor and manage all your insurance policies in one centralized, easy-to-use dashboard.',
    icon: Laptop,
    href: '/dashboard',
    color: 'text-insurance-orange',
    bgColor: 'bg-insurance-orange-light',
    features: [
      'All policies in one view',
      'Coverage expiration alerts',
      'Document storage',
      'Policy comparison tools'
    ]
  },
  {
    title: 'Visual Insurance',
    description: 'Simply take a photo of what you want to insure and get instant quotes and coverage options.',
    icon: Image,
    href: '/insure-it',
    color: 'text-insurance-green-dark',
    bgColor: 'bg-insurance-green-light',
    features: [
      'AI-powered image recognition',
      'Immediate value assessment',
      'Multiple coverage options',
      'Simplified underwriting'
    ]
  },
  {
    title: 'Commercial Programs',
    description: 'Comprehensive insurance solutions tailored specifically for businesses of all sizes.',
    icon: FileText,
    href: '/commercial-programs',
    color: 'text-insurance-orange',
    bgColor: 'bg-insurance-orange-light',
    features: [
      'Customized business coverage',
      'Industry-specific solutions',
      'Risk assessment tools',
      'Bulk policy management'
    ]
  }
];

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Services - InsureHub</title>
        <meta name="description" content="Explore InsureHub's comprehensive range of insurance services designed to simplify your insurance experience." />
      </Helmet>
      
      <main className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-br from-white to-insurance-neutral/50">
          <Container>
            <FadeIn direction="up">
              <div className="text-center max-w-3xl mx-auto">
                <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-insurance-green-light text-insurance-green-dark rounded-full mb-6">
                  Our Services
                </span>
                <h1 className="heading-1 text-insurance-neutral-dark mb-6">
                  Comprehensive Insurance Solutions
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Discover our suite of tools and services designed to simplify every aspect of your insurance experience.
                </p>
              </div>
            </FadeIn>
          </Container>
        </div>
        
        <section className="py-20">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard 
                  key={index}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  href={service.href}
                  color={service.color}
                  bgColor={service.bgColor}
                  index={index}
                  features={service.features}
                />
              ))}
            </div>
          </Container>
        </section>
        
        <section className="py-20 bg-insurance-neutral/50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <FadeIn direction="right">
                <div>
                  <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-insurance-orange-light text-insurance-orange rounded-full mb-4">
                    Custom Solutions
                  </span>
                  <h2 className="heading-2 text-insurance-neutral-dark mb-6">
                    Need Something More Tailored?
                  </h2>
                  <p className="body-text mb-8">
                    Beyond our standard services, we offer customized insurance solutions for unique situations and requirements. Our insurance experts can work with you to develop a personalized plan that addresses your specific needs.
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-insurance-orange mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="body-text">Complex risk assessment and management</p>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-insurance-orange mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="body-text">Multi-policy coordination and optimization</p>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-insurance-orange mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="body-text">Specialized coverage for unique assets or businesses</p>
                    </div>
                  </div>
                  <a href="/contact" className="btn-primary inline-block">
                    Contact For Custom Solutions
                  </a>
                </div>
              </FadeIn>
              
              <FadeIn direction="left">
                <div className="glass-card p-8 rounded-2xl">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-insurance-green-light rounded-full flex items-center justify-center">
                      <PieChart className="text-insurance-green-dark" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-insurance-neutral-dark">
                      Service Statistics
                    </h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">Customer Satisfaction</span>
                        <span className="text-sm font-medium text-insurance-orange">96%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-insurance-orange rounded-full" style={{ width: '96%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">Time Saved</span>
                        <span className="text-sm font-medium text-insurance-green-dark">85%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-insurance-green rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">Cost Reduction</span>
                        <span className="text-sm font-medium text-insurance-orange">32%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-insurance-orange rounded-full" style={{ width: '32%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">Claim Resolution Speed</span>
                        <span className="text-sm font-medium text-insurance-green-dark">78%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-insurance-green rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-insurance-neutral rounded-xl">
                    <p className="text-sm text-gray-600">
                      Based on data collected from customers over the past months. Satisfaction rates compared to traditional insurance processes.
                    </p>
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

export default Services;
