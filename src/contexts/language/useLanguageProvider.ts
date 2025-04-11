
import { useState, useEffect } from 'react';
import { translations } from '@/translations';
import { Language, LanguageContextType } from './types';

export const useLanguageProvider = (): LanguageContextType => {
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

  return { language, setLanguage, isRTL, t };
};
