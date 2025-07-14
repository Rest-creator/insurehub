
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import FeaturedServices from '../components/home/FeaturedServices';
import CallToAction from '../components/home/CallToAction';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>InsureHub - Simplifying Insurance for the Modern World</title>
        <meta name="description" content="Discover, compare, and manage all your insurance needs in one place with InsureHub's intelligent platform." />
      </Helmet>
      
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <Hero />
        <FeaturedServices />
        <CallToAction />
        <Footer />
      </main>
    </>
  );
};

export default Index;
