
import { Translation } from '../types';

/**
 * Translations for the Open Bidding section of the application
 * Includes marketplace, job posting, and analytics related texts
 * @const biddingTranslations
 */
export const biddingTranslations: Record<string, Translation> = {
  'bidding.title': {
    en: 'Open Bidding',
    ar: 'المناقصات المفتوحة'
  },
  'bidding.marketplace': {
    en: 'Marketplace',
    ar: 'السوق'
  },
  'bidding.my_bids': {
    en: 'My Bids',
    ar: 'عطاءاتي'
  },
  'bidding.post_job': {
    en: 'Post Job',
    ar: 'نشر وظيفة'
  },
  'bidding.analytics': {
    en: 'Analytics',
    ar: 'التحليلات'
  },
  'bidding.subtitle': {
    en: 'Find new opportunities and submit bids',
    ar: 'ابحث عن فرص جديدة وقدم عروض أسعار'
  }
};
