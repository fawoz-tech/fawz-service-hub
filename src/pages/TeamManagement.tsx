import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, MapPin, Phone, MessageSquare, CalendarClock, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/language';
import { useToast } from '@/hooks/use-toast';

const TeamManagement = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleAddTeamMember = () => {
    toast({
      title: t('team.add_member'),
      description: "This functionality will be implemented soon",
      duration: 3000,
    });
  };

  const filteredTeam = team.filter((member) => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      member.name.toLowerCase().includes(query) ||
      member.role.toLowerCase().includes(query) ||
      member.services.some(service => service.toLowerCase().includes(query))
    );
  });

  return (
    <Layout>
      <div className="space-y-6">
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

        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-3 w-[300px]">
            <TabsTrigger value="all">{t('team.all')}</TabsTrigger>
            <TabsTrigger value="available">{t('team.available')}</TabsTrigger>
            <TabsTrigger value="busy">{t('team.busy')}</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="all" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTeam.map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))}
                {filteredTeam.length === 0 && (
                  <div className="col-span-full text-center py-8 bg-secondary-50 rounded-lg border border-dashed border-secondary-200">
                    <p className="text-secondary-500">No team members found</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="available" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTeam
                  .filter((member) => member.status === 'available')
                  .map((member) => (
                    <TeamMemberCard key={member.id} member={member} />
                  ))}
                {filteredTeam.filter(member => member.status === 'available').length === 0 && (
                  <div className="col-span-full text-center py-8 bg-secondary-50 rounded-lg border border-dashed border-secondary-200">
                    <p className="text-secondary-500">No available team members found</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="busy" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTeam
                  .filter((member) => member.status === 'on-job' || member.status === 'on-break')
                  .map((member) => (
                    <TeamMemberCard key={member.id} member={member} />
                  ))}
                {filteredTeam.filter(member => member.status === 'on-job' || member.status === 'on-break').length === 0 && (
                  <div className="col-span-full text-center py-8 bg-secondary-50 rounded-lg border border-dashed border-secondary-200">
                    <p className="text-secondary-500">No busy team members found</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-secondary-900">{t('team.todays_assignments')}</h2>
            <Button variant="outline" size="sm">
              <CalendarClock className="h-4 w-4 mr-2" />
              {t('team.view_schedule')}
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('team.technician_assignments')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="p-3 border rounded-md flex justify-between items-center bg-white">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={assignment.technicianImage} alt={assignment.technician} />
                        <AvatarFallback>{assignment.technician.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-secondary-900">{assignment.technician}</div>
                        <div className="text-sm text-secondary-600">{assignment.service}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        <div className="text-secondary-900">{assignment.time}</div>
                        <div className="text-secondary-600 text-xs flex items-center">
                          <MapPin className="h-3 w-3 mr-1" /> {assignment.location}
                        </div>
                      </div>
                      
                      <Badge variant="outline" className={
                        assignment.status === 'assigned' ? 'bg-blue-100 text-blue-800' :
                        assignment.status === 'en-route' ? 'bg-amber-100 text-amber-800' :
                        assignment.status === 'on-site' ? 'bg-emerald-100 text-emerald-800' : ''
                      }>
                        {t(`team.${assignment.status}_status`)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

interface TeamMember {
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
                {t(`team.${member.status}_status`)}
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

interface Assignment {
  id: string;
  technician: string;
  technicianImage?: string;
  service: string;
  time: string;
  location: string;
  status: 'assigned' | 'en-route' | 'on-site';
}

const team: TeamMember[] = [
  {
    id: '1',
    name: 'Ali Hassan',
    role: 'AC Technician',
    status: 'available',
    services: ['AC Repair', 'AC Maintenance'],
    rating: 4.8,
    jobsCompleted: 124,
    phone: '+966 55 123 4567',
  },
  {
    id: '2',
    name: 'Mohammed Abdul',
    role: 'Master Plumber',
    status: 'on-job',
    services: ['Plumbing', 'Leak Repair', 'Installation'],
    rating: 4.9,
    jobsCompleted: 198,
    phone: '+966 50 987 6543',
  },
  {
    id: '3',
    name: 'Khaled Ibrahim',
    role: 'Electrician',
    status: 'available',
    services: ['Electrical', 'Wiring', 'Fixtures'],
    rating: 4.7,
    jobsCompleted: 86,
    phone: '+966 54 456 7890',
  },
  {
    id: '4',
    name: 'Ahmed Ali',
    role: 'AC Technician',
    status: 'on-break',
    services: ['AC Repair', 'AC Installation'],
    rating: 4.5,
    jobsCompleted: 65,
    phone: '+966 56 234 5678',
  },
  {
    id: '5',
    name: 'Omar Farooq',
    role: 'Handyman',
    status: 'available',
    services: ['General Repairs', 'Furniture Assembly', 'Painting'],
    rating: 4.6,
    jobsCompleted: 112,
    phone: '+966 59 876 5432',
  },
  {
    id: '6',
    name: 'Saad Al-Qahtani',
    role: 'Plumber',
    status: 'off-duty',
    services: ['Plumbing', 'Bathroom Fixtures', 'Water Heater'],
    rating: 4.9,
    jobsCompleted: 156,
    phone: '+966 58 345 6789',
  },
];

const assignments: Assignment[] = [
  {
    id: '1',
    technician: 'Ali Hassan',
    service: 'AC Repair - Split Unit',
    time: '09:30 AM',
    location: 'Al Olaya, Riyadh',
    status: 'en-route',
  },
  {
    id: '2',
    technician: 'Mohammed Abdul',
    service: 'Plumbing - Leak Repair',
    time: '11:45 AM',
    location: 'Al Hamra, Jeddah',
    status: 'on-site',
  },
  {
    id: '3',
    technician: 'Khaled Ibrahim',
    service: 'Electrical - Wiring',
    time: '02:15 PM',
    location: 'Al Rashidiya, Dubai',
    status: 'assigned',
  },
  {
    id: '4',
    technician: 'Ahmed Ali',
    service: 'AC Maintenance',
    time: '04:30 PM',
    location: 'Al Muruj, Riyadh',
    status: 'assigned',
  },
];

export default TeamManagement;
