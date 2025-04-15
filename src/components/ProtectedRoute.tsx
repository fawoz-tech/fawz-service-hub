
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Store the path user was trying to access for redirect after login
    if (!loading && !user) {
      sessionStorage.setItem('redirectAfterLogin', location.pathname);
    }
  }, [user, loading, location.pathname]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Check if user is accessing the correct route based on role
  const userRole = user.user_metadata?.user_role || 'customer';
  const isProvider = userRole === 'provider';
  
  // If user is a customer trying to access provider routes, redirect them to customer dashboard
  if (!isProvider && location.pathname === '/dashboard') {
    return <Navigate to="/customer-dashboard" replace />;
  }
  
  // If user is a provider trying to access customer routes, redirect them to provider dashboard
  if (isProvider && location.pathname === '/customer-dashboard') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
