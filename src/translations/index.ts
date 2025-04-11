
type Language = 'en' | 'ar';

export interface Translation {
  en: string;
  ar: string;
}

export interface Translations {
  [key: string]: Translation;
}

export const translations: Translations = {
  'app.name': {
    en: 'FAWOZ Dashboard',
    ar: 'لوحة تحكم فوز للخدمات'
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
  'dashboard.pending_review': {
    en: 'Pending Review',
    ar: 'بانتظار المراجعة'
  },
  'dashboard.view_requests': {
    en: 'View Requests',
    ar: 'عرض الطلبات'
  },
  'dashboard.in_progress': {
    en: 'In Progress',
    ar: 'قيد التنفيذ'
  },
  'dashboard.jobs_active': {
    en: 'Jobs Active',
    ar: 'مهام نشطة'
  },
  'dashboard.view_jobs': {
    en: 'View Jobs',
    ar: 'عرض المهام'
  },
  'dashboard.urgent_jobs': {
    en: 'Urgent Jobs',
    ar: 'مهام عاجلة'
  },
  'dashboard.emergency_requests': {
    en: 'Emergency Requests',
    ar: 'طلبات طارئة'
  },
  'dashboard.view_urgent': {
    en: 'View Urgent',
    ar: 'عرض العاجل'
  },
  'dashboard.this_month': {
    en: 'This Month',
    ar: 'هذا الشهر'
  },
  'dashboard.from_last': {
    en: 'from last month',
    ar: 'من الشهر الماضي'
  },
  'dashboard.view_details': {
    en: 'View Details',
    ar: 'عرض التفاصيل'
  },
  'dashboard.todays_jobs': {
    en: 'Today\'s Jobs',
    ar: 'مهام اليوم'
  },
  'dashboard.view_calendar': {
    en: 'View Calendar',
    ar: 'عرض التقويم'
  },
  'dashboard.no_jobs': {
    en: 'No jobs scheduled for today',
    ar: 'لا توجد مهام مجدولة لهذا اليوم'
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
  'jobs.en_route': {
    en: 'En Route',
    ar: 'في الطريق'
  },
  'jobs.on_site': {
    en: 'On Site',
    ar: 'في الموقع'
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
  'calendar.appointments': {
    en: 'Appointments',
    ar: 'المواعيد'  
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
  'payments.available': {
    en: 'Available Balance',
    ar: 'الرصيد المتاح'
  },
  'payments.withdraw': {
    en: 'Withdraw',
    ar: 'سحب'
  },
  'payments.waiting': {
    en: 'transactions pending',
    ar: 'معاملات معلقة'
  },
  'payments.last_payout': {
    en: 'Last Payout',
    ar: 'آخر دفعة'
  },
  'payments.bank_transfer': {
    en: 'Bank Transfer',
    ar: 'تحويل بنكي'
  },
  'payments.payout_settings': {
    en: 'Payout Settings',
    ar: 'إعدادات الدفع'
  },
  'payments.export': {
    en: 'Export',
    ar: 'تصدير'
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
  'financial.date_range': {
    en: 'Date Range',
    ar: 'النطاق الزمني'
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
  'bidding.subtitle': {
    en: 'Find new opportunities and submit bids',
    ar: 'ابحث عن فرص جديدة وقدم عروض أسعار'
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
  'settings.language_description': {
    en: 'Change your preferred language',
    ar: 'تغيير لغتك المفضلة'
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
  'settings.last_updated': {
    en: 'Last updated:',
    ar: 'آخر تحديث:'
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
  },
  'auth.captcha_error': {
    en: 'CAPTCHA verification failed. This application requires CAPTCHA to be configured properly.',
    ar: 'فشل التحقق من CAPTCHA. يتطلب هذا التطبيق تكوين CAPTCHA بشكل صحيح.'
  },
  'auth.captcha_admin_note': {
    en: 'Admin: Please disable CAPTCHA in your Supabase settings or implement a proper CAPTCHA solution.',
    ar: 'المسؤول: يرجى تعطيل CAPTCHA في إعدادات Supabase أو تنفيذ حل CAPTCHA المناسب.'
  },
  'auth.error_occurred': {
    en: 'An error occurred. Please try again.',
    ar: 'حدث خطأ. يرجى المحاولة مرة أخرى.'
  },
  'auth.invalid_email': {
    en: 'Please enter a valid email address',
    ar: 'يرجى إدخال عنوان بريد إلكتروني صالح'
  },
  'auth.password_min_length': {
    en: 'Password must be at least 6 characters',
    ar: 'يجب أن تكون كلمة المرور 6 أحرف على الأقل'
  },
  'auth.fullname_required': {
    en: 'Full name is required',
    ar: 'الاسم الكامل مطلوب'
  }
};

