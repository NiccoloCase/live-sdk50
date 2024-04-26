import { keys } from "../../config";

export const autocompletePlace = async (
  input: string
): Promise<
  {
    text: string;
    placeId: string;
  }[]
> => {
  try {
    const URL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=address&key=${keys.GOOGLE_MAPS_API_KEY}`;
    const response = await fetch(URL);
    const json = await response.json();

    if (json.status === "ZERO_RESULTS") return [];
    if (json.predictions && json.predictions.length > 0)
      return json.predictions.map((p: any) => ({
        text: p.description,
        placeId: p.place_id,
      }));
    else return [];
  } catch (e) {
    console.warn(e);
    return [];
  }
};

export const getCoordinatesByGooglePlaceId = async (placeId: string) => {
  try {
    const URL = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${keys.GOOGLE_MAPS_API_KEY}`;
    const response = await fetch(URL);
    const json = await response.json();
    if (json.status === "OK") {
      const { lat, lng } = json.result.geometry.location;

      // console.log("x", JSON.stringify(json.result));

      return { lat, lng };
    } else {
      return null;
    }
  } catch (e) {
    console.warn(e);
    return null;
  }
};

export const getDistanceFromLatLonInMeters = (
  lon: number,
  lat: number,
  lon2: number,
  lat2: number
) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat); // deg2rad below
  const dLon = deg2rad(lon2 - lon);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distance in meters
  return R * c * 1000;
};

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};
