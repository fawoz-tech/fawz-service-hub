
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AuthResult } from '../types';

export const useAuthSignUp = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const signUp = async (
    email: string, 
    password: string, 
    fullName?: string, 
    userRole: 'customer' | 'provider' = 'customer'
  ): Promise<AuthResult> => {
    try {
      setIsLoading(true);
      console.log("Signing up with:", email, "full name:", fullName || "not provided", "role:", userRole);
      
      const { count, error: countError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('username', email.split('@')[0]);
        
      if (countError) {
        console.error("Error checking for existing user:", countError);
      } else if (count && count > 0) {
        toast({
          variant: "destructive",
          title: "Sign up failed",
          description: "An account with this email already exists.",
        });
        return { success: false, message: "An account with this email already exists." };
      }

      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            full_name: fullName,
            user_role: userRole,
          }
        }
      });
      
      if (error) {
        console.error("Sign up error:", error);
        
        if (error.message.includes('captcha verification')) {
          toast({
            variant: "destructive",
            title: "Authentication Error",
            description: "CAPTCHA verification is required but not properly configured. Please contact support or try again later.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Sign up failed",
            description: error.message,
          });
        }
        return { success: false, message: error.message };
      } else {
        console.log("Sign up successful:", data);
        toast({
          title: "Account created",
          description: "Please check your email to verify your account.",
        });
        
        if (data?.user && !data.user.confirmed_at) {
          return { success: true, message: "Please check your email to verify your account." };
        }
        return { success: true };
      }
    } catch (error: any) {
      console.error('Error signing up:', error);
      return { success: false, message: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, isLoading };
};
