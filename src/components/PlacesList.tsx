import React from 'react';
import { MapPin, Calendar, Trash2, Globe, Building, Mountain } from 'lucide-react';
import { Place } from '../types';

interface PlacesListProps {
  places: Place[];
  onRemovePlace: (id: string) => void;
}

const PlacesList: React.FC<PlacesListProps> = ({ places, onRemovePlace }) => {
  const getTypeIcon = (type: Place['type']) => {
    switch (type) {
      case 'state':
        return Globe;
      case 'city':
        return Building;
      case 'landmark':
        return Mountain;
      default:
        return MapPin;
    }
  };

  const getTypeColor = (type: Place['type']) => {
    switch (type) {
      case 'state':
        return 'text-blue-600 bg-blue-100';
      case 'city':
        return 'text-green-600 bg-green-100';
      case 'landmark':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (places.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Places</h2>
        <div className="text-center py-8">
          <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No places added yet. Start by searching for a place above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Your Places ({places.length})
      </h2>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {places.map((place) => {
          const TypeIcon = getTypeIcon(place.type);
          const typeColors = getTypeColor(place.type);
          
          return (
            <div
              key={place.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${typeColors}`}>
                  <TypeIcon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-gray-900 truncate">
                    {place.name}
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    {place.country}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 flex-shrink-0">
                {place.year && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {place.year}
                  </div>
                )}
                <button
                  onClick={() => onRemovePlace(place.id)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove place"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlacesList;