
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Phone, MessageSquare, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/language';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: 'available' | 'on-job' | 'on-break' | 'off-duty';
  image?: string;
  services: string[];
  rating: number;
  jobsCompleted: number;
  phone: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  const { t } = useLanguage();
  
  const statusColors = {
    'available': 'bg-green-100 text-green-800',
    'on-job': 'bg-amber-100 text-amber-800',
    'on-break': 'bg-blue-100 text-blue-800',
    'off-duty': 'bg-secondary-100 text-secondary-800',
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={member.image} alt={member.name} />
            <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-secondary-900">{member.name}</h3>
                <div className="text-sm text-secondary-600">{member.role}</div>
              </div>
              <Badge variant="outline" className={statusColors[member.status]}>
                {t(`team.${member.status.replace('-', '_')}_status`)}
              </Badge>
            </div>
            
            <div className="mt-2 flex items-center gap-1 text-sm text-amber-500">
              {Array(5).fill(0).map((_, i) => (
                <Star key={i} fill={i < member.rating ? "currentColor" : "none"} className="h-3.5 w-3.5" />
              ))}
              <span className="ml-1 text-secondary-600">{member.jobsCompleted} {t('team.jobs')}</span>
            </div>
            
            <div className="mt-2 flex flex-wrap gap-1">
              {member.services.map((service) => (
                <Badge key={service} variant="secondary" className="text-xs">{service}</Badge>
              ))}
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-secondary-600">
                {member.phone}
              </div>
              
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
