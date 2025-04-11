
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Mail, Lock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/schemas/auth';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const LoginForm = () => {
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  
  const { signIn, signInWithGoogle } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { isSubmitting, isDirty } = form.formState;
  
  const onSubmit = async (data: LoginFormData) => {
    setGeneralError(null);
    try {
      await signIn(data.email, data.password);
      // No need to handle redirect here as it will happen via the useEffect in the parent
    } catch (error: any) {
      console.error('Login error:', error);
      setGeneralError(error?.message || t('auth.error_occurred'));
    }
  };

  const handleGoogleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      setGoogleLoading(true);
      await signInWithGoogle();
      // Redirect is handled by Supabase OAuth flow
    } catch (error: any) {
      console.error('Google login error:', error);
      toast({
        variant: "destructive",
        title: t('auth.error'),
        description: error?.message || t('auth.error_occurred'),
      });
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
      {generalError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{generalError}</AlertDescription>
        </Alert>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">{t('auth.email')}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email" 
                      className="pl-9"
                      placeholder="name@example.com" 
                      autoComplete="email"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel htmlFor="password">{t('auth.password')}</FormLabel>
                  <a 
                    href="#" 
                    className="text-sm font-medium text-primary hover:underline"
                    onClick={handleForgotPassword}
                  >
                    {t('auth.forgot_password')}
                  </a>
                </div>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="password" 
                      type="password" 
                      className="pl-9"
                      autoComplete="current-password"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting || !isDirty}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('auth.signing_in')}
              </>
            ) : (
              t('auth.sign_in')
            )}
          </Button>
        </form>
      </Form>

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
          <svg viewBox="0 0 24 24" width="16" height="16" className="mr-2">
            <g transform="matrix(1, 0, 0, 1, 0, 0)">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.05 19.44 4 16.08 4 12C4 11.38 4.08 10.79 4.21 10.21L9 15V16C9 17.1 9.9 18 11 18V19.93ZM16.9 16.39C16.64 15.58 15.9 15 15 15H14V13C14 12.45 13.55 12 13 12H7V10H9C9.55 10 10 9.55 10 9V7H12C13.1 7 14 6.1 14 5V4.59C17.93 5.78 20.34 9.5 19.95 13.51C19.67 14.97 18.85 16.25 17.64 17.13L16.9 16.39Z" fill="currentColor"/>
            </g>
          </svg>
        )}
        Google
      </Button>
    </div>
  );
};

export default LoginForm;
