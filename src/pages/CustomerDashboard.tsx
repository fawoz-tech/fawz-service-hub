
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { useLanguage } from '@/contexts/language';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Clock, Star, Calendar, BarChart4 } from 'lucide-react';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const userName = user?.user_metadata?.full_name || 'Customer';

  return (
    <Layout>
      <div className="space-y-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">{t('dashboard.welcome')}, {userName}</h1>
          <p className="text-secondary-500">{t('dashboard.customer_subtitle')}</p>
        </header>

        {/* Search Section */}
        <Card className="bg-primary-50 border-primary-100">
          <CardHeader className="pb-2">
            <CardTitle>{t('dashboard.find_service')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                <input 
                  type="text"
                  placeholder={t('dashboard.search_services')}
                  className="w-full pl-10 py-2 border rounded-md"
                />
              </div>
              <div className="relative flex-grow">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                <input 
                  type="text"
                  placeholder={t('dashboard.your_location')}
                  className="w-full pl-10 py-2 border rounded-md"
                />
              </div>
              <Button className="whitespace-nowrap">
                {t('dashboard.search')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Service Categories */}
        <h2 className="text-xl font-semibold mt-8">{t('dashboard.popular_services')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {['AC Repair', 'Plumbing', 'Electrical', 'Cleaning', 'Moving', 'Towing'].map((service) => (
            <Card key={service} className="text-center cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <p className="font-medium">{service}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Bookings */}
        <h2 className="text-xl font-semibold mt-8">{t('dashboard.recent_bookings')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{i === 0 ? 'AC Repair' : 'Plumbing Service'}</h3>
                    <p className="text-secondary-500 text-sm flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {i === 0 ? 'Completed on April 10' : 'Scheduled for April 18'}
                    </p>
                    <p className="text-secondary-500 text-sm flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" /> Home Address
                    </p>
                    {i === 0 && (
                      <div className="flex items-center mt-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <Star className="h-4 w-4 text-secondary-300" />
                      </div>
                    )}
                  </div>
                  <Button variant={i === 0 ? "outline" : "default"} size="sm">
                    {i === 0 ? t('dashboard.view_details') : t('dashboard.track_service')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Service Recommendations */}
        <h2 className="text-xl font-semibold mt-8">{t('dashboard.recommended')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="h-32 bg-secondary-100 flex items-center justify-center">
                <BarChart4 className="h-12 w-12 text-secondary-300" />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold">{['Home Cleaning', 'Handyman Services', 'Furniture Assembly'][i]}</h3>
                <div className="flex items-center mt-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-xs text-secondary-500 ml-1">(120+ reviews)</span>
                </div>
                <Button className="w-full mt-3" size="sm">Book Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CustomerDashboard;
