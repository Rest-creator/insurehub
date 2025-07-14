
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-insurance-neutral pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold text-insurance-neutral-dark">Insure<span className="text-insurance-orange">Hub</span></span>
            </Link>
            <p className="text-gray-600 mb-6 max-w-md">
              Simplifying insurance through innovation. We help you find, compare, and manage the perfect coverage for your unique needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-insurance-orange transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-insurance-orange transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-insurance-orange transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-insurance-orange transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          
          
         
          
         
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} InsureHub. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">© REST > Universe</p>
           
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
