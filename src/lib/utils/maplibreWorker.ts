// maplibre-gl v6 can't locate its worker inside a bundle, so point it at the Vite-built one
// @see https://maplibre.org/maplibre-gl-js/docs/#installation
import { setWorkerUrl } from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";

setWorkerUrl(workerUrl);
