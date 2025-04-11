
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/language';
import { CalendarClock } from 'lucide-react';

// Import the components
import TeamHeader from '@/components/team/TeamHeader';
import TeamFilters from '@/components/team/TeamFilters';
import TeamMembers from '@/components/team/TeamMembers';
import AssignmentList from '@/components/team/AssignmentList';
import { team, assignments } from '@/data/teamData';
import { TeamMember } from '@/components/team/TeamMemberCard';

const TeamManagement = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(team);
  
  const filteredTeam = teamMembers.filter((member) => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      member.name.toLowerCase().includes(query) ||
      member.role.toLowerCase().includes(query) ||
      member.services.some(service => service.toLowerCase().includes(query))
    );
  });

  const handleAddMember = (newMember: TeamMember) => {
    setTeamMembers(prev => [...prev, newMember]);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <TeamHeader 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          onAddMember={handleAddMember}
        />

        <TeamFilters 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        <div className="mt-6">
          <TabsContent value="all" className="space-y-4">
            <TeamMembers 
              members={filteredTeam} 
              emptyMessage={t('team.no_members_found')} 
            />
          </TabsContent>
          
          <TabsContent value="available" className="space-y-4">
            <TeamMembers 
              members={filteredTeam.filter((member) => member.status === 'available')}
              emptyMessage={t('team.no_available_members')}
            />
          </TabsContent>
          
          <TabsContent value="busy" className="space-y-4">
            <TeamMembers 
              members={filteredTeam.filter((member) => 
                member.status === 'on-job' || member.status === 'on-break'
              )}
              emptyMessage={t('team.no_busy_members')}
            />
          </TabsContent>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-secondary-900">{t('team.todays_assignments')}</h2>
            <Button variant="outline" size="sm">
              <CalendarClock className="h-4 w-4 mr-2" />
              {t('team.view_schedule')}
            </Button>
          </div>
          
          <AssignmentList 
            assignments={assignments}
            title={t('team.technician_assignments')}
          />
        </div>
      </div>
    </Layout>
  );
};

export default TeamManagement;
