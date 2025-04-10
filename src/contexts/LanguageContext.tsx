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
    
    // Settings
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.language_description': 'Select your preferred language',
    'settings.account': 'Account',
    'settings.security': 'Security',
    'settings.notifications': 'Notifications',
    
    // Locations
    'locations.title': 'Locations',
    'locations.search': 'Search locations...',
    'locations.add': 'Add Location',
    'locations.all': 'All Locations',
    'locations.active': 'Active',
    'locations.inactive': 'Inactive',
    'locations.primary_area': 'Primary Area',
    'locations.secondary_area': 'Secondary Area',
    'locations.business': 'Business',
    'locations.both': 'Both',
    'locations.radius': 'km radius',
    'locations.edit': 'Edit',

    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.jobs': 'Jobs',
    'nav.calendar': 'Calendar',
    'nav.team': 'Team',
    'nav.messages': 'Messages',
    'nav.payments': 'Payments',
    'nav.services': 'Services',
    'nav.locations': 'Locations',
    'nav.financials': 'Financials',
    'nav.bidding': 'Open Bidding',
    'nav.settings': 'Settings',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.new_requests': 'New Requests',
    'dashboard.today': 'Today',
    'dashboard.pending_review': 'Pending Review',
    'dashboard.jobs_active': 'Jobs Active',
    'dashboard.emergency_requests': 'Emergency Requests',
    'dashboard.view_requests': 'View Requests',
    'dashboard.view_jobs': 'View Jobs',
    'dashboard.view_urgent': 'View Urgent',
    'dashboard.earnings': 'Earnings',
    'dashboard.this_month': 'This Month',
    'dashboard.from_last': 'from last month',
    'dashboard.view_details': 'View Details',
    'dashboard.view_calendar': 'View Calendar',
    'dashboard.todays_jobs': 'Today\'s Jobs',
    'dashboard.no_jobs': 'No jobs scheduled for today',
    'dashboard.urgent_jobs': 'Urgent Jobs',
    'dashboard.in_progress': 'In Progress',
    
    // Calendar
    'calendar.title': 'Calendar & Scheduling',
    'calendar.today': 'Today',
    'calendar.day': 'Day',
    'calendar.week': 'Week',
    'calendar.month': 'Month',
    'calendar.su': 'Su',
    'calendar.mo': 'Mo',
    'calendar.tu': 'Tu',
    'calendar.we': 'We',
    'calendar.th': 'Th',
    'calendar.fr': 'Fr',
    'calendar.sa': 'Sa',

    // Jobs & Bidding
    'jobs.title': 'Jobs',
    'jobs.search': 'Search jobs...',
    'jobs.all': 'All',
    'jobs.new': 'New',
    'jobs.in_progress': 'In Progress',
    'jobs.completed': 'Completed',
    'jobs.urgent': 'Urgent',
    'jobs.urgent_request': 'Urgent Request',
    'jobs.response_required': 'Response required ASAP',
    'jobs.new_request': 'New Request',
    'jobs.en_route': 'En Route',
    'jobs.accept_request': 'Accept Request',
    'jobs.send_quote': 'Send Quote',
    'jobs.message': 'Message',
    'jobs.arrived_on_site': 'Arrived on Site',
    'jobs.view_map': 'View Map',
    'jobs.view_details': 'View Details',
    
    // Bidding
    'bidding.title': 'Open Bidding',
    'bidding.subtitle': 'Find and bid on available jobs in your area',
    'bidding.marketplace': 'Marketplace',
    'bidding.my_bids': 'My Bids',
    'bidding.post': 'Post Job',
    'bidding.analytics': 'Analytics',
    'bidding.post_job': 'Post Job',
    'bidding.jobs_available': 'jobs available',
    'bidding.place_bid': 'Place Bid',
    'bidding.minutes_ago': 'minutes ago',
    'bidding.bids': 'bids',
    
    // Messages
    'messages.title': 'Messages',
    'messages.search': 'Search conversations...',
    'messages.all': 'All',
    'messages.unread': 'Unread',
    'messages.yesterday': 'Yesterday',
    'messages.no_conversation': 'No conversation selected',
    'messages.select_conversation': 'Select a conversation from the list to view messages',

    // Services
    'services.title': 'Service Management',
    'services.add': 'Add Service',
    'services.search': 'Search services...',
    'services.active': 'Active',
    'services.inactive': 'Inactive',
    'services.featured': 'Featured',
    'services.hours': 'hours',
    'services.categories': 'Service Categories',
    
    // Financial
    'financial.title': 'Financials',
    'financial.pending_payments': 'Pending Payments',
    'financial.invoices_pending': 'invoices pending',
    'financial.total_revenue': 'Total Revenue',
    'financial.vs_previous': 'vs. previous period',
    'financial.average_job': 'Average Job Value',
    'financial.jobs_completed': 'Jobs Completed',
    'financial.this_month': 'this month',
    'financial.revenue_overview': 'Revenue Overview',
    'financial.daily': 'Daily',
    'financial.weekly': 'Weekly',
    'financial.monthly': 'Monthly',
    'financial.yearly': 'Yearly',
    'financial.completed': 'completed',
    'financial.pending': 'pending',
    'financial.declined': 'declined',
    'financial.customer': 'Customer',
    'financial.service': 'Service',
    'financial.amount': 'Amount',
    'financial.date': 'Date',
    'financial.status': 'Status',
    'financial.recent_transactions': 'Recent Transactions',
    'financial.all_locations': 'All Locations',
    'financial.all_services': 'All Services',
    'financial.all_prices': 'All Prices',
  },
  ar: {
    // Common
    'app.name': 'فوز لمقدمو الخدمات',
    'app.switch_language': 'English',
    'app.sign_out': 'تسجيل الخروج',
    'app.help_support': 'المساعدة والدعم',
    'app.account_settings': 'إعدادات الحساب',
    'app.notifications': 'الإشعارات',
    'app.view_all': 'عرض كل الإشعارات',
    'app.search': 'بحث',
    
    // Settings
    'settings.title': 'الإعدادات',
    'settings.language': 'اللغة',
    'settings.language_description': 'اختر لغتك المفضلة',
    'settings.account': 'الحساب',
    'settings.security': 'الأمان',
    'settings.notifications': 'الإشعارات',
    
    // Locations
    'locations.title': 'المواقع',
    'locations.search': 'البحث عن المواقع...',
    'locations.add': 'إضافة موقع',
    'locations.all': 'جميع المواقع',
    'locations.active': 'نشط',
    'locations.inactive': 'غير نشط',
    'locations.primary_area': 'المنطقة الرئيسية',
    'locations.secondary_area': 'المنطقة الثانوية',
    'locations.business': 'عمل تجاري',
    'locations.both': 'كلاهما',
    'locations.radius': 'كم نصف قطر',
    'locations.edit': 'تعديل',

    // Navigation
    'nav.dashboard': 'لوحة التحكم',
    'nav.jobs': 'المهام',
    'nav.calendar': 'التقويم',
    'nav.team': 'الفريق',
    'nav.messages': 'الرسائل',
    'nav.payments': 'المدفوعات',
    'nav.services': 'الخدمات',
    'nav.locations': 'المواقع',
    'nav.financials': 'المالية',
    'nav.bidding': 'المناقصات',
    'nav.settings': 'الإعدادات',
    
    // Dashboard
    'dashboard.title': 'لوحة التحكم',
    'dashboard.new_requests': 'الطلبات الجديدة',
    'dashboard.today': 'اليوم',
    'dashboard.pending_review': 'بانتظار المراجعة',
    'dashboard.jobs_active': 'مهام نشطة',
    'dashboard.emergency_requests': 'طلبات طارئة',
    'dashboard.view_requests': 'عرض الطلبات',
    'dashboard.view_jobs': 'عرض المهام',
    'dashboard.view_urgent': 'عرض العاجل',
    'dashboard.earnings': 'الأرباح',
    'dashboard.this_month': 'هذا الشهر',
    'dashboard.from_last': 'منذ الشهر الماضي',
    'dashboard.view_details': 'عرض التفاصيل',
    'dashboard.view_calendar': 'عرض التقويم',
    'dashboard.todays_jobs': 'مهام اليوم',
    'dashboard.no_jobs': 'لا توجد مهام مجدولة لليوم',
    'dashboard.urgent_jobs': 'المهام العاجلة',
    'dashboard.in_progress': 'قيد التنفيذ',
    
    // Calendar
    'calendar.title': 'التقويم والجدولة',
    'calendar.today': 'اليوم',
    'calendar.day': 'يوم',
    'calendar.week': 'أسبوع',
    'calendar.month': 'شهر',
    'calendar.su': 'الأحد',
    'calendar.mo': 'الإثنين',
    'calendar.tu': 'الثلاثاء',
    'calendar.we': 'الأربعاء',
    'calendar.th': 'الخميس',
    'calendar.fr': 'الجمعة',
    'calendar.sa': 'السبت',
    
    // Jobs & Bidding
    'jobs.title': 'إدارة المهام',
    'jobs.search': 'البحث عن المهام...',
    'jobs.all': 'الكل',
    'jobs.new': 'جديد',
    'jobs.in_progress': 'قيد التنفيذ',
    'jobs.completed': 'مكتملة',
    'jobs.urgent': 'عاجل',
    'jobs.urgent_request': 'طلب عاجل',
    'jobs.response_required': 'مطلوب رد فوري',
    'jobs.new_request': 'طلب جديد',
    'jobs.en_route': 'في الطريق',
    'jobs.accept_request': 'قبول الطلب',
    'jobs.send_quote': 'إرسال عرض سعر',
    'jobs.message': 'رسالة',
    'jobs.arrived_on_site': 'وصل إلى الموقع',
    'jobs.view_map': 'عرض الخريطة',
    'jobs.view_details': 'عرض التفاصيل',
    
    // Bidding
    'bidding.title': 'المناقصات المفتوحة',
    'bidding.subtitle': 'ابحث وقدم عروض على المهام المتاحة في منطقتك',
    'bidding.marketplace': 'السوق',
    'bidding.my_bids': 'عروضي',
    'bidding.post': 'نشر مهمة',
    'bidding.analytics': 'التحليلات',
    'bidding.post_job': 'نشر مهمة',
    'bidding.jobs_available': 'مهام متاحة',
    'bidding.place_bid': 'تقديم عرض',
    'bidding.minutes_ago': 'دقائق مضت',
    'bidding.bids': 'عروض',
    
    // Messages
    'messages.title': 'الرسائل',
    'messages.search': 'البحث في المحادثات...',
    'messages.all': 'الكل',
    'messages.unread': 'غير مقروءة',
    'messages.yesterday': 'بالأمس',
    'messages.no_conversation': 'لم يتم تحديد محادثة',
    'messages.select_conversation': 'اختر محادثة من القائمة لعرض الرسائل',

    // Services
    'services.title': 'إدارة الخدمات',
    'services.add': 'إضافة خدمة',
    'services.search': 'البحث عن الخدمات...',
    'services.active': 'نشطة',
    'services.inactive': 'غير نشطة',
    'services.featured': 'مميزة',
    'services.hours': 'ساعات',
    'services.categories': 'فئات الخدمات',
    
    // Financial
    'financial.title': 'المالية',
    'financial.pending_payments': 'مدفوعات معلقة',
    'financial.invoices_pending': 'فواتير معلقة',
    'financial.total_revenue': 'إجمالي الإيرادات',
    'financial.vs_previous': 'مقارنة بالفترة السابقة',
    'financial.average_job': 'متوسط قيمة المهمة',
    'financial.jobs_completed': 'المهام المكتملة',
    'financial.this_month': 'هذا الشهر',
    'financial.revenue_overview': 'نظرة عامة على الإيرادات',
    'financial.daily': 'يومي',
    'financial.weekly': 'أسبوعي',
    'financial.monthly': 'شهري',
    'financial.yearly': 'سنوي',
    'financial.completed': 'مكتمل',
    'financial.pending': 'معلق',
    'financial.declined': 'مرفوض',
    'financial.customer': 'العميل',
    'financial.service': 'الخدمة',
    'financial.amount': 'المبلغ',
    'financial.date': 'التاريخ',
    'financial.status': 'الحالة',
    'financial.recent_transactions': 'المعاملات الأخيرة',
    'financial.all_locations': 'جميع المواقع',
    'financial.all_services': 'جميع الخدمات',
    'financial.all_prices': 'جميع الأسعار',
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
