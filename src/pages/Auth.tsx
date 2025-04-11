
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LanguageToggle from '@/components/LanguageToggle';
import AuthContainer from '@/components/auth/AuthContainer';

const Auth = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [registrationMessage, setRegistrationMessage] = useState<string | null>(null);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is logged in, redirect to homepage or saved redirect path
    if (user) {
      const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/';
      sessionStorage.removeItem('redirectAfterLogin');
      navigate(redirectPath);
    }
  }, [user, navigate]);

  // Handle registration message passed via URL parameters
  useEffect(() => {
    const handleAuthParams = () => {
      const searchParams = new URLSearchParams(window.location.search);
      
      // Check for email verification success
      if (searchParams.has('verified')) {
        setRegistrationMessage('Your email has been verified! You can now log in.');
        setActiveTab('login');
      }
      
      // Check for other status messages
      const message = searchParams.get('message');
      if (message) {
        setRegistrationMessage(message);
      }
    };
    
    handleAuthParams();
  }, []);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50 px-4">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      
      <AuthContainer 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        registrationMessage={registrationMessage}
      />
    </div>
  );
};

export default Auth;
