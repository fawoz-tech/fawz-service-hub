
import React from 'react';
import { Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import FormIcon from './FormIcon';
import { useLanguage } from '@/contexts/LanguageContext';
import { UseFormReturn } from 'react-hook-form';
import { LoginFormData } from '@/schemas/auth';

type PasswordFieldProps = {
  form: UseFormReturn<LoginFormData>;
  id?: string;
  showForgotPassword?: boolean;
  onForgotPassword?: (e: React.MouseEvent) => void;
};

const PasswordField = ({ 
  form, 
  id = 'password',
  showForgotPassword = false,
  onForgotPassword
}: PasswordFieldProps) => {
  const { t } = useLanguage();
  
  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between">
            <Label htmlFor={id}>{t('auth.password')}</Label>
            {showForgotPassword && (
              <a 
                href="#" 
                className="text-sm font-medium text-primary hover:underline"
                onClick={onForgotPassword}
              >
                {t('auth.forgot_password')}
              </a>
            )}
          </div>
          <FormControl>
            <div className="relative">
              <FormIcon icon={<Lock className="h-4 w-4" />} />
              <Input 
                id={id} 
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
  );
};

export default PasswordField;
