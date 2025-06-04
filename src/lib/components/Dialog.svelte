<script module>
	const bodyDialogOpenClass = "body-dialog-open";
	const bodyDialogClosingClass = "body-dialog-closing";
</script>

<script lang="ts">
	import type { Snippet } from "svelte";
	import type { EventHandler } from "svelte/elements";
	import { fly } from "svelte/transition";

	interface Props {
		anchor?: string;
		noBackDrop?: boolean;
		open?: boolean;
		children?: Snippet;
		onclose?: EventHandler<Event, HTMLDialogElement>;
	}
	let { anchor, open = $bindable(), noBackDrop, children, onclose }: Props = $props();

	interface Coords {
		clientX: number;
		clientY: number;
	}

	let mouseDownCoords: Coords | undefined = undefined;

	function isCoordInsideRect(rect: DOMRect, coords: Coords): boolean {
		return !!(
			rect.top <= coords.clientY &&
			coords.clientY <= rect.top + rect.height &&
			rect.left <= coords.clientX &&
			coords.clientX <= rect.left + rect.width
		);
	}
</script>

<dialog
	transition:fly={{ y: 200 }}
	onintrostart={() => document.body.classList.add(bodyDialogOpenClass)}
	onoutrostart={() => document.body.classList.add(bodyDialogClosingClass)}
	onoutroend={() => document.body.classList.remove(bodyDialogOpenClass, bodyDialogClosingClass)}
	style={anchor && `position-anchor: ${anchor}`}
	class="dialog"
	class:anchored={anchor}
	class:nobackdrop={noBackDrop}
	{@attach (dialog) => {
		if (open) {
			dialog.showModal();
		} else {
			dialog.close();
		}
	}}
	onmousedown={(e) => {
		mouseDownCoords = { clientX: e.clientX, clientY: e.clientY };
	}}
	onmouseup={(e) => {
		if (!mouseDownCoords) {
			return;
		}
		const rect = e.currentTarget.getBoundingClientRect();
		// both click start and end must be outside of dialog's bounding box
		const isClickOutside = !isCoordInsideRect(rect, e) && !isCoordInsideRect(rect, mouseDownCoords);
		if (isClickOutside) {
			open = false;
		}
		mouseDownCoords = undefined;
	}}
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
	:global(.body-dialog-open) {
		overflow: hidden;
	}

	.dialog {
		position: relative;
		color: var(--clr-txt);
		background-color: var(--clr-bg-main, #fff);
		border: 1px solid var(--clr-border, #aaa);
		box-shadow: 0 0 5px var(--clr-shadow, rgba(0, 0, 0, 0.1));
	}

	.dialog::backdrop {
		transition: all 0.2s ease-in-out;
	}

	.dialog[open]::backdrop {
		background-color: rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(4px);
	}

	:global(.body-dialog-closing) .dialog[open]::backdrop {
		background-color: transparent;
		backdrop-filter: none;
	}
	@starting-style {
		.dialog[open]::backdrop {
			background-color: transparent;
			backdrop-filter: none;
		}
	}

	@media (prefers-color-scheme: dark) {
		.dialog[open]::backdrop {
			background-color: rgba(255, 255, 255, 0.1);
		}
	}
	.dialog.nobackdrop[open]::backdrop {
		background-color: transparent;
		backdrop-filter: none;
	}

	.anchored {
		position-area: span-start start;
		margin: 0 1rem 0 0;
	}

	header {
		position: sticky;
		top: 0;
		float: right;
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
