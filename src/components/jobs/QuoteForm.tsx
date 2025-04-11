
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/language';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useJobsData } from '@/hooks/useJobsData';
import { FileText, Send, ArrowLeft } from 'lucide-react';

const QuoteForm = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  const { jobs } = useJobsData();
  
  const job = jobs.find(j => j.id === jobId);
  
  const [formData, setFormData] = useState({
    labor: '',
    materials: '',
    additionalCharges: '',
    discount: '',
    notes: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would save the quote data to your backend
    
    toast({
      title: t('jobs.toast.quote_sent'),
      description: t('jobs.toast.quote_sent_description'),
    });
    
    // Navigate back to jobs page
    navigate('/jobs');
  };
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  if (!job) {
    return (
      <div className="p-8 text-center">
        <p>{t('jobs.job_not_found')}</p>
        <Button 
          onClick={() => navigate('/jobs')} 
          className="mt-4"
        >
          {t('jobs.back_to_jobs')}
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container max-w-3xl mx-auto py-8">
      <Button 
        variant="ghost" 
        onClick={handleGoBack} 
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        {t('jobs.back')}
      </Button>
      
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            {t('jobs.create_quote')}
          </CardTitle>
          <div className="text-sm text-secondary-600">
            {job.service} - {job.customerName}
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="labor">{t('jobs.quote.labor')}</Label>
              <Input
                id="labor"
                name="labor"
                type="number"
                placeholder="0.00"
                value={formData.labor}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="materials">{t('jobs.quote.materials')}</Label>
              <Input
                id="materials"
                name="materials"
                type="number"
                placeholder="0.00"
                value={formData.materials}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="additionalCharges">{t('jobs.quote.additional_charges')}</Label>
              <Input
                id="additionalCharges"
                name="additionalCharges"
                type="number"
                placeholder="0.00"
                value={formData.additionalCharges}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="discount">{t('jobs.quote.discount')}</Label>
              <Input
                id="discount"
                name="discount"
                type="number"
                placeholder="0.00"
                value={formData.discount}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">{t('jobs.quote.notes')}</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder={t('jobs.quote.notes_placeholder')}
                value={formData.notes}
                onChange={handleChange}
                rows={4}
              />
            </div>
            
            <div className="pt-4">
              <Button type="submit" className="w-full">
                <Send className="h-4 w-4 mr-1" />
                {t('jobs.quote.send_quote')}
              </Button>
            </div>
          </form>
        </CardContent>
        
        <CardFooter className="bg-secondary-50 text-sm text-secondary-600">
          {t('jobs.quote.footer_message')}
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuoteForm;
