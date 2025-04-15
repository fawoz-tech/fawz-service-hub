
import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { useLanguage } from '@/contexts/language';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormData } from '@/schemas/auth';
import { Form } from '@/components/ui/form';
import { User } from 'lucide-react';

import EmailField from './EmailField';
import PasswordField from './PasswordField';
import SubmitButton from './SubmitButton';
import ErrorAlert from './ErrorAlert';
import FormIcon from './FormIcon';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type RegisterFormProps = {
  userRole: 'customer' | 'provider';
};

const RegisterForm: React.FC<RegisterFormProps> = ({ userRole }) => {
  const [generalError, setGeneralError] = useState<string | null>(null);
  const { signUp } = useAuth();
  const { t } = useLanguage();
  
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
    
    try {
      // Pass the user role as additional user metadata
      const result = await signUp(data.email, data.password, data.fullName, userRole);
      
      if (!result.success) {
        setGeneralError(result.message || t('auth.error_occurred'));
      }
      
      return result;
    } catch (error: any) {
      console.error('Registration error:', error);
      setGeneralError(error?.message || t('auth.error_occurred'));
    }
  };
  
  return (
    <>
      <ErrorAlert message={generalError || ''} />
      
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
                    <FormIcon icon={<User className="h-4 w-4" />} />
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
          
          <EmailField form={form} id="email-register" />
          
          <PasswordField form={form} id="password-register" />
          
          <SubmitButton 
            isSubmitting={isSubmitting} 
            isDirty={isDirty}
            label={t('auth.create_account')}
            loadingLabel={t('auth.creating_account')}
          />
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
