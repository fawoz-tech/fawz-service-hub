
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useLanguage } from '@/contexts/LanguageContext';

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const Auth = () => {
  const { signIn, signUp, user, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const { t } = useLanguage();
  
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

  // Redirect if user is already logged in
  if (user && !loading) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">
            {isLogin ? t('auth.login') : t('auth.register')}
          </CardTitle>
          <CardDescription>
            {isLogin 
              ? t('auth.login_description') 
              : t('auth.register_description')}
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
                    <FormLabel>{t('auth.email')}</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" type="email" {...field} />
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
                    <FormLabel>{t('auth.password')}</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading 
                  ? t('auth.loading')
                  : isLogin 
                    ? t('auth.login_button')
                    : t('auth.register_button')}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button 
            variant="link" 
            onClick={() => setIsLogin(!isLogin)}
            className="w-full"
          >
            {isLogin 
              ? t('auth.need_account')
              : t('auth.already_have_account')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
