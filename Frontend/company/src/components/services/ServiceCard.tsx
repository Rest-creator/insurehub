
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeIn from '../animations/FadeIn';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color: string;
  bgColor: string;
  index: number;
  features?: string[];
}

const ServiceCard = ({ 
  title, 
  description, 
  icon: Icon, 
  href, 
  color, 
  bgColor, 
  index,
  features = [] 
}: ServiceCardProps) => {
  return (
    <FadeIn direction="up" delay={100 * (index % 3)}>
      <div className="glass-card h-full transition-all duration-300 hover:translate-y-[-5px] group">
        <div className="p-8">
          <div className={`${bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`${color}`} size={28} />
          </div>
          
          <h3 className="text-2xl font-semibold text-insurance-neutral-dark mb-4 group-hover:text-insurance-orange transition-colors">
            {title}
          </h3>
          
          <p className="body-text mb-6">
            {description}
          </p>
          
          {features.length > 0 && (
            <ul className="space-y-2 mb-8">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <svg className="w-5 h-5 text-insurance-orange mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          )}
          
          <div className="mt-auto">
            <Link 
              to={href} 
              className="inline-flex items-center font-medium text-insurance-orange hover:text-insurance-orange-dark transition-colors"
            >
              Learn more
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default ServiceCard;
