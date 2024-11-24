import { browser } from "$app/environment";
import { LocalStorageKeyEnum } from "$lib/enums/LocalStorageKeyEnum";
import { isValidLatitude, isValidLongitude } from "$lib/utils/latlong";
import { writable, get } from "svelte/store";

// default values are set to Greenwhich
const DEFAULT_LATITUDE = 51.477811;
const DEFAULT_LONGITUDE = -0.001475;

export const latitude = writable(loadLatOrDefault(), (set) => {
	set(loadLatOrDefault());
});
export const longitude = writable(loadLongOrDefault(), (set) => {
	set(loadLongOrDefault());
});

export function saveLocation() {
	localStorage.setItem(LocalStorageKeyEnum.Latitude, get(latitude).toString());
	localStorage.setItem(LocalStorageKeyEnum.Longitude, get(longitude).toString());
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
	const long = loadLocationValue(LocalStorageKeyEnum.Longitude);
	if (!isValidLongitude(long)) {
		return undefined;
	}
	return { latitude: lat!, longitude: long! };
}

function loadLocationValue(
	key: LocalStorageKeyEnum.Latitude | LocalStorageKeyEnum.Longitude
): number | undefined {
	if (!browser) return;
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

function loadLongOrDefault(): number {
	let value = loadLocationValue(LocalStorageKeyEnum.Longitude);
	if (!isValidLatitude(value)) {
		value = DEFAULT_LONGITUDE;
	}
	return value!;
}
