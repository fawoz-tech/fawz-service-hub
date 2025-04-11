
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

  // Add translations for new error messages
  const addTranslations = () => {
    // This would be handled elsewhere in a real app
    // Just ensuring we have error messages available
  };
  
  useEffect(() => {
    addTranslations();
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
