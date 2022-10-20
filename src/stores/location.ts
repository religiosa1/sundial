import { writable, get } from 'svelte/store';
import { isValidLatitude, isValidLongitude } from '$/utils/latlong';

// warsaw
const default_latitude = 52.23;
const default_longitude = 21.011111;

const LOCATION_KEY = "saved_location"
export function saveLocation() {
  if (!localStorage || typeof localStorage.setItem !== "function") {
    return;
  }
  let lat = get(latitude);
  let long = get(longitude);
  localStorage.setItem(LOCATION_KEY, JSON.stringify({
    latitude: lat,
    longitude: long
  }));
}

export function loadLocation() {
  let latitude, longitude
  try {
    if (localStorage && typeof localStorage.setItem === "function") {
      let loaded = JSON.parse(localStorage.getItem(LOCATION_KEY));
      if (loaded) {
        latitude = loaded.latitude;
        longitude = loaded.longitude;
      }
    }
  } catch (e) {
    console.warn('Error, during loading stored location, using default values', e);
  }

  return {
    latitude: isValidLatitude(latitude)? latitude : default_latitude,
    longitude: isValidLongitude(longitude)? longitude : default_longitude
  };
}

export function restoreLocation() {
  let pos = loadLocation();
  latitude.update(()=>pos.latitude);
  longitude.update(()=>pos.longitude);
}

export const latitude = writable(default_latitude);
export const longitude = writable(default_longitude);