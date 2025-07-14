
import { Clock, AlertCircle, FileSearch, CheckCircle, ArrowRight } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import Container from '@/components/ui/Container';

const ProcessOverview = () => {
  return (
    <section className="py-16 bg-insurance-neutral/50">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn direction="right">
            <div>
              <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-insurance-green-light text-insurance-green-dark rounded-full mb-4">
                How It Works
              </span>
              <h2 className="heading-2 text-insurance-neutral-dark mb-6">
                Simplified Claims Process
              </h2>
              <p className="body-text mb-8">
                Our streamlined claims management system makes it easy to file, track, and resolve insurance claims quickly.
              </p>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-insurance-orange-light flex items-center justify-center text-insurance-orange font-bold text-xl mr-4">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-insurance-neutral-dark mb-2">Submit Your Claim</h3>
                    <p className="text-gray-600">
                      File a new claim through our online portal with basic information about the incident and upload any relevant photos or documentation.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-insurance-orange-light flex items-center justify-center text-insurance-orange font-bold text-xl mr-4">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-insurance-neutral-dark mb-2">Real-Time Updates</h3>
                    <p className="text-gray-600">
                      Track the status of your claim in real-time with automatic notifications and updates as your claim progresses.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-insurance-orange-light flex items-center justify-center text-insurance-orange font-bold text-xl mr-4">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-insurance-neutral-dark mb-2">Direct Communication</h3>
                    <p className="text-gray-600">
                      Message adjusters directly through the platform, eliminating phone tag and ensuring all communications are documented.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-insurance-orange-light flex items-center justify-center text-insurance-orange font-bold text-xl mr-4">
                    4
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-insurance-neutral-dark mb-2">Fast Resolution</h3>
                    <p className="text-gray-600">
                      Digital claim processing reduces paperwork and speeds up approvals, with direct deposit options for faster payments.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn direction="left">
            <img 
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Claims process" 
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
};

export default ProcessOverview;