
import { useAuthSession } from './hooks/useAuthSession';
import { useAuthSignIn } from './hooks/useAuthSignIn';
import { useAuthSignUp } from './hooks/useAuthSignUp';
import { useAuthSignOut } from './hooks/useAuthSignOut';

export const useAuthProvider = () => {
  const { session, user, loading } = useAuthSession();
  const { signIn, signInWithGoogle } = useAuthSignIn();
  const { signUp } = useAuthSignUp();
  const { signOut } = useAuthSignOut();

  return {
    // Session state
    session,
    user,
    loading,
    
    // Auth methods
    signIn,
    signInWithGoogle,
    signUp,
    signOut,
  };
};
