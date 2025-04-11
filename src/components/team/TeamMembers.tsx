
import React from 'react';
import TeamMemberCard, { TeamMember } from './TeamMemberCard';

interface TeamMembersProps {
  members: TeamMember[];
  emptyMessage: string;
}

const TeamMembers = ({ members, emptyMessage }: TeamMembersProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {members.map((member) => (
        <TeamMemberCard key={member.id} member={member} />
      ))}
      {members.length === 0 && (
        <div className="col-span-full text-center py-8 bg-secondary-50 rounded-lg border border-dashed border-secondary-200">
          <p className="text-secondary-500">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
};

export default TeamMembers;
