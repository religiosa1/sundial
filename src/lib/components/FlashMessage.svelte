<!-- @component Automatically disappeareing message. -->
<script lang="ts">
	import type { Snippet } from "svelte";
	import { cubicIn, cubicOut } from "svelte/easing";
	import { fade, type EasingFunction } from "svelte/transition";

	interface Props {
		children?: Snippet;
		/** Message slowly appears instead of disappearing */
		reversed?: boolean;
		/** Message doesn't automatically appear when mounted, instead must be controlled imperatively */
		noShowOnMount?: boolean;
		params?: {
			delay?: number;
			duration?: number;
			easing?: EasingFunction;
		};
	}

	let { children, reversed, noShowOnMount, params }: Props = $props();

	let shown = $state(!noShowOnMount);

	/** Show message imperatively */
	export function show() {
		shown = true;
	}

	const fadeOut = (
		_node: HTMLElement,
		params?: {
			delay?: number;
			duration?: number;
			easing?: (v: number) => number;
		}
	) => ({
		delay: params?.delay ?? (reversed ? 50 : 0),
		duration: params?.duration ?? (reversed ? 800 : 2000),
		easing: params?.easing ?? (reversed ? cubicOut : cubicIn),
		css: (_t: number, u: number) => `opacity: ${u}`,
	});

	const fadeTransition = $derived(reversed ? fade : fadeOut);
</script>

{#if shown}
	<span class="flash-message" in:fadeTransition|global={params} onintroend={() => (shown = false)}>
		{@render children?.()}
	</span>
{/if}
