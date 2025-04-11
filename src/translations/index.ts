
import type { Translations } from './types';
import { appTranslations } from './categories/app';
import { authTranslations } from './categories/auth';
import { dashboardTranslations } from './categories/dashboard';
import { jobsTranslations } from './categories/jobs';
import { calendarTranslations } from './categories/calendar';
import { teamTranslations } from './categories/team';
import { messagesTranslations } from './categories/messages';
import { paymentsTranslations } from './categories/payments';
import { servicesTranslations } from './categories/services';
import { locationsTranslations } from './categories/locations';
import { financialTranslations } from './categories/financial';
import { biddingTranslations } from './categories/bidding';
import { settingsTranslations } from './categories/settings';

// Re-export types with proper syntax for isolatedModules
export type { Language, Translation, Translations } from './types';

// Combine all translation categories
export const translations: Translations = {
  ...appTranslations,
  ...authTranslations,
  ...dashboardTranslations,
  ...jobsTranslations,
  ...calendarTranslations,
  ...teamTranslations,
  ...messagesTranslations,
  ...paymentsTranslations,
  ...servicesTranslations,
  ...locationsTranslations,
  ...financialTranslations,
  ...biddingTranslations,
  ...settingsTranslations
};
