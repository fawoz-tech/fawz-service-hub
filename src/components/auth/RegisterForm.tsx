
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

const RegisterForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
  const { signUp } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();
  
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
      const result = await signUp(email, password, fullName);
      
      if (result.success && result.message) {
        // Message will be displayed by the parent component
        return result;
      }
    } catch (error) {
      console.error('Registration error:', error);
      // Error message is handled in AuthContext
    } finally {
      setLoading(false);
    }
  };
  
  return (
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
  );
};

export default RegisterForm;
