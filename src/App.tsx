import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PlaceInput from './components/PlaceInput';
import WorldMap from './components/WorldMap';
import Statistics from './components/Statistics';
import PlacesList from './components/PlacesList';
import MapControls from './components/MapControls';
import { Place } from './types';
import { mapThemes } from './data/mapThemes';
import { savePlaces, loadPlaces } from './utils/storage';
import { calculateStatistics } from './utils/statistics';
import 'leaflet/dist/leaflet.css';

function App() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [currentTheme, setCurrentTheme] = useState('light');
  const [statistics, setStatistics] = useState(() => calculateStatistics([]));

  useEffect(() => {
    const savedPlaces = loadPlaces();
    setPlaces(savedPlaces);
    setStatistics(calculateStatistics(savedPlaces));
  }, []);

  useEffect(() => {
    savePlaces(places);
    setStatistics(calculateStatistics(places));
  }, [places]);

  const handleAddPlace = (place: Place) => {
    setPlaces(prev => [...prev, place]);
  };

  const handleRemovePlace = (id: string) => {
    setPlaces(prev => prev.filter(place => place.id !== id));
  };

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId);
  };

  const selectedTheme = mapThemes.find(theme => theme.id === currentTheme) || mapThemes[0];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Controls */}
          <div className="lg:col-span-1 space-y-6">
            <PlaceInput onAddPlace={handleAddPlace} />
            <Statistics statistics={statistics} />
            <MapControls
              themes={mapThemes}
              currentTheme={currentTheme}
              onThemeChange={handleThemeChange}
            />
            <PlacesList places={places} onRemovePlace={handleRemovePlace} />
          </div>

          {/* Right Column - Map */}
          <div className="lg:col-span-2">
            <WorldMap places={places} theme={selectedTheme} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;