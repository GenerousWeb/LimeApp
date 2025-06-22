import Map from 'components/Map';
import { Stack } from 'expo-router';

import ActiveRideSheet from '~/components/ActiveRideSheet';
import SelectedBikeSheet from '~/components/SelectedBikeSheet';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <Map />
      {/* <Button title="Sign out" onPress={() => supabase.auth.signOut()} /> */}
      <SelectedBikeSheet />
      <ActiveRideSheet />
    </>
  );
  // return <Redirect href="/auth" />;
}
