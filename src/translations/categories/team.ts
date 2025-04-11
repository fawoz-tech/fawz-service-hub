
import { Translation } from '../types';

/**
 * Translations for the Team Management section of the application
 * Includes team member roles, actions, and collaboration features
 * @const teamTranslations
 */
export const teamTranslations: Record<string, Translation> = {
  'team.title': {
    en: 'Team',
    ar: 'الفريق'
  },
  'team.management': {
    en: 'Team Management',
    ar: 'إدارة الفريق'
  },
  'team.add_member': {
    en: 'Add Team Member',
    ar: 'إضافة عضو للفريق'
  },
  'team.search': {
    en: 'Search technicians...',
    ar: 'بحث عن الفنيين...'
  },
  'team.all': {
    en: 'All',
    ar: 'الكل'
  },
  'team.available': {
    en: 'Available',
    ar: 'متاح'
  },
  'team.busy': {
    en: 'Busy',
    ar: 'مشغول'
  },
  'team.todays_assignments': {
    en: 'Today\'s Assignments',
    ar: 'مهام اليوم'
  },
  'team.technician_assignments': {
    en: 'Technician Assignments',
    ar: 'مهام الفنيين'
  },
  'team.view_schedule': {
    en: 'View Schedule',
    ar: 'عرض الجدول'
  },
  'team.available_status': {
    en: 'Available',
    ar: 'متاح'
  },
  'team.on_job_status': {
    en: 'On Job',
    ar: 'في مهمة'
  },
  'team.on_break_status': {
    en: 'On Break',
    ar: 'في استراحة'
  },
  'team.off_duty_status': {
    en: 'Off Duty',
    ar: 'خارج الخدمة'
  },
  'team.assigned_status': {
    en: 'Assigned',
    ar: 'تم تعيينه'
  },
  'team.en-route_status': {
    en: 'En Route',
    ar: 'في الطريق'
  },
  'team.on-site_status': {
    en: 'On Site',
    ar: 'في الموقع'
  },
  'team.jobs': {
    en: 'jobs',
    ar: 'مهام'
  },
  // New translation keys for the Add Team Member dialog
  'team.name': {
    en: 'Name',
    ar: 'الاسم'
  },
  'team.role': {
    en: 'Role',
    ar: 'الوظيفة'
  },
  'team.status': {
    en: 'Status',
    ar: 'الحالة'
  },
  'team.services': {
    en: 'Services',
    ar: 'الخدمات'
  },
  'team.phone': {
    en: 'Phone Number',
    ar: 'رقم الهاتف'
  },
  'team.name_placeholder': {
    en: 'Enter technician name',
    ar: 'أدخل اسم الفني'
  },
  'team.role_placeholder': {
    en: 'Enter technician role',
    ar: 'أدخل دور الفني'
  },
  'team.select_status': {
    en: 'Select a status',
    ar: 'اختر الحالة'
  },
  'team.services_placeholder': {
    en: 'Enter services, separated by commas',
    ar: 'أدخل الخدمات، مفصولة بفواصل'
  },
  'team.phone_placeholder': {
    en: 'Enter phone number',
    ar: 'أدخل رقم الهاتف'
  },
  'team.cancel': {
    en: 'Cancel',
    ar: 'إلغاء'
  },
  'team.add': {
    en: 'Add',
    ar: 'إضافة'
  },
  'team.member_added': {
    en: 'Team Member Added',
    ar: 'تمت إضافة عضو الفريق'
  },
  'team.member_added_success': {
    en: 'The new team member has been successfully added.',
    ar: 'تمت إضافة عضو الفريق الجديد بنجاح.'
  },
  'team.no_members_found': {
    en: 'No team members found',
    ar: 'لم يتم العثور على أعضاء الفريق'
  },
  'team.no_available_members': {
    en: 'No available team members found',
    ar: 'لم يتم العثور على أعضاء فريق متاحين'
  },
  'team.no_busy_members': {
    en: 'No busy team members found',
    ar: 'لم يتم العثور على أعضاء فريق مشغولين'
  }
};
