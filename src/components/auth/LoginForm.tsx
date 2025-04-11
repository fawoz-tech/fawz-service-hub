import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/schemas/auth';
import { Form } from '@/components/ui/form';

import EmailField from './EmailField';
import PasswordField from './PasswordField';
import SubmitButton from './SubmitButton';
import OrDivider from './OrDivider';
import GoogleSignInButton from './GoogleSignInButton';
import ErrorAlert from './ErrorAlert';

const LoginForm = () => {
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<boolean>(false);
  
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
    setCaptchaError(false);
    try {
      await signIn(data.email, data.password);
      // No need to handle redirect here as it will happen via the useEffect in the parent
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Check if this is a CAPTCHA error
      if (error?.message?.includes('captcha verification')) {
        setCaptchaError(true);
      } else {
        setGeneralError(error?.message || t('auth.error_occurred'));
      }
    }
  };

  const handleGoogleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    setGeneralError(null);
    setCaptchaError(false);
    try {
      setGoogleLoading(true);
      await signInWithGoogle();
      // Redirect is handled by Supabase OAuth flow
    } catch (error: any) {
      console.error('Google login error:', error);
      
      if (error?.message?.includes('captcha verification')) {
        setCaptchaError(true);
      } else {
        toast({
          variant: "destructive",
          title: t('auth.error'),
          description: error?.message || t('auth.error_occurred'),
        });
      }
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
      {generalError && <ErrorAlert message={generalError} />}
      
      {captchaError && <ErrorAlert message={t('auth.captcha_error')} />}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <EmailField form={form} />
          
          <PasswordField 
            form={form} 
            showForgotPassword={true}
            onForgotPassword={handleForgotPassword}
          />

          <SubmitButton 
            isSubmitting={isSubmitting} 
            isDirty={isDirty}
            label={t('auth.sign_in')}
            loadingLabel={t('auth.signing_in')}
          />
        </form>
      </Form>

      <OrDivider />

      <GoogleSignInButton 
        onClick={handleGoogleLogin}
        loading={googleLoading}
      />
      
      {captchaError && (
        <div className="text-center text-sm text-destructive mt-2">
          <p>{t('auth.captcha_admin_note')}</p>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
