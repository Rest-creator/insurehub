
import { Clock, Check, ArrowRight } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import Container from '@/components/ui/Container';

const ClaimStats = () => {
  return (
    <section className="py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FadeIn direction="up" delay={100}>
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-insurance-orange-light flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-insurance-orange" />
              </div>
              <h3 className="text-xl font-semibold text-insurance-neutral-dark mb-3">25% Faster Resolution</h3>
              <p className="text-gray-600">
                Our digital claims process resolves claims 25% faster than traditional methods, getting you back to normal sooner.
              </p>
            </div>
          </FadeIn>
          
          <FadeIn direction="up" delay={200}>
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-insurance-orange-light flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-insurance-orange" />
              </div>
              <h3 className="text-xl font-semibold text-insurance-neutral-dark mb-3">95% Approval Rate</h3>
              <p className="text-gray-600">
                Our guided claim submission process ensures you provide all necessary information, resulting in a 95% approval rate.
              </p>
            </div>
          </FadeIn>
          
          <FadeIn direction="up" delay={300}>
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-insurance-orange-light flex items-center justify-center mb-4">
                <ArrowRight className="w-8 h-8 text-insurance-orange" />
              </div>
              <h3 className="text-xl font-semibold text-insurance-neutral-dark mb-3">Start Your Claim Now</h3>
              <p className="text-gray-600 mb-4">
                Don't wait – begin the claims process today and get back on track quickly.
              </p>
              <button className="btn-primary inline-block">
                File a Claim
              </button>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
};

export default ClaimStats;