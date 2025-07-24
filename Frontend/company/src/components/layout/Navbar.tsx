
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about-us' },
  { name: 'Services', href: '/services' },
  { name: 'Learning Hub', href: '/learning-hub' },
  { 
    name: 'Products', 
    href: '#',
    dropdown: [
      { name: 'Marketplace', href: '/marketplace' },
      { name: 'Insurance Companies', href: '/insurance-companies' },
      { name: 'Commercial Programs', href: '/commercial-programs' },
    ] 
  },
  { 
    name: 'Tools', 
    href: '#',
    dropdown: [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Insure It', href: '/insure-it' },
      { name: 'Claims Management', href: '/claims-management' },
    ] 
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const isAuth = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(isAuth);
    };

    checkAuth();
    
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/sign-up');
  };

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setIsAuthenticated(false);
    navigate('/login');
    navigate('/');
  };

  const isProtectedRoute = (path: string) => {
    const protectedRoutes = [
      '/learning-hub',
      '/marketplace',
      '/insurance-companies',
      '/commercial-programs',
      '/dashboard',
      '/insure-it',
      '/claims-management'
    ];
    
    return protectedRoutes.includes(path);
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-soft py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-insurance-neutral-dark">Insure<span className="text-insurance-orange">Hub</span></span>
            </Link>
          </div>
          
         
          
          {/* Login / Get Started Button */}
          <div className="hidden md:block">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">

                <Link to="/dashboard" className="btn-ghost">
                  Dashboard
                </Link>
                <Link to="/company/policy/claims" className="btn-ghost">
                  Claims
                </Link>
                <button onClick={handleLogout} className="btn-primary">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button onClick={handleLogin} className="btn-ghost mr-3">
                  Login
                </button>
                <button onClick={handleSignUp} className="btn-primary">
                  Get Started
                </button>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-insurance-orange hover:bg-insurance-orange/5 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-insurance-orange/20"
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 backdrop-blur-md shadow-soft">
          {navigation.map((item) => {
            const isProtected = item.dropdown 
              ? item.dropdown.some(subItem => isProtectedRoute(subItem.href))
              : isProtectedRoute(item.href);
            
            if (isProtected && !isAuthenticated) {
              return null;
            }
            
            return item.dropdown ? (
              <div key={item.name} className="py-2">
                <button
                  onClick={() => toggleDropdown(item.name)}
                  className="w-full flex justify-between items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-insurance-orange hover:bg-insurance-orange/5 rounded-md"
                >
                  {item.name}
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                </button>
                
                {openDropdown === item.name && (
                  <div className="mt-2 pl-4 border-l-2 border-insurance-orange/20 ml-3">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-insurance-orange hover:bg-insurance-orange/5 rounded-md"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.href
                    ? 'text-insurance-orange bg-insurance-orange/5'
                    : 'text-gray-700 hover:text-insurance-orange hover:bg-insurance-orange/5'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="block w-full text-center mb-2 btn-ghost">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="block w-full text-center btn-primary">
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={handleLogin} className="block w-full text-center mb-2 btn-ghost">
                  Login
                </button>
                <button onClick={handleSignUp} className="block w-full text-center btn-primary">
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
