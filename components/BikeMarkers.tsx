import { ShapeSource, SymbolLayer, CircleLayer, Images } from '@rnmapbox/maps';
import { OnPressEvent } from '@rnmapbox/maps/lib/typescript/src/types/OnPressEvent';
import { featureCollection, point } from '@turf/helpers';

import bikers from '../data/bikers.json';

import pin from '~/assets/motorbike.png';
import { useBikeProvider } from '~/providers/BikeProvider';
import { BikeContextType } from '~/types/provider';

export default function BikeMarkers() {
  const bikersVector = featureCollection(bikers.map((s) => point([s.long, s.lat], { bike: s })));
  const { setSelectedBike } = useBikeProvider() as BikeContextType;

  const onPointPress = async (event: OnPressEvent) => {
    if (event.features[0].properties?.bike) {
      setSelectedBike(event.features[0].properties.bike);
    }
  };
  return (
    <ShapeSource id="bikers" cluster shape={bikersVector} onPress={onPointPress}>
      <SymbolLayer id="clusters_count" style={{ textField: ['get', 'point_count'] }} />
      <CircleLayer
        id="clusters"
        belowLayerID="clusters_count"
        filter={['has', 'point_count']}
        style={{
          circleColor: '#42E100',
          circlePitchAlignment: 'map',
          circleRadius: 20,
          circleOpacity: 1,
          circleStrokeColor: 'white',
          circleStrokeWidth: 2,
        }}
      />
      <SymbolLayer
        id="biker_icons"
        filter={['!', ['has', 'point_count']]}
        style={{ iconImage: 'pin', iconSize: 0.1, iconAnchor: 'bottom', iconAllowOverlap: true }}
      />
      <Images images={{ pin }} />
    </ShapeSource>
  );
}
