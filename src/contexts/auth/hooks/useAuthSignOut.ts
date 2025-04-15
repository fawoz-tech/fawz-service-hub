
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAuthSignOut = () => {
  const { toast } = useToast();

  const showAuthToast = (
    success: boolean,
    title: string,
    description: string
  ) => {
    toast({
      variant: success ? "default" : "destructive",
      title,
      description,
    });
  };

  const navigateAfterSignOut = () => {
    window.location.href = '/';
  };

  const performSignOut = async () => {
    try {
      await supabase.auth.signOut();
      return { success: true };
    } catch (error) {
      console.error('Error signing out:', error);
      return { success: false, error };
    }
  };

  const signOut = async () => {
    const result = await performSignOut();
    
    if (result.success) {
      showAuthToast(
        true,
        "Signed Out",
        "You have been successfully signed out and redirected to the home page."
      );
      navigateAfterSignOut();
    } else {
      showAuthToast(
        false,
        "Sign Out Error",
        "There was a problem signing you out. Please try again."
      );
      throw result.error;
    }
  };

  return { signOut };
};
