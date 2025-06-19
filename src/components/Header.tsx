import React from 'react';
import { MapPin, Globe } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Globe className="h-8 w-8 text-blue-600" />
              <MapPin className="h-4 w-4 text-orange-500 absolute -top-1 -right-1" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">India Travel Tracker</h1>
              <p className="text-sm text-gray-500">Map your journey across India</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;