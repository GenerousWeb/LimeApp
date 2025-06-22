import { Session } from '@supabase/supabase-js';
import { Direction } from './direction';

export interface BikeInfo {
  id: number;
  lat: number;
  long: number;
}

export type BikeContextType = {
  selectedBike?: BikeInfo;
  setSelectedBike: (val: BikeInfo) => void;
  direction?: Direction;
  directionCoordinates?: number[][];
  routeTime?: number;
  routeDistance?: number;
  nearbyRiders: BikeInfo[];
};

export type AuthContextType = {
  isAuthenticated: boolean;
  session?: Session | null;
  userId?: string;
};

export type RideContextType = {
  startRide: (bikeId: number) => void;
  finishRide: () => void;
  ride: BikeInfo | null;
};
