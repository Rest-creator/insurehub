
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/ui/Container";
import FadeIn from "../components/animations/FadeIn";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-20">
        <Container>
          <FadeIn direction="up">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-insurance-orange-light rounded-full mb-6">
                <span className="text-4xl font-bold text-insurance-orange">404</span>
              </div>
              <h1 className="heading-1 text-insurance-neutral-dark mb-6">
                Page Not Found
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                The page you're looking for doesn't exist or has been moved.
              </p>
              <Link to="/" className="btn-primary inline-flex items-center justify-center">
                Return to Home
              </Link>
            </div>
          </FadeIn>
        </Container>
      </div>
      
      <Footer />
    </main>
  );
};

export default NotFound;
