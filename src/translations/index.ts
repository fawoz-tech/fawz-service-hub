
import { Translation } from './types';
import { appTranslations } from './categories/app';
import { authTranslations } from './categories/auth';
import { dashboardTranslations } from './categories/dashboard';
import { jobsTranslations } from './categories/jobs';
import { messagesTranslations } from './categories/messages';
import { teamTranslations } from './categories/team';
import { servicesTranslations } from './categories/services';
import { locationsTranslations } from './categories/locations';
import { financialTranslations } from './categories/financial';
import { settingsTranslations } from './categories/settings';
import { calendarTranslations } from './categories/calendar';
import { biddingTranslations } from './categories/bidding';
import { paymentsTranslations } from './categories/payments';
import { landingTranslations } from './categories/landing';

/**
 * Combined translations from all categories
 * @type {Record<string, Translation>}
 */
export const translations: Record<string, Translation> = {
  ...appTranslations,
  ...authTranslations,
  ...dashboardTranslations,
  ...jobsTranslations,
  ...messagesTranslations,
  ...teamTranslations,
  ...servicesTranslations,
  ...locationsTranslations,
  ...financialTranslations,
  ...settingsTranslations,
  ...calendarTranslations,
  ...biddingTranslations,
  ...paymentsTranslations,
  ...landingTranslations
};
