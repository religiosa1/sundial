<script lang="ts">
	import type { Snippet } from "svelte";
	import type { EventHandler } from "svelte/elements";
	import { fly } from "svelte/transition";

	interface Props {
		noBackDrop?: boolean;
		open?: boolean;
		children?: Snippet;
		onclose?: EventHandler<Event, HTMLDialogElement>;
	}
	let { open = $bindable(), noBackDrop, children, onclose }: Props = $props();

	let dialogRef: HTMLDialogElement;
	$effect(() => {
		if (!dialogRef) return;
		if (open) {
			dialogRef.showModal();
		} else {
			dialogRef.close();
		}
	});

	function handleBackdropClick(e: MouseEvent) {
		if (e.target !== dialogRef) {
			return;
		}
		const rect = dialogRef.getBoundingClientRect();
		const isClickOutside = !(
			rect.top <= e.clientY &&
			e.clientY <= rect.top + rect.height &&
			rect.left <= e.clientX &&
			e.clientX <= rect.left + rect.width
		);
		if (isClickOutside) {
			open = false;
		}
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
	transition:fly={{ y: 200 }}
	bind:this={dialogRef}
	class="dialog"
	class:dialog_nobackdrop={noBackDrop}
	onclick={handleBackdropClick}
	{onclose}
>
	<header>
		<button type="button" title="close" class="btn-close" onclick={() => (open = false)}>
			close
		</button>
	</header>
	{@render children?.()}
</dialog>

<style>
	.dialog {
		position: relative;
		color: var(--clr-txt);
		background-color: var(--clr-bg-main, #fff);
		border: 1px solid var(--clr-border, #aaa);
		box-shadow: 0 0 5px var(--clr-shadow, rgba(0, 0, 0, 0.1));
		transition: display 0.3s ease-in-out;
	}
	.dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(4px);
		transition: all 0.3s ease-in-out;
	}

	@media (prefers-color-scheme: dark) {
		.dialog::backdrop {
			background-color: rgba(255, 255, 255, 0.1);
		}
	}

	.dialog_nobackdrop::backdrop {
		background-color: rgba(0, 0, 0, 0.075);
		backdrop-filter: none;
	}
	@media (prefers-color-scheme: dark) {
		.dialog_nobackdrop::backdrop {
			background-color: rgba(255, 255, 255, 0.075);
		}
	}

	header {
		position: sticky;
		top: 0;
		display: flex;
		justify-content: flex-end;
		height: 1rem;
		margin-bottom: -1rem;
	}

	.btn-close {
		margin: 0;
		border: 0;
		padding: 0;
		background: none;
		font-size: 0;
		width: 1rem;
		height: 1rem;
		mask: url("/img/cross.svg") no-repeat center / contain;
		background-color: currentColor;
	}
</style>
