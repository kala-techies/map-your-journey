export interface Place {
  id: string;
  name: string;
  displayName: string;
  lat: number;
  lng: number;
  country: string;
  type: 'city' | 'state' | 'landmark';
  year?: number;
  addedAt: Date;
}

export interface MapTheme {
  id: string;
  name: string;
  url: string;
  attribution: string;
}

export interface Statistics {
  totalPlaces: number;
  states: number;
  cities: number;
  landmarks: number;
  uniqueStates: string[];
}

export interface NominatimResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  icon?: string;
}