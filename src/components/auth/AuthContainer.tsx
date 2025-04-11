
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLanguage } from '@/contexts/LanguageContext';
import Logo from '@/components/Logo';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

type AuthContainerProps = {
  activeTab: 'login' | 'register';
  setActiveTab: (tab: 'login' | 'register') => void;
  registrationMessage: string | null;
};

const AuthContainer: React.FC<AuthContainerProps> = ({
  activeTab,
  setActiveTab,
  registrationMessage,
}) => {
  const { t } = useLanguage();

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 items-center text-center">
        <Logo size="lg" className="mb-4" />
        <CardTitle className="text-2xl">{t('auth.welcome')}</CardTitle>
        <CardDescription>
          {activeTab === 'login' ? t('auth.login_subtitle') : t('auth.register_subtitle')}
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
              <AlertDescription>{registrationMessage}</AlertDescription>
            </Alert>
          )}
          
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          
          <TabsContent value="register">
            <RegisterForm />
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
