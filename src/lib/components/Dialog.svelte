<script lang="ts">
	import { scale } from "svelte/transition";
	export let noBackDrop = false;
	export let open = true;
	let dialogRef: HTMLDialogElement;

	function modal(el: HTMLDialogElement, open: boolean) {
		function handler(open: boolean) {
			if (open) {
				el.showModal();
			} else {
				el.close();
			}
		}
		handler(open);
		return {
			update(open: boolean) {
				handler(open);
			},
			destroy() {
				handler(false);
			},
		};
	}

	function close() {
		dialogRef.close();
	}
	function handleBackdropClick(e: MouseEvent) {
		const rect = dialogRef.getBoundingClientRect();
		const isClickOutside = !(
			rect.top <= e.clientY &&
			e.clientY <= rect.top + rect.height &&
			rect.left <= e.clientX &&
			e.clientX <= rect.left + rect.width
		);
		if (isClickOutside) {
			close();
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	transition:scale
	class="dialog"
	class:dialog_nobackdrop={noBackDrop}
	bind:this={dialogRef}
	use:modal={open}
	on:close
	on:click|self={handleBackdropClick}
>
	<button type="button" title="close" class="btn-close" on:click={close}
		>🗙</button
	>
	<slot {close} />
</dialog>

<style>
	.dialog {
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

	.btn-close {
		position: absolute;
		top: 0.5em;
		right: 0.5em;
		margin: 0;
		border: 0;
		padding: 0;
		background: none;
		line-height: 1;
	}
</style>
