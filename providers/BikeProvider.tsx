import * as Location from 'expo-location';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { supabase } from '~/lib/supabase';
import { getDirections } from '~/services/directions';
import { Direction } from '~/types/direction';
import { BikeContextType, BikeInfo } from '~/types/provider';

const BikeContext = createContext<BikeContextType | null>(null);

export default function BikeProvider({ children }: PropsWithChildren) {
  const [selectedBike, setSelectedBike] = useState<BikeInfo | null>();
  const [direction, setDirection] = useState<Direction | null>();
  const [nearbyRiders, setNearbyRiders] = useState([]);

  useEffect(() => {
    const fetchRiders = async () => {
      const location = await Location.getCurrentPositionAsync();
      const { error, data } = await supabase.rpc('nearby_riders', {
        lat: location.coords.latitude,
        long: location.coords.longitude,
        max_dist_meters: 2000,
      });
      if (error) {
        Alert.alert('Failed to fetch rider info');
      } else {
        setNearbyRiders(data);
      }
    };
    fetchRiders();
  }, []);

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
    } else {
      setDirection(null);
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
        nearbyRiders,
      }}>
      {children}
    </BikeContext.Provider>
  );
}

export const useBikeProvider = () => useContext(BikeContext);
