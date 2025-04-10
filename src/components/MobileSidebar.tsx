
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Clock, 
  Users, 
  MessageSquare, 
  CreditCard, 
  Settings,
  Wrench,
  MapPin,
  TagIcon,
  X
} from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface MobileSidebarProps {
  onClose: () => void;
}

const MobileSidebar = ({ onClose }: MobileSidebarProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={onClose}>
      <div 
        className="absolute left-0 top-0 h-full w-3/4 max-w-xs bg-white shadow-lg p-4 flex flex-col animate-slide-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-primary-600">FAWOZ</h1>
          </Link>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>
        
        <nav className="space-y-1 flex-1">
          <SidebarItem href="/" icon={<LayoutDashboard size={20} />} title={t('nav.dashboard')} onClick={onClose} />
          <SidebarItem href="/jobs" icon={<Clock size={20} />} title={t('nav.jobs')} onClick={onClose} />
          <SidebarItem href="/calendar" icon={<CalendarDays size={20} />} title={t('nav.calendar')} onClick={onClose} />
          <SidebarItem href="/team" icon={<Users size={20} />} title={t('nav.team')} onClick={onClose} />
          <SidebarItem href="/messages" icon={<MessageSquare size={20} />} title={t('nav.messages')} onClick={onClose} />
          <SidebarItem href="/payments" icon={<CreditCard size={20} />} title={t('nav.payments')} onClick={onClose} />
          <SidebarItem href="/services" icon={<Wrench size={20} />} title={t('nav.services')} onClick={onClose} />
          <SidebarItem href="/locations" icon={<MapPin size={20} />} title={t('nav.locations')} onClick={onClose} />
          <SidebarItem href="/financials" icon={<CreditCard size={20} />} title={t('nav.financials')} onClick={onClose} />
          <SidebarItem href="/bidding" icon={<TagIcon size={20} />} title={t('nav.bidding')} onClick={onClose} />
        </nav>

        <div className="pt-2 mt-2 border-t border-secondary-200">
          <SidebarItem href="/settings" icon={<Settings size={20} />} title={t('nav.settings')} onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ href, icon, title, active, onClick }: SidebarItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
        active 
          ? "bg-primary-50 text-primary-700" 
          : "text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100"
      )}
      onClick={onClick}
    >
      {icon}
      <span className="text-sm font-medium">{title}</span>
    </Link>
  );
};

export default MobileSidebar;
