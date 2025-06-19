import { Place } from '../types';

const STORAGE_KEY = 'travel-map-places';

export const savePlaces = (places: Place[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(places));
  } catch (error) {
    console.error('Error saving places to localStorage:', error);
  }
};

export const loadPlaces = (): Place[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const places = JSON.parse(stored);
    return places.map((place: any) => ({
      ...place,
      addedAt: new Date(place.addedAt)
    }));
  } catch (error) {
    console.error('Error loading places from localStorage:', error);
    return [];
  }
};