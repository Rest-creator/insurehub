
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface AuthGuardProps {
  children: ReactNode;
  adminOnly?: boolean;
}

const AuthGuard = ({ children, adminOnly = false }: AuthGuardProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // In a real application, we would check for a valid auth token
    // For demonstration purposes, we'll simulate authentication with localStorage
    const checkAuth = () => {
      const isAuth = localStorage.getItem('isAuthenticated') === 'true';
      
      // For demo purposes, always consider authenticated users as admins
      // In a real app, you would check user roles from your auth system
      const adminStatus = localStorage.getItem('isAdmin') === 'true';
      
      setIsAuthenticated(isAuth);
      setIsAdmin(adminStatus);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // For the purpose of this demo, automatically consider users authenticated
  // when accessing protected pages directly, so that you can see the content
  useEffect(() => {
    // This is just for the demo - in a real application, you would not do this
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('isAdmin', 'true');
    setIsAuthenticated(true);
    setIsAdmin(true);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-insurance-orange"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page and save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    // If admin-only and user is not an admin
    toast({
      title: "Access Denied",
      description: "You need administrator privileges to access this area.",
      variant: "destructive",
    });
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
