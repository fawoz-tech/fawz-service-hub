
/**
 * Supported application languages
 * @typedef {'en' | 'ar'} Language
 */
export type Language = 'en' | 'ar';

/**
 * Represents a translation entry with support for all available languages
 * @interface Translation
 */
export interface Translation {
  /** English translation text */
  en: string;
  /** Arabic translation text */
  ar: string;
}

/**
 * Collection of all translation keys mapped to their multi-language values
 * @interface Translations
 */
export interface Translations {
  [key: string]: Translation;
}
