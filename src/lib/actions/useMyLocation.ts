import { latitude, longitude } from "$lib/stores/location";
import { isValidLatitude, isValidLongitude } from "$lib/utils/latlong";

export function useMyLocation(): Promise<boolean> {
	if (!navigator.geolocation) {
		return Promise.reject(new Error("Geolocation isn't supported"));
	}
	return new Promise<boolean>((resolve, reject) => {
		navigator.geolocation.getCurrentPosition((position) => {
			const { latitude: lat, longitude: lng } = position.coords;
			if (isValidLatitude(lat) && isValidLongitude(lng)) {
				latitude.set(lat);
				longitude.set(lng);
			}
			resolve(true);
		}, reject);
	});
}
