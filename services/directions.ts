import { Float } from 'react-native/Libraries/Types/CodegenTypes';

const BASE_URL = 'https://api.mapbox.com/directions/v5/mapbox';

export async function getDirections(srcLoc: Float[], destLoc: Float[]) {
  const response = await fetch(
    `${BASE_URL}/driving/${srcLoc[0]},${srcLoc[1]};${destLoc[0]},${destLoc[1]}?alternatives=true&annotations=distance%2Cduration&continue_straight=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${process.env.EXPO_PUBLIC_MAPBOX_KEY}`
  );
  const json = await response.json();
  return json;
}
