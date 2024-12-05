import { browser } from "$app/environment";
import { LocalStorageKeyEnum } from "$lib/enums/LocalStorageKeyEnum";
import { isValidLatitude, isValidLongitude } from "$lib/utils/latlong";
import { writable, get } from "svelte/store";

// default values are set to Greenwhich
const DEFAULT_LATITUDE = 51.477811;
const DEFAULT_LONGITUDE = -0.001475;

// Second argument is supplied to stores initialization, because of the possible
// time gap, between the store initialization and mounting, in which time the
// localStorage value can be changed.
export const latitude = writable(loadLatOrDefault(), (set) => {
	set(loadLatOrDefault());
});
export const longitude = writable(loadLngOrDefault(), (set) => {
	set(loadLngOrDefault());
});

export function saveDefaultLocation(): StoredLocation {
	const lat = get(latitude);
	const lng = get(longitude);
	localStorage.setItem(LocalStorageKeyEnum.Latitude, lat.toString());
	localStorage.setItem(LocalStorageKeyEnum.Longitude, lng.toString());
	return { latitude: lat, longitude: lng };
}

export function hasDefaultLocation(): boolean {
	const lat = loadLocationValue(LocalStorageKeyEnum.Latitude);
	if (!isValidLatitude(lat)) return false;
	const lng = loadLocationValue(LocalStorageKeyEnum.Longitude);
	if (!isValidLongitude(lng)) return false;
	return true;
}

export function deleteDefaultLocation(): void {
	localStorage.removeItem(LocalStorageKeyEnum.Latitude);
	localStorage.removeItem(LocalStorageKeyEnum.Longitude);
}

interface StoredLocation {
	latitude: number;
	longitude: number;
}
export function loadLocation(): StoredLocation | undefined {
	const lat = loadLocationValue(LocalStorageKeyEnum.Latitude);
	if (!isValidLatitude(lat)) {
		return undefined;
	}
	const lng = loadLocationValue(LocalStorageKeyEnum.Longitude);
	if (!isValidLongitude(lng)) {
		return undefined;
	}
	return { latitude: lat!, longitude: lng! };
}

function loadLocationValue(
	key: LocalStorageKeyEnum.Latitude | LocalStorageKeyEnum.Longitude
): number | undefined {
	if (!browser) return undefined;
	const strValue = localStorage.getItem(key);
	if (!strValue) return undefined;
	const numValue = +strValue;
	if (isNaN(numValue)) return undefined;
	return numValue;
}

function loadLatOrDefault(): number {
	let value = loadLocationValue(LocalStorageKeyEnum.Latitude);
	if (!isValidLatitude(value)) {
		value = DEFAULT_LATITUDE;
	}
	return value!;
}

function loadLngOrDefault(): number {
	let value = loadLocationValue(LocalStorageKeyEnum.Longitude);
	if (!isValidLatitude(value)) {
		value = DEFAULT_LONGITUDE;
	}
	return value!;
}
