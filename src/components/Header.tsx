
import React from 'react';
import { Bell, MessageSquare, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileSidebar from './MobileSidebar';

const Header = () => {
  const isMobile = useIsMobile();
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <header className="bg-white border-b border-secondary-200 py-4 px-6 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="md:hidden">
            {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
          </Button>
        )}
        <h1 className="font-semibold text-lg text-secondary-800">FAWOZ Provider</h1>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="relative">
          <Bell size={18} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full"></span>
        </Button>
        <Button variant="outline" size="icon">
          <MessageSquare size={18} />
        </Button>
        <Button variant="outline" className="rounded-full h-8 w-8 p-0">
          <span className="text-sm font-medium">JD</span>
        </Button>
      </div>

      {isMobile && showMobileMenu && (
        <MobileSidebar onClose={toggleMobileMenu} />
      )}
    </header>
  );
};

export default Header;
