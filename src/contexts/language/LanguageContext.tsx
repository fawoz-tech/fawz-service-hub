
import React, { createContext, useState, useEffect } from 'react';
import { Language, LanguageContextType } from './types';
import { translations } from './translations';

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
  isRTL: false,
});

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

export default LanguageContext;
