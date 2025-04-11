
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface Translations {
  [key: string]: {
    en: string;
    ar: string;
  };
}

const translations: Translations = {
  'app.name': {
    en: 'FAWOZ Dashboard',
    ar: 'لوحة تحكم FAWOZ'
  },
  'app.notifications': {
    en: 'Notifications',
    ar: 'الإشعارات'
  },
  'app.view_all': {
    en: 'View all',
    ar: 'عرض الكل'
  },
  'app.guest': {
    en: 'Guest',
    ar: 'زائر'
  },
  'app.account_settings': {
    en: 'Account settings',
    ar: 'إعدادات الحساب'
  },
  'app.help_support': {
    en: 'Help & Support',
    ar: 'المساعدة والدعم'
  },
  'app.sign_out': {
    en: 'Sign out',
    ar: 'تسجيل الخروج'
  },
  'app.sign_in': {
    en: 'Sign in',
    ar: 'تسجيل الدخول'
  },
  
  // Dashboard translations
  'dashboard.title': {
    en: 'Dashboard',
    ar: 'لوحة التحكم'
  },
  'dashboard.today': {
    en: 'Today',
    ar: 'اليوم'
  },
  'dashboard.new_requests': {
    en: 'New Requests',
    ar: 'طلبات جديدة'
  },
  'dashboard.overview': {
    en: 'Overview',
    ar: 'نظرة عامة'
  },
  'dashboard.active_jobs': {
    en: 'Active Jobs',
    ar: 'المهام النشطة'
  },
  'dashboard.today_jobs': {
    en: 'Today\'s Jobs',
    ar: 'مهام اليوم'
  },
  'dashboard.earnings': {
    en: 'Earnings',
    ar: 'الأرباح'
  },
  
  // Jobs translations
  'jobs.title': {
    en: 'Jobs',
    ar: 'المهام'
  },
  'jobs.all': {
    en: 'All Jobs',
    ar: 'جميع المهام'
  },
  'jobs.new': {
    en: 'New',
    ar: 'جديد'
  },
  'jobs.in_progress': {
    en: 'In Progress',
    ar: 'قيد التنفيذ'
  },
  'jobs.completed': {
    en: 'Completed',
    ar: 'مكتمل'
  },
  'jobs.cancelled': {
    en: 'Cancelled',
    ar: 'ملغي'
  },
  
  // Calendar translations
  'calendar.title': {
    en: 'Calendar',
    ar: 'التقويم'
  },
  'calendar.day': {
    en: 'Day',
    ar: 'يوم'
  },
  'calendar.weekly': {
    en: 'Weekly View',
    ar: 'عرض أسبوعي'
  },
  'calendar.month': {
    en: 'Month',
    ar: 'شهر'
  },
  'calendar.today_appointments': {
    en: 'Today\'s Appointments',
    ar: 'مواعيد اليوم'
  },
  'calendar.no_appointments': {
    en: 'No appointments for today',
    ar: 'لا توجد مواعيد لهذا اليوم'
  },
  
  // Team translations
  'team.title': {
    en: 'Team',
    ar: 'الفريق'
  },
  
  // Messages translations
  'messages.title': {
    en: 'Messages',
    ar: 'الرسائل'
  },
  'messages.all': {
    en: 'All',
    ar: 'الكل'
  },
  'messages.clients': {
    en: 'Clients',
    ar: 'العملاء'
  },
  'messages.team': {
    en: 'Team',
    ar: 'الفريق'
  },
  'messages.no_conversations': {
    en: 'No conversations yet',
    ar: 'لا توجد محادثات بعد'
  },
  'messages.search': {
    en: 'Search messages',
    ar: 'البحث في الرسائل'
  },
  
  // Payments translations
  'payments.title': {
    en: 'Payments',
    ar: 'المدفوعات'
  },
  'payments.transactions': {
    en: 'Transactions',
    ar: 'المعاملات'
  },
  'payments.methods': {
    en: 'Payment Methods',
    ar: 'طرق الدفع'
  },
  'payments.balance': {
    en: 'Balance',
    ar: 'الرصيد'
  },
  'payments.pending': {
    en: 'Pending',
    ar: 'قيد الانتظار'
  },
  'payments.completed': {
    en: 'Completed',
    ar: 'مكتمل'
  },
  
  // Services translations
  'services.title': {
    en: 'Services',
    ar: 'الخدمات'
  },
  
  // Locations translations
  'locations.title': {
    en: 'Locations',
    ar: 'المواقع'
  },
  'locations.all': {
    en: 'All Locations',
    ar: 'جميع المواقع'
  },
  'locations.favorite': {
    en: 'Favorites',
    ar: 'المفضلة'
  },
  'locations.search': {
    en: 'Search locations',
    ar: 'البحث في المواقع'
  },
  'locations.add': {
    en: 'Add Location',
    ar: 'إضافة موقع'
  },
  'locations.coverage': {
    en: 'Coverage Settings',
    ar: 'إعدادات التغطية'
  },
  
  // Financial translations
  'financial.title': {
    en: 'Financial Dashboard',
    ar: 'لوحة التحكم المالية'
  },
  'financial.overview': {
    en: 'Financial Overview',
    ar: 'نظرة عامة مالية'
  },
  'financial.weekly': {
    en: 'Weekly',
    ar: 'أسبوعي'
  },
  'financial.monthly': {
    en: 'Monthly',
    ar: 'شهري'
  },
  'financial.yearly': {
    en: 'Yearly',
    ar: 'سنوي'
  },
  'financial.service_breakdown': {
    en: 'Service Breakdown',
    ar: 'تفصيل الخدمات'
  },
  'financial.recent_transactions': {
    en: 'Recent Transactions',
    ar: 'المعاملات الأخيرة'
  },
  'financial.payout_settings': {
    en: 'Payout Settings',
    ar: 'إعدادات الدفع'
  },
  
  // Bidding translations
  'bidding.title': {
    en: 'Open Bidding',
    ar: 'المناقصات المفتوحة'
  },
  'bidding.marketplace': {
    en: 'Marketplace',
    ar: 'السوق'
  },
  'bidding.my_bids': {
    en: 'My Bids',
    ar: 'عطاءاتي'
  },
  'bidding.post_job': {
    en: 'Post Job',
    ar: 'نشر وظيفة'
  },
  'bidding.analytics': {
    en: 'Analytics',
    ar: 'التحليلات'
  },
  
  // Settings translations
  'settings.title': {
    en: 'Settings',
    ar: 'الإعدادات'
  },
  'settings.account': {
    en: 'Account',
    ar: 'الحساب'
  },
  'settings.language': {
    en: 'Language',
    ar: 'اللغة'
  },
  'settings.language_english': {
    en: 'English',
    ar: 'الإنجليزية'
  },
  'settings.language_arabic': {
    en: 'Arabic',
    ar: 'العربية'
  },
  'settings.notifications': {
    en: 'Notifications',
    ar: 'الإشعارات'
  },
  'settings.security': {
    en: 'Security',
    ar: 'الأمان'
  },
  
  // Auth translations
  'auth.welcome': {
    en: 'Welcome to FAWOZ',
    ar: 'مرحبًا بك في FAWOZ'
  },
  'auth.login': {
    en: 'Login',
    ar: 'تسجيل الدخول'
  },
  'auth.register': {
    en: 'Register',
    ar: 'التسجيل'
  },
  'auth.login_subtitle': {
    en: 'Enter your credentials to access your account',
    ar: 'أدخل بيانات الاعتماد للوصول إلى حسابك'
  },
  'auth.register_subtitle': {
    en: 'Create an account to get started',
    ar: 'إنشاء حساب للبدء'
  },
  'auth.email': {
    en: 'Email',
    ar: 'البريد الإلكتروني'
  },
  'auth.password': {
    en: 'Password',
    ar: 'كلمة المرور'
  },
  'auth.forgot_password': {
    en: 'Forgot password?',
    ar: 'نسيت كلمة المرور؟'
  },
  'auth.sign_in': {
    en: 'Sign in',
    ar: 'تسجيل الدخول'
  },
  'auth.sign_up': {
    en: 'Sign up',
    ar: 'التسجيل'
  },
  'auth.full_name': {
    en: 'Full Name',
    ar: 'الاسم الكامل'
  },
  'auth.full_name_placeholder': {
    en: 'John Doe',
    ar: 'محمد عبدالله'
  },
  'auth.create_account': {
    en: 'Create account',
    ar: 'إنشاء حساب'
  },
  'auth.already_have_account': {
    en: 'Already have an account?',
    ar: 'لديك حساب بالفعل؟'
  },
  'auth.dont_have_account': {
    en: "Don't have an account?",
    ar: 'ليس لديك حساب؟'
  },
  'auth.terms': {
    en: 'By continuing, you agree to our Terms of Service and Privacy Policy',
    ar: 'بالمتابعة، أنت توافق على شروط الخدمة وسياسة الخصوصية الخاصة بنا'
  },
  'auth.or_continue_with': {
    en: 'Or continue with',
    ar: 'أو تابع باستخدام'
  },
  'auth.error': {
    en: 'Error',
    ar: 'خطأ'
  },
  'auth.all_fields_required': {
    en: 'All fields are required',
    ar: 'جميع الحقول مطلوبة'
  },
  'auth.password_reset': {
    en: 'Password Reset',
    ar: 'إعادة تعيين كلمة المرور'
  },
  'auth.password_reset_email': {
    en: 'If your email exists in our system, you will receive a password reset link shortly.',
    ar: 'إذا كان بريدك الإلكتروني موجودًا في نظامنا، فستتلقى رابط إعادة تعيين كلمة المرور قريبًا.'
  },
  'auth.signing_in': {
    en: 'Signing in...',
    ar: 'جاري تسجيل الدخول...'
  },
  'auth.creating_account': {
    en: 'Creating account...',
    ar: 'جاري إنشاء الحساب...'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'en';
  });

  const isRTL = language === 'ar';

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [language, isRTL]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
};
