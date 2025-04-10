
// Define available languages
export type Language = 'en' | 'ar';

// Define context type
export type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
};
