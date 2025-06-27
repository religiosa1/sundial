import { isValidLatitude, isValidLongitude } from "$lib/utils/latlong";

// Maximum age value enables browser to use cached value, which greatly improves
// responsiveness of the functionality, while we don't need to be particularly
// precise here.
const maximumAge = 30 * 60_000;

export function useMyLocation(): Promise<GeolocationCoordinates> {
	if (!navigator.geolocation) {
		return Promise.reject(new Error("Geolocation API isn't supported by the system"));
	}
	return new Promise<GeolocationCoordinates>((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude: lat, longitude: lng } = position.coords;
				if (!isValidLatitude(lat) || !isValidLongitude(lng)) {
					throw new Error(
						`Invalid location coordinate returned: ${JSON.stringify(position.coords)}`
					);
				}
				resolve(position.coords);
			},
			reject,
			{
				timeout: 30_000,
				maximumAge,
			}
		);
	});
}
