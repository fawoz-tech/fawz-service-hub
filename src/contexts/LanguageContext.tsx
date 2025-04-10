
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
