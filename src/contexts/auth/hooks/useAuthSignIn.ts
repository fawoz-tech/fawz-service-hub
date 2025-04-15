
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAuthSignIn = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      console.log("Signing in with:", email);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.error("Sign in error:", error);
        
        if (error.message.includes('captcha verification')) {
          toast({
            variant: "destructive",
            title: "Authentication Error",
            description: "CAPTCHA verification is required but not properly configured. Please contact support or try again later.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Sign in failed",
            description: error.message,
          });
        }
        throw error;
      }
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/auth'
        }
      });
      
      if (error) {
        console.error("Google sign in error:", error);
        toast({
          variant: "destructive",
          title: "Google sign in failed",
          description: error.message,
        });
        throw error;
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { signIn, signInWithGoogle, isLoading };
};
