import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AuthProvider from '~/providers/AuthProvider';
import BikeProvider from '~/providers/BikeProvider';

export default function Layout() {
  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <BikeProvider>
          <Stack />
          <StatusBar style="light" />
        </BikeProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
