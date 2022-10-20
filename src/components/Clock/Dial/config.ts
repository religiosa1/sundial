import { i18n } from "$/stores/i18n";
import { derived } from "svelte/store";

export const size = 306;
export const padding = 3;
export const hsize = size/2;
export const width = 20;
export const radius = hsize - width/2 - padding;

export const FORMAT = "H:mm:ss";

export const colors = derived([i18n], ([$i18n]) => ({
  "astronomical-twilight-morning": {
    stroke: "url(#grd-astro)",
    name: $i18n.t`clock.astronomicalTwilight`,
  },
  "nautical-dawn": {
    stroke: "url(#grd-nautic)",
    name: $i18n.t`clock.nauticalTwilight`,
  },
  "dawn": {
    stroke: "url(#grd-dusk)",
    name: $i18n.t`clock.civilTwilight`,
  },
  "sunrise": {
    stroke: "url(#grd-sun)",
    name: $i18n.t`clock.sunrise`,
  },
  "golden-hour-morning": {
    stroke: "url(#grd-golden)",
    name: $i18n.t`clock.goldenHour`,
  },
  "day": {
    stroke: "url(#grd-day)",
    name: $i18n.t`clock.day`,
  },
  "golden-hour-evening": {
    stroke: "url(#grd-golden)",
    name: $i18n.t`clock.goldenHour`,
  },
  "sunset": {
    stroke: "url(#grd-sun)",
    name: $i18n.t`clock.sunset`,
  },
  "dusk": {
    stroke: "url(#grd-dusk)",
    name: $i18n.t`clock.civilTwilight`,
  },
  "nautical-dusk": {
    stroke: "url(#grd-nautic)",
    name: $i18n.t`clock.nauticalTwilight`,
  },
  "astronomical-twilight-eveing": {
    stroke: "url(#grd-astro)",
    name: $i18n.t`clock.astronomicalTwilight`,
  },
  "night": {
    stroke: "url(#grd-night)",
    name: $i18n.t`clock.night`,
  },
}));