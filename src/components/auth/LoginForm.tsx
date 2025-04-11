
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Google } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  
  const { signIn, signInWithGoogle } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();
  
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
      // No need to handle redirect here as it will happen via the useEffect in the parent
    } catch (error) {
      console.error('Login error:', error);
      // Error message is handled in AuthContext
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      setGoogleLoading(true);
      await signInWithGoogle();
      // Redirect is handled by Supabase OAuth flow
    } catch (error) {
      console.error('Google login error:', error);
      // Error message is handled in AuthContext
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: t('auth.password_reset'),
      description: t('auth.password_reset_email'),
    });
  };
  
  return (
    <div className="space-y-6">
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
              onClick={handleForgotPassword}
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

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {t('auth.or_continue_with')}
          </span>
        </div>
      </div>

      <Button 
        variant="outline" 
        type="button" 
        className="w-full" 
        onClick={handleGoogleLogin}
        disabled={googleLoading}
      >
        {googleLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Google className="mr-2 h-4 w-4" />
        )}
        Google
      </Button>
    </div>
  );
};

export default LoginForm;
