
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Auth from '@/pages/Auth';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import ProtectedRoute from '@/components/ProtectedRoute';
import JobManagement from '@/pages/JobManagement';
import Messages from '@/pages/Messages';
import Locations from '@/pages/Locations';
import OpenBidding from '@/pages/OpenBidding';
import FinancialDashboard from '@/pages/FinancialDashboard';
import ServiceManagement from '@/pages/ServiceManagement';
import TeamManagement from '@/pages/TeamManagement';
import { Toaster } from '@/components/ui/toaster';
import { useAuth } from '@/contexts/auth';

function App() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);

    if (!user && location.pathname !== '/auth') {
      navigate('/auth');
    } else if (user && location.pathname === '/auth') {
      navigate('/');
    }
  }, [user, navigate, location.pathname]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Routes>
        <Route 
          path="/auth" 
          element={<Auth />} 
        />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/jobs/*" 
          element={
            <ProtectedRoute>
              <JobManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/messages/*" 
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/team" 
          element={
            <ProtectedRoute>
              <TeamManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/calendar" 
          element={
            <ProtectedRoute>
              <div>Calendar Page</div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/payments" 
          element={
            <ProtectedRoute>
              <div>Payments Page</div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/services" 
          element={
            <ProtectedRoute>
              <ServiceManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/locations" 
          element={
            <ProtectedRoute>
              <Locations />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/financials" 
          element={
            <ProtectedRoute>
              <FinancialDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/financial" 
          element={
            <ProtectedRoute>
              <FinancialDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/bidding" 
          element={
            <ProtectedRoute>
              <OpenBidding />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <div>Settings Page</div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="*" 
          element={<NotFound />} 
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
