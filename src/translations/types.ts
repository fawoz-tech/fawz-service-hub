
export type Language = 'en' | 'ar';

export interface Translation {
  en: string;
  ar: string;
}

export interface Translations {
  [key: string]: Translation;
}
