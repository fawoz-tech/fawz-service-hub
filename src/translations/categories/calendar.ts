
import { Translation } from '../types';

/**
 * Translations for the Calendar section of the application
 * Includes different calendar views and appointment-related texts
 * @const calendarTranslations
 */
export const calendarTranslations: Record<string, Translation> = {
  'calendar.title': {
    en: 'Calendar',
    ar: 'التقويم'
  },
  'calendar.day': {
    en: 'Day',
    ar: 'يوم'
  },
  'calendar.weekly': {
    en: 'Weekly View',
    ar: 'عرض أسبوعي'
  },
  'calendar.month': {
    en: 'Month',
    ar: 'شهر'
  },
  'calendar.today_appointments': {
    en: "Today's Appointments",
    ar: 'مواعيد اليوم'
  },
  'calendar.no_appointments': {
    en: 'No appointments for today',
    ar: 'لا توجد مواعيد لهذا اليوم'
  },
  'calendar.appointments': {
    en: 'Appointments',
    ar: 'المواعيد'  
  }
};
