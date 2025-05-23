import * as Location from 'expo-location';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

import { getDirections } from '~/services/directions';
import { Direction } from '~/types/direction';
import { BikeContextType, BikeInfo } from '~/types/provider';

const BikeContext = createContext<BikeContextType | null>(null);

export default function BikeProvider({ children }: PropsWithChildren) {
  const [selectedBike, setSelectedBike] = useState<BikeInfo>();
  const [direction, setDirection] = useState<Direction>();
  useEffect(() => {
    const fetchDirections = async () => {
      const myLocation = await Location.getCurrentPositionAsync();
      if (selectedBike) {
        const newDirection = await getDirections(
          [myLocation.coords.longitude, myLocation.coords.latitude],
          [selectedBike.long, selectedBike.lat]
        );
        setDirection(newDirection);
      }
    };
    if (selectedBike) {
      fetchDirections();
    }
  }, [selectedBike]);
  return (
    <BikeContext.Provider
      value={{
        selectedBike,
        setSelectedBike,
        direction,
        directionCoordinates: direction?.routes[0].geometry.coordinates,
        routeTime: direction?.routes[0].duration,
        routeDistance: direction?.routes[0].distance,
      }}>
      {children}
    </BikeContext.Provider>
  );
}

export const useBikeProvider = () => useContext(BikeContext);
