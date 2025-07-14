
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Mission from '../components/about/Mission';
import Team from '../components/about/Team';
import FadeIn from '../components/animations/FadeIn';
import Container from '../components/ui/Container';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About InsureHub - Our Mission & Team</title>
        <meta name="description" content="Learn about InsureHub's mission to transform insurance and the team behind the platform." />
      </Helmet>
      
      <main className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-br from-white to-insurance-neutral/50">
          <Container>
            <FadeIn direction="up">
              <div className="text-center max-w-3xl mx-auto">
                <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-insurance-orange-light text-insurance-orange rounded-full mb-6">
                  About Us
                </span>
                <h1 className="heading-1 text-insurance-neutral-dark mb-6">
                  Our Story and Vision
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Get to know the people and principles driving our mission to transform the insurance industry.
                </p>
              </div>
            </FadeIn>
          </Container>
        </div>
        
        <Mission />
        <Team />
        <Footer />
      </main>
    </>
  );
};

export default About;
