
import { Translation } from '../types';

/**
 * Translations for the Messages section of the application
 * Includes conversation filters, labels, and search functionality
 * @const messagesTranslations
 */
export const messagesTranslations: Record<string, Translation> = {
  'messages.title': {
    en: 'Messages',
    ar: 'الرسائل'
  },
  'messages.all': {
    en: 'All',
    ar: 'الكل'
  },
  'messages.clients': {
    en: 'Clients',
    ar: 'العملاء'
  },
  'messages.team': {
    en: 'Team',
    ar: 'الفريق'
  },
  'messages.no_conversations': {
    en: 'No conversations yet',
    ar: 'لا توجد محادثات بعد'
  },
  'messages.search': {
    en: 'Search messages',
    ar: 'البحث في الرسائل'
  }
};
