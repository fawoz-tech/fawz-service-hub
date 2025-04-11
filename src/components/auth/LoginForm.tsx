
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
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

const LoginForm = () => {
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [resetPasswordEmail, setResetPasswordEmail] = useState<string>('');
  const [resetPasswordDialogOpen, setResetPasswordDialogOpen] = useState<boolean>(false);
  const [resetPasswordLoading, setResetPasswordLoading] = useState<boolean>(false);
  const [resetPasswordSent, setResetPasswordSent] = useState<boolean>(false);
  
  const { signIn, signInWithGoogle, resetPassword } = useAuth();
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
      
      // Check for specific error codes
      if (error?.code === 'invalid_credentials') {
        setGeneralError(t('auth.invalid_credentials'));
      } else if (error?.message?.includes('Email not confirmed')) {
        setGeneralError(t('auth.email_not_confirmed'));
      } else {
        setGeneralError(error?.message || t('auth.error_occurred'));
      }
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
    // Pre-fill with the email from the form if available
    setResetPasswordEmail(form.getValues('email'));
    setResetPasswordDialogOpen(true);
  };
  
  const handleResetPassword = async () => {
    if (!resetPasswordEmail || !resetPasswordEmail.includes('@')) {
      toast({
        variant: "destructive",
        title: t('auth.error'),
        description: t('auth.valid_email_required'),
      });
      return;
    }

    try {
      setResetPasswordLoading(true);
      await resetPassword(resetPasswordEmail);
      setResetPasswordSent(true);
      
      toast({
        title: t('auth.password_reset'),
        description: t('auth.password_reset_email_sent'),
      });
    } catch (error: any) {
      console.error('Password reset error:', error);
      toast({
        variant: "destructive",
        title: t('auth.error'),
        description: error?.message || t('auth.error_occurred'),
      });
    } finally {
      setResetPasswordLoading(false);
    }
  };

  const closeResetDialog = () => {
    setResetPasswordDialogOpen(false);
    setResetPasswordSent(false);
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
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
        )}
        Google
      </Button>

      {/* Password Reset Dialog - Using regular Label instead of FormLabel */}
      <Dialog open={resetPasswordDialogOpen} onOpenChange={setResetPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('auth.reset_password')}</DialogTitle>
            <DialogDescription>
              {resetPasswordSent 
                ? t('auth.password_reset_confirmation') 
                : t('auth.password_reset_instructions')}
            </DialogDescription>
          </DialogHeader>
          
          {resetPasswordSent ? (
            <div className="flex flex-col items-center justify-center py-4">
              <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
              <p className="text-center">{t('auth.check_email_for_link')}</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  {/* Use regular Label component instead of FormLabel */}
                  <Label htmlFor="reset-email">{t('auth.email')}</Label>
                  <Input 
                    id="reset-email"
                    type="email" 
                    placeholder="name@example.com"
                    value={resetPasswordEmail}
                    onChange={(e) => setResetPasswordEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={closeResetDialog}
                >
                  {t('common.cancel')}
                </Button>
                <Button 
                  type="submit"
                  onClick={handleResetPassword}
                  disabled={resetPasswordLoading}
                >
                  {resetPasswordLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('auth.sending')}
                    </>
                  ) : (
                    t('auth.send_reset_link')
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginForm;
