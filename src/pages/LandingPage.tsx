
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/language';
import LanguageToggle from '@/components/LanguageToggle';
import Logo from '@/components/Logo';
import { ChevronRight, Shield, Star, Clock, Wallet, Users, Calendar, HeartHandshake, BarChart4 } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  
  const handleGetStarted = (role: 'customer' | 'provider') => {
    // Store the selected role in session storage for the auth page to use
    sessionStorage.setItem('selectedUserRole', role);
    navigate('/auth');
  };
  
  return (
    <div className={`min-h-screen bg-gradient-to-b from-secondary-50 to-white ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <header className="w-full px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Logo size="md" />
          <span className="ml-2 text-xl font-bold">FAWOZ</span>
        </div>
        <div className="flex items-center space-x-4">
          <LanguageToggle />
          <Button variant="outline" onClick={() => navigate('/auth')}>
            {t('auth.login')}
          </Button>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-10 pb-20 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          {t('landing.hero_title', 'The Ultimate Service Platform')}
        </h1>
        <p className="text-lg md:text-xl text-secondary-700 max-w-3xl mx-auto mb-8">
          {t('landing.hero_subtitle', 'Connecting customers with trusted service providers. Choose your role to get started.')}
        </p>
        
        <Tabs defaultValue="customer" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="customer">{t('landing.customer_role', 'I Need a Service')}</TabsTrigger>
            <TabsTrigger value="provider">{t('landing.provider_role', 'I Provide Services')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="customer" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard 
                icon={<Shield className="h-8 w-8 text-primary" />} 
                title={t('landing.trusted_providers', 'Trusted Providers')} 
                description={t('landing.verified_description', 'All providers are verified and rated by real customers')} 
              />
              <FeatureCard 
                icon={<Clock className="h-8 w-8 text-primary" />} 
                title={t('landing.instant_booking', 'Instant Booking')} 
                description={t('landing.booking_description', 'Book services with just a few clicks')} 
              />
              <FeatureCard 
                icon={<Wallet className="h-8 w-8 text-primary" />} 
                title={t('landing.secure_payments', 'Secure Payments')} 
                description={t('landing.payment_description', 'Pay only when the job is completed to your satisfaction')} 
              />
            </div>
            
            <Button size="lg" className="px-8 py-6 text-lg" onClick={() => handleGetStarted('customer')}>
              {t('landing.get_started_customer', 'Find Services Now')} <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </TabsContent>
          
          <TabsContent value="provider" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard 
                icon={<Calendar className="h-8 w-8 text-primary" />} 
                title={t('landing.manage_schedule', 'Manage Schedule')} 
                description={t('landing.schedule_description', 'Organize your bookings and appointments easily')} 
              />
              <FeatureCard 
                icon={<HeartHandshake className="h-8 w-8 text-primary" />} 
                title={t('landing.find_customers', 'Find Customers')} 
                description={t('landing.customers_description', 'Get connected with customers looking for your services')} 
              />
              <FeatureCard 
                icon={<BarChart4 className="h-8 w-8 text-primary" />} 
                title={t('landing.grow_business', 'Grow Your Business')} 
                description={t('landing.growth_description', 'Analytics and tools to help your business thrive')} 
              />
            </div>
            
            <Button size="lg" className="px-8 py-6 text-lg" onClick={() => handleGetStarted('provider')}>
              {t('landing.get_started_provider', 'Start Providing Services')} <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </TabsContent>
        </Tabs>
      </section>
      
      {/* Social Proof Section */}
      <section className="bg-secondary-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-10">
            {t('landing.trusted_by', 'Trusted by thousands across the region')}
          </h2>
          
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
              <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
              <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
              <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
              <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
              <span className="ml-2 font-medium">4.8/5</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-primary" />
              <span className="ml-2 font-medium">{t('landing.active_users', '10,000+ Active Users')}</span>
            </div>
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-primary" />
              <span className="ml-2 font-medium">{t('landing.verified_providers', '1,000+ Verified Providers')}</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-secondary-900 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Logo size="md" />
              <h3 className="font-bold text-xl mt-2">FAWOZ</h3>
              <p className="mt-2 text-secondary-200">{t('landing.footer_tagline', 'Connecting quality services with people who need them')}</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">{t('landing.for_customers', 'For Customers')}</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-secondary-200 hover:text-white">{t('landing.how_it_works', 'How It Works')}</a></li>
                <li><a href="#" className="text-secondary-200 hover:text-white">{t('landing.safety', 'Safety')}</a></li>
                <li><a href="#" className="text-secondary-200 hover:text-white">{t('landing.faqs', 'FAQs')}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">{t('landing.for_providers', 'For Providers')}</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-secondary-200 hover:text-white">{t('landing.become_provider', 'Become a Provider')}</a></li>
                <li><a href="#" className="text-secondary-200 hover:text-white">{t('landing.pricing', 'Pricing')}</a></li>
                <li><a href="#" className="text-secondary-200 hover:text-white">{t('landing.resources', 'Resources')}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">{t('landing.company', 'Company')}</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-secondary-200 hover:text-white">{t('landing.about', 'About Us')}</a></li>
                <li><a href="#" className="text-secondary-200 hover:text-white">{t('landing.contact', 'Contact')}</a></li>
                <li><a href="#" className="text-secondary-200 hover:text-white">{t('landing.legal', 'Legal')}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-secondary-700 mt-8 pt-8 text-center text-secondary-300">
            <p>&copy; {new Date().getFullYear()} FAWOZ. {t('landing.rights_reserved', 'All rights reserved.')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <Card className="text-center">
      <CardHeader className="pb-2">
        <div className="mx-auto mb-2">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-secondary-600">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default LandingPage;
