import Map from 'components/Map';
import { Redirect, Stack } from 'expo-router';
import { Button } from 'react-native';

import SelectedBikeSheet from '~/components/SelectedBikeSheet';
import { supabase } from '~/lib/supabase';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <Map />
      <Button title="Sign out" onPress={() => supabase.auth.signOut()} />
      <SelectedBikeSheet />
    </>
  );
  // return <Redirect href="/auth" />;
}
