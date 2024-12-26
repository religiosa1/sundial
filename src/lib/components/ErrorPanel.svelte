<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		error: unknown;
		children?: Snippet;
	}
	const { error, children }: Props = $props();

	const message = $derived.by(() => {
		if (error == null) return null;
		if (error instanceof Error) {
			return error.name + " " + error.message;
		}
		// For GeolocationPositionError and alike
		if (
			typeof error === "object" &&
			"message" in error &&
			error.message &&
			typeof error.message === "string"
		) {
			return error.message;
		}
		return String(error);
	});
</script>

{#if error != null}
	<div class="error-panel">
		<header>
			{#if children}
				{@render children()}
			{:else}
				<p>An error has occured</p>
			{/if}
		</header>
		<code>
			{message}
		</code>
	</div>
{/if}

<style>
	.error-panel {
		margin: 0.75em 0;
		color: var(--clr-highlight);
	}
	header {
		margin-bottom: 0.5em;
	}
</style>
