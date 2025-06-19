import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Place, MapTheme } from '../types';

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom marker icons with place names
const createCustomIcon = (color: string, placeName: string) => {
  return L.divIcon({
    className: 'custom-marker-with-label',
    html: `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <div style="
          background-color: ${color};
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 3px 10px rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
        ">
          <div style="
            width: 10px;
            height: 10px;
            background-color: white;
            border-radius: 50%;
          "></div>
        </div>
        <div style="
          background-color: rgba(255,255,255,0.95);
          color: #1f2937;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          border: 1px solid rgba(0,0,0,0.1);
          max-width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
        ">
          ${placeName}
        </div>
      </div>
    `,
    iconSize: [140, 60],
    iconAnchor: [70, 28],
    popupAnchor: [0, -28]
  });
};

const getMarkerColor = (type: Place['type']) => {
  switch (type) {
    case 'state':
      return '#3B82F6'; // Blue
    case 'city':
      return '#10B981'; // Green
    case 'landmark':
      return '#8B5CF6'; // Purple
    default:
      return '#F97316'; // Orange
  }
};

interface TileLayerUpdaterProps {
  theme: MapTheme;
}

const TileLayerUpdater: React.FC<TileLayerUpdaterProps> = ({ theme }) => {
  const map = useMap();
  
  useEffect(() => {
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });
    
    L.tileLayer(theme.url, {
      attribution: theme.attribution,
      maxZoom: 18,
    }).addTo(map);
  }, [map, theme]);
  
  return null;
};

interface WorldMapProps {
  places: Place[];
  theme: MapTheme;
}

const WorldMap: React.FC<WorldMapProps> = ({ places, theme }) => {
  const mapRef = useRef<L.Map>(null);

  useEffect(() => {
    if (places.length > 0 && mapRef.current) {
      const group = new L.FeatureGroup(
        places.map(place => 
          L.marker([place.lat, place.lng])
        )
      );
      mapRef.current.fitBounds(group.getBounds(), { padding: [50, 50] });
    } else if (mapRef.current) {
      // Center on India when no places are added
      mapRef.current.setView([20.5937, 78.9629], 5);
    }
  }, [places]);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
      <div className="h-full min-h-[400px] lg:min-h-[600px]">
        <MapContainer
          center={[20.5937, 78.9629]} // Center of India
          zoom={5}
          className="h-full w-full rounded-xl"
          ref={mapRef}
        >
          <TileLayerUpdater theme={theme} />
          {places.map((place) => (
            <Marker
              key={place.id}
              position={[place.lat, place.lng]}
              icon={createCustomIcon(getMarkerColor(place.type), place.name)}
            >
              <Popup>
                <div className="text-center p-2">
                  <h3 className="font-semibold text-gray-900">{place.name}</h3>
                  <p className="text-sm text-gray-600">{place.country}</p>
                  {place.year && (
                    <p className="text-xs text-gray-500 mt-1">Visited in {place.year}</p>
                  )}
                  <div className="mt-2">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      place.type === 'state' ? 'bg-blue-100 text-blue-800' :
                      place.type === 'city' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {place.type}
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default WorldMap;