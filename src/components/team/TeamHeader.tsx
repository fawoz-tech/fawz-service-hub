
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import { useLanguage } from '@/contexts/language';
import { useToast } from '@/hooks/use-toast';

interface TeamHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const TeamHeader = ({ searchQuery, setSearchQuery }: TeamHeaderProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const handleAddTeamMember = () => {
    toast({
      title: t('team.add_member'),
      description: "This functionality will be implemented soon",
      duration: 3000,
    });
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <h1 className="text-2xl font-bold text-secondary-900">{t('team.management')}</h1>
      <div className="flex items-center gap-2 self-stretch md:self-auto w-full md:w-auto">
        <div className="relative flex-1 md:flex-initial">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-secondary-500" />
          <Input
            placeholder={t('team.search')}
            className="pl-9 w-full md:w-[250px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={handleAddTeamMember}>
          <Plus className="h-4 w-4 mr-2" />
          {t('team.add_member')}
        </Button>
      </div>
    </div>
  );
};

export default TeamHeader;
