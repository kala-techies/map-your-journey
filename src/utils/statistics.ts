import { Place, Statistics } from '../types';

export const calculateStatistics = (places: Place[]): Statistics => {
  const uniqueStates = [...new Set(places.map(place => place.country))];
  
  return {
    totalPlaces: places.length,
    states: uniqueStates.length,
    cities: places.filter(place => place.type === 'city').length,
    landmarks: places.filter(place => place.type === 'landmark').length,
    uniqueStates
  };
};