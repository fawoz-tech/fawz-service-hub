
import { Translation } from '../types';

/**
 * Translations for the Jobs Management section
 * Includes job status labels, filtering options, and action buttons
 * @const jobsTranslations
 */
export const jobsTranslations: Record<string, Translation> = {
  'jobs.title': {
    en: 'Jobs',
    ar: 'المهام'
  },
  'jobs.all': {
    en: 'All Jobs',
    ar: 'جميع المهام'
  },
  'jobs.new': {
    en: 'New',
    ar: 'جديد'
  },
  'jobs.in_progress': {
    en: 'In Progress',
    ar: 'قيد التنفيذ'
  },
  'jobs.completed': {
    en: 'Completed',
    ar: 'مكتمل'
  },
  'jobs.cancelled': {
    en: 'Cancelled',
    ar: 'ملغي'
  },
  'jobs.en_route': {
    en: 'En Route',
    ar: 'في الطريق'
  },
  'jobs.on_site': {
    en: 'On Site',
    ar: 'في الموقع'
  },
  'jobs.no_jobs': {
    en: 'No jobs found',
    ar: 'لم يتم العثور على وظائف'
  },
  'jobs.search': {
    en: 'Search jobs',
    ar: 'البحث عن وظائف'
  },
  'jobs.urgent': {
    en: 'Urgent',
    ar: 'عاجل'
  }
};
