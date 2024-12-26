<script lang="ts">
	import { useMyLocation } from "$lib/actions/useMyLocation";
	import Spinner from "$lib/components/Spinner.svelte";
	import { saveDefaultLocation, type StoredLocation } from "$lib/stores/location";
	import { cubicIn, cubicOut } from "svelte/easing";
	import { fade } from "svelte/transition";

	interface Props {
		onLocationSaved: (l: StoredLocation) => void;
		onError?: (e: unknown) => void;
	}
	let { onLocationSaved, onError }: Props = $props();

	let isPending = $state(false);
	let useMyLocationResult = $state<Promise<void> | undefined>();

	function handleClick() {
		isPending = true;
		onError?.(undefined);
		useMyLocationResult = useMyLocation()
			.then(() => {
				const storedValue = saveDefaultLocation();
				onLocationSaved?.(storedValue);
			})
			.catch((err) => {
				onError?.(err);
				throw err;
			})
			.finally(() => {
				isPending = false;
			});
	}

	const fadeOut = (
		_node: HTMLElement,
		params?: {
			delay?: number;
			duration?: number;
			easing?: (v: number) => number;
		}
	) => ({
		delay: params?.delay || 0,
		duration: params?.duration || 800,
		easing: params?.easing || cubicOut,
		css: (_t: number, u: number) => `opacity: ${u}`,
	});
</script>

<button disabled={isPending} type="button" onclick={handleClick}> Use my location </button>
{#if useMyLocationResult != null}
	{#await useMyLocationResult}
		<span class="pending" in:fade={{ delay: 50, easing: cubicIn }}>Retrieving... <Spinner /></span>
	{:then _}
		<span class="ok" in:fadeOut={{ delay: 2000 }}> Ok </span>
	{/await}
{/if}

<style>
	.ok {
		opacity: 0;
	}
</style>
