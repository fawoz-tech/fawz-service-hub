
import React, { createContext, useContext } from 'react';
import { useLanguageProvider } from './useLanguageProvider';
import { LanguageContextType } from './types';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const languageValues = useLanguageProvider();
  
  return (
    <LanguageContext.Provider value={languageValues}>
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
