
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, User, Mail, Lock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormData } from '@/schemas/auth';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const RegisterForm = () => {
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [resendDialogOpen, setResendDialogOpen] = useState<boolean>(false);
  const [resendEmail, setResendEmail] = useState<string>('');
  const [resendLoading, setResendLoading] = useState<boolean>(false);
  const [resendSent, setResendSent] = useState<boolean>(false);
  
  const { signUp, resendVerificationEmail } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const { isSubmitting, isDirty } = form.formState;
  
  const onSubmit = async (data: RegisterFormData) => {
    setGeneralError(null);
    setSuccessMessage(null);
    
    try {
      const result = await signUp(data.email, data.password, data.fullName);
      
      if (!result.success) {
        if (result.message === 'User already registered') {
          setGeneralError(t('auth.user_already_exists'));
          setResendEmail(data.email);
          // Show option to resend verification email
        } else {
          setGeneralError(result.message || t('auth.error_occurred'));
        }
      } else {
        setSuccessMessage(result.message || t('auth.registration_success'));
      }
      
      return result;
    } catch (error: any) {
      console.error('Registration error:', error);
      
      if (error?.message === 'User already registered') {
        setGeneralError(t('auth.user_already_exists'));
        setResendEmail(data.email);
      } else {
        setGeneralError(error?.message || t('auth.error_occurred'));
      }
    }
  };
  
  const handleResendVerification = () => {
    setResendDialogOpen(true);
    // Pre-fill with the email from the form if available
    if (!resendEmail) {
      setResendEmail(form.getValues('email'));
    }
  };
  
  const handleResendEmail = async () => {
    if (!resendEmail || !resendEmail.includes('@')) {
      toast({
        variant: "destructive",
        title: t('auth.error'),
        description: t('auth.valid_email_required'),
      });
      return;
    }

    try {
      setResendLoading(true);
      await resendVerificationEmail(resendEmail);
      setResendSent(true);
      
      toast({
        title: t('auth.verification_email_sent'),
        description: t('auth.check_email_for_verification'),
      });
    } catch (error: any) {
      console.error('Resend verification email error:', error);
      toast({
        variant: "destructive",
        title: t('auth.error'),
        description: error?.message || t('auth.error_occurred'),
      });
    } finally {
      setResendLoading(false);
    }
  };

  const closeResendDialog = () => {
    setResendDialogOpen(false);
    setResendSent(false);
  };
  
  return (
    <>
      {generalError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex justify-between items-center">
            <span>{generalError}</span>
            {generalError === t('auth.user_already_exists') && (
              <Button 
                variant="link" 
                onClick={handleResendVerification}
                className="p-0 h-auto"
              >
                {t('auth.resend_verification')}
              </Button>
            )}
          </AlertDescription>
        </Alert>
      )}
      
      {successMessage && (
        <Alert className="mb-4 bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="fullName">{t('auth.full_name')}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="fullName" 
                      type="text" 
                      className="pl-9"
                      placeholder={t('auth.full_name_placeholder')} 
                      autoComplete="name"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email-register">{t('auth.email')}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email-register" 
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
                <FormLabel htmlFor="password-register">{t('auth.password')}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="password-register" 
                      type="password"
                      className="pl-9"
                      autoComplete="new-password"
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
                {t('auth.creating_account')}
              </>
            ) : (
              t('auth.create_account')
            )}
          </Button>
        </form>
      </Form>

      {/* Resend Verification Email Dialog */}
      <Dialog open={resendDialogOpen} onOpenChange={setResendDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('auth.resend_verification_email')}</DialogTitle>
            <DialogDescription>
              {resendSent 
                ? t('auth.verification_email_sent_confirmation') 
                : t('auth.resend_verification_instructions')}
            </DialogDescription>
          </DialogHeader>
          
          {resendSent ? (
            <div className="flex flex-col items-center justify-center py-4">
              <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
              <p className="text-center">{t('auth.check_email_for_verification')}</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <FormLabel htmlFor="verification-email">{t('auth.email')}</FormLabel>
                  <Input 
                    id="verification-email"
                    type="email" 
                    placeholder="name@example.com"
                    value={resendEmail}
                    onChange={(e) => setResendEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={closeResendDialog}
                >
                  {t('common.cancel')}
                </Button>
                <Button 
                  type="submit"
                  onClick={handleResendEmail}
                  disabled={resendLoading}
                >
                  {resendLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('auth.sending')}
                    </>
                  ) : (
                    t('auth.resend')
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RegisterForm;
