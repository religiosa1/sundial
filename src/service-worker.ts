/** @see https://svelte.dev/docs/kit/service-workers */
/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
import { build, files, version } from "$service-worker";

declare let self: ServiceWorkerGlobalScope;

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`;
const ASSETS = [
	...build, // the app itself
	...files, // everything in `static`
];

self.addEventListener("install", (event) => {
	event.waitUntil(addFilesToCache());

	// Create a new cache and add all files to it
	async function addFilesToCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	}
});

self.addEventListener("activate", (event) => {
	event.waitUntil(deleteOldCaches());

	// Remove previous cached data from disk
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE) await caches.delete(key);
		}
	}
});

self.addEventListener("fetch", (event) => {
	// ignore POST requests etc
	if (event.request.method !== "GET") return;

	const url = new URL(event.request.url);

	// Skip external resources (e.g. map tiles, CDNs)
	if (url.origin !== self.location.origin) {
		return;
	}

	event.respondWith(respond());

	async function respond() {
		const cache = await caches.open(CACHE);

		// `build`/`files` can always be served from the cache
		if (ASSETS.includes(url.pathname)) {
			const response = await cache.match(url.pathname);

			if (response) {
				return response;
			}
		}

		// for everything else, try the network first, but fall back to the cache
		// if we're offline.
		try {
			const response = await fetch(event.request);

			// if we're offline, fetch can return a value that is not a Response
			// instead of throwing - and we can't pass this non-Response to respondWith
			if (!(response instanceof Response)) {
				throw new InvalidResponseError();
			}

			if (response.ok) {
				cache.put(event.request, response.clone());
			}

			return response;
		} catch (err) {
			const response = await cache.match(event.request);

			if (response) {
				return response;
			}

			// if there's no cache, then just error out as there is nothing we can do
			throw err;
		}
	}
});

class InvalidResponseError extends Error {
	override name = "InvalidReponseError";
	constructor(message = "invalid response from fetch") {
		super(message);
	}
}
