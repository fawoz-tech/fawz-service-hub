import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Auth from '@/pages/Auth';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import ProtectedRoute from '@/components/ProtectedRoute';
import JobManagement from '@/pages/JobManagement';
import Messages from '@/pages/Messages';
import { Toaster } from '@/components/ui/toaster';
import { useAuth } from '@/contexts/auth';

function App() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 500);

    // Redirect to /auth if not authenticated and not already on /auth
    if (!isAuthenticated && location.pathname !== '/auth') {
      navigate('/auth');
    } else if (isAuthenticated && location.pathname === '/auth') {
      navigate('/');
    }
  }, [isAuthenticated, navigate, location.pathname]);

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
              <div>Team Page</div>
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
              <div>Services Page</div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/locations" 
          element={
            <ProtectedRoute>
              <div>Locations Page</div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/financial" 
          element={
            <ProtectedRoute>
              <div>Financial Page</div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/bidding" 
          element={
            <ProtectedRoute>
              <div>Bidding Page</div>
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
