
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import LanguageToggle from '@/components/LanguageToggle';
import AuthContainer from '@/components/auth/AuthContainer';
import { Tabs } from '@/components/ui/tabs';

const Auth = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [registrationMessage, setRegistrationMessage] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'customer' | 'provider'>('customer');
  
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get the selected role from session storage (if any)
    const selectedRole = sessionStorage.getItem('selectedUserRole') as 'customer' | 'provider' | null;
    if (selectedRole) {
      setUserRole(selectedRole);
      // Clear the session storage after reading the value
      sessionStorage.removeItem('selectedUserRole');
    }
    
    // If user is logged in, redirect to homepage or saved redirect path
    if (user) {
      const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/dashboard';
      sessionStorage.removeItem('redirectAfterLogin');
      navigate(redirectPath);
    }
  }, [user, navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50 px-4">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      
      <AuthContainer 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        registrationMessage={registrationMessage}
        userRole={userRole}
        setUserRole={setUserRole}
      />
    </div>
  );
};

export default Auth;
