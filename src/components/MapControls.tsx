import React from 'react';
import { Download, Palette, Camera } from 'lucide-react';
import { MapTheme } from '../types';
import html2canvas from 'html2canvas';

interface MapControlsProps {
  themes: MapTheme[];
  currentTheme: string;
  onThemeChange: (themeId: string) => void;
}

const MapControls: React.FC<MapControlsProps> = ({
  themes,
  currentTheme,
  onThemeChange
}) => {
  const handleDownloadMap = async () => {
    try {
      const mapElement = document.querySelector('.leaflet-container') as HTMLElement;
      if (!mapElement) return;

      const canvas = await html2canvas(mapElement, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        scale: 2,
        width: mapElement.offsetWidth,
        height: mapElement.offsetHeight
      });

      const link = document.createElement('a');
      link.download = `travel-map-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error downloading map:', error);
      alert('Unable to download map. Please try taking a screenshot instead.');
    }
  };

  const handleScreenshot = async () => {
    try {
      const appElement = document.getElementById('root');
      if (!appElement) return;

      const canvas = await html2canvas(appElement, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#f3f4f6',
        scale: 1.5,
        width: window.innerWidth,
        height: window.innerHeight
      });

      const link = document.createElement('a');
      link.download = `travel-tracker-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error taking screenshot:', error);
      alert('Unable to take screenshot. Please try using your browser\'s screenshot feature.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Palette className="h-5 w-5 mr-2 text-blue-600" />
        Map Options
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Map Theme
          </label>
          <div className="grid grid-cols-3 gap-2">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => onThemeChange(theme.id)}
                className={`p-3 rounded-lg border-2 transition-colors text-sm font-medium ${
                  currentTheme === theme.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                {theme.name}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleDownloadMap}
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Map
            </button>
            <button
              onClick={handleScreenshot}
              className="flex items-center justify-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
            >
              <Camera className="h-4 w-4 mr-2" />
              Screenshot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapControls;