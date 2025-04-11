
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
    // Check if the key exists in translations
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key; // Return the key itself as fallback
    }
    
    // Return the translation in the current language
    return translations[key][language] || key;
  };

  return { language, setLanguage, isRTL, t };
};
