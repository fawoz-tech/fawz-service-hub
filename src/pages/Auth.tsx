
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import Logo from '@/components/Logo';
import LanguageToggle from '@/components/LanguageToggle';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

const Auth = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [registrationMessage, setRegistrationMessage] = useState<string | null>(null);
  
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  useEffect(() => {
    // If user is logged in, redirect to homepage or saved redirect path
    if (user) {
      const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/';
      sessionStorage.removeItem('redirectAfterLogin');
      navigate(redirectPath);
    }
  }, [user, navigate]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: t('auth.error'),
        description: t('auth.all_fields_required'),
      });
      return;
    }
    
    try {
      setLoading(true);
      await signIn(email, password);
      // No need to handle redirect here as it will happen via the useEffect
    } catch (error) {
      console.error('Login error:', error);
      // Error message is handled in AuthContext
    } finally {
      setLoading(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !fullName) {
      toast({
        variant: "destructive",
        title: t('auth.error'),
        description: t('auth.all_fields_required'),
      });
      return;
    }
    
    try {
      setLoading(true);
      setRegistrationMessage(null);
      const result = await signUp(email, password, fullName);
      
      if (result.success) {
        if (result.message) {
          setRegistrationMessage(result.message);
        } else {
          // If no confirmation is needed, the user will be automatically logged in
          // and the useEffect will handle the redirect
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      // Error message is handled in AuthContext
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50 px-4">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      
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
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t('auth.email')}</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">{t('auth.password')}</Label>
                    <a 
                      href="#" 
                      className="text-sm font-medium text-primary hover:underline"
                      onClick={(e) => {
                        e.preventDefault();
                        toast({
                          title: t('auth.password_reset'),
                          description: t('auth.password_reset_email'),
                        });
                      }}
                    >
                      {t('auth.forgot_password')}
                    </a>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    autoComplete="current-password"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('auth.signing_in')}
                    </>
                  ) : (
                    t('auth.sign_in')
                  )}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">{t('auth.full_name')}</Label>
                  <Input 
                    id="fullName" 
                    type="text" 
                    placeholder={t('auth.full_name_placeholder')} 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)} 
                    autoComplete="name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-register">{t('auth.email')}</Label>
                  <Input 
                    id="email-register" 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-register">{t('auth.password')}</Label>
                  <Input 
                    id="password-register" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    autoComplete="new-password"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('auth.creating_account')}
                    </>
                  ) : (
                    t('auth.create_account')
                  )}
                </Button>
              </form>
            </TabsContent>
          </CardContent>
        </Tabs>
        
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-secondary-500">
            {t('auth.terms')}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
