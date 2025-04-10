
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Building, Home, Globe } from 'lucide-react';
import { Location } from '@/types/location';

interface LocationCardProps {
  location: Location;
}

const LocationCard = ({ location }: LocationCardProps) => {
  const typeColors = {
    'primary': 'bg-green-100 text-green-800 border-green-200',
    'secondary': 'bg-blue-100 text-blue-800 border-blue-200',
    'excluded': 'bg-red-100 text-red-800 border-red-200',
  };

  const typeIcons = {
    'business': <Building className="h-4 w-4" />,
    'residential': <Home className="h-4 w-4" />,
    'both': <Globe className="h-4 w-4" />
  };

  return (
    <Card className="overflow-hidden">
      <div className={`px-4 py-1 border-b ${typeColors[location.type]}`}>
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium capitalize">{location.type} Area</span>
          <span className="text-xs">{location.radius} km radius</span>
        </div>
      </div>
      <CardContent className="pt-4">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium">{location.name}</h3>
            <div className="text-sm text-secondary-600 flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              {location.address}
            </div>
            <div className="text-sm text-secondary-600 mt-2">
              <Badge variant="outline" className="gap-1 mt-1">
                {typeIcons[location.locationType]}
                <span className="capitalize">{location.locationType}</span>
              </Badge>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              Edit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationCard;
