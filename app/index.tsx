import Map from 'components/Map';
import { Stack } from 'expo-router';

import SelectedBikeSheet from '~/components/SelectedBikeSheet';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <Map />
      <SelectedBikeSheet />
    </>
  );
}
