
import React from 'react';
import { Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import FormIcon from './FormIcon';
import { useLanguage } from '@/contexts/LanguageContext';
import { UseFormReturn } from 'react-hook-form';
import { LoginFormData } from '@/schemas/auth';

type EmailFieldProps = {
  form: UseFormReturn<LoginFormData>;
  id?: string;
};

const EmailField = ({ form, id = 'email' }: EmailFieldProps) => {
  const { t } = useLanguage();
  
  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <Label htmlFor={id}>{t('auth.email')}</Label>
          <FormControl>
            <div className="relative">
              <FormIcon icon={<Mail className="h-4 w-4" />} />
              <Input 
                id={id} 
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
  );
};

export default EmailField;
