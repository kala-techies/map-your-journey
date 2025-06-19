import React from 'react';
import { Globe, MapPin, Building, Mountain } from 'lucide-react';
import { Statistics as StatsType } from '../types';

interface StatisticsProps {
  statistics: StatsType;
}

const Statistics: React.FC<StatisticsProps> = ({ statistics }) => {
  const stats = [
    {
      icon: Globe,
      label: 'States',
      value: statistics.states,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Building,
      label: 'Cities',
      value: statistics.cities,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Mountain,
      label: 'Landmarks',
      value: statistics.landmarks,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: MapPin,
      label: 'Total Places',
      value: statistics.totalPlaces,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Your India Travel Statistics</h2>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${stat.bgColor} mb-2`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {statistics.totalPlaces > 0 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg">
          <p className="text-center text-gray-700">
            <span className="font-semibold">Amazing!</span> You've explored{' '}
            <span className="font-bold text-blue-600">{statistics.states}</span> states and{' '}
            <span className="font-bold text-green-600">{statistics.cities}</span> cities across India! 🇮🇳
          </p>
        </div>
      )}
    </div>
  );
};

export default Statistics;