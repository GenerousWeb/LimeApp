import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useEffect, useRef } from 'react';
import { Text, View } from 'react-native';

import { Button } from './Button';

import { useRide } from '~/providers/RideProvider';

export default function ActiveRideSheet() {
  const { ride, finishRide } = useRide();
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (ride) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [ride]);
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[200]}
      enablePanDownToClose
      enableDynamicSizing
      index={-1}>
      {ride && (
        <BottomSheetView style={{ flex: 1, padding: 10 }}>
          <Text>Ride in progress</Text>
          {ride && (
            <View>
              <Button title="Finish journey" onPress={() => finishRide()} />
            </View>
          )}
        </BottomSheetView>
      )}
    </BottomSheet>
  );
}
