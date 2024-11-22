import { writable } from "svelte/store";

// default values are set to Greenwhich
const DEFAULT_LATITUDE = 51.477811;
const DEFAULT_LONGITUDE = -0.001475;

export const latitude = writable(DEFAULT_LATITUDE);
export const longitude = writable(DEFAULT_LONGITUDE);

export function saveLocation() {
	// todo
}

interface StoredLocation {
	latitude: number;
	longitude: number;
}
export function loadLocation(): StoredLocation | undefined {
	// TODO
	return undefined;
}
