import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { useAuth } from './AuthProvider';

import { supabase } from '~/lib/supabase';
import { BikeInfo, RideContextType } from '~/types/provider';

const RideContext = createContext<RideContextType>({
  startRide: async (bikeId: number) => Promise<void>,
  finishRide: async () => Promise<void>,
  ride: null,
});

export default function RideProvider({ children }: PropsWithChildren) {
  const [ride, setRide] = useState<BikeInfo | null>(null);

  const { userId } = useAuth();

  useEffect(() => {
    const fetchActiveRide = async () => {
      const { data } = await supabase
        .from('Routes')
        .select('*')
        .eq('user_id', userId)
        .is('finished_at', null)
        .single();
      if (data) {
        setRide(data);
      }
      //   console.log('Active ride', ride);
      //   if (ride && error) {
      //     console.log(error);
      //     Alert.alert('Cannot fetch active ride');
      //   }
    };
    fetchActiveRide();
  });

  const startRide = async (bikeId: number) => {
    if (ride) {
      console.log(ride);
      Alert.alert('Cannot start a new ride while another one is in progress');
      return;
    }
    const { data, error } = await supabase
      .from('Routes')
      .insert([{ user_id: userId, bike_id: bikeId }])
      .select();

    if (error) {
      Alert.alert('Failed to start the journey');
    } else {
      console.warn('Ride Started');
      setRide(data[0]);
    }
  };

  const finishRide = async () => {
    if (!ride) {
      Alert.alert('There is no active ride');
      return;
    }

    const { data, error } = await supabase
      .from('Routes')
      .update({ finished_at: new Date() })
      .eq('id', ride.id);

    if (error) {
      console.error(error);
      Alert.alert('Failed to finish the ride');
    } else {
      setRide(null);
    }
  };
  return (
    <RideContext.Provider value={{ ride, startRide, finishRide }}>{children}</RideContext.Provider>
  );
}

export const useRide = () => useContext(RideContext);
