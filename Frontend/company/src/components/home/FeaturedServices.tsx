
import { Shield, Book, Users, Search, Clock, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import FadeIn from '../animations/FadeIn';

const services = [
  {
    id: 1,
    name: 'Insurance Marketplace',
    description: 'Shop and compare quotes from multiple insurance providers for the best rates and coverage options.',
    icon: Search,
    href: '/marketplace',
    color: 'text-insurance-orange',
    bgColor: 'bg-insurance-orange-light'
  },
  {
    id: 2,
    name: 'Educational Resources',
    description: 'Access our library of articles, videos, and guides to better understand insurance products and terminology.',
    icon: Book,
    href: '/learning-hub',
    color: 'text-insurance-green-dark',
    bgColor: 'bg-insurance-green-light'
  },
  {
    id: 3,
    name: 'Company Profiles',
    description: 'Research detailed profiles and reviews of insurance companies to make informed decisions.',
    icon: Users,
    href: '/companies',
    color: 'text-insurance-orange',
    bgColor: 'bg-insurance-orange-light'
  },
  {
    id: 4,
    name: 'Claims Management',
    description: 'Streamline and track your insurance claims process with our easy-to-use management tools.',
    icon: Shield,
    href: '/claims-management',
    color: 'text-insurance-green-dark',
    bgColor: 'bg-insurance-green-light'
  },
  {
    id: 5,
    name: 'Quick Coverage',
    description: 'Get instant coverage for your assets with our expedited application and approval process.',
    icon: Clock,
    href: '/insure-it',
    color: 'text-insurance-orange',
    bgColor: 'bg-insurance-orange-light'
  },
  {
    id: 6,
    name: 'Payment Processing',
    description: 'Manage your premiums and make secure payments through our integrated payment system.',
    icon: CreditCard,
    href: '/dashboard',
    color: 'text-insurance-green-dark',
    bgColor: 'bg-insurance-green-light'
  }
];

const FeaturedServices = () => {
  return (
    <section className="py-20 bg-insurance-neutral/50">
      <Container>
        <FadeIn direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-insurance-green-light text-insurance-green-dark rounded-full mb-4">
              Our Services
            </span>
            <h2 className="heading-2 text-insurance-neutral-dark mb-6">
              Comprehensive Insurance Solutions
            </h2>
            <p className="body-text">
              We provide a wide range of services designed to simplify the insurance process and help you make informed decisions about your coverage needs.
            </p>
          </div>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <FadeIn key={service.id} direction="up" delay={100 * (index % 3)}>
              <Link to={service.href} className="group">
                <div className="glass-card h-full p-6 hover:translate-y-[-5px] transition-all duration-300">
                  <div className={`${service.bgColor} w-12 h-12 rounded-xl flex items-center justify-center mb-6`}>
                    <service.icon className={`${service.color}`} size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-insurance-neutral-dark mb-3 group-hover:text-insurance-orange transition-colors">
                    {service.name}
                  </h3>
                  <p className="body-text">
                    {service.description}
                  </p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedServices;
