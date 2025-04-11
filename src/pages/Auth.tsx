import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Lock, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const Auth = () => {
  const { signIn, signUp, user, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const { t, language } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      if (isLogin) {
        await signIn(values.email, values.password);
      } else {
        await signUp(values.email, values.password);
        setIsLogin(true); // Switch back to login after successful registration
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  if (user && !loading) {
    return <Navigate to="/" />;
  }

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'bg-secondary-50' : 'bg-gray-100'} flex items-center justify-center p-4`}>
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-3xl font-bold">
            {isLogin ? (
              <div className="flex items-center justify-center gap-2">
                <LogIn className="h-6 w-6" />
                <span>{t('app.sign_in') || 'Sign In'}</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <UserPlus className="h-6 w-6" />
                <span>{t('app.create_account') || 'Create Account'}</span>
              </div>
            )}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {isLogin 
              ? (t('app.login_description') || 'Enter your credentials to access your account')
              : (t('app.register_description') || 'Fill out the form to create a new account')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="h-4 w-4" /> 
                      {t('app.email') || 'Email'}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={language === 'ar' ? 'البريد الإلكتروني' : 'email@example.com'} 
                        type="email" 
                        {...field}
                        className="focus:ring-2 focus:ring-primary" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      {t('app.password') || 'Password'}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          {...field}
                          className="pr-10 focus:ring-2 focus:ring-primary" 
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full gap-2 font-medium" 
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('app.loading') || 'Loading...'}
                  </span>
                ) : isLogin ? (
                  <span className="flex items-center justify-center gap-2">
                    <LogIn className="h-4 w-4" />
                    {t('app.sign_in') || 'Sign In'}
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    {t('app.create_account') || 'Create Account'}
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 border-t pt-4">
          <Button 
            variant="link" 
            onClick={() => setIsLogin(!isLogin)}
            className="w-full"
          >
            {isLogin 
              ? (t('app.need_account') || "Don't have an account? Sign up")
              : (t('app.already_have_account') || "Already have an account? Sign in")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
