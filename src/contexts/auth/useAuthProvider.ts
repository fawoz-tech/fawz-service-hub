
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AuthResult } from './types';

export const useAuthProvider = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up the authentication state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.email);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (event === 'SIGNED_IN') {
          toast({
            title: "Welcome back!",
            description: "You have successfully signed in.",
          });
        }
        
        if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed out",
            description: "You have been signed out successfully.",
          });
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Initial session check:", currentSession?.user?.email || "No session");
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Signing in with:", email);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.error("Sign in error:", error);
        
        // Handle captcha error specifically
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
    }
  };

  const signInWithGoogle = async () => {
    try {
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
    }
  };

  const signUp = async (email: string, password: string, fullName?: string): Promise<AuthResult> => {
    try {
      console.log("Signing up with:", email, "and full name:", fullName || "not provided");
      
      // Check if user already exists with this email
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
          }
        }
      });
      
      if (error) {
        console.error("Sign up error:", error);
        
        // Handle captcha error specifically
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
        
        // Check if email confirmation is required
        if (data?.user && !data.user.confirmed_at) {
          return { success: true, message: "Please check your email to verify your account." };
        }
        return { success: true };
      }
    } catch (error: any) {
      console.error('Error signing up:', error);
      return { success: false, message: error.message };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return {
    session,
    user,
    loading,
    signIn,
    signInWithGoogle,
    signUp,
    signOut,
  };
};
