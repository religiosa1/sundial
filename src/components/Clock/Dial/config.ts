export const size = 306;
export const padding = 3;
export const hsize = size/2;
export const width = 20;
export const radius = hsize - width/2 - padding;

export const FORMAT = "H:mm:ss";

export const colors = {
  "astronomical-twilight-morning": {
    stroke: "url(#grd-astro)",
    name: "астрономические сумерки",
  },
  "nautical-dawn": {
    stroke: "url(#grd-nautic)",
    name: "навигационные сумерки",
  },
  "dawn": {
    stroke: "url(#grd-dusk)",
    name: "гражданские сумерки",
  },
  "sunrise": {
    stroke: "url(#grd-sun)",
    name: "восход",
  },
  "golden-hour-morning": {
    stroke: "url(#grd-golden)",
    name: "золотой час",
  },
  "day": {
    stroke: "url(#grd-day)",
    name: "день",
  },
  "golden-hour-evening": {
    stroke: "url(#grd-golden)",
    name: "золотой час",
  },
  "sunset": {
    stroke: "url(#grd-sun)",
    name: "закат",
  },
  "dusk": {
    stroke: "url(#grd-dusk)",
    name: "гражданские сумерки",
  },
  "nautical-dusk": {
    stroke: "url(#grd-nautic)",
    name: "навигационные сумерки",
  },
  "astronomical-twilight-eveing": {
    stroke: "url(#grd-astro)",
    name: "астрономические сумерки",
  },
  "night": {
    stroke: "url(#grd-night)",
    name: "ночь",
  },
} as const;