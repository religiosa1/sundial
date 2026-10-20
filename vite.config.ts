import adapter from "@sveltejs/adapter-netlify";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import devtoolsJson from "vite-plugin-devtools-json";
import { defineConfig } from "vitest/config";
import { sveltekit } from "@sveltejs/kit/vite";

export default defineConfig({
	plugins: [
		sveltekit({
			// Consult https://svelte.dev/docs/kit/integrations
			// for more information about preprocessors
			preprocess: vitePreprocess(),

			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: adapter({
				// if true, will create a Netlify Edge Function rather
				// than using standard Node-based functions
				edge: false,

				// if true, will split your app into multiple functions
				// instead of creating a single one for the entire app.
				// if `edge` is true, this option cannot be used
				split: false,
			}),
		}),
		devtoolsJson(),
	],
	test: { include: ["src/**/*.{test,spec}.{js,ts}"] },
	server: {
		fs: {
			// Allow serving files from one level up to the project root
			// to get version out of package json
			allow: [".."],
		},
	},
});
