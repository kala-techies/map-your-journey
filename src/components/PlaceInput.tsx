import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Calendar, Plus } from 'lucide-react';
import { searchPlaces } from '../utils/geocoding';
import { useDebounce } from '../hooks/useDebounce';
import { NominatimResult, Place } from '../types';

interface PlaceInputProps {
  onAddPlace: (place: Place) => void;
}

const PlaceInput: React.FC<PlaceInputProps> = ({ onAddPlace }) => {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState<string>('');
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery.length >= 3) {
      handleSearch(debouncedQuery);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [debouncedQuery]);

  const handleSearch = async (searchQuery: string) => {
    setIsLoading(true);
    try {
      const results = await searchPlaces(searchQuery);
      setSuggestions(results);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPlace = (result: NominatimResult) => {
    const place: Place = {
      id: `${result.place_id}-${Date.now()}`,
      name: result.display_name.split(',')[0],
      displayName: result.display_name,
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
      country: result.display_name.split(',').pop()?.trim() || '',
      type: getPlaceType(result),
      year: year ? parseInt(year) : undefined,
      addedAt: new Date()
    };

    onAddPlace(place);
    setQuery('');
    setYear('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const getPlaceType = (result: NominatimResult): 'city' | 'state' | 'landmark' => {
    if (result.type === 'administrative' || result.class === 'boundary') {
      return 'state';
    }
    if (result.class === 'tourism' || result.class === 'historic') {
      return 'landmark';
    }
    return 'city';
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 relative">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Plus className="h-5 w-5 mr-2 text-blue-600" />
        Add a Place You've Visited in India
      </h2>
      
      <div className="space-y-4">
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for cities, states, or landmarks in India..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
            {isLoading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              </div>
            )}
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
              {suggestions.map((result) => (
                <button
                  key={result.place_id}
                  onClick={() => handleSelectPlace(result)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                >
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-gray-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">
                        {result.display_name.split(',')[0]}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {result.display_name}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex space-x-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year Visited (Optional)
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="e.g., 2023"
                min="1900"
                max={currentYear}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceInput;