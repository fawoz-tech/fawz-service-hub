
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
  MapPin
} from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white border-r border-secondary-200 p-4 flex flex-col h-screen">
      <div className="flex items-center justify-center mb-8 mt-4">
        <Link to="/">
          <h1 className="text-xl font-bold text-primary-600">FAWOZ</h1>
        </Link>
      </div>

      <nav className="space-y-1 flex-1">
        <SidebarItem href="/" icon={<LayoutDashboard size={20} />} title="Dashboard" />
        <SidebarItem href="/jobs" icon={<Clock size={20} />} title="Job Management" />
        <SidebarItem href="/calendar" icon={<CalendarDays size={20} />} title="Calendar" />
        <SidebarItem href="/team" icon={<Users size={20} />} title="Team" />
        <SidebarItem href="/messages" icon={<MessageSquare size={20} />} title="Messages" />
        <SidebarItem href="/payments" icon={<CreditCard size={20} />} title="Payments" />
        <SidebarItem href="/services" icon={<Wrench size={20} />} title="Services" />
        <SidebarItem href="/locations" icon={<MapPin size={20} />} title="Locations" />
        <SidebarItem href="/financials" icon={<CreditCard size={20} />} title="Financial Dashboard" />
      </nav>

      <div className="pt-2 mt-2 border-t border-secondary-200">
        <SidebarItem href="/settings" icon={<Settings size={20} />} title="Settings" />
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
