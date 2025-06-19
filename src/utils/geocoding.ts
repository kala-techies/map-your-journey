import { NominatimResult } from '../types';

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';

export const searchPlaces = async (query: string): Promise<NominatimResult[]> => {
  if (query.length < 3) return [];
  
  try {
    const params = new URLSearchParams({
      q: `${query}, India`, // Restrict search to India
      format: 'json',
      limit: '8',
      addressdetails: '1',
      extratags: '1',
      namedetails: '1',
      countrycodes: 'IN' // Only search within India
    });

    const response = await fetch(`${NOMINATIM_URL}?${params}`, {
      headers: {
        'User-Agent': 'India Travel Tracker App'
      }
    });

    if (!response.ok) {
      throw new Error('Geocoding request failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching places:', error);
    return [];
  }
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};