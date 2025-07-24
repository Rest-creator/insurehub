
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

  // Helper to decode JWT and check expiry
  function isTokenExpired(token: string): boolean {
    try {
      const [, payload] = token.split(".");
      const decoded = JSON.parse(atob(payload));
      if (!decoded.exp) return true;
      // JWT exp is in seconds
      return Date.now() / 1000 > decoded.exp;
    } catch {
      return true;
    }
  }

  useEffect(() => {
    const access = localStorage.getItem("access");
    if (!access || isTokenExpired(access)) {
      setIsAuthenticated(false);
      setIsAdmin(false);
      setIsLoading(false);
      return;
    }
    // Optionally check user role from token payload if needed
    setIsAuthenticated(true);
    // You can decode and set isAdmin here if you store role in JWT
    setIsAdmin(true); // Default to true for now
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
