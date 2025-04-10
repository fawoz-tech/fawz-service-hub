
import { useContext } from 'react';
import LanguageContext from './LanguageContext';
import { LanguageContextType } from './types';

// Custom hook for using language context
export const useLanguage = (): LanguageContextType => useContext(LanguageContext);
