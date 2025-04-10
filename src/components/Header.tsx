
import React, { useState } from 'react';
import { Bell, MessageSquare, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileSidebar from './MobileSidebar';
import { useNavigate } from 'react-router-dom';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';

const Header = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleMessagesClick = () => {
    navigate('/messages');
  };

  return (
    <header className="bg-white border-b border-secondary-200 py-4 px-6 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="md:hidden">
            {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
          </Button>
        )}
        <h1 className="font-semibold text-lg text-secondary-800">{t('app.name')}</h1>
      </div>
      
      <div className="flex items-center gap-2">
        <LanguageToggle />
        
        <Popover open={showNotifications} onOpenChange={setShowNotifications}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell size={18} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full"></span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align={isRTL ? "start" : "end"}>
            <div className="px-4 py-3 border-b border-secondary-100">
              <h3 className="font-medium">{t('app.notifications')}</h3>
            </div>
            <div className="max-h-96 overflow-auto">
              <div className="p-4 border-b border-secondary-100 hover:bg-secondary-50">
                <p className="font-medium">New job request</p>
                <p className="text-sm text-secondary-500">AC repair in Al Olaya district</p>
                <p className="text-xs text-secondary-400 mt-1">10 minutes ago</p>
              </div>
              <div className="p-4 border-b border-secondary-100 hover:bg-secondary-50">
                <p className="font-medium">Quote accepted</p>
                <p className="text-sm text-secondary-500">Ahmed Al-Saeed accepted your quote</p>
                <p className="text-xs text-secondary-400 mt-1">2 hours ago</p>
              </div>
              <div className="p-4 hover:bg-secondary-50">
                <p className="font-medium">Payment received</p>
                <p className="text-sm text-secondary-500">SAR 450 from job #JOB-2458</p>
                <p className="text-xs text-secondary-400 mt-1">Yesterday</p>
              </div>
            </div>
            <div className="p-2 border-t border-secondary-100">
              <Button variant="ghost" className="w-full justify-center text-sm">
                {t('app.view_all')}
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        
        <Button 
          variant="outline" 
          size="icon"
          onClick={handleMessagesClick}
        >
          <MessageSquare size={18} />
        </Button>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="rounded-full h-8 w-8 p-0">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
              </Avatar>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0" align={isRTL ? "start" : "end"}>
            <div className="px-4 py-3 border-b border-secondary-100">
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-secondary-500">john.doe@example.com</p>
            </div>
            <div className="py-2">
              <Button 
                variant="ghost" 
                className="w-full justify-start px-4 py-2 text-sm"
                onClick={() => navigate('/settings')}
              >
                {t('app.account_settings')}
              </Button>
              <Button variant="ghost" className="w-full justify-start px-4 py-2 text-sm">
                {t('app.help_support')}
              </Button>
              <Button variant="ghost" className="w-full justify-start px-4 py-2 text-sm text-destructive">
                {t('app.sign_out')}
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {isMobile && showMobileMenu && (
        <MobileSidebar onClose={toggleMobileMenu} />
      )}
    </header>
  );
};

export default Header;
