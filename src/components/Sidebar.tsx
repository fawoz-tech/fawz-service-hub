
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  TagIcon
} from 'lucide-react';
import { useLanguage } from '@/contexts/language';
import Logo from './Logo';

const Sidebar = () => {
  const location = useLocation();
  const { t } = useLanguage();
  
  return (
    <div className="w-64 bg-white border-r border-secondary-200 p-4 flex flex-col h-screen">
      <div className="flex items-center justify-center mb-8 mt-4">
        <Link to="/">
          <Logo size="lg" />
        </Link>
      </div>

      <nav className="space-y-1 flex-1">
        <SidebarItem 
          href="/" 
          icon={<LayoutDashboard size={20} />} 
          title={t('dashboard.title')} 
          active={location.pathname === '/'}
        />
        <SidebarItem 
          href="/jobs" 
          icon={<Clock size={20} />} 
          title={t('jobs.title')} 
          active={location.pathname === '/jobs'}
        />
        <SidebarItem 
          href="/calendar" 
          icon={<CalendarDays size={20} />} 
          title={t('calendar.title')} 
          active={location.pathname === '/calendar'}
        />
        <SidebarItem 
          href="/team" 
          icon={<Users size={20} />} 
          title={t('team.title')} 
          active={location.pathname === '/team'}
        />
        <SidebarItem 
          href="/messages" 
          icon={<MessageSquare size={20} />} 
          title={t('messages.title')} 
          active={location.pathname === '/messages'}
        />
        <SidebarItem 
          href="/payments" 
          icon={<CreditCard size={20} />} 
          title={t('payments.title')} 
          active={location.pathname === '/payments'}
        />
        <SidebarItem 
          href="/services" 
          icon={<Wrench size={20} />} 
          title={t('services.title')} 
          active={location.pathname === '/services'}
        />
        <SidebarItem 
          href="/locations" 
          icon={<MapPin size={20} />} 
          title={t('locations.title')} 
          active={location.pathname === '/locations'}
        />
        <SidebarItem 
          href="/financials" 
          icon={<CreditCard size={20} />} 
          title={t('financial.title')} 
          active={location.pathname === '/financials'}
        />
        <SidebarItem 
          href="/bidding" 
          icon={<TagIcon size={20} />} 
          title={t('bidding.title')} 
          active={location.pathname === '/bidding'}
        />
      </nav>

      <div className="pt-2 mt-2 border-t border-secondary-200">
        <SidebarItem 
          href="/settings" 
          icon={<Settings size={20} />} 
          title={t('settings.title')} 
          active={location.pathname === '/settings'}
        />
      </div>
    </div>
  );
};

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  active?: boolean;
}

const SidebarItem = ({ href, icon, title, active }: SidebarItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
        active 
          ? "bg-primary-50 text-primary-700" 
          : "text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100"
      )}
    >
      {icon}
      <span className="text-sm font-medium">{title}</span>
    </Link>
  );
};

export default Sidebar;
