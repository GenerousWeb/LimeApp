import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AuthProvider from '~/providers/AuthProvider';
import BikeProvider from '~/providers/BikeProvider';
import RideProvider from '~/providers/RideProvider';

export default function Layout() {
  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <BikeProvider>
          <RideProvider>
            <Stack />
            <StatusBar style="light" />
          </RideProvider>
        </BikeProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
