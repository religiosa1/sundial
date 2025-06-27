import devtoolsJson from "vite-plugin-devtools-json";
import { defineConfig } from "vitest/config";
import { sveltekit } from "@sveltejs/kit/vite";

export default defineConfig({
	plugins: [sveltekit(), devtoolsJson()],
	test: { include: ["src/**/*.{test,spec}.{js,ts}"] },
	server: {
		fs: {
			// Allow serving files from one level up to the project root
			// to get version out of package json
			allow: [".."],
		},
	},
});
