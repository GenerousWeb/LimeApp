import Mapbox, { Camera, LocationPuck, MapView } from '@rnmapbox/maps';

import BikeMarkers from './BikeMarkers';
import LineRoute from './LineRoute';

import { useBikeProvider } from '~/providers/BikeProvider';
import { useRide } from '~/providers/RideProvider';
import { BikeContextType } from '~/types/provider';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');
const MAPBOX_STYLE_URL = 'mapbox://styles/mapbox/streets-v12';

export default function Map() {
  const { directionCoordinates } = useBikeProvider() as BikeContextType;
  const { ride } = useRide();

  const showMarkers = !ride;
  return (
    <MapView style={{ flex: 1 }} styleURL={MAPBOX_STYLE_URL}>
      <Camera followUserLocation followZoomLevel={16} />
      <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={{ isEnabled: true }} />
      {showMarkers && (
        <>
          <BikeMarkers />
          {directionCoordinates && <LineRoute coordinates={directionCoordinates} />}
        </>
      )}
    </MapView>
  );
}
