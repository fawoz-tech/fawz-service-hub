
import { Session, User } from '@supabase/supabase-js';

export type AuthResult = { 
  success: boolean; 
  message?: string;
};

export type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string, fullName?: string, userRole?: 'customer' | 'provider') => Promise<AuthResult>;
  signOut: () => Promise<void>;
};
