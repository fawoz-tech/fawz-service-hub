
import React, { createContext, useState, useContext, useEffect } from 'react';

// Define available languages
export type Language = 'en' | 'ar';

// Define context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
};

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
  isRTL: false,
});

// Translations for both languages
export const translations = {
  en: {
    // Common
    'app.name': 'FAWOZ Provider',
    'app.switch_language': 'العربية',
    'app.sign_out': 'Sign out',
    'app.help_support': 'Help & Support',
    'app.account_settings': 'Account Settings',
    'app.notifications': 'Notifications',
    'app.view_all': 'View all notifications',
    'app.search': 'Search',
    'app.loading': 'Loading...',
    'app.no_data': 'No data available',
    'app.guest': 'Guest',
    'app.sign_in': 'Sign in',
    'app.sign_up': 'Sign up',
    'app.signing_in': 'Signing in...',
    'app.signing_up': 'Signing up...',
    'app.email': 'Email',
    'app.password': 'Password',
    'app.confirm_password': 'Confirm password',
    'app.full_name': 'Full name',
    'app.welcome': 'Welcome',
    'app.auth_description': 'Sign in to your account or create a new one',
    'app.continue_as_guest': 'Continue as guest',
    'app.or': 'OR',
    
    // Settings
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.language_description': 'Select your preferred language',
    'settings.account': 'Account',
    'settings.security': 'Security',
    'settings.notifications': 'Notifications',
    'settings.last_updated': 'Last updated:',
    
    // Locations
    'locations.title': 'Locations',
    'locations.search': 'Search locations...',
    'locations.add': 'Add Location',
    'locations.all': 'All Locations',
    'locations.active': 'Active',
    'locations.inactive': 'Inactive',
    'locations.all_areas': 'All Areas',
    'locations.primary': 'Primary',
    'locations.secondary': 'Secondary',
    'locations.excluded': 'Excluded',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.new_requests': 'New Requests',
    'dashboard.pending_review': 'Pending review',
    'dashboard.in_progress': 'In Progress',
    'dashboard.jobs_active': 'Jobs currently active',
    'dashboard.urgent_jobs': 'Urgent Jobs',
    'dashboard.emergency_requests': 'Emergency requests',
    'dashboard.view_requests': 'View all requests',
    'dashboard.view_jobs': 'View active jobs',
    'dashboard.view_urgent': 'View urgent jobs',
    'dashboard.todays_jobs': 'Today\'s Jobs',
    'dashboard.view_calendar': 'View Calendar',
    'dashboard.no_jobs': 'No jobs scheduled for today',
    'dashboard.earnings': 'Earnings',
    'dashboard.this_month': 'This month',
    'dashboard.from_last': 'from last month',
    'dashboard.view_details': 'View Details',
    'dashboard.today': 'Today',
    
    // Jobs
    'jobs.title': 'Job Management',
    'jobs.search': 'Search jobs...',
    'jobs.no_jobs': 'No jobs found matching your criteria',
    'jobs.new': 'New',
    'jobs.en_route': 'En Route',
    'jobs.on_site': 'On Site',
    'jobs.completed': 'Completed',
    'jobs.cancelled': 'Cancelled',
    'jobs.all': 'All',
    'jobs.in_progress': 'In Progress',
    'jobs.urgent': 'Urgent',
    
    // Messages
    'messages.title': 'Messages',
    
    // Payments
    'payments.title': 'Payments',
    'payments.export': 'Export',
    'payments.available': 'Available Balance',
    'payments.withdraw': 'Withdraw Funds',
    'payments.pending': 'Pending Payments',
    'payments.waiting': 'payments waiting to clear',
    'payments.last_payout': 'Last Payout',
    'payments.bank_transfer': 'Bank transfer',
    'payments.transactions': 'Transactions',
    'payments.payment_methods': 'Payment Methods',
    'payments.payout_settings': 'Payout Settings',
    
    // Financial Dashboard
    'financial.title': 'Financial Dashboard',
    'financial.date_range': 'Date Range',
    
    // Bidding
    'bidding.title': 'Open Bidding',
    'bidding.subtitle': 'Find and bid on available jobs in your area',
    'bidding.post_job': 'Post a New Job',
    'bidding.marketplace': 'Marketplace',
    'bidding.my_bids': 'My Bids',
    'bidding.post': 'Post Job',
    'bidding.analytics': 'Win %',
    
    // Calendar
    'calendar.title': 'Calendar & Scheduling',
    'calendar.appointments': 'Today\'s Appointments',
    'calendar.no_appointments': 'No appointments scheduled for today',
    'calendar.weekly': 'Weekly Schedule',
    'calendar.select_day': 'Select a day to view appointments',
    'calendar.day': 'Day',
    'calendar.month': 'Month',
    
    // Team
    'team.title': 'Team',
    
    // Services
    'services.title': 'Services',
  },
  ar: {
    // Common
    'app.name': 'فوز للعماله',
    'app.switch_language': 'English',
    'app.sign_out': 'تسجيل الخروج',
    'app.help_support': 'المساعدة والدعم',
    'app.account_settings': 'إعدادات الحساب',
    'app.notifications': 'الإشعارات',
    'app.view_all': 'عرض كل الإشعارات',
    'app.search': 'بحث',
    'app.loading': 'جاري التحميل...',
    'app.no_data': 'لا توجد بيانات متاحة',
    'app.guest': 'زائر',
    'app.sign_in': 'تسجيل الدخول',
    'app.sign_up': 'إنشاء حساب',
    'app.signing_in': 'جاري تسجيل الدخول...',
    'app.signing_up': 'جاري إنشاء الحساب...',
    'app.email': 'البريد الإلكتروني',
    'app.password': 'كلمة المرور',
    'app.confirm_password': 'تأكيد كلمة المرور',
    'app.full_name': 'الاسم الكامل',
    'app.welcome': 'مرحباً',
    'app.auth_description': 'سجل الدخول إلى حسابك أو أنشئ حساباً جديداً',
    'app.continue_as_guest': 'المتابعة كزائر',
    'app.or': 'أو',
    
    // Settings
    'settings.title': 'الإعدادات',
    'settings.language': 'اللغة',
    'settings.language_description': 'اختر لغتك المفضلة',
    'settings.account': 'الحساب',
    'settings.security': 'الأمان',
    'settings.notifications': 'الإشعارات',
    'settings.last_updated': 'آخر تحديث:',
    
    // Locations
    'locations.title': 'المواقع',
    'locations.search': 'البحث عن المواقع...',
    'locations.add': 'إضافة موقع',
    'locations.all': 'جميع المواقع',
    'locations.active': 'نشط',
    'locations.inactive': 'غير نشط',
    'locations.all_areas': 'جميع المناطق',
    'locations.primary': 'رئيسي',
    'locations.secondary': 'ثانوي',
    'locations.excluded': 'مستبعد',
    
    // Dashboard
    'dashboard.title': 'لوحة التحكم',
    'dashboard.new_requests': 'طلبات جديدة',
    'dashboard.pending_review': 'في انتظار المراجعة',
    'dashboard.in_progress': 'قيد التنفيذ',
    'dashboard.jobs_active': 'المهام النشطة حاليًا',
    'dashboard.urgent_jobs': 'المهام العاجلة',
    'dashboard.emergency_requests': 'طلبات طارئة',
    'dashboard.view_requests': 'عرض جميع الطلبات',
    'dashboard.view_jobs': 'عرض المهام النشطة',
    'dashboard.view_urgent': 'عرض المهام العاجلة',
    'dashboard.todays_jobs': 'مهام اليوم',
    'dashboard.view_calendar': 'عرض التقويم',
    'dashboard.no_jobs': 'لا توجد مهام مجدولة لهذا اليوم',
    'dashboard.earnings': 'الأرباح',
    'dashboard.this_month': 'هذا الشهر',
    'dashboard.from_last': 'من الشهر الماضي',
    'dashboard.view_details': 'عرض التفاصيل',
    'dashboard.today': 'اليوم',
    
    // Jobs
    'jobs.title': 'إدارة المهام',
    'jobs.search': 'البحث عن المهام...',
    'jobs.no_jobs': 'لم يتم العثور على مهام تطابق معاييرك',
    'jobs.new': 'جديد',
    'jobs.en_route': 'في الطريق',
    'jobs.on_site': 'في الموقع',
    'jobs.completed': 'مكتملة',
    'jobs.cancelled': 'ملغاة',
    'jobs.all': 'الكل',
    'jobs.in_progress': 'قيد التنفيذ',
    'jobs.urgent': 'عاجل',
    
    // Messages
    'messages.title': 'الرسائل',
    
    // Payments
    'payments.title': 'المدفوعات',
    'payments.export': 'تصدير',
    'payments.available': 'الرصيد المتاح',
    'payments.withdraw': 'سحب الأموال',
    'payments.pending': 'المدفوعات المعلقة',
    'payments.waiting': 'مدفوعات بانتظار المقاصة',
    'payments.last_payout': 'آخر دفعة',
    'payments.bank_transfer': 'تحويل بنكي',
    'payments.transactions': 'المعاملات',
    'payments.payment_methods': 'طرق الدفع',
    'payments.payout_settings': 'إعدادات الصرف',
    
    // Financial Dashboard
    'financial.title': 'لوحة المعلومات المالية',
    'financial.date_range': 'النطاق الزمني',
    
    // Bidding
    'bidding.title': 'المزايدة المفتوحة',
    'bidding.subtitle': 'ابحث وقدم عطاءات على الوظائف المتاحة في منطقتك',
    'bidding.post_job': 'نشر وظيفة جديدة',
    'bidding.marketplace': 'السوق',
    'bidding.my_bids': 'عروضي',
    'bidding.post': 'نشر وظيفة',
    'bidding.analytics': 'نسبة الفوز',
    
    // Calendar
    'calendar.title': 'التقويم والجدولة',
    'calendar.appointments': 'مواعيد اليوم',
    'calendar.no_appointments': 'لا توجد مواعيد مجدولة لليوم',
    'calendar.weekly': 'الجدول الأسبوعي',
    'calendar.select_day': 'اختر يومًا لعرض المواعيد',
    'calendar.day': 'اليوم',
    'calendar.month': 'الشهر',
    
    // Team
    'team.title': 'الفريق',
    
    // Services
    'services.title': 'الخدمات',
  }
};

// Provider component
export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // Get initial language from localStorage or default to English
  const [language, setLanguageState] = useState<Language>(
    () => (localStorage.getItem('language') as Language) || 'en'
  );

  const isRTL = language === 'ar';
  
  // Update localStorage when language changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    
    // Set direction on HTML element
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };
  
  // Initialize language direction
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);
  
  // Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using language context
export const useLanguage = () => useContext(LanguageContext);
