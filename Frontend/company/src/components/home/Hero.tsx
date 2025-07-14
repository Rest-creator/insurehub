
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeIn from '../animations/FadeIn';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-white to-insurance-neutral min-h-screen flex items-center py-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -right-[10%] w-[80%] h-[80%] rounded-full bg-insurance-orange-light/30 blur-3xl"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-insurance-green-light/30 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 md:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <FadeIn direction="up">
              <span className="inline-block px-4 py-1.5 text-xs font-semibold text-insurance-orange bg-insurance-orange-light/50 backdrop-blur-sm rounded-full mb-6">
                Transforming Insurance
              </span>
            </FadeIn>
            
            <FadeIn direction="up" delay={100}>
              <h1 className="heading-2 text-insurance-neutral-dark mb-6">
                Simplifying Insurance for the <span className="text-insurance-orange">Everyday Person</span>
              </h1>
            </FadeIn>
            
            <FadeIn direction="up" delay={200}>
              <p className="body-text mb-8 text-lg">
                Discover, compare, and manage all your insurance needs in one place. 
                Our intelligent platform helps you find the perfect coverage tailored to your specific requirements.
              </p>
            </FadeIn>
            
            <FadeIn direction="up" delay={300}>
              <div className="flex flex-wrap gap-4">
                <Link to="/get-started" className="btn-primary inline-flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link to="/learning-hub" className="btn-ghost inline-flex items-center">
                  Learn More
                </Link>
              </div>
            </FadeIn>
          </div>
          
          <FadeIn direction="left" delay={400}>
            <div className="relative">
              <div className="relative z-10 glass-card p-6 shadow-xl overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-insurance-orange-light/10 to-insurance-green-light/10"></div>
                <div className="relative z-10">
                  <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden bg-gray-100 animate-float">
                    <img 
                      src="https://media.istockphoto.com/id/1295819436/photo/selective-focus-of-magnifying-glass-glasses-and-insurance-policy-letter-on-a-white-wooden.webp?a=1&b=1&s=612x612&w=0&k=20&c=oY7mTtRim2v8pav2C4xPnIoMcTEt6ETxI4V9fckGgK0=" 
                      alt="Insurance platform dashboard" 
                      className="object-cover w-full h-full rounded-xl"
                    />
                  </div>
                  <div className="mt-6 glass-card p-4 rounded-xl backdrop-blur-md">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-insurance-neutral-dark">Premium Plans</h3>
                      <span className="text-sm text-insurance-orange font-medium">4 options</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-insurance-orange/20 rounded-full w-full">
                        <div className="h-2 bg-insurance-orange rounded-full w-3/4"></div>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Basic</span>
                        <span className="text-gray-500">Premium</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-1/4 -right-10 glass-card p-4 shadow-lg rounded-xl animate-float z-20" style={{ animationDelay: "1s" }}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-insurance-green-light flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Instant Coverage</h4>
                    <p className="text-xs text-gray-500">Protected in minutes</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-10 -left-10 glass-card p-4 shadow-lg rounded-xl animate-float z-20" style={{ animationDelay: "1.5s" }}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-insurance-orange-light flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#E05A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 8V12" stroke="#E05A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 16H12.01" stroke="#E05A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">24/7 Support</h4>
                    <p className="text-xs text-gray-500">Always available</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default Hero;
