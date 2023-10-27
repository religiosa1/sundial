import { writable, get } from 'svelte/store';
import { isValidLatitude, isValidLongitude } from '$lib/utils/latlong';
export const LOCATION_LSKEY = "location";

const initialRestored = loadLocation();

export const latitude = writable(initialRestored?.latitude, (set) => {
	let pos = loadLocation();
	set(pos.latitude);
});
export const longitude = writable(initialRestored?.latitude, (set) => {
	let pos = loadLocation();
	set(pos.longitude);
});

export function saveLocation() {
	if (!("localStorage" in globalThis) || typeof localStorage.setItem !== "function") {
		return;
	}
	let lat = get(latitude);
	let long = get(longitude);
	localStorage.setItem(LOCATION_LSKEY, JSON.stringify({
		latitude: lat,
		longitude: long
	}));
}

export function loadLocation() {
	// warsaw
	const default_latitude = 52.23;
	const default_longitude = 21.011111;

	let latitude: number | undefined;
	let longitude: number | undefined;
	try {
		if ("localStorage" in globalThis && typeof localStorage.setItem === "function") {
			let loaded = JSON.parse(localStorage.getItem(LOCATION_LSKEY) || "");
			if (loaded) {
				latitude = loaded.latitude;
				longitude = loaded.longitude;
			}
		}
	} catch (e) {
		console.warn('Error, during loading stored location, using default values', e);
	}

	return {
		latitude: isValidLatitude(latitude) ? latitude : default_latitude,
		longitude: isValidLongitude(longitude) ? longitude : default_longitude
	};
}

export function restoreLocation() {
	let pos = loadLocation();
	latitude.update(() => pos.latitude);
	longitude.update(() => pos.longitude);
}
