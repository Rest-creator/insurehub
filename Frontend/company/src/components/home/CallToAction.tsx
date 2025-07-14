
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import FadeIn from '../animations/FadeIn';

const CallToAction = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-insurance-orange-light/20 blur-3xl"></div>
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-insurance-green-light/20 blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="glass-card overflow-hidden rounded-3xl">
          <div className="relative p-8 md:p-12 lg:p-16">
            <div className="absolute inset-0 bg-gradient-to-br from-insurance-orange-light/30 to-insurance-green-light/30"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <FadeIn direction="right">
                <div>
                  <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-white/70 backdrop-blur-sm text-insurance-orange rounded-full mb-6">
                    Get Protected Today
                  </span>
                  <h2 className="heading-2 text-insurance-neutral-dark mb-6">
                    Ready to Simplify Your Insurance Experience?
                  </h2>
                  <p className="body-text mb-8">
                    Join thousands of customers who trust our platform to find the right insurance coverage for their needs. Get started in minutes and enjoy peace of mind knowing you're properly protected.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/get-started" className="btn-primary inline-flex items-center">
                      Get Started Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <Link to="/learning-hub" className="btn-ghost inline-flex items-center">
                      Learn More
                    </Link>
                  </div>
                </div>
              </FadeIn>
              
              <FadeIn direction="left">
                <div className="lg:ml-auto">
                  <div className="glass-card rounded-2xl p-6 max-w-md mx-auto lg:mx-0 shadow-lg backdrop-blur-md bg-white/80">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-insurance-orange rounded-full flex items-center justify-center text-white">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20.42 4.58C19.76 3.91 18.95 3.39 18.05 3.05C17.15 2.71 16.19 2.56 15.21 2.63C14.23 2.69 13.3 2.96 12.45 3.41C11.6 3.86 10.86 4.48 10.27 5.23C9.67 4.48 8.92 3.86 8.07 3.41C7.22 2.96 6.29 2.69 5.31 2.63C4.33 2.56 3.36 2.71 2.46 3.05C1.56 3.39 0.75 3.91 0.08 4.58C0.03 4.64 0 4.71 0 4.79C0 4.86 0.03 4.93 0.08 4.99L10.27 15.18L20.42 4.99C20.47 4.93 20.5 4.86 20.5 4.79C20.5 4.71 20.47 4.64 20.42 4.58Z" fill="white"/>
                          <path d="M21.58 20.42C22.25 19.76 22.77 18.95 23.11 18.05C23.45 17.15 23.6 16.19 23.53 15.21C23.47 14.23 23.2 13.3 22.75 12.45C22.3 11.6 21.68 10.86 20.93 10.27C21.68 9.67 22.3 8.92 22.75 8.07C23.2 7.22 23.47 6.29 23.53 5.31C23.6 4.33 23.45 3.36 23.11 2.46C22.77 1.56 22.25 0.75 21.58 0.08C21.52 0.03 21.45 0 21.37 0C21.3 0 21.23 0.03 21.17 0.08L10.98 10.27L21.17 20.42C21.23 20.47 21.3 20.5 21.37 20.5C21.45 20.5 21.52 20.47 21.58 20.42Z" fill="white"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-insurance-neutral-dark">Customer Reviews</h3>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <blockquote className="mb-6">
                      <p className="text-gray-700 italic">
                        "InsureHub simplified my insurance search. I found better coverage at a lower rate in minutes, and their dashboard makes tracking my policies so easy."
                      </p>
                    </blockquote>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1559563628-42bc585dee3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWZyaWNhbiUyMGdpcmx8ZW58MHx8MHx8fDA%3D" 
                          alt="Customer portrait" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-insurance-neutral-dark">Sarah Mugano</p>
                        <p className="text-xs text-gray-500">Home Insurance Customer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CallToAction;
