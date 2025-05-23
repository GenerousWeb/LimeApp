import { ShapeSource, LineLayer } from '@rnmapbox/maps';
import { Position } from '@rnmapbox/maps/lib/typescript/src/types/Position';

export default function LineRoute({ coordinates }: { coordinates: Position[] }) {
  return (
    <ShapeSource
      id="routeSource"
      lineMetrics
      shape={{
        properties: {},
        type: 'Feature',
        geometry: { type: 'LineString', coordinates },
      }}>
      <LineLayer
        id="sampleLineLayer"
        style={{ lineColor: '#42A2D9', lineCap: 'round', lineJoin: 'round', lineWidth: 7 }}
      />
    </ShapeSource>
  );
}
