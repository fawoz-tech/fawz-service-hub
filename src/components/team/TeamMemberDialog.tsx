
import React from 'react';
import { useForm } from 'react-hook-form';
import { useLanguage } from '@/contexts/language';
import { useToast } from '@/hooks/use-toast';
import { team } from '@/data/teamData';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface TeamMemberFormData {
  name: string;
  role: string;
  status: string;
  services: string;
  phone: string;
}

interface TeamMemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMember: (member: any) => void;
}

const TeamMemberDialog = ({ isOpen, onClose, onAddMember }: TeamMemberDialogProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const form = useForm<TeamMemberFormData>({
    defaultValues: {
      name: '',
      role: '',
      status: 'available',
      services: '',
      phone: '',
    },
  });

  const onSubmit = (data: TeamMemberFormData) => {
    // Create a new team member
    const newMember = {
      id: (team.length + 1).toString(),
      name: data.name,
      role: data.role,
      status: data.status as 'available' | 'on-job' | 'on-break' | 'off-duty',
      services: data.services.split(',').map(service => service.trim()),
      rating: 0,
      jobsCompleted: 0,
      phone: data.phone,
    };

    // Add the new member
    onAddMember(newMember);
    
    // Show success toast
    toast({
      title: t('team.member_added'),
      description: t('team.member_added_success'),
      duration: 3000,
    });
    
    // Close the dialog and reset form
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t('team.add_member')}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('team.name')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('team.name_placeholder')} {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('team.role')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('team.role_placeholder')} {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('team.status')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('team.select_status')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="available">{t('team.available_status')}</SelectItem>
                      <SelectItem value="on-job">{t('team.on_job_status')}</SelectItem>
                      <SelectItem value="on-break">{t('team.on_break_status')}</SelectItem>
                      <SelectItem value="off-duty">{t('team.off_duty_status')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="services"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('team.services')}</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={t('team.services_placeholder')} 
                      className="min-h-[80px]" 
                      {...field} 
                      required 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('team.phone')}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t('team.phone_placeholder')} 
                      {...field} 
                      required 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                {t('team.cancel')}
              </Button>
              <Button type="submit">{t('team.add')}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TeamMemberDialog;
