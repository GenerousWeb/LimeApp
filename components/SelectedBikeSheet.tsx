import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useEffect, useRef } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { Button } from './Button';

import bikeImg from '~/assets/motorbike.png';
import { useBikeProvider } from '~/providers/BikeProvider';
import { useRide } from '~/providers/RideProvider';
import { BikeContextType } from '~/types/provider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    height: 50,
    alignItems: 'center',
  },
});

export default function SelectedBikeSheet() {
  const { selectedBike, routeTime, routeDistance, setSelectedBike } =
    useBikeProvider() as BikeContextType;
  const { startRide } = useRide();
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (selectedBike) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [selectedBike]);

  // callbacks
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[200]}
      enablePanDownToClose
      enableDynamicSizing
      index={-1}
      onClose={() => setSelectedBike(null)}>
      <BottomSheetView style={{ flex: 1, padding: 10 }}>
        {/*Top Part*/}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Image source={bikeImg} style={{ height: 50, width: 50 }} />
          <View style={{ flex: 1, gap: 5 }}>
            <Text style={{ fontSize: 20, fontWeight: '600' }}>Rider</Text>
            <Text style={{ fontSize: 18 }}>XXX-Rider - .Madison AVE</Text>
          </View>
          <View style={{ gap: 5 }}>
            {routeDistance && (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <MaterialCommunityIcons name="map-marker-distance" size={18} color="#42A2D9" />
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                  {(routeDistance / 1000).toFixed(1)} km
                </Text>
              </View>
            )}
            {routeTime && (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <MaterialIcons name="timelapse" size={18} color="#42A2D9" />
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                  {(routeTime / 60).toFixed(0)} min
                </Text>
              </View>
            )}
          </View>
        </View>
        {/* Actions - Bottom part */}
        {selectedBike?.id && (
          <View>
            <Button
              title="Start journey"
              onPress={() => {
                startRide(selectedBike.id);
                setSelectedBike(null);
              }}
            />
          </View>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
}
