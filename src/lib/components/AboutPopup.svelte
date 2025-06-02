<script lang="ts">
	import Dialog from "$lib/components/Dialog.svelte";
	import { version } from "$lib/../../package.json";
	import LICENSE from "$lib/../../LICENSE.txt?raw";

	let { open = $bindable() }: { open: boolean } = $props();

	const licenseLineBreaksNormalized = LICENSE.replaceAll(/(?<!\n)\n(?!\n)/g, " ");
</script>

<Dialog bind:open>
	<div class="about">
		<h3>Sunlight phases information app.</h3>

		<p>
			Viacheslav Azarov, 2022
			<br />
			<a href="https://github.com/religiosa1/sundial">Source code</a>
			<br />
			<small>Version: {version}</small>
		</p>

		<p>
			Actual sunlight phases calculations are provided by the wonderful
			<a href="https://github.com/mourner/suncalc">suncalc</a>
			library written by
			<a href="http://agafonkin.com/en">Vladimir Agafonkin</a> and contributers.
		</p>

		<p>
			Map implementation is provided by the <a href="https://maplibre.org/">Maplibre</a>
			library.
		</p>

		<p>
			Map tiles are provided by and licensed to <a href="https://www.openstreetmap.org/copyright"
				>OpenStreetMap contributers</a
			>. This map is for informational purposes only and may contain inaccuracies in borders, place
			names, and may not account for local laws and regulations relating to map usage.
		</p>

		<p>Written using <a href="https://svelte.dev/">Svelte</a></p>

		<details>
			<summary>MIT-License</summary>
			<div class="license">{licenseLineBreaksNormalized}</div>
		</details>
	</div>
</Dialog>

<style>
	p {
		margin-bottom: 1.25em;
	}

	.about {
		max-width: 550px;
	}

	.license {
		white-space-collapse: preserve-breaks;
	}
</style>
