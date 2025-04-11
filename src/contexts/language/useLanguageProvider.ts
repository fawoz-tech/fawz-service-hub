
import { useState, useEffect } from 'react';
import { translations } from '@/translations';
import { Language, LanguageContextType } from './types';

/**
 * Hook that provides language context functionality
 * Manages language state, direction (RTL/LTR), and translation lookup
 * @returns {LanguageContextType} Language context value
 */
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

  /**
   * Translates a given key to the current language
   * @param {string} key - The translation key to look up
   * @returns {string} Translated text or the key itself if translation is not found
   */
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
