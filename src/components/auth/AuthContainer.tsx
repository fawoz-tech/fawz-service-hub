
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, User, Briefcase } from 'lucide-react';
import { useLanguage } from '@/contexts/language';
import Logo from '@/components/Logo';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

type AuthContainerProps = {
  activeTab: 'login' | 'register';
  setActiveTab: (tab: 'login' | 'register') => void;
  registrationMessage: string | null;
  userRole: 'customer' | 'provider';
  setUserRole: (role: 'customer' | 'provider') => void;
};

const AuthContainer: React.FC<AuthContainerProps> = ({
  activeTab,
  setActiveTab,
  registrationMessage,
  userRole,
  setUserRole,
}) => {
  const { t } = useLanguage();

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 items-center text-center">
        <Logo size="lg" className="mb-4" />
        <CardTitle className="text-2xl">{t('auth.welcome')}</CardTitle>
        <CardDescription>
          {activeTab === 'login' 
            ? t('auth.login_subtitle') 
            : t('auth.register_subtitle')}
        </CardDescription>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'login' | 'register')}>
        <div className="px-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">{t('auth.login')}</TabsTrigger>
            <TabsTrigger value="register">{t('auth.register')}</TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="space-y-4 pt-6">
          {registrationMessage && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <AlertDescription>{registrationMessage}</AlertDescription>
            </Alert>
          )}
          
          {activeTab === 'register' && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                {t('auth.select_role', 'I am registering as a:')}
              </label>
              <ToggleGroup 
                type="single" 
                value={userRole} 
                onValueChange={(value) => {
                  if (value) setUserRole(value as 'customer' | 'provider');
                }}
                className="justify-start"
              >
                <ToggleGroupItem value="customer" aria-label="Customer" className="flex items-center gap-2 px-4">
                  <User className="h-4 w-4" />
                  {t('auth.customer_role', 'Customer')}
                </ToggleGroupItem>
                <ToggleGroupItem value="provider" aria-label="Service Provider" className="flex items-center gap-2 px-4">
                  <Briefcase className="h-4 w-4" />
                  {t('auth.provider_role', 'Service Provider')}
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          )}
          
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          
          <TabsContent value="register">
            <RegisterForm userRole={userRole} />
          </TabsContent>
        </CardContent>
      </Tabs>
      
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center text-secondary-500">
          {t('auth.terms')}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AuthContainer;
