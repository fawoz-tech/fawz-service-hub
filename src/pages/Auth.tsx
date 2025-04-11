
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LanguageToggle from '@/components/LanguageToggle';
import AuthContainer from '@/components/auth/AuthContainer';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const Auth = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [registrationMessage, setRegistrationMessage] = useState<string | null>(null);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  useEffect(() => {
    // If user is logged in, redirect to homepage or saved redirect path
    if (user) {
      const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/';
      sessionStorage.removeItem('redirectAfterLogin');
      navigate(redirectPath);
    }
  }, [user, navigate]);

  useEffect(() => {
    // Check for URL parameters
    const queryParams = new URLSearchParams(location.search);
    
    // Check if this is a password reset flow
    if (queryParams.has('reset')) {
      setActiveTab('login');
      toast({
        title: t('auth.password_reset_complete'),
        description: t('auth.password_reset_success'),
      });
    }
    
    // Check if the user has verified their email
    if (queryParams.has('email_confirmed')) {
      setActiveTab('login');
      toast({
        title: t('auth.email_verified'),
        description: t('auth.email_verification_success'),
      });
    }
  }, [location, toast, t]);

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
