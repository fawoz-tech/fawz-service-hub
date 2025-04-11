
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import { useLanguage } from '@/contexts/language';
import { useToast } from '@/hooks/use-toast';
import TeamMemberDialog from './TeamMemberDialog';
import { team } from '@/data/teamData';
import { TeamMember } from './TeamMemberCard';

interface TeamHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onAddMember?: (member: TeamMember) => void;
}

const TeamHeader = ({ searchQuery, setSearchQuery, onAddMember }: TeamHeaderProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleAddTeamMember = () => {
    setIsDialogOpen(true);
  };

  const handleMemberAdded = (newMember: TeamMember) => {
    if (onAddMember) {
      onAddMember(newMember);
    } else {
      // If no callback provided, update the team array directly
      team.push(newMember);
    }
  };

  return (
    <>
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
      
      <TeamMemberDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        onAddMember={handleMemberAdded} 
      />
    </>
  );
};

export default TeamHeader;
