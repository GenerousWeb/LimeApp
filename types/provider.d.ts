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
};
